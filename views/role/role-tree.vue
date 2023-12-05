<template>
    <div class="role-tree">
        
        <div class="tree-title">

            <el-button class="refresh-button" size="small" @click="refreshListData()">
                <scx-icon icon="outlined-sync"/>
            </el-button>
            
            <div class="big-font">角色管理</div>
            
            <div class="tree-title-info">共( {{ listData.length }} )个</div>
            
        </div>
        
<!--        <el-input v-model="filterText" clearable placeholder="输入关键字进行过滤"></el-input>-->
<!--        <el-tree ref="roleTreeRef" :data="realTreeData" :expand-on-click-node="false"-->
<!--                 :filter-node-method="filterNode" class="dept-tree"-->
<!--                 default-expand-all node-key="id">-->
<!--            <template #default="{ data }">-->
<!--                <div class="custom-tree-node" @click="treeNodeClick(data)">-->
<!--                    <div>{{ data.name }}</div>-->
<!--                    <div class="e1">-->
<!--                        <div v-if="data.id===-1" class="e2" @click.stop="append(data)">添加</div>-->
<!--                        &lt;!&ndash; 顶级菜单不允许删除 &ndash;&gt;-->
<!--                        <div v-if="data.id!==-1" class="e3" style="" @click.stop="remove(data)">-->
<!--                            删除-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </template>-->
<!--        </el-tree>-->

    </div>
</template>

<script>
import {listToTree, useScxReq} from "scx-ui";
import {ref, watch} from "vue";

export default {
    name:"role-tree",
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
    setup(props,ctx){

        const req = useScxReq();

        const listData = ref([]);

        //根据列表生成的 树形结构的量表类型数据 (用来给 element ui 使用)
        const treeData = ref([]);

        watch(listData, () => {
            if (props.showUserCount) {
                treeData.value = [{
                    id: -1,
                    name: "角色管理",
                    type: "All",
                    children: [
                        {
                            id: -2,
                            name: "未分配角色",
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
                    name: "角色管理",
                    type: "All",
                    children: [
                        ...listToTree(listData.value)
                    ]
                }];
            }
        }, {immediate: true});

        function infoHandler(data) {
            for (let valueElement of data) {
                req.post("api/user/count", {
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
        
        function refreshListData() {
            req.post("api/crud/role/list", {
                orderByBodyList: [{
                    fieldName: "orderNumber",
                    sortType: "ASC"
                }]
            }).then(data => {
                listData.value = data.items;
            });
        }
        
        return{
            listData,
            treeData,
            refreshListData
        }
    }
}

</script>

<style scoped>
.role-tree {
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

</style>
