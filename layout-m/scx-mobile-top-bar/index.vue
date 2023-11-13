<template>
    <div class="top-bar">

        <!-- 左部分 -->
        <div class="top-bar-left">
            <slot name="left"/>
        </div>

        <!-- 中心部分   -->
        <div class="top-bar-center">
            <!-- 默认显示名称 -->
            <slot name="center">
                {{ context.title }}
            </slot>
        </div>

        <!-- 右部分 -->
        <div class="top-bar-right">
            <slot name="right"/>
        </div>

    </div>

</template>

<script>
import {inject} from "vue";

export default {
    name: "scx-mobile-top-bar",
    setup(props, ctx) {

        const context = inject("scx-context", null);

        return {context};
    }
};
</script>

<style>
.top-bar {
    display: flex;
    font-weight: bold;
    width: 100%;
    height: 50px;
    color: var(--scx-text-color);
    background: var(--scx-overlay-bg);
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--scx-box-shadow-bottom);
    margin-bottom: 10px;
}

.top-bar-right,
.top-bar-left {
    display: flex;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
}

.top-bar-center {

}
</style>
