//基本功能
import {Essentials} from "@ckeditor/ckeditor5-essentials";
//基本样式 加粗 代码块 斜体 删除线等
import {Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline} from "@ckeditor/ckeditor5-basic-styles";
//字体 大小 颜色等
import {Font} from "@ckeditor/ckeditor5-font";
//标题  <h1> <h2> 等等
import {Heading} from "@ckeditor/ckeditor5-heading";
//块引用 <blockquote>
import {BlockQuote} from "@ckeditor/ckeditor5-block-quote";
//列表  <ul> <ol> <li> 
import {List, ListProperties} from "@ckeditor/ckeditor5-list";
//移除 格式
import {RemoveFormat} from "@ckeditor/ckeditor5-remove-format";
//高亮 
import {Highlight} from "@ckeditor/ckeditor5-highlight";
//对齐
import {Alignment} from "@ckeditor/ckeditor5-alignment";
//查找替换
import {FindAndReplace} from "@ckeditor/ckeditor5-find-and-replace";
//缩进
import {Indent, IndentBlock} from "@ckeditor/ckeditor5-indent";
//代码块
import {CodeBlock} from "@ckeditor/ckeditor5-code-block";
//水平线
import {HorizontalLine} from "@ckeditor/ckeditor5-horizontal-line";
//链接
import {AutoLink, Link, LinkImage} from "@ckeditor/ckeditor5-link";
//媒体嵌入
import {MediaEmbed} from "@ckeditor/ckeditor5-media-embed";
//表格
import {
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
} from "@ckeditor/ckeditor5-table";
//图片相关
import {
    AutoImage,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    PictureEditing,
} from "@ckeditor/ckeditor5-image";
//word 粘贴
import {PasteFromOffice} from "@ckeditor/ckeditor5-paste-from-office";
//源码编辑
import {SourceEditing} from "@ckeditor/ckeditor5-source-editing";
//文本计数
import {WordCount} from "@ckeditor/ckeditor5-word-count";

const defaultEditorConfig = {
    language: "zh-cn",
    plugins: [
        Alignment,
        AutoImage,
        AutoLink,
        BlockQuote,
        Bold,
        Code,
        CodeBlock,
        List,
        Heading,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        Indent,
        Italic,
        Link,
        MediaEmbed,
        Table,
        TableToolbar,
        Essentials,
        FindAndReplace,
        Font,
        Highlight,
        HorizontalLine,
        ImageInsert,
        ImageResize,
        ImageUpload,
        IndentBlock,
        LinkImage,
        ListProperties,
        PasteFromOffice,
        PictureEditing,
        RemoveFormat,
        SourceEditing,
        Strikethrough,
        Subscript,
        Superscript,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        Underline,
        WordCount,
    ],
    extraPlugins: [],
    toolbar: {
        items: [
            "undo", "redo",
            "|",
            "findAndReplace", "selectAll",
            "|",
            "heading",
            "|",
            "fontSize", "fontFamily", "fontColor", "fontBackgroundColor",
            "|",
            "alignment",
            "|",
            "bulletedList", "numberedList", "outdent", "indent",
            "-",
            "bold", "italic", "underline",
            {
                label: "Formatting",
                icon: "text",
                items: ["strikethrough", "subscript", "superscript", "code", "|", "removeFormat"],
            },
            "|",
            "horizontalLine",
            "|",
            "link", "insertImage", "insertTable",
            "|",
            "highlight", "blockQuote", "mediaEmbed", "codeBlock",
            "|",
            "sourceEditing",
        ],
        shouldNotGroupWhenFull: true,
    },
    fontFamily: {
        supportAllValues: true,
    },
    fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true,
    },
    htmlEmbed: {
        showPreviews: true,
    },
    image: {
        styles: [
            "alignCenter",
            "alignLeft",
            "alignRight",
        ],
        resizeOptions: [
            {
                name: "resizeImage:original",
                label: "Original",
                value: null,
            },
            {
                name: "resizeImage:25",
                label: "25%",
                value: "25",
            },
            {
                name: "resizeImage:50",
                label: "50%",
                value: "50",
            },
            {
                name: "resizeImage:75",
                label: "75%",
                value: "75",
            },
        ],
        toolbar: [
            "imageTextAlternative", "toggleImageCaption", "|",
            "imageStyle:inline", "imageStyle:wrapText", "imageStyle:breakText", "imageStyle:side", "|",
            "resizeImage",
        ],
    },
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true,
        },
    },
    link: {
        decorators: {
            addTargetToExternalLinks: true,
            defaultProtocol: "https://",
            toggleDownloadable: {
                mode: "manual",
                label: "Downloadable",
                attributes: {
                    download: "file",
                },
            },
        },
    },
    mention: {
        feeds: [
            {
                marker: "@",
                feed: [
                    "@apple", "@bears", "@brownie", "@cake", "@cake", "@candy", "@canes", "@chocolate", "@cookie", "@cotton", "@cream",
                    "@cupcake", "@danish", "@donut", "@dragée", "@fruitcake", "@gingerbread", "@gummi", "@ice", "@jelly-o",
                    "@liquorice", "@macaroon", "@marzipan", "@oat", "@pie", "@plum", "@pudding", "@sesame", "@snaps", "@soufflé",
                    "@sugar", "@sweet", "@topping", "@wafer",
                ],
                minimumCharacters: 1,
            },
        ],
    },
    placeholder: "请输入内容 !!!",
    table: {
        contentToolbar: [
            "tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties", "toggleTableCaption",
        ],
    },
};

export {defaultEditorConfig};
