<template>
    <el-image v-if="listModelValue.length>0" :preview-src-list="previewSrcList"
              :preview-teleported="true"
              :src="src"
              class="easy-image-preview"
              style=""/>
    <div v-else class="easy-image-no-preview">
        无图片
    </div>
</template>

<script>
import {computed} from "vue";
import {useScxFSS} from "scx-ui/vue-component";
import {useAliOSS} from "../../type/index.js";

export default {
    name: "easy-image",
    props: {
        modelValue: {
            type: [String, Array],
            default: null
        },
        uploadHandlerType: {
            type: String,
            default: "scx-fss" // 取值 scx-fss ali-oss
        },
    },
    setup(props) {
        const scxFSS = useScxFSS();

        const aliOSS = useAliOSS();

        const listModelValue = computed(() => {
            if (props.modelValue) {
                return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
            } else {
                return [];
            }
        });

        const previewSrcList = computed(() => {
            switch (props.uploadHandlerType) {
                case "scx-fss":
                    return listModelValue.value.map(d => scxFSS.joinImageURL(d));
                case "ali-oss":
                    return listModelValue.value.map(d => aliOSS.joinURL(d));
                default:
                    throw new Error("未知的 uploadHandlerType : " + props.uploadHandlerType);
            }
        });

        const src = computed(() => {
            const first = previewSrcList.value[0];
            switch (props.uploadHandlerType) {
                case "scx-fss":
                    return first + "?w=100&h=100";
                case "ali-oss":
                    return first + "?x-oss-process=image/resize,w_100";
                default:
                    throw new Error("未知的 uploadHandlerType : " + props.uploadHandlerType);
            }
        });

        return {
            previewSrcList,
            src,
            listModelValue
        };

    }
};
</script>

<style scoped>
.easy-image-preview {
    width: 100px;
    height: 100px;
    border-radius: 6px;
    border: 3px dashed rgba(114, 114, 114, 0.5);
    /* 修复element 默认 el-image 中 display: inline-block 导致元素高度被撑开的问题 */
    display: flex;
    box-sizing: border-box;
}

.easy-image-no-preview {
    width: 100px;
    height: 100px;
    display: flex;
    background: var(--scx-overlay-bg);
    color: var(--scx-text-placeholder-color);
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    border: 3px dashed rgba(114, 114, 114, 0.5);
    box-sizing: border-box;
}
</style>
