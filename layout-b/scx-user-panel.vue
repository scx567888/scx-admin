<template>

    <!-- 用户面板按钮 -->
    <div class="scx-user-panel-btn" @click="changeUserPanel()">
        <el-avatar :src="getAvatar()" class="scx-user-panel-btn-avatar" shape="square">
            {{ userInfo.username }}
        </el-avatar>
    </div>

    <!-- 用户面板 -->
    <scx-panel v-model="showUserPanelDialog" class='scx-user-panel' transition-type="left-bottom">

        <scx-panel-item v-for="i in userPanelItemList" :active="activeMenu===i.name" @click="handleGoToRoute(i.name)">
            <scx-icon v-if="i.meta && i.meta.icon" :icon="i.meta.icon"/>
            <span>{{ getRouteTitle(i) }}</span>
        </scx-panel-item>

        <!-- 分割线 -->
        <div v-if="userPanelItemList.length > 0" style="border-bottom: 2px solid #9a9696;"></div>

        <scx-panel-item class="scx-dialog-item" @click="logout">
            <scx-icon icon="outlined-poweroff"/>
            <span>退出登录</span>
        </scx-panel-item>
    </scx-panel>

</template>

<script>
import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import defaultAvatar from "../layout/img/default-avatar.gif";
import {ElMessage} from "element-plus";
import ScxPanelItem from "../components/scx-panel-item.vue";
import ScxPanel from "../components/scx-panel.vue";
import {useScxFSS, useScxUserInfo} from "scx-ui/vue-component";
import {getRouteTitle, routeNoNeedLogin, useScxAuth, useScxRouter} from "../type/index.js";

export default {
    name: "scx-user-panel",
    components: {
        ScxPanel,
        ScxPanelItem
    },
    setup() {
        const auth = useScxAuth();
        const fss = useScxFSS();
        const userInfo = useScxUserInfo();
        const scxRouter = useScxRouter();
        //当前路由
        const activeMenu = computed(() => route.name);

        //获取路由对象
        const route = useRoute();
        const router = useRouter();
        //在用户面板中显示的菜单
        const userPanelItemList = scxRouter.getRoutes().filter(s => s.children.length === 0 && (s.meta && s.meta.showInUserPanel));
        //是否显示用户面板弹窗
        const showUserPanelDialog = ref(false);

        //点击 跳转路由
        function handleGoToRoute(item) {
            showUserPanelDialog.value = false;
            router.push({name: item});
        }

        /**
         * 退出登录
         */
        function logout() {
            auth.logout().then(() => {
                ElMessage.success("退出登录成功 !!!");
                //查看当前页面是否在未登录即可访问的白名单中 , 在的话不做任何处理 , 不在的话重定向到登录
                if (!routeNoNeedLogin(route)) {
                    //再退出到登录页面时 携带当前页面的参数
                    router.push(scxRouter.getLoginRoute(route));
                }
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                showUserPanelDialog.value = false;
            });
        }

        /**
         * 关闭 用户面板
         * @param evt
         */
        function closeUserPanelDialog(evt) {
            const parentA = evt.target.closest(".scx-user-panel-btn");
            const parentB = evt.target.closest(".scx-user-panel");
            if (!parentA && !parentB) {
                showUserPanelDialog.value = false;
            }
        }

        function changeUserPanel() {
            showUserPanelDialog.value = !showUserPanelDialog.value;
        }

        //监听
        watch(showUserPanelDialog, (value) => {
            if (value) {
                window.addEventListener("click", closeUserPanelDialog);
            } else {
                window.removeEventListener("click", closeUserPanelDialog);
            }
        });

        function getAvatar() {
            if (userInfo.avatar) {
                return fss.joinImageURL(userInfo.avatar, {
                    w: 200,
                    h: 200
                });
            } else {
                return defaultAvatar;
            }
        }

        return {
            userInfo,
            userPanelItemList,
            showUserPanelDialog,
            defaultAvatar,
            activeMenu,
            logout,
            handleGoToRoute,
            getAvatar,
            changeUserPanel,
            getRouteTitle
        };

    }

};
</script>
<style>

/*用户面板按钮*/
.scx-user-panel-btn {
    position: relative;
    display: flex;
    height: 48px;
    width: 100%;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;
}

.scx-user-panel-btn:hover {
    background: var(--scx-theme-bg);
}

.scx-user-panel-btn-avatar {
    transition: transform 200ms;
}

.scx-user-panel-btn-avatar:active {
    transform: scale(0.9);
}

/*弹窗*/
.scx-user-panel {
    position: fixed;
    z-index: 200;
    left: calc(48px + 6px);
    bottom: 6px;
    width: 150px;
    display: grid;
    grid-row-gap: 10px;
}

</style>
