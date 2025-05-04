<template>
<section class="tabs">
    <button v-for="tab in tabs" :key="tab" @click="handleTabs(tab)"
    class="tab"
    :class="{
        'active-tab': activeTab === tab,
    }"
    >{{tab}}</button>
    </section>
</template>

<script setup lang="ts">
import {ref} from 'vue';

export type BenchmarkTab = 'BenchmarkCreation' | 'BenchmarkDeletion' | 'Reset' | '';

defineProps<{ tabs: BenchmarkTab[]
}>();

const emit = defineEmits<{
  (e: 'tab-change', payload: BenchmarkTab): void
}>();

const activeTab = ref<BenchmarkTab>('')

const handleTabs = (tab:BenchmarkTab) => {
  switch(tab) {
    case 'BenchmarkCreation':
      activeTab.value='BenchmarkCreation';
      emit('tab-change', 'BenchmarkCreation');
      break;
      case 'BenchmarkDeletion':
      activeTab.value='BenchmarkDeletion';
      emit('tab-change', 'BenchmarkDeletion');
      break;
      case 'Reset':
        activeTab.value='';
        emit('tab-change', 'Reset');
      break;
    default:
      console.log('No valid value');
  }
}
</script>

<style scoped>

button {
  outline:none;
}

.tabs {
  display: flex;
  gap:5px;
}

.tab {
  padding: 5px;
  background-color: #ccc;
  border:1px solid #ccc;
  border-radius:5px;
}


.tab:hover {
  cursor:pointer;
  color: #eee;
}

.active-tab {
  color: #fff;
}


</style>