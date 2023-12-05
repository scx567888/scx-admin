<template>
    <div class="dept-tree">

        <div class="tree-title">

            <el-button class="refresh-button" size="small" @click="refreshListData()">
                <scx-icon icon="outlined-sync"/>
            </el-button>

            <div class="big-font">部门管理</div>

            <div class="tree-title-info">共( {{ listData.length }} )个</div>

        </div>

        <el-input v-model="filterText" clearable placeholder="输入名称进行过滤"/>

        <el-tree ref="treeRef" :allow-drag="allowDrag" :allow-drop="allowDrop"
                 :data="treeData"
                 :draggable="!readonly"
                 :expand-on-click-node="false"
                 :filter-node-method="filterNode"
                 :highlight-current="true"
                 class="tree1"
                 default-expand-all
                 node-key="id"
                 @node-click="nodeClick" @node-contextmenu="nodeContextMenu" @node-drop="nodeDrop">

            <template #default="{ data }">

                <div class="custom-tree-node">
                    <div>{{ data.name }} <span v-if="showUserCount" class="e7">({{ data.count }})</span></div>
                    <div class="e1">
                        <!-- 只有顶级菜单我们展示添加量表类型按钮其余均使用 右键菜单 -->
                        <div v-if="data.id === -1&&!readonly" class="e2" @click.stop="append(data)">添加部门</div>
                    </div>
                </div>

            </template>

        </el-tree>

        <el-dialog v-model="showEditDialog" title="编辑部门名称" width="70%">

            <el-form :model="info">
                <el-form-item :use-model="true" label="部门名称 : " prop="name" style="width: 100%">
                    <el-input v-model="info.name"/>
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button type="primary" @click="update()">确定</el-button>
                <el-button @click="showEditDialog = false">取消</el-button>
            </template>

        </el-dialog>

    </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {deepCopy, getUUID, isBlank, listToTree, showContextMenu, useScxReq,} from "scx-ui";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
    name: "dept-tree",
    props: {
        readonly: {
            type: Boolean,
            default: true
        },
        showUserCount: {
            type: Boolean,
            default: true
        }
    },
    emits: [
        "nodeClick"
    ],
    setup(props, ctx) {

        const req = useScxReq();

        const treeRef = ref();

        const filterText = ref("");

        //监控 filterText 以实现树的过滤
        watch(filterText, (val) => {
            treeRef.value.filter(val);
        });

        const listData = ref([]);

        //根据列表生成的 树形结构的量表类型数据 (用来给 element ui 使用)
        const treeData = ref([]);

        watch(listData, () => {
            if (props.showUserCount) {
                treeData.value = [{
                    id: -1,
                    name: "部门管理",
                    type: "All",
                    children: [
                        {
                            id: -2,
                            name: "未分配部门",
                            type: "Ungrouped",
                        },
                        ...listToTree(listData.value)
                    ]
                }];
                //刷新 信息
                infoHandler(treeData.value);
            } else {
                treeData.value = [{
                    id: -1,
                    name: "部门管理",
                    type: "All",
                    children: [
                        ...listToTree(listData.value)
                    ]
                }];
            }
        }, {immediate: true});

        function infoHandler(data) {
            for (let valueElement of data) {
                req.post("api/dept/user-count", {
                    id: valueElement.id,
                    type: valueElement.type
                }).then(co => {
                    valueElement.count = co;
                }).catch(e => {
                    valueElement.count = 0;
                });
                if (valueElement.children) {
                    infoHandler(valueElement.children);
                }
            }
        }

        function filterNode(value, data) {
            if (!value) {
                return true;
            }
            return data.name.indexOf(value) !== -1;
        }

        //点击树
        function nodeClick(data) {
            //深拷贝一下点击的节点并赋值给 nowDept
            ctx.emit("nodeClick", deepCopy(data));
        }

        function nodeContextMenu(e, data) {
            if (props.readonly) {
                return;
            }
            //根节点 不做右键弹出效果
            if (data.id === -2 || data.id === -1) {
                return;
            }
            let arr = [
                {
                    label: "添加子部门",
                    callback: (c) => {
                        append(data);
                        c();
                    }
                },
                {
                    label: "重命名",
                    callback: (c) => {
                        edit(data);
                        c();
                    }
                },
                {
                    label: "删除",
                    callback: (c) => {
                        remove(data);
                        c();
                    }
                }
            ];
            showContextMenu(e, arr);
        }

        function append(data) {
            const parentID = data.id !== -1 ? data.id : null;
            //如果是最顶级节点的就不添加 parentID
            const newInfo = {
                //默认的新建量表类型名称
                name: "新建部门_" + getUUID().substring(0, 6),
                pagePerms: [],
                perms: [],
                pageElementPerms: [],
                apiPerms: [],
                parentID: parentID
            };
            //向数据库添加
            req.post("api/crud/dept", newInfo).then(res => {
                ElMessage({
                    type: "success",
                    message: res.name + " : 添加成功!",
                });
                refreshListData();
            }).catch(e => {
                ElMessage({
                    type: "error",
                    message: "添加失败!",
                });
                console.error(e);
            });
        }

        const showEditDialog = ref(false);

        const info = ref();

        function edit(data) {
            info.value = deepCopy(data);
            showEditDialog.value = true;
        }

        function update() {
            if (isBlank(info.value.name)) {
                ElMessage({
                    type: "error",
                    message: "部门名称不能为空!",
                });
                return;
            }
            req.put("api/crud/dept", {updateModel: info.value}).then(data => {
                ElMessage({
                    type: "success",
                    message: data.name + " : 更新成功!",
                });
                refreshListData();
                showEditDialog.value = false;
            }).catch(e => {
                ElMessage({
                    type: "error",
                    message: "更新失败!"
                });
            });
        }

        function remove(data) {
            //根据有没有子节点弄一个友好的提示消息
            const title = data.children ? " 此操作将永久删除此部门及其所有子部门, 是否继续?" : " 此操作将永久删除此部门, 是否继续?";
            //打开提示框
            ElMessageBox.confirm(title, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                //用户点了确定 向后台发送一个待删除的数据
                req.delete("api/dept/delete-dept-with-children", {id: data.id}).then(d => {
                    //删除成功
                    ElMessage({
                        type: "success",
                        message: "删除成功!",
                    });
                    refreshListData();
                }).catch(e => {
                    //删除失败
                    ElMessage({
                        type: "error",
                        message: "删除失败!",
                    });
                });
            }).catch(() => {
                //用户点了取消
                ElMessage({
                    type: "info",
                    message: "已取消删除"
                });
            });
        }

        function allowDrag(node) {
            const data = node.data;
            return data.id !== -1 && data.id !== -2;
        }

        function allowDrop(draggingNode, dropNode, type) {
            const data = dropNode.data;
            return data.id !== -1 && data.id !== -2;
        }

        function nodeDrop(dragNode, dropNode, type) {
            const dragData = dragNode.data;
            const dropData = dropNode.data;
            if (type === "inner") {
                dragData.parentID = dropData.id;
                req.put("api/crud/dept", {updateModel: dragData}).then(data => {
                    refreshListData();
                    ElMessage({
                        type: "success",
                        message: data.name + " : 更新成功!"
                    });
                }).catch(e => {
                    ElMessage({
                        type: "error",
                        message: "更新失败!",
                    });
                });
            } else if (type === "before" || type === "after") {
                const parent = dropNode.parent;
                const parentData = parent.data;
                const children = parentData.children.filter(g => g.id !== -1 && g.id !== -2);
                let list = [];
                let i = 0;
                for (let child of children) {
                    //一些没有改变过的数据我们无需发送到后台
                    if (child.parentID !== parentData.id || child.orderNumber !== i) {
                        const d = deepCopy(child);
                        d.parentID = parentData.id;
                        d.orderNumber = i;
                        list.push(d);
                    }
                    i = i + 1;
                }
                req.put("api/dept/update-order", list).then(data => {
                    refreshListData();
                    ElMessage({
                        type: "success",
                        message: dragData.name + " : 更新成功!"
                    });
                }).catch(e => {
                    ElMessage({
                        type: "error",
                        message: "更新失败!",
                    });
                });
            }
        }

        function refreshListData() {
            req.post("api/crud/dept/list", {
                orderByBodyList: [{
                    fieldName: "orderNumber",
                    sortType: "ASC"
                }]
            }).then(data => {
                listData.value = data.items;
            });
        }

        onMounted(() => {
            refreshListData();
        });

        return {
            treeRef,
            listData,
            filterText,
            treeData,
            showEditDialog,
            info,
            append,
            update,
            filterNode,
            nodeClick,
            nodeContextMenu,
            allowDrag,
            allowDrop,
            nodeDrop,
            refreshListData
        };
    }
};
</script>

<style scoped>
.dept-tree {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5px;
    height: 100%;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
}

.tree-title {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.refresh-button {
    position: absolute;
    left: 2px;
}

.big-font {
    font-size: 20px;
}

.tree-title-info {
    position: absolute;
    right: 2px;
    bottom: 0;
    font-size: 13px;
    font-weight: 600;
    color: #5d5d5d;
}

.tree1 {
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: var(--scx-overlay-bg);
    box-shadow: var(--scx-box-shadow-center);
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}

.custom-tree-node > .e1 {
    display: flex;
    user-select: none;
    font-weight: 600;
}

.custom-tree-node > .e1 > .e2 {
    color: #13ce2f;
    margin-right: 5px
}

.custom-tree-node > .e1 > .e2:hover {
    color: #067e18;
}

.custom-tree-node .e7 {
    font-weight: 600;
}
</style>
