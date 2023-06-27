<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{ msg: string }>();
console.log(window.versions.node());

const pingFun = async () => {
  const response = await window.versions.ping();
  console.log(response);
};
const count = ref(0);
const message = ref("");
const start = ref("");
onMounted(() => {
  pingFun();
  const StartScore = (rate: number) => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
  start.value = StartScore(0);
});

const setTitle = () => {
  window.versions.setTitle("你好");
};

const inputValue = ref("");
const setTitleInput = () => {
  console.log(inputValue.value);
  window.versions.setTitle(inputValue.value);
};

const dialog = () => {
  window.versions.openDialog();
};

const eventSourceFun = () => {
  const sse = new EventSource("/api/api/sse");

  console.log(sse);
  sse.addEventListener("open", (e) => {
    console.log(e.target);
  });
  //对应后端nodejs自定义的事件名lol
  sse.addEventListener("lol", (e) => {
    message.value = message.value + e.data;
  });
  sse.addEventListener("message", (e) => {
    console.log(e.data);
  });
};
</script>

<template>
  <div @click="setTitle">点击</div>
  <input type="text" v-model="inputValue" @input="setTitleInput" />
  <h1>{{ count }}</h1>
  <div @click="dialog">请选择</div>
  <div @click="eventSourceFun">GPT</div>
  <div style="width: 200px; height: auto">{{ message }}</div>
  <div>{{ start }}</div>

  <ul class="nav">
    <li>aaaa</li>
    <li>aaaa</li>
    <li>aaaa</li>
    <li>aaaa</li>
    <li>aaaa</li>
  </ul>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
/* .nav li {
  border-right: 1px solid #666;
}
.nav li:last-child {
  border-right: none;
} */
.nav li:not(:last-child) {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
