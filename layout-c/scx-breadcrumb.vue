<template>
    <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(i) in matched" :key="i.name" class="scx-breadcrumb-item">
                <span>{{ getRouteTitle(i) }}</span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>
<script>
import {useRoute} from "vue-router";
import {getRouteTitle} from "../type/index.js";
import {computed} from "vue";

export default {
    name: "scx-breadcrumb",
    setup() {
        const route = useRoute();
        let matched = computed(() => route.matched.filter(item => item.meta && item.meta.title));
        return {
            matched,
            getRouteTitle,
        };
    }
};
</script>

<style>


/*以下为 vue 动画*/
.breadcrumb-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-leave-to {
    opacity: 0;
    transform: translateX(20px);
}

.scx-breadcrumb-item {
    transition: all 200ms;
}

.breadcrumb-leave-active {
    position: absolute;
}

/* todo 修复切换时多余的尾部斜杠 */
.breadcrumb-leave-active .el-breadcrumb__separator {
    display: none;
}
</style>
