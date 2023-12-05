<template>
    <div class="scx-dept">

        <div class="left-page">
            <dept-tree ref="deptTreeRef" :readonly="false" :show-user-count="false" @node-click="treeNodeClick"/>
        </div>

        <div class="right-page">
            <dept-perms :data="nowDept" @on-update="onUpdate"/>
        </div>

    </div>
</template>

<script setup>
import {ref} from "vue";
import DeptTree from "./dept-tree.vue";
import DeptPerms from "./dept-perms.vue";
import {deepCopy} from "scx-ui";

//左侧部门树的 ref
const deptTreeRef = ref();

//当前选中部门
const nowDept = ref({
    id: -1,
    name: "",
    children: [],
    pagePerms: [],
    perms: [],
    pageElementPerms: [],
    apiPerms: []
});

nowDept.value = null;

//点击树
function treeNodeClick(data) {
    //深拷贝一下点击的节点并赋值给 nowDept
    nowDept.value = deepCopy(data);
}

function onUpdate() {
    deptTreeRef.value.refreshListData();
}

</script>
<style scoped>
.scx-dept {
    display: flex;
    height: 100%;
}

.scx-dept .left-page {
    width: 250px;
    border-right: 2px solid #a5a3a3;
    flex-shrink: 0;
}

.scx-dept .right-page {
    width: 100%;
    overflow: auto;
}
</style>
