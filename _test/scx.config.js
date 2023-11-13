const dev = {
    systemConfig: {
        title: "SCX ADMIN TEST (dev)",// 主标题

    },
    userConfig: {
        dark: false,// 是否开启暗黑模式
        menuCollapse: true,// 是否折叠菜单
    },
    baseApiUrl: "http://127.0.0.1:8080/",//后台 api 地址
};

const prod = {
    systemConfig: {
        title: "SCX ADMIN TEST",// 主标题

    },
    userConfig: {
        dark: false,// 是否开启暗黑模式
        menuCollapse: true,// 是否折叠菜单
    },
    baseApiUrl: "http://127.0.0.1:8080/",//后台 api 地址
};

//根据当前环境不同导出不同的配置内容
const config = import.meta.env.DEV ? dev : prod;

export default config;
