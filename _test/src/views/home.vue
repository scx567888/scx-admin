<template>
    <div>
        <h1>
            Home
            <scx-icon icon="book"></scx-icon>
            {{ daojishi(a) }}
        </h1>
    </div>

</template>

<script setup>
import dayjs from "dayjs/esm/index.js";
import {durationFormat} from "../../../type/duration-format.js";
import {ref} from "vue";

const a = new Date().getTime() + 1000000;

const nowTime = ref(new Date());

let nowTimeInterval = null;

function refreshNowTime() {
    clearInterval(nowTimeInterval);
    nowTimeInterval = setInterval(() => {
        nowTime.value = new Date();
    }, 500);
}

refreshNowTime();

function daojishi(d) {
    const startDate = dayjs(d).toDate();
    const c = startDate - nowTime.value;
    if (c < 0) {
        return 0;
    }
    return durationFormat(c);
}
</script>

<style scoped>

</style>
