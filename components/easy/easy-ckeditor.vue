<template>
    <ckeditor v-model="editorData" :config="editorConfig" :editor="ClassicEditor"/>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import {computed} from "vue";
import {createScxUploadAdapterPlugin} from "./ckeditor/plugins/scx-upload-adapter.js";
import {useScxFSS} from "scx-ui/vue-component";
import {ClassicEditor} from "@ckeditor/ckeditor5-editor-classic";
import {InlineEditor} from "@ckeditor/ckeditor5-editor-inline";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js";
import {defaultEditorConfig} from "./ckeditor/default-editor-config.js";

export default {
    name: "easy-ckeditor",
    components: {
        ckeditor: CKEditor.component
    },
    props: {
        modelValue: {
            type: String,
            default: "",
        },
        config: {}
    },
    setup(props, ctx) {

        const fss = useScxFSS();

        const scxUploadAdapterPlugin = createScxUploadAdapterPlugin(fss);

        defaultEditorConfig.extraPlugins = [scxUploadAdapterPlugin];

        const editorConfig = Object.assign(defaultEditorConfig, props.config);

        const editorData = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                ctx.emit("update:modelValue", value);
            }
        });

        return {
            ClassicEditor,
            InlineEditor,
            editorData,
            editorConfig
        };
    }
};
</script>

<style>
:root {
    --ck-z-modal: 9999999;
}
</style>
