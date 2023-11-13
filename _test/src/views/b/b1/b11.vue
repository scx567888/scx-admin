<template>
    <div>
        <scx-group v-model="group">
            <easy-ckeditor v-model="text"/>
        </scx-group>

        {{ text }}
    </div>
</template>

<script setup>
import {ref} from "vue";
import EasyCkeditor from "../../../../../components/easy/easy-ckeditor.vue";

const text = ref();

const group = ref([1, 2]);
</script>

<style scoped>

</style>
