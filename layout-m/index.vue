<template>
    <div class="scx-mobile-app">
        <scx-mobile-top-bar>
            <template #left>
                <slot name="top-bar-left">
                    <div class="fill-div" @click="goBack()">
                        <scx-icon icon="outlined-arrow-left"/>
                    </div>
                </slot>
            </template>
            <template #center>
                {{ title }}
            </template>
            <template #right>
                <slot name="top-bar-right">
                    <div class="fill-div" @click="goHome()">
                        <scx-icon icon="outlined-home"/>
                    </div>
                </slot>
            </template>
        </scx-mobile-top-bar>
        <slot>
            <router-view v-slot="{ Component }">
                <!-- 路由切换动画 -->
                <transition mode="out-in" name="scx-main-t">
                    <!-- 对所有页面都进行缓存  v-if 是为了刷新当前路由 -->
                    <keep-alive>
                        <component :is="Component"/>
                    </keep-alive>
                </transition>
            </router-view>
        </slot>
    </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import ScxMobileTopBar from "./scx-mobile-top-bar/index.vue";
import {getRouteTitle} from "../type/index.js";

export default {
    name: "scx-mobile-layout",
    components: {ScxMobileTopBar},
    setup() {
        //获取路由对象
        const route = useRoute();
        const router = useRouter();

        function goBack() {
            router.back();
        }

        function goHome() {
            router.push({name: "home"});
        }

        const title = computed(() => getRouteTitle(route));

        return {
            goBack,
            goHome,
            title
        };
    }
};
</script>

<style>
.scx-mobile-app {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: var(--scx-bg);
    color: var(--scx-text-color);
}

.fill-div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
