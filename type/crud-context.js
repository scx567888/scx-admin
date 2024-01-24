import {deepCopy, JsonVOError, notBlank, ScxReq} from "scx-ui";
import {exportExcel, focusFirstErrorElement} from "../util/index.js";
import {useScxReq, useScxUserInfo} from "scx-ui/vue-component";
import {ScxIcon} from "scx-ui/vue-component/index.js";
import {ElMessage, ElNotification} from "element-plus";
import {h, nextTick} from "vue";
import dayjs from "dayjs/esm/index.js";

/**
 *  crud 上下文 , 方便操作进行简单的页面 crud
 */
class CrudContext {

    /**
     *  req 对象 用于调用 api
     *  @type {ScxReq}
     */
    req = null;

    /**
     * 用于判断后台是否允许真实删除
     * @type {ScxUserInfo}
     */
    userInfo = null;

    /**
     * 以下为各个 api 的路径
     */
    listApi;
    createApi;
    deleteApi;
    revokeDeleteApi;
    checkUniqueApi;
    updateApi;
    autoCompleteApi;
    batchDeleteApi;
    infoApi;

    /**
     *  表格的 ref 用来调用 el-table 表格的相关操作 如清除多选数据
     */
    scxTableRef = null;

    /**
     * 添加或修改 Form 的 ref , 用来调用 el-form 相关的操作 如校验表单中数据是否合法
     */
    scxCreateAndUpdateFormRef = null;

    /**
     * 默认 where
     */
    defaultWhere = {};

    /**
     * 默认 临时对象
     */
    defaultTemp = {};

    /**
     *  数据字段和名称的映射 一般用来做 Excel 的导入和导出也可以有其他用途 注意结构为 'field' --> 'label' 不要弄反
     * @type {*}
     */
    fieldLabelMap = {};

    /**
     * [orderBy pagination selectFilterBody where] 会在 getQueryParam 方法中组合为 listApi 需要的最终查询参数对象
     *
     * 排序字段 model (注意: 虽然 list api 支持多排序字段 但目前前台还是使用单排序字段 即每次查询只支持一列排序)
     * @type {{fieldName: string, sortType: string}}
     */
    orderBy = {fieldName: "id", sortType: "DESC"};

    /**
     * 分页字段 model 和 orderBy 功能类似 (注意 : listApi 的分页起始 为 0 ,前台 ui 这里为 1 ,所以在转换为 listApi 查询对象的时候需要注意 -1 )
     * @type {{pageSize: number, currentPage: number}}
     */
    pagination = {currentPage: 1, pageSize: 10};

    /**
     * 查询列过滤条件 对象 一般我们将其设置为 null 即查询所有字段
     */
    selectFilterBody = null;

    /**
     * 查询参数绑定 model 这里默认都是以 like 的方式发送到后台 具体如有变化请自行继承 CrudContext 并重写 getQueryParam 方法
     * @type {{}}
     */
    where = {};

    /**
     * 默认 不需要更新的字段名称
     * @type Array
     */
    needUpdateFieldNames = null;

    /**
     * 表单绑定的临时操作对象 很重要!!!
     */
    temp = {};

    /**
     * 当前页面类型 是处于添加还是处于修改  取值 [create, update]
     * @type {string}
     */
    pageFlag = "";

    /**
     * 表格列表数据
     * @type {[]}
     */
    tableBody = [];

    /**
     * 表格加载状态
     * @type {boolean}
     */
    tableLoading = true;

    /**
     * 总条数
     * @type {number}
     */
    total = 0; // 总条数

    /**
     * 编辑弹窗
     * @type {{visible: boolean, confirmButtonLoading: boolean}}
     */
    editDialog = {

        /**
         * 添加或修改页面的 确认按钮是否处于 loading 状态 防止重复点击 造成多条数据添加
         */
        confirmButtonLoading: false,

        /**
         * 添加和删除的的 dialog 显示状态
         */
        visible: false,

    };

    /**
     * 保存多选项的对象
     * @type {[]}
     */
    multipleSelection = [];
    /**
     *
     * @type {Function}
     */
    downloadExcelImportTemplate = null;
    /**
     *
     * @type {Function}
     */
    uploadExcelImportDataNew = null;
    /**
     *
     * @type {Function}
     */
    uploadExcelImportDataOverride = null;
    /**
     *
     * @type {Function}
     */
    uploadExcelImportData = null;
    /**
     *
     * @type {Function}
     */
    exportWordSelected = null;
    /**
     *
     * @type {Function}
     */
    exportWordCurrentPage = null;
    /**
     *
     * @type {Function}
     */
    exportWordFilter = null;
    /**
     *
     * @type {Function}
     */
    exportWordAll = null;

    /**
     *
     * @param baseCrudApi a
     * @param scxTableRef a
     * @param defaultTemp a
     * @param defaultWhere a
     */
    constructor({
                    baseCrudApi,
                    defaultTemp = {},
                    defaultWhere = {},
                } = {}) {
        this.req = useScxReq();
        this.userInfo = useScxUserInfo();
        this.defaultTemp = defaultTemp;
        this.defaultWhere = defaultWhere;
        this.listApi = baseCrudApi + "/list";
        this.createApi = baseCrudApi;
        this.deleteApi = baseCrudApi + "/";
        this.revokeDeleteApi = baseCrudApi + "/revoke-delete/";
        this.checkUniqueApi = baseCrudApi + "/check-unique/";
        this.updateApi = baseCrudApi;
        this.autoCompleteApi = baseCrudApi + "/get-auto-complete/";
        this.batchDeleteApi = baseCrudApi + "/batch-delete";
        this.infoApi = baseCrudApi + "/";

        //重置全部对象
        this.resetPagination();
        this.resetOrderBy();
        this.resetSelectFilterBody();
        this.resetWhere();
        this.resetTemp();
    }

    /**
     * 删除单条数据实现
     * @param row
     */
    deleteOne(row) {
        if (!row.id) {
            ElNotification({title: "待删除数据 id 不能为空 !!!", type: "warning", duration: 5000});
            return;
        }
        let msg = `已成功删除 : ${this.getMainInfo(row)}`;// 删除消息
        let en = null; // 弹出框对象
        //这里针对后台是否采用墓碑机制给予用户删除的两种不同交互策略
        this.req.delete(this.deleteApi + row.id).then(data => {
            en = ElNotification({
                title: "删除成功 !!!",
                message: msg,
                type: "success",
                dangerouslyUseHTMLString: true,
                duration: 5000,
            });
            this.tableBody = this.tableBody.filter(b => b.id !== row.id);
            this.total = this.total - 1;
        }).catch(e => ElNotification({title: "删除失败 !!!", message: e, type: "error", duration: 5000}));
    }

    batchDelete() {
        const deleteIDs = this.multipleSelection.map(d => d.id);
        //如果 数据为空 显示提示框
        if (deleteIDs.length === 0) {
            ElNotification({
                title: "未选中任何数据!!!", type: "warning", duration: 5000,
            });
            return;
        }
        //数据校验全部没问题 可以进行 批量删除
        this.req.delete(this.batchDeleteApi, {"deleteIDs": deleteIDs})
                .then(({deletedCount}) => {
                    ElNotification({
                        title: "已删除全部选中数据 , 共" + deletedCount + "条 !", type: "success", duration: 5000,
                    });
                    //清空多选数据
                    this.scxTableRef.clearSelection();
                    if (deletedCount >= this.tableBody.length) {
                        this.pagination.currentPage = 1;
                    }
                    this.getList();
                })
                .catch(e => ElNotification({
                    title: "批量删除失败 !!!", type: "error", duration: 5000,
                }));
    }

    getList() {
        //开启表格加载动画
        this.tableLoading = true;
        this.req.post(this.listApi, this.getQueryParam())
                .then(data => {
                    this.tableBody = data.items;
                    this.total = data.total;
                })
                .catch(e => {
                    if (e instanceof JsonVOError) {
                        ElMessage.error(e.message);
                    } else {
                        ElMessage.error("请求发生错误 !!!");
                        console.error(e);
                    }
                })
                .finally(() => {
                    this.tableLoading = false;
                });
    };

    /**
     *
     * @returns {{selectFilterBody: {filterMode: string, fieldNames: *[]}, whereBodyList: *[], pagination: {pageSize: number, currentPage: number}, orderByBodyList: [{fieldName: string, sortType: string}]}}
     */
    getQueryParam() {
        //默认的
        const queryParam = {
            //分页
            pagination: {currentPage: 0, pageSize: 10}, //排序
            orderByBodyList: [{fieldName: "id", sortType: "DESC"}], //查询项列表
            whereBodyList: [],
            selectFilterBody: {
                filterMode: "INCLUDED", fieldNames: [],
            },
        };
        queryParam.orderByBodyList[0].fieldName = this.orderBy.fieldName;
        queryParam.orderByBodyList[0].sortType = this.orderBy.sortType;
        queryParam.pagination.currentPage = this.pagination.currentPage - 1;//后台的分页索引是从 0 开始 前台的则是从 1 开始 , 所以这里做一个计算
        queryParam.pagination.pageSize = this.pagination.pageSize;
        queryParam.selectFilterBody = this.selectFilterBody;

        //获取所有 like的查询项
        for (let key in this.where) {
            if (this.where.hasOwnProperty(key)) {
                const value1 = this.where[key];
                if (notBlank(value1)) {
                    queryParam.whereBodyList.push({
                        fieldName: key, whereType: "LIKE", value1: value1, value2: null,
                    });
                }
            }
        }
        return queryParam;
    }

    validateScxCreateAndUpdateFormRef() {
        return new Promise((resolve, reject) => {
            this.editDialog.confirmButtonLoading = true;
            this.scxCreateAndUpdateFormRef.validate((valid) => {
                //如果所有数据都没有问题
                if (valid) {
                    resolve();
                } else {
                    //校验未通过 先取消确认按钮的loading 状态
                    this.editDialog.confirmButtonLoading = false;
                    focusFirstErrorElement();
                    reject();
                }
            });
        });
    };

    clearValidateScxCreateAndUpdateFormRef() {
        nextTick(() => this.scxCreateAndUpdateFormRef.clearValidate()).then();
    }

    createOrUpdateModel() {
        if (this.pageFlag === "create") {
            return this.createModel();
        } else if (this.pageFlag === "edit") {
            return this.updateModel();
        }
    }

    createModel(modelData = this.temp) {
        return new Promise((resolve, reject) => this.validateScxCreateAndUpdateFormRef().then(() => {
            //此处进行拷贝 防止 table 中的数据和 temp 产生影响
            let modelDataCopy = deepCopy(modelData);
            modelDataCopy.id = null;
            this.req.post(this.createApi, modelDataCopy).then(data => {
                this.tableBody.unshift(data);
                this.total = this.total + 1;
                this.editDialog.visible = false;
                ElNotification({
                    title: "添加成功", message: "成功添加 : " + this.getMainInfo(data), type: "success", duration: 5000,
                });
                resolve(data);
            }).catch(e => reject(this.reqErrorHandler(e))).finally(() => this.editDialog.confirmButtonLoading = false);
        }).catch(e => reject(e)));
    }

    updateModel(modelData = this.temp) {
        return new Promise((resolve, reject) => this.validateScxCreateAndUpdateFormRef().then(() => {
            //此处进行拷贝 防止table 中的数据和 temp 产生影响
            let modelDataCopy = deepCopy(modelData);
            this.req.put(this.updateApi, {
                updateModel: modelDataCopy,
                needUpdateFieldNames: this.needUpdateFieldNames,
            }).then(data => {
                //修改页面上 id 和 当前修改id 相同的 数据 实现页面的数据刷新
                this.updateTableBody(data);
                this.editDialog.visible = false;
                ElNotification({
                    title: "更新成功", message: "成功更新 : " + this.getMainInfo(data), type: "success", duration: 5000,
                });
                resolve(data);
            }).catch(e => reject(this.reqErrorHandler(e))).finally(() => this.editDialog.confirmButtonLoading = false);
        }).catch(e => reject(e)));
    }

    updateTableBody(data) {
        //修改页面上 id 和 当前修改id 相同的 数据 实现页面的数据刷新
        for (const v of this.tableBody) {
            if (v.id === data.id) {
                //获取要修改的 index 值
                const index = this.tableBody.indexOf(v);
                // 用 temp 进行替换
                this.tableBody.splice(index, 1, data);
                //因为 id 只可能出现一次 所以一旦找到相同的 id 直接 break 即可
                break;
            }
        }
    }

    async handleCommand(command) {
        if (command.startsWith("export-excel_")) {
            //字段名称映射
            const headerTranslationMap = {};
            await this.exportExcel({command, headerTranslationMap});
        }
    }

    handleCreate() {
        //设置添加确认按钮loading 为false 表示可以点击
        this.editDialog.confirmButtonLoading = false;
        //设置当前页面的 flag 是 create 还是 update
        this.pageFlag = "create";
        //清洗临时数据
        this.resetTemp();
        //准备添加页面的下拉选 自动完成框等数据并添加校验规则
        this.editDialog.visible = true;
        //清空当前表单的校验
        this.clearValidateScxCreateAndUpdateFormRef();
    }

    handleUpdate(row) {
        this.req.get(this.infoApi + row.id, null).then(data => {
            this.editDialog.confirmButtonLoading = false;
            this.pageFlag = "edit";
            this.temp = data;
            //显示页面
            this.editDialog.visible = true;
            //清空当前表单的校验
            this.clearValidateScxCreateAndUpdateFormRef();
        }).catch(e => {
            console.error(e);
        });
    }

    handleQuery() {
        this.pagination.currentPage = 1;
        this.getList();
    }

    checkUnique(rule, value, callback, name) {
        if (value) {
            this.req.post(this.checkUniqueApi + rule.field, {
                value: value, id: this.pageFlag !== "create" ? this.temp.id : null,
            }).then(res => {
                if (res.isUnique) {
                    callback();
                } else {
                    callback(new Error(name + "已被占用 !!!"));
                }
            }).catch(e => {
                ElMessage.error("校验唯一值时发生错误, 请联系管理员 !!!");
                console.error(e);
            });
        } else {
            callback();
        }
    }

    /**
     * 当我们进行 添加 修改 时会给用户提示 具体哪条数据被操作了
     * 此方法便是从 具体的对象中提取某一字段作为基本信息返回
     * 如 数据为 {name:'小明'} 返回值则为 '小明' 默认取对象的第一个不为 id 的属性
     */
    getMainInfo(row) {
        const keys = Object.keys(row);
        for (let key of keys) {
            //id createDate updateDate 对用户来说并未太大意义 这里默认排除
            if (key !== "id" && key !== "createdDate" && key !== "updatedDate") {
                return row[key];
            }
        }
    }

    reqErrorHandler(e) {
        if (e instanceof JsonVOError) {
            ElMessage.error(e.message);
        } else {
            ElMessage.error("请求发生错误 !!!");
            console.error(e);
        }
        return e;
    }

    getDialogTitle() {
        return this.pageFlag === "create" ? "添加" : "编辑";
    }

    resetPagination() {
        this.pagination = deepCopy(this.getDefaultPagination());
        return this;
    }

    resetOrderBy() {
        this.orderBy = deepCopy(this.getDefaultOrderBy());
        return this;
    }

    resetSelectFilterBody() {
        this.selectFilterBody = deepCopy(this.getDefaultSelectFilterBody());
        return this;
    }

    resetWhere() {
        this.where = deepCopy(this.getDefaultWhere());
        return this;
    }

    resetTemp() {
        this.temp = deepCopy(this.getDefaultTemp());
        return this;
    }

    getDefaultPagination() {
        return {currentPage: 1, pageSize: 10};
    }

    getDefaultOrderBy() {
        return {fieldName: "id", sortType: "DESC"};
    }

    getDefaultSelectFilterBody() {
        return null;
    }

    getDefaultWhere() {
        return this.defaultWhere;
    }

    //默认的 临时状态对象
    getDefaultTemp() {
        return this.defaultTemp;
    }

    /**
     *
     * @type {Function}
     */
    async exportExcelSelected() {
        //如果 数据为空 显示提示框
        if (this.multipleSelection.length === 0) {
            ElNotification({
                title: "未选中任何数据!!!", type: "warning", duration: 5000,
            });
        } else {
            await this.exportExcel("导出为 Excel (选中的)", deepCopy(this.multipleSelection));
        }
    };

    /**
     *
     * @type {Function}
     */
    async exportExcelCurrentPage() {
        await this.exportExcel("导出为 Excel (当前页面)", deepCopy(this.tableBody));
    };

    /**
     *
     * @type {Function}
     */
    async exportExcelFilter() {
        const data = await this.req.post(this.listApi, {
            ...this.getQueryParam(), pagination: null,
        });
        await this.exportExcel("导出为 Excel (当前过滤条件)", data.items);
    };

    /**
     *
     * @type {Function}
     */
    async exportExcelAll() {
        const data = await this.req.post(this.listApi);
        await this.exportExcel("导出为 Excel (全部数据)", data.items);
    };

    /**
     * 提供在导出 Excel 前对数据进行特殊处理的功能
     * @param data
     * @returns {Promise<*>}
     */
    async beforeExportExcel(data) {
        return data;
    };

    /**
     *
     * @param title 标题
     * @param listData 数据
     * @param excelHeaderMap 表头映射 对象形式
     * @returns {Promise<void>}
     */
    async exportExcel(title, listData, excelHeaderMap = this.fieldLabelMap) {

        const _notify = ElNotification({
            title: "操作正在进行中...",
            message: h("div", {}, [h(ScxIcon, {
                icon: "outlined-sync",
                style: "animation: rotating 2s linear infinite;fill: #606266;",
            }), h("span", {}, "正在" + title + " 中 , 请耐心等待 !!!")]),
            type: "success",
            dangerouslyUseHTMLString: true,
            duration: 0,
        });

        const pageName = document.title.split("-")[0].trim();
        const nowTimeStr = dayjs(new Date()).format("YYYY年MM月DD日 HH时mm分ss秒");
        const excelFileName = `${pageName} - ${title} - ${nowTimeStr}`;


        const finalListData = await this.beforeExportExcel(deepCopy(listData));

        exportExcel(excelFileName, finalListData, excelHeaderMap);

        _notify.close();

        ElMessage({
            showClose: true, message: title + " 已完成 !!! 请保存 !!!", type: "success",
        });

    }

}

export {CrudContext};
