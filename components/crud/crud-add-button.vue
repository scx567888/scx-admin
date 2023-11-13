<template>

    <el-dropdown v-if="hasImportMenu"
                 :hide-on-click="false"
                 split-button
                 type="success"
                 @click="crudContext.handleCreate()"
                 @command="handleCommand">

        <scx-icon icon="outlined-plus-circle"/>
        <span>添加</span>

        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-if="hasDownloadExcelImportTemplate"
                                  :disabled="crudContext.downloadExcelImportTemplateDisabled"
                                  command="download-excel-import-template">
                    下载 Excel 导入模板
                </el-dropdown-item>
                <el-dropdown-item v-if="hasUploadExcelImportDataNew"
                                  :disabled="crudContext.uploadExcelImportDataDisabled"
                                  command="upload-excel-import-data-new">
                    上传 Excel 导入数据 (新增)
                </el-dropdown-item>
                <el-dropdown-item v-if="hasUploadExcelImportDataOverride"
                                  :disabled="crudContext.uploadExcelImportDataDisabled"
                                  command="upload-excel-import-data-override">
                    上传 Excel 导入数据 (覆盖)
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>

    </el-dropdown>

    <el-button v-else
               type="success"
               @click="crudContext.handleCreate()">
        <scx-icon icon="outlined-plus-circle"/>
        <span>添加</span>
    </el-button>

</template>

<script>
import {useCrudContext} from "../../type/index.js";
import {computed} from "vue";
import {isFunction} from "scx-ui";

export default {
    name: "crud-add-button",
    setup(props, context) {
        const crudContext = useCrudContext();

        const hasDownloadExcelImportTemplate = computed(() => isFunction(crudContext.downloadExcelImportTemplate));
        const hasUploadExcelImportDataNew = computed(() => isFunction(crudContext.uploadExcelImportDataNew));
        const hasUploadExcelImportDataOverride = computed(() => isFunction(crudContext.uploadExcelImportDataOverride));

        const hasImportMenu = computed(() =>
                hasDownloadExcelImportTemplate.value ||
                hasUploadExcelImportDataNew.value ||
                hasUploadExcelImportDataOverride.value
        );

        crudContext.downloadExcelImportTemplateDisabled = false;
        crudContext.uploadExcelImportDataDisabled = false;

        async function handleCommand(c) {

            if (c === "download-excel-import-template") {
                if (isFunction(crudContext.downloadExcelImportTemplate)) {
                    crudContext.downloadExcelImportTemplateDisabled = true;
                    try {
                        await crudContext.downloadExcelImportTemplate();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.downloadExcelImportTemplateDisabled = false;
                }
            } else if (c === "upload-excel-import-data-new") {
                if (isFunction(crudContext.uploadExcelImportDataNew)) {
                    crudContext.uploadExcelImportDataDisabled = false;
                    try {
                        await crudContext.uploadExcelImportDataNew();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.uploadExcelImportDataDisabled = false;
                }
            } else if (c === "upload-excel-import-data-override") {
                if (isFunction(crudContext.uploadExcelImportDataOverride)) {
                    crudContext.uploadExcelImportDataDisabled = false;
                    try {
                        await crudContext.uploadExcelImportDataOverride();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.uploadExcelImportDataDisabled = false;
                }
            } else {
                console.warn("未知 Command !!!" + c);
            }
        }

        return {
            crudContext,
            handleCommand,
            hasImportMenu,
            hasDownloadExcelImportTemplate,
            hasUploadExcelImportDataNew,
            hasUploadExcelImportDataOverride
        };
    }
};
</script>

<style scoped>

</style>
