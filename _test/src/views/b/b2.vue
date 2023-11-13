<template>
    <div>
        <scx-group v-model="group">
            <easy-monaco-editor v-model="text" language="js"/>
        </scx-group>

        {{ text }}
    </div>
</template>

<script setup>
import {ref} from "vue";
import EasyMonacoEditor from "../../../../components/easy/easy-monaco-editor.vue";

const text = ref();

const group = ref([1, 2]);
</script>

<style scoped>

</style>
