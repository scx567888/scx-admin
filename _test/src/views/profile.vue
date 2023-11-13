<template>
    <div class="user-profile-root">
        <el-card class="user-profile-card">
            <template #header>
                <div class="user-profile-card-header">
                    个人中心
                </div>
            </template>
            <user-profile/>
        </el-card>
    </div>
</template>

<script setup>

</script>

<style scoped>
.user-profile-root {
    padding: 30px;
    display: flex;
    column-gap: 20px;
    width: 100%;
    box-sizing: border-box
}

.user-profile-card {
    width: 400px;
    flex-shrink: 0;
}

.user-profile-card-header {
    font-weight: 600;
    font-size: 20px;
}
</style>
