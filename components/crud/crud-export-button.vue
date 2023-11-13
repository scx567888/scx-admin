<template>
    <el-dropdown v-if="hasExportButton" :hide-on-click="false" @command="handleCommand">

        <!-- 按钮仅作装饰使用 点击不执行任何事件 -->
        <el-button class="crud-export-button" color="#8e44ad">
            <scx-icon icon="outlined-cloud-download"/>
            <span>导出</span>
            <div class="crud-export-button-icon">
                <scx-icon icon="outlined-down"/>
            </div>
        </el-button>

        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-if="hasExportExcelSelected"
                                  :disabled="crudContext.exportExcelDisabled"
                                  command="export-excel-selected">
                    导出为 Excel (选中的)
                </el-dropdown-item>
                <el-dropdown-item v-if="hasExportExcelCurrentPage"
                                  :disabled="crudContext.exportExcelDisabled"
                                  command="export-excel-current-page">
                    导出为 Excel (当前页面)
                </el-dropdown-item>
                <el-dropdown-item v-if="hasExportExcelFilter"
                                  :disabled="crudContext.exportExcelDisabled"
                                  command="export-excel-filter">
                    导出为 Excel (当前过滤条件)
                </el-dropdown-item>
                <el-dropdown-item v-if="hasExportExcelAll"
                                  :disabled="crudContext.exportExcelDisabled"
                                  command="export-excel-all">
                    导出为 Excel (全部数据)
                </el-dropdown-item>
                <el-dropdown-item v-if="hasExportWordSelected"
                                  :disabled="crudContext.exportWordDisabled"
                                  command="export-word-selected">
                    导出为 Word (选中的)
                </el-dropdown-item>
                <el-dropdown-item v-if="hasExportWordCurrentPage"
                                  :disabled="crudContext.exportWordDisabled"
                                  command="export-word-current-page">
                    导出为 Word (当前页面)
                </el-dropdown-item>
                <el-dropdown-item v-if="hasExportWordFilter"
                                  :disabled="crudContext.exportWordDisabled"
                                  command="export-word-filter">
                    导出为 Word (当前过滤条件)
                </el-dropdown-item>
                <el-dropdown-item v-if="hasExportWordAll"
                                  :disabled="crudContext.exportWordDisabled"
                                  command="export-word-all">
                    导出为 Word (全部数据)
                </el-dropdown-item>
                <slot/>
            </el-dropdown-menu>
        </template>

    </el-dropdown>
</template>

<script>
import {useCrudContext} from "../../type/index.js";
import {ArrowDown} from "@element-plus/icons-vue";
import {computed} from "vue";
import {isFunction} from "scx-ui";

export default {
    name: "crud-export-button",
    components: {
        ArrowDown
    },
    emits: [
        "command"
    ],
    setup(props, context) {
        const crudContext = useCrudContext();

        const hasExportExcelSelected = computed(() => isFunction(crudContext.exportExcelSelected));
        const hasExportExcelCurrentPage = computed(() => isFunction(crudContext.exportExcelCurrentPage));
        const hasExportExcelFilter = computed(() => isFunction(crudContext.exportExcelFilter));
        const hasExportExcelAll = computed(() => isFunction(crudContext.exportExcelAll));
        const hasExportWordSelected = computed(() => isFunction(crudContext.exportWordSelected));
        const hasExportWordCurrentPage = computed(() => isFunction(crudContext.exportWordCurrentPage));
        const hasExportWordFilter = computed(() => isFunction(crudContext.exportWordFilter));
        const hasExportWordAll = computed(() => isFunction(crudContext.exportWordAll));
        const hasExportButton = computed(() =>
                hasExportExcelSelected.value ||
                hasExportExcelCurrentPage.value ||
                hasExportExcelFilter.value ||
                hasExportExcelAll.value ||
                hasExportWordSelected.value ||
                hasExportWordCurrentPage.value ||
                hasExportWordFilter.value ||
                hasExportWordAll.value
        );


        crudContext.exportExcelDisabled = false;
        crudContext.exportWordDisabled = false;

        async function handleCommand(c) {

            if (c === "export-excel-selected") {
                if (isFunction(crudContext.exportExcelSelected)) {
                    crudContext.exportExcelDisabled = true;
                    try {
                        await crudContext.exportExcelSelected();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.exportExcelDisabled = false;
                }
            } else if (c === "export-excel-current-page") {
                if (isFunction(crudContext.exportExcelCurrentPage)) {
                    crudContext.exportExcelDisabled = false;
                    try {
                        await crudContext.exportExcelCurrentPage();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.exportExcelDisabled = false;
                }
            } else if (c === "export-excel-filter") {
                if (isFunction(crudContext.exportExcelFilter)) {
                    crudContext.exportExcelDisabled = false;
                    try {
                        await crudContext.exportExcelFilter();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.exportExcelDisabled = false;
                }
            } else if (c === "export-excel-all") {
                if (isFunction(crudContext.exportExcelAll)) {
                    crudContext.exportExcelDisabled = false;
                    try {
                        await crudContext.exportExcelAll();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.exportExcelDisabled = false;
                }
            } else if (c === "export-word-selected") {
                if (isFunction(crudContext.exportWordSelected)) {
                    crudContext.exportWordDisabled = false;
                    try {
                        await crudContext.exportWordSelected();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.exportWordDisabled = false;
                }
            } else if (c === "export-word-current-page") {
                if (isFunction(crudContext.exportWordCurrentPage)) {
                    crudContext.exportWordDisabled = false;
                    try {
                        await crudContext.exportWordCurrentPage();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.exportWordDisabled = false;
                }
            } else if (c === "export-word-filter") {
                if (isFunction(crudContext.exportWordFilter)) {
                    crudContext.exportWordDisabled = false;
                    try {
                        await crudContext.exportWordFilter();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.exportWordDisabled = false;
                }
            } else if (c === "export-word-all") {
                if (isFunction(crudContext.exportWordAll)) {
                    crudContext.exportWordDisabled = false;
                    try {
                        await crudContext.exportWordAll();
                    } catch (e) {
                        console.error(e);
                    }
                    crudContext.exportWordDisabled = false;
                }
            } else {
                context.emit("command", c);
            }
        }

        return {
            crudContext,
            handleCommand,
            hasExportExcelSelected,
            hasExportExcelAll,
            hasExportExcelCurrentPage,
            hasExportExcelFilter,
            hasExportWordCurrentPage,
            hasExportWordAll,
            hasExportWordFilter,
            hasExportWordSelected,
            hasExportButton
        };
    }
};
</script>

<style scoped>
.crud-export-button {
    padding-right: 0;
}

.crud-export-button-icon {
    margin-right: 9px;
    margin-left: 9px
}
</style>
