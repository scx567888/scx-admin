const PathMatchRoute = {
    path: "/:pathMatch(.*)*",
    redirect: {name: "not-found"},
    meta: {
        hiddenInLauncher: true,
    },
};

const NotFoundRoute = {
    path: "/not-found",
    name: "not-found",
    component: () => import("../views/not-found.vue"),
    meta: {
        title: "页面未找到",
        hiddenInLauncher: true,
        noNeedLogin: true,
    },
};

const NoPermRoute = {
    path: "/no-perm",
    name: "no-perm",
    component: () => import("../views/no-perm.vue"),
    meta: {
        hiddenInLauncher: true,
        noNeedPerm: true,
    },
};

export {PathMatchRoute, NotFoundRoute, NoPermRoute};
