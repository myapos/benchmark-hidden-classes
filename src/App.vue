<template>
  <section class="container">
    <section class="tabs">
      <Tabs :tabs="['Benchmark Creation', 'Benchmark Deletion', 'Reset']" @tab-change="onTabChange" />
    </section>
    <section class="benchmark-preview">
      <component :is="currentComponent" :mode="mode" :key="mode" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef, type Component } from "vue";
import Benchmark from "./components/Benchmark.vue";
import Teaser from "./components/Teaser.vue";
import Tabs from "./components/Tabs.vue";
import { type BenchmarkTab, type BenchmarkMode } from "./components/types";


const activeTab = ref<BenchmarkTab>('')
const onTabChange = (tab: BenchmarkTab) => {
  activeTab.value = tab;
}

const mode: ComputedRef<BenchmarkMode> = computed(() => {
  switch (activeTab.value) {
    case 'Benchmark Creation':
      return 'creation';
    case 'Benchmark Deletion':
      return 'deletion'
    default:
      return '';
  }
})

const componentMap: Record<string, Component> = {
  'Benchmark Creation': Benchmark,
  'Benchmark Deletion': Benchmark,
};


const currentComponent = computed(() =>
  componentMap[activeTab.value] ?? Teaser
);

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
