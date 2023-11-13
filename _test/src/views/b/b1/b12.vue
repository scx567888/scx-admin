<template>
    <div>
        <scx-group v-model="group">
            <easy-ckeditor-lazy v-model="text"/>
        </scx-group>

        {{ text }}
    </div>
</template>

<script setup>
import {ref} from "vue";
import EasyCkeditorLazy from "../../../../../components/easy/easy-ckeditor-lazy.vue";

const text = ref();

const group = ref([1, 2]);
</script>

<style scoped>

</style>
