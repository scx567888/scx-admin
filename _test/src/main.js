import {createApp, reactive} from "vue";
import "nprogress/nprogress.css"; // 上方进度条 样式表
import "element-plus/dist/index.css"; // element-plus 样式表
import "element-plus/theme-chalk/dark/css-vars.css"; // 暗黑模式变量
import ElementPlus from "element-plus"; // element-plus 组件库
import {
    changeTheme,
    ScxClusteredEventBus,
    ScxClusteredEventBusVueInstaller,
    ScxComponent,
    ScxConfigManager,
    ScxConfigManagerVueInstaller,
    ScxFSS,
    ScxFSSVueInstaller,
    ScxReq,
    ScxReqVueInstaller,
    ScxUserInfo,
    ScxUserInfoVueInstaller,
} from "scx-ui"; // 注册图标
import {Components} from "../../components/index.js";
import App from "./App.vue";
import "scx-ui/style/normalize.css"; // 主题
import "scx-ui/style/default.css"; // 主题
import "scx-ui/style/dark.css"; // 暗黑变量
import "../../styles/default/index.css"; //导入默认样式 (注意!!! 这里导入的顺序放在最后 以便覆盖其他组件的样式)
import "../../styles/dark/index.css"; //导入暗黑模式
import NProgress from "nprogress";
import scxConfig from "../scx.config.js";
import {AliOSS, AuthFetch, ScxAuth, ScxRouter} from "../../type/index.js";
import {routes} from "./routes.js";
import "scx-icon/register";


NProgress.configure({showSpinner: false});

const eventBus = new ScxClusteredEventBus(scxConfig.baseApiUrl);

const userInfo = reactive(new ScxUserInfo());

const auth = new ScxAuth(userInfo, scxConfig.baseApiUrl, eventBus);

const req = new ScxReq(new AuthFetch(scxConfig.baseApiUrl, auth));

const scxConfigManager = new ScxConfigManager(req, eventBus, reactive(scxConfig.systemConfig), reactive(scxConfig.userConfig)).startWatch();

//添加改变主题色的监听事件
scxConfigManager.onUserConfigChange(b => changeTheme(b.dark));

const fss = new ScxFSS(req);

const aliOSS = new AliOSS();

const scxRouter = new ScxRouter({
    routes, auth, systemConfig: scxConfigManager.systemConfig, userInfo,
});

eventBus.connect();

createApp(App)
        .use(ElementPlus)
        .use(scxRouter.getVueRouter())
        .use(ScxComponent)
        .use(Components)
        .use(new ScxReqVueInstaller(req))
        .use(new ScxFSSVueInstaller(fss))
        .use(new ScxUserInfoVueInstaller(userInfo))
        .use(new ScxClusteredEventBusVueInstaller(eventBus))
        .use(new ScxConfigManagerVueInstaller(scxConfigManager))
        .use(auth)
        .use(scxRouter)
        .use(aliOSS)
        .mount("#app");
