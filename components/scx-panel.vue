<template>
    <transition :name="'scx-panel-t_'+transitionType">
        <div v-show="modelValue" class="scx-panel">
            <slot/>
        </div>
    </transition>
</template>

<script>
export default {
    name: "scx-panel",
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        transitionType: {
            type: String,
            default: "left-top"
        }
    },
    setup(props, context) {

    }
};
</script>

<style>
.scx-panel {
    border-radius: 4px;
    padding: 10px;
    background: var(--scx-glass-bg);
    transition: background-color 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    backdrop-filter: var(--scx-glass-bg-filter);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: var(--scx-box-shadow-center);
}

/********************* vue 过渡动画 *******************/
.scx-panel-t_left-bottom-enter-active,
.scx-panel-t_left-bottom-leave-active,
.scx-panel-t_left-top-enter-active,
.scx-panel-t_left-top-leave-active,
.scx-panel-t_top-enter-active,
.scx-panel-t_top-leave-active {
    opacity: 1;
    transition: transform 200ms cubic-bezier(.23, 1, .32, 1), opacity 100ms cubic-bezier(.23, 1, .32, 1);
}

.scx-panel-t_left-top-enter-from,
.scx-panel-t_left-top-leave-to,
.scx-panel-t_left-bottom-enter-from,
.scx-panel-t_left-bottom-leave-to,
.scx-panel-t_top-enter-from,
.scx-panel-t_top-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.scx-panel-t_left-bottom-enter-active,
.scx-panel-t_left-bottom-leave-active {
    transform-origin: left bottom;
}

.scx-panel-t_left-top-enter-active,
.scx-panel-t_left-top-leave-active {
    transform-origin: left top;
}

.scx-panel-t_top-enter-active,
.scx-panel-t_top-leave-active {
    transform-origin: top;
}
</style>
