<template>
    <div style="height: 50px;width: 100%;background: rgba(58,142,224,0.3)"
         @contextmenu.prevent="(e)=>showTaskbarContextMenu(e)">

    </div>
</template>

<script>
import {showContextMenu} from "scx-ui";

export default {
    name: "scx-taskbar",
    setup() {

        function showTaskbarContextMenu(e, item) {
            showContextMenu(e, [
                {
                    label: "刷新此页面",
                    callback: (c) => {
                        c();
                    }
                },
                {
                    label: "关闭此页面",
                    callback: (c) => {

                        c();
                    }
                },
                {
                    label: "关闭其他页面",
                    callback: (c) => {
                        c();
                    }
                },
                {
                    label: "关闭所有页面",
                    callback: (c) => {
                        c();
                    }
                }
            ]);
        }

        return {showTaskbarContextMenu};
    }
};
</script>
<style>

</style>
