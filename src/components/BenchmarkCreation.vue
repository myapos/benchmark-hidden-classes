<template>
    <section>
      <Form :onSubmit="handleSubmit" />
      <Loader v-if="isProcessing"/>
      <Line v-else :data="consistentData" :options="chartOptions" />
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, nextTick } from "vue";
  import Form from "./Form.vue";
  import Loader from "./Loader.vue";
  import { Line } from "vue-chartjs";
  import runBenchmarkProps, { BenchmarkResult } from "../lib/runBenchmarkProps";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  import chartOptions from '../constants';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const benchmarkData = ref<BenchmarkResult[]>([]);
  const isProcessing = ref<boolean>(false);
  
  const handleSubmit = async (e: Event) => {
    if (isProcessing.value) {
      console.warn("Already processing. Please wait");
      return;
    }
  
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const iterations = parseInt(formData.get("iterations") as string, 10);
  
    if (isNaN(iterations)) {
      console.warn("Invalid input for iterations");
      return;
    }
  
    isProcessing.value = true;
    await nextTick();
    // allow the message to be rendered before heavy computation starts
    // simulate async work
    benchmarkData.value = await new Promise((resolve) => {
      setTimeout(() => resolve(runBenchmarkProps(iterations)), 0);
    });
  
    isProcessing.value = false;
    await nextTick();
  };
  
  const consistentData = computed(() => {
    const data = {
      labels: benchmarkData.value.map((res) => `${res.properties}`),
      datasets: [
        {
          label: "Consistent",
          backgroundColor: "#f87979",
          data: benchmarkData.value.map(
            (benchmarkRes) => benchmarkRes.consistent
          ),
        },
        {
          label: "Dynamic",
          backgroundColor: "green",
          data: benchmarkData.value.map((benchmarkRes) => benchmarkRes.dynamic),
        },
      ],
    };
  
    return data;
  });
  </script>
  
<style scoped>


</style>