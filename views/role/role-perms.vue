<template>
    <div class="role-perms-wrapper">

        <div v-if="!data || data.id === -1 || data.id === -2" class="no-data">
            未选中任何角色
        </div>

        <div v-else class="role-perms">

            <span class="big-font">角色名称</span>

            <el-input v-model="data.name"/>

            <div v-if="!data.children" class="perm-info">
                <span class="big-font">路由权限</span>

                <div class="page-tree-wrapper">
                    <el-tree ref="pageTreeRef"
                             :data="pageTreeData"
                             class="page-tree"
                             default-expand-all node-key="name" show-checkbox>
                        <template #default="{ data }">
                            <span>{{ getRouteTitle(data) }}</span>
                        </template>
                    </el-tree>
                </div>

                <span class="big-font">其他权限</span>

                <el-checkbox-group v-model="data.perms" class="route-checkbox">
                    <el-checkbox v-for="i in permFlags" :label="i.permString" border>
                        {{ i.description }}
                    </el-checkbox>
                </el-checkbox-group>
            </div>

            <el-button type="primary" @click="update">保存修改</el-button>

        </div>

    </div>

</template>

<script>
import {getRouteTitle, routeCanShowInMenu, useScxRouter} from "../../type/index.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {deepCopy, useScxReq} from "scx-ui";

export default {
    name: "role-perms",
    props: {
        data: {}
    },
    emits: ["onUpdate"],
    setup(props, ctx) {

        const router = useRouter();
        const req = useScxReq();
        const scxRouter = useScxRouter();
        const pageTreeRef = ref();

        const appRoute = scxRouter.getRoutes().find(c => c.name === "app");

        const allRoutes = deepCopy(appRoute.children);

        const pageTreeData = computed(() => [{
            id: -1,
            name: "全部路由",
            children: filterRoutes(allRoutes)
        }]);

        function filterRoutes(routes) {
            return routes.filter(route => {
                if (routeCanShowInMenu(route)) {
                    if (route.children) {
                        route.children = filterRoutes(route.children);
                    }
                    return true;
                } else {
                    return false;
                }
            });
        }

        /**
         * 更新部门
         */
        function update() {
            //我们在存储时需要同时存储 半选节点和子节点 但是回显的时候需要特殊处理 
            const key1 = pageTreeRef.value.getCheckedKeys(false);
            const key2 = pageTreeRef.value.getHalfCheckedKeys();
            const updateModel = deepCopy(props.data);
            updateModel.pagePerms = key1.concat(key2);
            req.put("api/crud/role", {updateModel}).then(data => {
                ElMessage({
                    type: "success",
                    message: data.name + " : 更新成功!",
                });
                ctx.emit("onUpdate");
            }).catch(e => {
                ElMessage({
                    type: "error",
                    message: "更新失败!",
                });
            });
        }

        const permFlags = ref([]);

        function getPermFlag() {
            req.get("api/perm-flag/list", {}).then(data => {
                permFlags.value = data;
            });
        }

        getPermFlag();

        function checkedTree(val) {
            nextTick(() => {
                if (pageTreeRef.value) {
                    //只勾选子节点 防止覆盖父节点半选
                    const ids = val ? val.filter(c => pageTreeRef.value.getNode(c)?.isLeaf) : [];
                    pageTreeRef.value.setCheckedKeys(ids, false);
                }
            });
        }

        onMounted(() => {
            watch(() => props.data?.pagePerms, checkedTree, {immediate: true});
        });

        return {
            pageTreeRef,
            pageTreeData,
            permFlags,
            update,
            getRouteTitle
        };

    }
};
</script>

<style scoped>
.role-perms-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
}

.no-data {
    font-size: 25px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.role-perms {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
    width: 100%;
}

.perm-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
    width: 100%;
}

.big-font {
    font-size: 20px;
}

.route-checkbox {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 10px;
    width: 100%;
}

.route-checkbox > * {
    width: auto;
    margin: 0 !important;
}

.page-tree-wrapper {
    align-self: start;
    width: 400px;
    height: 400px;
}

.page-tree {
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: var(--scx-overlay-bg);
    box-shadow: var(--scx-box-shadow-center);
}
</style>
