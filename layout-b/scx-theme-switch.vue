<template>
    <div class="scx-dark-mode-button" @click="changeDark()">
        <scx-icon :icon="userConfig.dark?'filled-sun':'filled-moon'"/>
    </div>
</template>

<script>
import {changeTheme, useScxConfigManager, useScxUserConfig} from "scx-ui";
import {ElMessage} from "element-plus";

export default {
    name: "scx-theme-switch",
    setup() {
        const userConfig = useScxUserConfig();
        const scxConfigManager = useScxConfigManager();

        function changeDark() {
            userConfig.dark = !userConfig.dark;
            changeTheme(userConfig.dark);
            scxConfigManager.updateUserConfig({dark: userConfig.dark}).then(c => {
                ElMessage.success("同步设置成功 !!!");
            }).catch(e => {
                ElMessage.error("同步设置失败 !!!");
            });
        }

        return {
            userConfig,
            changeDark
        };
    }
};
</script>

<style>
.scx-dark-mode-button {
    height: 25px;
    width: 25px;
    cursor: pointer;
    box-sizing: border-box;
}

.scx-dark-mode-button > svg {
    height: 100%;
    width: 100%;
    transition: fill 200ms;
}

.scx-dark-mode-button:hover > svg {
    fill: var(--scx-theme);
}
</style>
