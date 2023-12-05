<template>
    <div class="scx-role">

        <div class="left-page">
            <role-tree ref="roleTreeRef" :readonly="false" :show-user-count="false" @node-click="treeNodeClick"/>
        </div>

        <div class="right-page">
            <role-perms :data="nowRole" @on-update="onUpdate"/>
        </div>

    </div>
</template>

<script setup>
import {ref} from "vue";
import RoleTree from "./role-tree.vue";
import RolePerms from "./role-perms.vue";
import {deepCopy} from "scx-ui";

//左侧角色树的 ref
const roleTreeRef = ref();

//当前选中角色
const nowRole = ref({
    id: -1,
    name: "",
    children: [],
    pagePerms: [],
    perms: [],
    pageElementPerms: [],
    apiPerms: []
});

nowRole.value = null;

//点击树
function treeNodeClick(data) {
    //深拷贝一下点击的节点并赋值给 nowRole
    nowRole.value = deepCopy(data);
}

function onUpdate() {
    roleTreeRef.value.refreshListData();
}

</script>
<style scoped>
.scx-role {
    display: flex;
    height: 100%;
}

.scx-role .left-page {
    width: 250px;
    border-right: 2px solid #a5a3a3;
    flex-shrink: 0;
}

.scx-role .right-page {
    width: 100%;
    overflow: auto;
}
</style>
