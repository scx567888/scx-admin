<template>
    <!-- 登录背景 -->
    <div class="login-bg">
        <!-- 小星星 -->
        <div class="stars"></div>
        <!-- 中间登录的div   -->
        <div :class="[activeTab,{needAnimation:needAnimation}]" class="login-form-bg">

            <!-- 上面的说明文字 -->
            <div class="title-container">
                <scx-icon icon="filled-scx-logo"/>
                <span>系统登录</span>
            </div>

            <el-tabs v-model="activeTab" stretch>
                <el-tab-pane label="账号登录" name="loginTab">

                    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">

                        <el-form-item prop="username">
                            <el-input ref="loginUsernameRef" v-model="loginForm.username" placeholder="请输入用户名"
                                      @keyup.enter="onLogin">
                                <template v-slot:prefix>
                                    <scx-icon icon="outlined-user"/>
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password
                                      @keyup.enter="onLogin">
                                <template v-slot:prefix>
                                    <scx-icon icon="outlined-unlock"/>
                                </template>
                            </el-input>
                        </el-form-item>

                    </el-form>

                    <el-button :loading="loginForm.loginBtnLoading" style="width: 100%" type="primary" @click="onLogin">
                        登录
                    </el-button>

                </el-tab-pane>

                <el-tab-pane label="注册账号" name="registerTab">

                    <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">

                        <el-form-item prop="registerUsername">
                            <el-input ref="registerUsernameRef" v-model="registerForm.registerUsername"
                                      placeholder="用户名由字母和数字组成  大于4位小于15位"
                                      @keyup.enter="onRegister">
                                <template v-slot:prefix>
                                    <scx-icon icon="outlined-user"/>
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="registerPassword">
                            <el-input v-model="registerForm.registerPassword"
                                      placeholder="密码由字母,数字或符号组成  大于等于6位小于20位"
                                      show-password
                                      @keyup.enter="onRegister">
                                <template v-slot:prefix>
                                    <scx-icon icon="outlined-unlock"/>
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="registerPasswordAgain">
                            <el-input v-model="registerForm.registerPasswordAgain" placeholder="请再次输入密码"
                                      show-password
                                      @keyup.enter="onRegister">
                                <template v-slot:prefix>
                                    <scx-icon icon="outlined-unlock"/>
                                </template>
                            </el-input>
                        </el-form-item>

                    </el-form>
                    <el-button :loading="registerForm.registerBtnLoading" style="width: 100%" type="success"
                               @click="onRegister">
                        注册
                    </el-button>

                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="login-footer">Powered By SCX @2018-2023</div>
    </div>

</template>

<script setup>
import "./index.css";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {useScxAuth, useScxRouter} from "../../../../type/index.js";
import {JsonVOError, useScxReq, useScxUserInfo} from "scx-ui";
import {loginMessage} from "./login-message.js";

const auth = useScxAuth();
const req = useScxReq();
const scxRouter = useScxRouter();

const userInfo = useScxUserInfo();

const loginUsernameRef = ref(null);
const registerUsernameRef = ref(null);
const router = useRouter();
const route = useRoute();

const redirect = computed(() => route.query.redirect);
const otherQuery = computed(() => getOtherQuery(route.query));

function getOtherQuery(query) {
    return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
            acc[cur] = query[cur];
        }
        return acc;
    }, {});
}

const activeTab = ref("loginTab");

const needAnimation = ref(false);

//登录开始
const loginFormRef = ref(null);
const loginForm = reactive({
    username: "",
    password: "",
    loginBtnLoading: false
}); // 在这里使用ref包裹一层引用容器
const loginFormRules = {
    username: [{
        type: "string",
        trigger: "change",
        required: true,
        validator: (rule, value, callback) => {
            if (value.trim() === "") {
                return callback("请输入正确的用户名 !!!");
            } else {
                callback();
            }
        }
    }],
    password: [{
        type: "string",
        required: true,
        trigger: "change",
        validator: (rule, value, callback) => {
            if (value.length === 0) {
                return callback("密码不能为空 !!!");  // reject with error message
            } else {
                callback();
            }
        }
    }]
};

function onLogin() {
    loginFormRef.value.validate((valid) => {
        if (!valid) {
            return;
        }
        loginForm.loginBtnLoading = true;
        req.post("api/auth/login", {
            username: loginForm.username.trim(),
            password: loginForm.password,
        }).then(data => {
            auth.setToken(data.token);
            auth.tokenCanUse().then(canUse => {
                if (canUse) {
                    //1, 先获取需要重定向的页面
                    const redirectRoute = scxRouter.getRedirectRouteFromLoginRoute(route);
                    //2, 判断是否有权限访问
                    const canAccessThisRoute = scxRouter.canAccessThisRoute(redirectRoute);
                    //3, 如果用户没权限访问 则跳转首页
                    router.push(canAccessThisRoute ? redirectRoute : {name: "home"});
                    ElMessage.success("欢迎回来 " + userInfo.username + " !!!");
                } else {
                    ElMessage.warning("认证 Token 无效 !!!");
                }
            });

        }).catch(error => {
            if (error instanceof JsonVOError) {
                ElMessage.error(loginMessage.t(error.message) || "未知错误 !!!");
            } else {
                ElMessage.error("Api 连接错误 !!!");
            }
        }).finally(() => {
            loginForm.loginBtnLoading = false;
        });
    });

}

//注册开始
const registerFormRef = ref(null);
const registerForm = reactive({
    registerUsername: "",
    registerPassword: "",
    registerPasswordAgain: "",
    registerBtnLoading: false
});
const registerFormRules = {
    registerUsername: [{
        type: "string",
        trigger: "change",
        required: true,
        validator: (rule, value, callback) => {
            if (value.length < 4) {
                callback("用户名太短 !!!");
            } else {
                return callback();
            }
        }
    }],
    registerPassword: [{
        type: "string",
        required: true,
        trigger: "change",
        validator: (rule, value, callback) => {
            if (value.length < 6) {
                callback("密码太短 !!!");  // reject with error message
            } else {
                return callback();
            }
        }
    }],
    registerPasswordAgain: [{
        type: "string",
        required: true,
        trigger: "change",
        validator: (rule, value, callback) => {
            if (value.trim() === "") {
                callback("请再次输入密码 !!!");
            } else if (value !== registerForm.registerPassword) {
                callback("两次输入密码不一致 !!!");
            } else {
                return callback();
            }
        }
    }]
};

// 注册方法
function onRegister() {
    registerFormRef.value.validate((valid) => {
        if (!valid) {
            return;
        }
        registerForm.registerBtnLoading = true;
        req.post("api/auth/signup", {
            username: registerForm.registerUsername,
            password: registerForm.registerPassword,
        }).then(response => {
            loginForm.username = registerForm.registerUsername + "";
            loginForm.password = registerForm.registerPassword + "";
            ElMessage.success("login.registerSuccess");
            activeTab.value = "loginTab";
            registerForm.registerBtnLoading = false;
        }).catch(e => {
            if (e.message === "userAlreadyExists") {
                ElMessage.error("用户名已被占用 !!!");
            } else {
                ElMessage.error("未知错误 !!!");
            }
            registerForm.registerBtnLoading = false;
        });

    });
}

function changeActiveTab(tabName) {
    if (tabName === "loginTab") {
        loginUsernameRef.value.focus();
        registerFormRef.value.resetFields();
    } else if (tabName === "registerTab") {
        registerUsernameRef.value.focus();
        loginFormRef.value.resetFields();
    }
}

onMounted(() => {
    watch(() => activeTab.value, (newVal) => {
        needAnimation.value = true;
        changeActiveTab(newVal);
    });
    changeActiveTab("loginTab");
});

</script>
