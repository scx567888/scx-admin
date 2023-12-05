<template>
    <div class="scx-role">
        
        <div class="left-page">
            <role-tree/>
        </div>
        
        <div class="right-page">
            <role-perms/>
        </div>
        
    </div>
</template>
<script setup>

import RoleTree from "./role-tree.vue";
import RolePerms from "./role-perms.vue";
</script>
<style scoped>
.scx-role {
    display: flex;
    height: 100%;
}

.scx-role .left-page {
    width: 250px;
    border-right: 2px solid #a5a3a3;
    flex-shrink: 0;
}

.scx-role .right-page {
    width: 100%;
    overflow: auto;
}
</style>
