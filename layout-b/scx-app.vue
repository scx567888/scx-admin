<template>
    <div class="scx-app">
        <!-- 左侧边栏 -->
        <scx-sidebar>
            <template #top>
                <!-- 启动器 -->
                <scx-launcher/>
            </template>

            <!-- 任务栏 -->
            <scx-taskbar/>

            <template #bottom>
                <!-- 用户面板 -->
                <scx-user-panel/>
            </template>
        </scx-sidebar>
        <!-- 右侧主内容容器 -->
        <scx-main/>
        <!-- 右侧通知面板 -->
        <scx-notice/>
    </div>
</template>

<script>
import ScxSidebar from "../layout/scx-sidebar.vue";
import ScxMain from "../layout/scx-main.vue";
import ScxNotice from "../layout/scx-notice.vue";
import ScxLauncher from "./scx-launcher.vue";
import ScxUserPanel from "./scx-user-panel.vue";
import ScxTaskbar from "./scx-taskbar.vue";

export default {
    name: "scx-app",
    components: {
        ScxTaskbar,
        ScxUserPanel,
        ScxLauncher,
        ScxSidebar,
        ScxMain,
        ScxNotice
    },
    setup() {

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


</style>
<style scoped>
.scx-sidebar {
    width: 48px;
}

.scx-sidebar-center {
    padding-top: 5px;
}
</style>
