import {JsonVOError, ResponseNotOKError, ScxEventBus, ScxReq} from "scx-ui";
import {ScxUserInfo} from "scx-ui/vue-component";
import {inject} from "vue";
import {ElMessage} from "element-plus";


/**
 *
 * @type {string}
 */
const scxAuthKey = "scx-auth";

/**
 *
 * @returns {ScxAuth}
 */
function useScxAuth() {
    return inject(scxAuthKey);
}


class ScxAuth {

    /**
     * 获取 token 的标识字段
     */
    TOKEN_KEY = "S-Token";

    /**
     * 获取 设备 的标识字段
     */
    DEVICE_KEY = "S-Device";

    DEVICE_TYPE = "ADMIN"; //WEBSITE 使用的是 cookie, ADMIN 使用的是 header

    /**
     * 用户信息
     */
    userInfo;

    /**
     * @type ScxReq
     */
    req;

    /**
     * 事件总线
     */
    eventBus;

    /**
     *
     * @param {ScxUserInfo} userInfo
     * @param baseURL
     * @param {ScxEventBus} eventBus
     */
    constructor(userInfo, baseURL, eventBus) {
        this.userInfo = userInfo;
        this.req = new ScxReq(baseURL);
        this.eventBus = eventBus;
        //重连成功时 再次执行绑定
        this.eventBus.addHandler("ON_WEBSOCKET_OPEN", () => {
            this.eventBus.clusteredPublish("bind-websocket-by-token", {token: this.getToken()});
        });
    }

    infoApi() {
        return "api/auth/info";
    }

    /**
     * 重置用户信息
     */
    resetUserInfo() {
        this.userInfo.reset();
        this.userInfo.loginStatus = false;
    }

    /**
     * 判断证书是否可用, 可用的同时会拉取用户信息
     * @returns {Promise<unknown>}
     */
    tokenCanUse() {
        return new Promise((resolve, reject) => {
            this.req.get(this.infoApi(), null, {
                headers: this.AuthHeaders(), responseType: "json",
            }).then(res => {
                this.userInfo.fill(res);
                this.userInfo.loginStatus = true;
                this.eventBus.clusteredPublish("bind-websocket-by-token", {token: this.getToken()});
                resolve(true);
            }).catch(e => {
                //在两种情况下 token 不可用 一种是接口返回信息有误 一种是 后台明确 401 错误
                if (e instanceof JsonVOError || (e instanceof ResponseNotOKError && e.cause.status === 401)) {
                    resolve(false);
                } else {//这里可能是网络无法连接等 直接抛异常即可
                    //todo 此处因为目前只是抛出异常 所以当后台未启动时 前台也无法正确显示
                    //todo 这里有几种方案 第一种就是这个 tokenCanUse 状态改为3种 明确可用 明确不可用 以及未知(比如后台连接不上)
                    // todo 明确可用就是正常走路由 明确不可用就是跳转到登录界面 未知的情况下同样也跳转到登录界面 但是 不清空用户 token
                    //todo 这样下次用户刷新页面仍然可以直接进入
                    // reject(e);
                    ElMessage.error("Api 连接错误 !!!");
                    resolve(false);
                }
            });
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            //通知后台退出登录
            this.req.post("api/auth/logout", null, {
                headers: this.AuthHeaders(), responseType: "json",
            }).then(() => {
                //成功后清除 token 和 用户信息
                this.removeToken();
                this.resetUserInfo();
                resolve();
            }).catch(e => {
                //在两种情况下 token 不可用 一种是接口返回信息有误 一种是 后台明确 401 错误
                if (e instanceof JsonVOError || (e instanceof ResponseNotOKError && e.cause.status === 401)) {
                    resolve(false);
                } else {//这里可能是网络无法连接等 直接抛异常即可
                    reject(e);
                }
            });
        });
    }

    /**
     * 用户是否已经登录
     * @returns {boolean}
     */
    alreadyLogged() {
        return this.userInfo.loginStatus === true;
    }

    /**
     * 获取 token
     * @returns {string}
     */
    getToken() {
        try {
            return localStorage.getItem(this.TOKEN_KEY);
        } catch (e) {
            console.error(e);
            return "";
        }
    }

    /**
     * 设置 token
     * @param token
     */
    setToken(token) {
        try {
            localStorage.setItem(this.TOKEN_KEY, token);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 移除 token
     */
    removeToken() {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 常用的 请求头
     * @returns {{}}
     */
    AuthHeaders() {
        const authHeaders = {};
        authHeaders[this.TOKEN_KEY] = this.getToken();
        authHeaders[this.DEVICE_KEY] = this.DEVICE_TYPE;
        return authHeaders;
    }

    install(app) {
        app.provide(scxAuthKey, this);
    }

}

export {
    ScxAuth,
    useScxAuth,
};
