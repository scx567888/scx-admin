import {inject, isReactive, provide, reactive} from "vue";

/**
 *
 * @type {string}
 */
const crudContextKey = "crud-context";

/**
 *
 * @returns {CrudContext}
 */
function useCrudContext() {
    return inject(crudContextKey);
}

class CrudContextVueInstaller {

    crudContext;

    constructor(crudContext) {
        this.crudContext = crudContext;
    }

    install(app) {
        app.provide(crudContextKey, this.crudContext);
    }
}

/**
 *
 * @param crudContext
 * @returns {CrudContext}
 */
function installCrudContext(crudContext) {
    if (!isReactive(crudContext)) {
        crudContext = reactive(crudContext);
    }
    provide(crudContextKey, crudContext);
    return crudContext;
}

export {CrudContextVueInstaller, installCrudContext, useCrudContext};
