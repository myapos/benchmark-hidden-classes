<template>
  <section class="container">
    <section class="tabs">
      <Tabs :tabs="['Benchmark Creation', 'Benchmark Deletion', 'Reset']" @tab-change="onTabChange" />
    </section>
    <section class="benchmark-preview">
      <component :is="currentComponent" :mode="mode" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, ComputedRef } from "vue";
import Benchmark, { BenchMarkMode } from "./components/Benchmark.vue";
import Teaser from "./components/Teaser.vue";
import Tabs, { BenchmarkTab } from "./components/Tabs.vue";

const activeTab = ref<BenchmarkTab>('')
const onTabChange = (e: BenchmarkTab) => {
  activeTab.value = e;
}

const mode: ComputedRef<BenchMarkMode> = computed(() => {
  switch (activeTab.value) {
    case 'Benchmark Creation':
      return 'creation';
    case 'Benchmark Deletion':
      return 'deletion'
    default:
      return '';
  }
})
const currentComponent = computed(() => {
  switch (activeTab.value) {
    case 'Benchmark Creation':
      return Benchmark;
    case 'Benchmark Deletion':
      return Benchmark;
    default:
      return Teaser;
  }
});

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 400px;
}

button {
  outline: none;
  /* border:none; */
}

.tabs {
  display: flex;
  gap: 5px;
}

.tab {
  padding: 5px;
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
}


.tab:hover {
  cursor: pointer;
  color: #eee;
}

.active-tab {
  color: #fff;
}

.benchmark-preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
  width: autp;
}
</style>
