import {BlockQuote} from "@ckeditor/ckeditor5-block-quote";
import {Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline} from "@ckeditor/ckeditor5-basic-styles";
import {DocumentList, DocumentListProperties} from "@ckeditor/ckeditor5-list";
import {Heading} from "@ckeditor/ckeditor5-heading";
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
import {Indent, IndentBlock} from "@ckeditor/ckeditor5-indent";
import {AutoLink, Link, LinkImage} from "@ckeditor/ckeditor5-link";
import {MediaEmbed} from "@ckeditor/ckeditor5-media-embed";
import {Paragraph} from "@ckeditor/ckeditor5-paragraph";
import {
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
} from "@ckeditor/ckeditor5-table";
import {Alignment} from "@ckeditor/ckeditor5-alignment";
import {CodeBlock} from "@ckeditor/ckeditor5-code-block";
import {Essentials} from "@ckeditor/ckeditor5-essentials";
import {FindAndReplace} from "@ckeditor/ckeditor5-find-and-replace";
import {Font} from "@ckeditor/ckeditor5-font";
import {Highlight} from "@ckeditor/ckeditor5-highlight";
import {HorizontalLine} from "@ckeditor/ckeditor5-horizontal-line";
import {Mention} from "@ckeditor/ckeditor5-mention";
import {PasteFromOffice} from "@ckeditor/ckeditor5-paste-from-office";
import {RemoveFormat} from "@ckeditor/ckeditor5-remove-format";
import {SourceEditing} from "@ckeditor/ckeditor5-source-editing";
import {SpecialCharacters, SpecialCharactersEssentials} from "@ckeditor/ckeditor5-special-characters";
import {TextPartLanguage} from "@ckeditor/ckeditor5-language";
import {TextTransformation} from "@ckeditor/ckeditor5-typing";
import {WordCount} from "@ckeditor/ckeditor5-word-count";

const defaultEditorConfig = {
    language: "zh-cn",
    plugins: [
        Alignment,
        Alignment,
        AutoImage,
        AutoLink,
        BlockQuote,
        Bold,
        Code,
        CodeBlock,
        DocumentList,
        Heading,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        Indent,
        Italic,
        Link,
        MediaEmbed,
        Paragraph,
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
        DocumentListProperties,
        Mention,
        PasteFromOffice,
        PictureEditing,
        RemoveFormat,
        SourceEditing,
        SpecialCharacters,
        SpecialCharactersEssentials,
        Strikethrough,
        Subscript,
        Superscript,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TextPartLanguage,
        TextTransformation,
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
            "specialCharacters", "horizontalLine",
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
        insert: {
            integrations: [
                "insertImageViaUrl",
            ],
        },
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
    placeholder: "搞点内容 !!!",
    table: {
        contentToolbar: [
            "tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties", "toggleTableCaption",
        ],
    },

};

export {defaultEditorConfig};
