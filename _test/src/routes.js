import {NoPermRoute, NotFoundRoute, PathMatchRoute} from "../../routes/index.js";

/**
 * 全部路由
 */
const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../../views/login/login.vue"),
        // component: () => import("../../views/login/login-and-register.vue"),
        meta: {
            title: "登录",
            icon: "dashboard",
            hiddenInLauncher: true,
            noNeedLogin: true,
        },
    },
    {
        path: "/",
        name: "app",
        component: () => import("../../layout/index.vue"),
        children: [
            {
                path: "",
                name: "home",
                component: () => import("./views/home.vue"),
                meta: {
                    title: "首页",
                    icon: "outlined-home",
                    hiddenInLauncher: false,
                    showInUserPanel: true,
                    noNeedPerm: true,
                },
            },
            {
                path: "profile",
                name: "profile",
                component: () => import("./views/profile.vue"),
                meta: {
                    icon: "outlined-user",
                    title: "用户中心",
                    hiddenInLauncher: true,
                    showInUserPanel: true,
                },
            },
            {
                path: "a",
                name: "a",
                meta: {
                    title: "A",
                    icon: "outlined-ordered-list",
                },
                children: [
                    {
                        path: "a1",
                        name: "a1",
                        component: () => import("./views/a/a1.vue"),
                        meta: {
                            title: "A1",
                            icon: "outlined-setting",
                            perms: [],
                        },
                    },
                    {
                        path: "a2",
                        name: "a2",
                        component: () => import("./views/a/a2.vue"),
                        meta: {
                            title: "A2",
                            icon: "outlined-file-search",
                            perms: [],
                        },
                    },
                ],
            },
            {
                path: "b",
                name: "b",
                meta: {
                    title: "B",
                    icon: "outlined-form",
                },
                children: [
                    {
                        path: "b1",
                        name: "b1",
                        meta: {
                            title: "B1",
                            icon: "outlined-write",
                            perms: [],
                        },
                        children: [
                            {
                                path: "b11",
                                name: "b11",
                                component: () => import("./views/b/b1/b11.vue"),
                                meta: {
                                    title: "B11",
                                    icon: "outlined-write",
                                    perms: [],
                                },
                            },
                            {
                                path: "b12",
                                name: "b12",
                                component: () => import("./views/b/b1/b12.vue"),
                                meta: {
                                    title: "B12",
                                    icon: "outlined-write",
                                    perms: [],
                                },
                            },
                        ],
                    },
                    {
                        path: "b2",
                        name: "b2",
                        component: () => import("./views/b/b2.vue"),
                        meta: {
                            title: "B2",
                            icon: "outlined-audit",
                            perms: [],
                        },
                    },
                ],
            },
            {
                path: "c",
                name: "c",
                meta: {
                    title: "C",
                    icon: "outlined-ordered-list",
                },
                children: [
                    {
                        path: "c1",
                        name: "c1",
                        component: () => import("./views/c/c1.vue"),
                        meta: {
                            title: "C1",
                            icon: "outlined-alert",
                            perms: [],
                        },
                    },
                    {
                        path: "c2",
                        name: "C2",
                        component: () => import("./views/c/c2.vue"),
                        meta: {
                            title: "C2",
                            icon: "outlined-file-search",
                            perms: [],
                        },
                    },
                    {
                        path: "c3",
                        name: "C3",
                        component: () => import("./views/c/c3.vue"),
                        meta: {
                            title: "C3",
                            icon: "outlined-file-search",
                            perms: [],
                            hiddenInLauncher: true,
                            showInUserPanel: true,
                        },
                    },
                ],
            },
            {
                path: "d",
                name: "d",
                meta: {
                    title: "D",
                    icon: "outlined-ordered-list",
                },
                component: () => import("./views/d.vue"),
            },
            {
                path: "dept",
                name: "dept",
                meta: {
                    title: "部门管理",
                    icon: "outlined-ordered-list",
                },
                component: () => import("../../views/dept/index.vue"),
            },
            {
                path: "role",
                name: "role",
                meta: {
                    title: "角色管理",
                    icon: "outlined-ordered-list",
                },
                component: () => import("../../views/role/index.vue"),
            },
        ],
    },
    NotFoundRoute,
    NoPermRoute,
    PathMatchRoute,
];

export {
    routes,
};
