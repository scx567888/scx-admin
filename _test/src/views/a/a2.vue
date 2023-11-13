<template>
    <div>
        <div style="color: red">easy-tinymce 在 scx-group 中有问题 ,若遇见此种情况 请使用 easy-ckeditor</div>

        <div>
            <scx-group v-model="group">
                <easy-tinymce v-model="text"/>
            </scx-group>

            {{ text }}
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import EasyTinymce from "../../../../components/easy/easy-tinymce.vue";

const text = ref();

const group = ref([1, 2]);
</script>

<style scoped>

</style>
