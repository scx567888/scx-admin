import vuePlugin from "@vitejs/plugin-vue";
import {scxIconPluginUseJS} from "scx-ui/vite-plugin/index.js";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import {dirname, resolve} from "path";
import {createRequire} from "node:module";
import {fileURLToPath} from "url";

/**
 *获取当前工作的目录 (在 ES 模块中)
 * @param import_meta_url (please use import.meta.url)
 * @returns {string}
 */
function currentDir(import_meta_url) {
    return dirname(fileURLToPath(import_meta_url));
}

function iconDir() {
    return [
        resolve(currentDir(import.meta.url), "./src/icons"),
    ];
}

const require = createRequire(import.meta.url);

export default {
    base: "./",
    server: {
        port: 3000,
    },
    plugins: [
        vuePlugin(),
        scxIconPluginUseJS(iconDir()),
        ckeditor5({theme: require.resolve("@ckeditor/ckeditor5-theme-lark")}),
    ],
};
