<template>

    <!-- 启动器按钮 -->
    <div class="scx-launcher-btn" @click="changeShowLauncher()">
        <scx-icon :class="{'isOpened':showLauncher}" icon="filled-launcher"/>
    </div>

    <!-- vue 动画容器 -->
    <scx-panel v-model="showLauncher" class="scx-launcher">

        <!-- 标题 -->
        <div class="scx-launcher-title">
            <span>{{ systemConfig.title }}</span>
            <!-- 暗黑模式切换按钮 -->
            <scx-theme-switch class="scx-launcher-title-dark-mode-button"/>
        </div>

        <!-- 搜索框 -->
        <scx-input v-model="searchText" class="scx-launcher-search" icon="outlined-search"/>

        <!-- 内容部分 -->
        <div class="scx-launcher-content">
            <scx-panel-item v-for="i in launcherItemList" :active="activeMenu===i.name" @click="pushRouter(i)">
                <scx-icon v-if="i.meta && i.meta.icon" :icon="i.meta.icon"/>
                <span>{{ getRouteTitle(i) }}</span>
            </scx-panel-item>
        </div>

        <!-- 底部 -->
        <div class="scx-launcher-bottom">
            SCX
        </div>

    </scx-panel>

</template>

<script>
import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import ScxPanel from "../components/scx-panel.vue";
import ScxPanelItem from "../components/scx-panel-item.vue";
import ScxInput from "../layout/scx-input.vue";
import {getRouteTitle, routeCanShowInLauncher, useScxRouter} from "../type/index.js";
import {notBlank, useScxSystemConfig} from "scx-ui";
import ScxThemeSwitch from "./scx-theme-switch.vue";

export default {
    name: "scx-launcher",
    components: {
        ScxThemeSwitch,
        ScxInput,
        ScxPanel,
        ScxPanelItem
    },
    setup() {
        const systemConfig = useScxSystemConfig();
        const scxRouter = useScxRouter();

        const router = useRouter();
        const route = useRoute();
        //所有能够被展示的路由 1, 是最终节点(没有 children) 2, 没有开启 hiddenInLauncher
        const allRoutes = scxRouter.getRoutes().filter(routeCanShowInLauncher);
        //是否显示 启动器
        const showLauncher = ref(false);
        //当前路由
        const activeMenu = computed(() => route.name);
        //用户可以访问的路由
        const canAccessRoutes = computed(() => allRoutes.filter((c) => scxRouter.canAccessThisRoute(c)));
        //搜索文字
        const searchText = ref("");

        //根据搜索框过滤内容
        const launcherItemList = computed(() => {
            if (notBlank(searchText.value)) {
                const finalSearchText = searchText.value.trim().toLowerCase();
                return canAccessRoutes.value.filter(nowItem => getRouteTitle(nowItem).toLowerCase().includes(finalSearchText));
            } else {
                return canAccessRoutes.value;
            }
        });

        //点击 跳转路由
        function pushRouter(item) {
            showLauncher.value = false;
            router.push({name: item.name});
        }

        function closeLauncher(evt) {
            const parentA = evt.target.closest(".scx-launcher-btn");
            const parentB = evt.target.closest(".scx-launcher");
            if (!parentA && !parentB) {
                showLauncher.value = false;
            }
        }

        function changeShowLauncher() {
            showLauncher.value = !showLauncher.value;
        }

        watch(showLauncher, (value) => {
            if (value) {
                window.addEventListener("click", closeLauncher);
            } else {
                window.removeEventListener("click", closeLauncher);
            }
        });

        return {
            searchText,
            showLauncher,
            launcherItemList,
            systemConfig,
            activeMenu,
            pushRouter,
            getRouteTitle,
            changeShowLauncher
        };

    }
};
</script>
<style scoped>
/*------------------ 按钮开始 ----------------------*/
.scx-launcher-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s;
    height: 48px;
    width: 100%;
    justify-content: center;
}

.scx-launcher-btn > svg {
    width: 50%;
    height: 50%;
    transition: transform 200ms;
}

.scx-launcher-btn:active > svg {
    transform: scale(0.9);
}

.scx-launcher-btn:hover > svg {
    fill: var(--scx-theme);
}

.scx-launcher-btn:hover {
    background: var(--scx-theme-bg);
}

/*------------------ 按钮结束 ----------------------*/

.scx-launcher {
    z-index: 200;
    position: fixed;
    /* 48px 是侧边栏的宽度*/
    left: calc(48px + 6px);
    top: 6px;
    min-width: 320px;
    min-height: 430px;
    resize: both;
}

.scx-launcher-title {
    flex-shrink: 0;
    height: 30px;
    color: var(--scx-theme);
    font-weight: 500;
    font-size: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.scx-launcher-title-dark-mode-button {
    position: fixed;
    right: 10px;
}

/*----- 搜索框 -----*/

.scx-launcher-search {
    margin-top: 5px;
    margin-bottom: 10px;
    width: calc(100% - 30px);
}

/*----- 内容 -----*/
.scx-launcher-content {
    margin-right: -8px;
    max-height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 10px;
    display: grid;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns: repeat(auto-fill, 145px);
}

/*-------- 底部 -----------*/
.scx-launcher-bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: auto;
}
</style>
