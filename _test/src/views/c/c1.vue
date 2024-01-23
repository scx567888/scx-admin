<template>
    <div>
        <qr-code :pause="pauseQRCode" @hasQRCode="hasQRCode"></qr-code>
        {{ text }}
        <el-button @click="pauseQRCode=!pauseQRCode">{{ pauseQRCode ? "启用" : "暂停" }}</el-button>
    </div>
</template>

<script setup>
import {ref} from "vue";
import QrCode from "../../../../components/qr-code/index.vue";

const text = ref();
const pauseQRCode = ref(false);

function hasQRCode(a) {
    text.value = a;
}
</script>

<style scoped>

</style>
