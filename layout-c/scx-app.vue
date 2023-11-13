<template>

    <!-- 左右结构 -->
    <div class="scx-app">
        <!-- 左侧边栏 -->
        <scx-sidebar :class="userConfig.menuCollapse ? 'collapse' : ''">

            <template #top>
                <!-- logo -->
                <scx-logo/>
            </template>

            <!-- 菜单栏 -->
            <scx-menu/>

        </scx-sidebar>
        <!-- 右侧区域 上下结构 -->
        <div class="scx-content">

            <scx-navbar>
                <template #left>
                    <scx-menu-toggle/>
                    <scx-breadcrumb/>
                </template>
                <template #right>
                    <scx-theme-switch/>
                    <scx-user-panel/>
                </template>
            </scx-navbar>

            <!-- 右侧主内容容器 -->
            <scx-main/>
        </div>
        <!-- 右侧通知面板 -->
        <scx-notice/>
    </div>

</template>

<script>
import {useScxUserConfig} from "scx-ui";
import zhCN from "element-plus/es/locale/lang/zh-cn";
import ScxNavbar from "../layout/scx-navbar.vue";
import ScxMenu from "../layout/scx-menu.vue";
import ScxMain from "../layout/scx-main.vue";
import ScxNotice from "../layout/scx-notice.vue";
import ScxLogo from "../layout/scx-logo.vue";
import ScxSidebar from "../layout/scx-sidebar.vue";
import ScxMenuToggle from "../layout/scx-menu-toggle.vue";
import ScxBreadcrumb from "./scx-breadcrumb.vue";
import ScxThemeSwitch from "../layout/scx-theme-switch.vue";
import ScxUserPanel from "../layout/scx-user-panel.vue";

export default {
    name: "scx-app",
    components: {
        ScxUserPanel,
        ScxThemeSwitch,
        ScxBreadcrumb,
        ScxMenuToggle,
        ScxSidebar,
        ScxMenu,
        ScxLogo,
        ScxNavbar,
        ScxMain,
        ScxNotice,
    },
    setup() {
        const userConfig = useScxUserConfig();

        return {
            zhCN,
            userConfig
        };
    }
};
</script>
<style>
.scx-app {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    color: var(--scx-text-color);
    background: var(--scx-bg);
    /*使切换主题时颜色过渡平滑一些*/
    transition: background 200ms ease, color 100ms ease;
}

.scx-sidebar {
    width: 200px;
    transition: width 200ms;
}

.scx-sidebar.collapse {
    width: 54px;
}

.scx-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* todo 修复 el-table 宽度不缩小的bug */
    overflow: hidden;

}
</style>
