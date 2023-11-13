/**
 * 获取路由 title
 * @param route
 * @returns {String}
 */
function getRouteTitle(route) {
    return route.meta && route.meta.title ? route.meta.title : route.name;
}

/**
 * 获取路由 排序
 * @param route
 * @return {Number}
 */
function getRouteOrder(route) {
    return route.meta && route.meta.order ? route.meta.order : 0;
}

/**
 *  是否需要登录
 *  @param route
 * @return {boolean}
 */
function routeNoNeedLogin(route) {
    return route.meta && route.meta.noNeedLogin === true;
}

/**
 *  是否需要权限
 * @param route
 * @return {boolean}
 */
function routeNoNeedPerm(route) {
    return route.meta && route.meta.noNeedPerm === true;
}

/**
 *  是否可以在启动器中访问 1, 是最终节点(没有 children) 2, 没有开启 hiddenInLauncher
 *  @param route
 * @return {boolean}
 */
function routeCanShowInLauncher(route) {
    return route.children.length === 0 && !(route.meta && route.meta.hiddenInLauncher === true);
}

function routeCanShowInMenu(route) {
    return !(route.meta && route.meta.hiddenInLauncher === true);
}

function sortRoutes(l) {
    return l.sort((v1, v2) => getRouteOrder(v1) - getRouteOrder(v2));
}


/**
 * 为路由设置 order
 * @param r
 */
function setRoutesOrder(r) {
    let i = 0;

    function setRoutesOrder0(r0) {
        for (let e of r0) {
            if (!e.meta) {
                e.meta = {};
            }
            e.meta.order = i;
            i = i + 1;
            if (e.children) {
                setRoutesOrder0(e.children);
            }
        }
    }

    setRoutesOrder0(r);
    return r;
}

export {
    getRouteTitle,
    getRouteOrder,
    routeNoNeedLogin,
    routeNoNeedPerm,
    routeCanShowInLauncher,
    routeCanShowInMenu,
    sortRoutes,
    setRoutesOrder,
};
