<template>
    <scx-crud>

        <template #header-left>
            <crud-add-button/>
        </template>

        <template #header-right>
            <el-input v-model="crudContext.where.type" clearable placeholder="类型" style="width: 150px"
                      @clear="crudContext.handleQuery()" @keydown.enter="crudContext.handleQuery()"/>
            <el-input v-model="crudContext.where.url" clearable placeholder="地址" style="width: 150px"
                      @clear="crudContext.handleQuery()" @keydown.enter="crudContext.handleQuery()"/>
            <crud-search-button/>
            <crud-reset-button/>
        </template>

        <template #main>
            <crud-table>
                <el-table-column label="图片" prop="img">
                    <template #default="{row}">
                        <easy-image v-model="row.img"/>
                    </template>
                </el-table-column>
                <el-table-column label="类型" prop="type" sortable/>
                <el-table-column label="地址" prop="url" sortable/>
                <el-table-column fixed="right" label="操作" width="300">
                    <template #default="{row}">
                        <crud-table-edit-button :data="row"/>
                        <crud-table-delete-button :data="row"/>
                    </template>
                </el-table-column>
            </crud-table>

        </template>
        <template #footer>
            <crud-batch-delete/>
            <crud-pagination/>
        </template>

        <crud-edit-dialog width="70%">
            <crud-edit-form label-width="150px">
                <el-form-item label="图片:" style="width: 100%">
                    <easy-upload v-model="crudContext.temp.img"/>
                </el-form-item>
                <easy-form-item label="类型" prop="type" style="width: 50%">
                    <el-input v-model="crudContext.temp.type"/>
                </easy-form-item>
                <easy-form-item label="地址" prop="url" required style="width: 50%" unique>
                    <el-input v-model="crudContext.temp.url"/>
                </easy-form-item>
            </crud-edit-form>
        </crud-edit-dialog>

    </scx-crud>
</template>

<script setup>
import {onActivated} from "vue";
import {CrudContext, installCrudContext} from "../../../../type/index.js";
import {useScxReq} from "scx-ui";

const req = useScxReq();

// 初始化 crudContext 对象
const crudContext = installCrudContext(new CrudContext({
    baseCrudApi: "api/crud/banner",
    defaultTemp: {
        img: "",
        type: "",
        url: ""
    },
    defaultWhere: {
        type: "",
        url: ""
    }
}));

onActivated(() => {
    crudContext.resetWhere().getList();
});

</script>
