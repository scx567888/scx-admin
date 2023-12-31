<template>
    <editor v-model="m" :init="init"/>
</template>

<script>
import "tinymce/tinymce"; // tinymce
import "tinymce-i18n/langs6/zh-Hans.js"; // 引入国际化文件
import "tinymce/themes/silver/theme.js"; // 编辑器主题 因为在此处已经引入所以在 init 中我们需要关闭 skin
import "tinymce/icons/default/icons.js"; // 引入编辑器图标icon
import "tinymce/models/dom/model.js"; //dom
import "tinymce/skins/ui/oxide/skin.css"; //编辑器 css
import c from "tinymce/skins/ui/oxide/content.css?inline"; //编辑器内容区域的 css
import c1 from "tinymce/skins/content/default/content.css?inline"; //编辑器内容区域的 css
//以下都是插件
import "tinymce/plugins/advlist/plugin.js"; //高级列表
import "tinymce/plugins/anchor/plugin.js"; //锚点
import "tinymce/plugins/autolink/plugin.js"; //自动链接
import "tinymce/plugins/autoresize/plugin.js"; //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import "tinymce/plugins/autosave/plugin.js"; //自动存稿
import "tinymce/plugins/charmap/plugin.js"; //特殊字符
import "tinymce/plugins/code/plugin.js"; //编辑源码
import "tinymce/plugins/codesample/plugin.js"; //代码示例
import "tinymce/plugins/directionality/plugin.js"; //文字方向
import "tinymce/plugins/emoticons/plugin.js"; //表情
import "tinymce/plugins/emoticons/js/emojis"; //表情插件需要的
import "tinymce/plugins/fullscreen/plugin.js"; //全屏
import "tinymce/plugins/help/plugin.js"; //帮助
import "tinymce/plugins/image/plugin.js"; //插入编辑图片
import "tinymce/plugins/importcss/plugin.js"; //引入css
import "tinymce/plugins/insertdatetime/plugin.js"; //插入日期时间
import "tinymce/plugins/link/plugin.js"; //超链接
import "tinymce/plugins/lists/plugin.js"; //列表插件
import "tinymce/plugins/media/plugin.js"; //插入编辑媒体
import "tinymce/plugins/nonbreaking/plugin.js"; //插入不间断空格
import "tinymce/plugins/pagebreak/plugin.js"; //插入分页符
import "tinymce/plugins/preview/plugin.js"; //预览
import "tinymce/plugins/quickbars/plugin.js"; //快速工具栏
import "tinymce/plugins/save/plugin.js"; //保存
import "tinymce/plugins/searchreplace/plugin.js"; //查找替换
import "tinymce/plugins/table/plugin.js"; //表格
import "tinymce/plugins/template/plugin.js"; //内容模板
import "tinymce/plugins/visualblocks/plugin.js"; //显示元素范围
import "tinymce/plugins/visualchars/plugin.js"; //显示不可见字符
import "tinymce/plugins/wordcount/plugin.js"; //字数统计
import Editor from "@tinymce/tinymce-vue"; //官方的 vue 插件
import {computed} from "vue";
import {useScxFSS} from "scx-ui/vue-component";
import {useAliOSS} from "../../type/index.js";

//todo 在 scx-group 中会发生bug 参考 https://github.com/tinymce/tinymce-vue/issues/230

export default {
    name: "easy-tinymce",
    components: {Editor},
    props: {
        modelValue: {
            type: String,
            default: "",
        },
        uploadHandlerType: {
            type: String,
            default: "scx-fss" // 取值 scx-fss ali-oss
        }
    },
    setup(props, ctx) {

        const fss = useScxFSS();

        const aliOSS = useAliOSS();

        //文件上传
        const my_image_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {

            const needUploadFile = new File([blobInfo.blob()], blobInfo.filename());

            if (props.uploadHandlerType === "scx-fss") {
                const onProgress = (type, v) => {
                    //这里为了使计算 md5 和 上传各占一半的进度所以这里做一点特殊的计算
                    if (type === "checking-md5") {
                        progress(v / 2);
                    } else if (type === "uploading") {
                        progress(50 + v / 2);
                    }
                };
                fss.upload(needUploadFile, onProgress).then(c => {
                    progress(100);
                    resolve(fss.joinImageURL(c.item.fssObjectID));
                });
            } else if (props.uploadHandlerType === "ali-oss") {
                progress(0);
                aliOSS.upload(needUploadFile).then(d => {
                    progress(100);
                    resolve(aliOSS.joinURL(d));
                });
            } else {
                reject("未知的 uploadHandlerType : " + props.uploadHandlerType);
            }
        });

        const init = {
            // 为什么不直接引入 css 文件 ?
            //     这里没有采用内联模式而是使用经典模式 所以 tinymce 会创建一个独立的 iframe 用作编辑区域
            //     也就是说 css 样式在当前组件中引用是无效的 所以需要配置 url 来让 tinymce 自己拼接引入
            //     具体请参阅 https://www.tiny.cloud/docs/tinymce/6/add-css-options/#content_css 讲的很清楚了
            //
            //  方式 1 如下: (优点 : 简单并且可以切换主题, 缺点 : 更新 tinymce 时麻烦 因为我们需要维护一个 tinymce 的目录)
            //     1, 将 tinymce 的文件复制到 public 的 lib 目录下 (严格来讲只需要复制 css 即可)
            //     2, 做如下配置
            //            base_url: "./lib/tinymce",
            //            skin: "oxide"
            //
            //  方式 2 如下: (优点 : 不需要在 public 目录存放任何的 tinymce 有关文件 , 缺点 : 不能更换主题)
            //     1, 这里我们 禁用 tinymce 导入 skin 和 content_css (但是 禁用 tinymce 导入就意味着我们需要手动导入)
            //     2, 所以其中的 skin (编辑器皮肤) 我们在组件内手动引入  (请查看第 11 行) 因为编辑器本身是处在 iframe 外的
            //        所以在组件中引用时完全没问题的 (即使我们开启 tinymce 引入 他也不过是在 head 中添加一个拼接的 link 而已)
            //     3, 编辑器内容区域的 css 我们则需要采用特殊的方式引入, 不直接引入 css 链接 而是直接引入 css 内容
            //        这里利用 vite 的导入功能 将需要的 css文件 导入为 字符串并拼接为 最终的 css 内容
            //        将 css 内容(字符串) 赋值给 content_style 即可
            skin: false, // 请参阅 https://www.tiny.cloud/docs/tinymce/6/editor-skin/#skin
            content_css: false,
            content_style: c + c1,
            // 为什么语言包没有采用 url 引用 ?
            //     因为语言包本质上是 js 所以在我们手动引用的时候就会直接注入到全局的 tinymce 中
            //     就不需要 tinymce 再自己导入了, 所以省略 language_url 选项
            language: "zh-Hans",
            // 请参阅 https://www.tiny.cloud/docs/tinymce/6/menus-configuration-options/#menubar
            menubar: true,
            // 请参阅 https://www.tiny.cloud/docs/tinymce/6/editor-size-options/
            // 这里设置最小高度和最大高度
            min_height: 300,
            max_height: 500,
            // 这里默认允许调整高度
            resize: true,
            //允许调整大小
            //请参阅 https://www.tiny.cloud/docs/tinymce/6/image/#object_resizing
            object_resizing: true,
            //禁用比例调整大小
            //请参阅 https://www.tiny.cloud/docs/tinymce/6/image/#resize_img_proportional
            resize_img_proportional: false,
            //这里导入全部的插件
            plugins: ["advlist", "anchor", "autolink", "autoresize", "autosave", "charmap", "code", "codesample",
                "directionality", "emoticons", "fullscreen", "help", "image", "importcss", "insertdatetime", "link",
                "lists", "media", "nonbreaking", "pagebreak", "preview", "quickbars", "save", "searchreplace", "table",
                "template", "visualblocks", "visualchars", "wordcount",],
            //设置文件上传 handler
            images_upload_handler: my_image_upload_handler,
            //这里胡乱的配置一下工具栏
            //详细的按钮请参阅 https://www.tiny.cloud/docs/tinymce/6/available-toolbar-buttons/
            toolbar: "undo redo formatselect bold italic backcolor image alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat fullscreen",
            //点击空白处时
            // 请参阅 https://www.tiny.cloud/docs/tinymce/6/toolbar-configuration-options/#quickbars_insert_toolbar
            quickbars_insert_toolbar: "quickimage quicktable",
            // 选中文本时的内容
            // 请参阅 https://www.tiny.cloud/docs/tinymce/6/toolbar-configuration-options/#quickbars_selection_toolbar
            quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote",
            // 选中图片时的内容
            // 请参阅 https://www.tiny.cloud/docs/tinymce/6/toolbar-configuration-options/#quickbars_image_toolbar
            quickbars_image_toolbar: "alignleft aligncenter alignright | rotateleft rotateright | imageoptions",
            // 去除  Powered by TinyMCE
            branding: false,
            // 去除 ⚡️Upgrade
            promotion: false
        };

        const m = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                ctx.emit("update:modelValue", value);
            }
        });
        return {
            m,
            init
        };
    }
};
</script>

<style>
.tox-tinymce-aux {
    z-index: 5000 !important;
}
</style>
