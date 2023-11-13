<template>
    <div class="scx-mobile-launcher">

        <div v-for="i in canAccessRoutes" class="scx-mobile-launcher-item" @click="pushRouter(i)">
            <scx-icon v-if="i.meta && i.meta.icon" :icon="i.meta.icon"/>
            <span>{{ getRouteTitle(i) }}</span>
        </div>

    </div>
</template>

<script>
import {useRouter} from "vue-router";
import {computed, inject} from "vue";
import {getRouteTitle, routeCanShowInLauncher} from "../type/index.js";

export default {
    name: "scx-mobile-launcher",
    setup() {

        const scxRouter = inject("scx-router");
        const router = useRouter();

        const allRoutes = router.getRoutes().filter(routeCanShowInLauncher);

        const canAccessRoutes = computed(() => allRoutes.filter((c) => scxRouter.canAccessThisRoute(c)));

        //点击 跳转路由
        function pushRouter(item) {
            router.push({name: item.name});
        }

        return {
            canAccessRoutes,
            pushRouter,
            getRouteTitle
        };

    }
};
</script>

<style>
.scx-mobile-launcher {
    margin: 10px;
    min-height: 100px;
    border-radius: 10px;
    box-shadow: var(--scx-box-shadow-bottom);
    background: var(--scx-overlay-bg);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center center;
    box-sizing: border-box;
    overflow: hidden;
}

.scx-mobile-launcher-item {
    box-sizing: border-box;
    height: 110px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.scx-mobile-launcher-item:active {
    background: #d3d3d3;
}

.scx-mobile-launcher-item > .scx-icon {
    height: 60%;
    width: 60%;
}
</style>
