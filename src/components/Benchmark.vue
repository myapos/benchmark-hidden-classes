<template>
    <section>
        <Form :onSubmit="handleSubmit" :mode="mode" />
        <Loader v-if="isProcessing" />
        <Line v-else :data="consistentData" :options="chartOptions" />
    </section>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import Form from "./Form.vue";
import Loader from "./Loader.vue";
import { Line } from "vue-chartjs";
import runBenchmarkCreationProps from "../lib/runBenchmarkCreationProps";
import runBenchmarkDeletionProps from "../lib/runBenchmarkDeletionProps";
import { BenchmarkResult } from '../lib/types';
import { type BenchmarkMode } from "./types";

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

const props = defineProps<{
    mode: BenchmarkMode;
}>();

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

    const isBenchmarkCreation = props.mode === 'creation';
    const isBenchmarkDeletion = props.mode === 'deletion';

    isProcessing.value = true;
    await nextTick();
    // allow the message to be rendered before heavy computation starts
    // simulate async work
    benchmarkData.value = await new Promise((resolve) => {
        setTimeout(() => {
            if (isBenchmarkCreation) {
                resolve(runBenchmarkCreationProps(iterations))
                return;
            }

            if (isBenchmarkDeletion) {
                resolve(runBenchmarkDeletionProps(iterations))
                return;
            }
        }, 0);
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

<style scoped></style>