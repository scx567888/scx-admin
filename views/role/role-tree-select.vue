<template>
    <div style="padding: 10px">
        <el-input v-model="filterText" clearable placeholder="输入关键字进行过滤"></el-input>
        <el-tree ref="roleTreeRef" :data="realTreeData" :expand-on-click-node="false" :filter-node-method="filterNode"
                 default-expand-all
                 node-key="id"
                 show-checkbox @check="onRoleTreeCheck">
            <template #default="{ data }">
            <span class="custom-tree-node">
              <span>{{ data.name }}</span>
            </span>
            </template>
        </el-tree>
    </div>
</template>

<script>
import {computed, onMounted, ref, watch} from "vue";
import {listToTree, useScxReq,} from "scx-ui";

export default {
    name: "role-tree-select",
    props: {
        modelValue: {
            type: Array,
            default: []
        }
    },
    setup(props, context) {
        const req = useScxReq();

        //左侧角色树的 ref
        const roleTreeRef = ref();
        //过滤文字
        const filterText = ref("");

        function filterNode(value, data) {
            if (!value) {
                return true;
            }
            return data.name.indexOf(value) !== -1;
        }

        //列表结构的角色数据
        const listData = ref([]);

        //根据列表生成的 树形结构的角色数据 (用来给 element ui 使用)
        const realTreeData = computed(() => [{
            id: "-1",
            name: "角色管理",
            children: listToTree(listData.value)
        }]);

        /**
         * 获取角色数据 本质上就是从后台查询所有角色并赋值给 listData
         * 转换成树结构的操作会由 vue 的 computed 自动处理
         */
        function getTreeData() {
            req.post("api/crud/role/list", {}).then(data => {
                listData.value = data.items;
            });
        }

        function onRoleTreeCheck(a, b) {
            const checkedKeys = roleTreeRef.value.getCheckedKeys(true);
            context.emit("update:modelValue", checkedKeys);
        }

        //监控 filterText 以实现树的过滤
        watch(filterText, (val) => {
            roleTreeRef.value.filter(val);
        });

        onMounted(() => {
            watch(() => props.modelValue, (val) => {
                if (val) {
                    roleTreeRef.value.setCheckedKeys(val);
                }
            }, {immediate: true});
        });

        //进入到页面的时候加载一下树
        getTreeData();

        return {
            realTreeData,
            roleTreeRef,
            filterText,
            filterNode,
            onRoleTreeCheck
        };
    }
};
</script>
<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>
