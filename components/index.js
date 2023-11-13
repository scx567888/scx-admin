//以下为组件
import CrudAddButton from "./crud/crud-add-button.vue";
import CrudBatchDelete from "./crud/crud-batch-delete.vue";
import CrudEditDialog from "./crud/crud-edit-dialog.vue";
import CrudEditForm from "./crud/crud-edit-form.vue";
import CrudExportButton from "./crud/crud-export-button.vue";
import CrudFormFooter from "./crud/crud-form-footer.vue";
import CrudPagination from "./crud/crud-pagination.vue";
import CrudResetButton from "./crud/crud-reset-button.vue";
import CrudSearchButton from "./crud/crud-search-button.vue";
import CrudTable from "./crud/crud-table.vue";
import CrudTableDeleteButton from "./crud/crud-table-delete-button.vue";
import CrudTableEditButton from "./crud/crud-table-edit-button.vue";
import EasyFormItem from "./easy/easy-form-item.vue";
import EasyImage from "./easy/easy-image.vue";
import EasySelect from "./easy/easy-select.vue";
import EasyCKEditor from "./easy/easy-ckeditor.vue";
import EasyCKEditorLazy from "./easy/easy-ckeditor-lazy.vue";
import EasyTinymce from "./easy/easy-tinymce.vue";
import EasyUpload from "./easy/easy-upload.vue";
import EasyUploadList from "./easy/easy-upload-list.vue";
import QRCode from "./qr-code/index.vue";
import UserProfile from "./user-profile/index.vue";


const components = [
    CrudAddButton,
    CrudBatchDelete,
    CrudEditDialog,
    CrudEditForm,
    CrudExportButton,
    CrudFormFooter,
    CrudPagination,
    CrudResetButton,
    CrudSearchButton,
    CrudTable,
    CrudTableDeleteButton,
    CrudTableEditButton,
    EasyCKEditor,
    EasyCKEditorLazy,
    EasyFormItem,
    EasyImage,
    EasySelect,
    EasyTinymce,
    EasyUpload,
    EasyUploadList,
    QRCode,
    UserProfile,
];

const directives = [];

const Components = {

    install(app) {
        //安装组件
        components.forEach(c => app.component(c.name, c));
        //安装指令
        directives.forEach(d => app.directive(d.name, d));
    },
};

export {
    Components,
};
