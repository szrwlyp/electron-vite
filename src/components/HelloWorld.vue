<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{ msg: string }>();
console.log(window.versions.node());

const pingFun = async () => {
  const response = await window.versions.ping();
  console.log(response);
};
const count = ref(0);

onMounted(() => {
  pingFun();
});
</script>

<template>
  <h1>{{ msg }}</h1>
  aaa
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
