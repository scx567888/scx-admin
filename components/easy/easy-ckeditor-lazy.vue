<template>
    <div ref="editorRef" class="easy-ckeditor-lazy" @click="initCkEditor()">

    </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {createScxUploadAdapterPlugin} from "./ckeditor/plugins/ScxUploadAdapter.js";
import {useScxFSS} from "scx-ui/vue-component";
import {InlineEditor} from "@ckeditor/ckeditor5-editor-inline";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js";
import {debounce} from "lodash-es";
import {defaultEditorConfig} from "./ckeditor/default-editor-config.js";

export default {
    name: "easy-ckeditor-lazy",
    props: {
        modelValue: {
            type: String,
            default: "",
        },
        config: {}
    },
    setup(props, ctx) {

        const editorRef = ref();

        const fss = useScxFSS();

        const scxUploadAdapterPlugin = createScxUploadAdapterPlugin(fss);

        defaultEditorConfig.extraPlugins = [scxUploadAdapterPlugin];

        const editorConfig = Object.assign(defaultEditorConfig, props.config);

        let instance = null;

        let isInit = false;

        let lastEditorData = null;

        function initCkEditor() {
            if (isInit) {
                return;
            } else {
                isInit = true;
            }
            InlineEditor
                    .create(editorRef.value, editorConfig)
                    .then(editor => {

                        instance = editor;

                        setUpEditorEvents();

                        editor.data.set(props.modelValue);

                    })
                    .catch(err => {
                        console.error(err);
                    });
        }

        function setUpEditorEvents() {

            const emitDebouncedInputEvent = debounce(evt => {

                const data = lastEditorData = instance.data.get();

                ctx.emit("update:modelValue", data, evt, instance);
                ctx.emit("input", data, evt, instance);
            }, 300, {leading: true});

            instance.model.document.on("change:data", emitDebouncedInputEvent);

        }

        onMounted(() => {
            watch(() => props.modelValue, (value) => {

                if (isInit) {
                    if (instance && value !== lastEditorData) {
                        instance.data.set(value);
                    }

                } else {
                    editorRef.value.innerHTML = value;
                }

            }, {immediate: true});
        });

        return {
            editorRef,
            initCkEditor,
            InlineEditor,
            editorConfig
        };
    }
};
</script>

<style>
:root {
    --ck-z-modal: 9999999;
}

.easy-ckeditor-lazy {
    border: 1px solid var(--scx-text-placeholder-color);
    border-radius: 2px;
    width: 100%;
    min-width: 200px;
    min-height: 100px;
    padding: 0 0.6em;
    background-color: white;
}

.easy-ckeditor-lazy.ck-content:not(.ck-focused) {
    border-color: var(--scx-text-placeholder-color);
}
</style>
