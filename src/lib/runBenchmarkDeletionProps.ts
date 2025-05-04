import createConsistentObject from "./createConsistentObject";
import createDynamicObject from "./createDynamicObject";
import { BenchmarkResult } from "./types";
import benchmark from "./benchMark";

// Run benchmarks
function benchmarkProperties(propCounts: number[], iterations: number) {
  const results: BenchmarkResult[] = [];

  for (const count of propCounts) {
    const timeConsistent = benchmark(
      `Consistent Object with ${count} properties`,
      () => {
        const obj = createConsistentObject(count);
        // Delete all properties
        for (const key in obj) {
          delete obj[key];
        }
        return obj;
      },
      iterations
    );
    const timeDynamic = benchmark(
      `Dynamic Object with ${count} properties`,
      () => {
        const obj = createDynamicObject(count);
        // Delete all properties
        for (const key in obj) {
          delete obj[key];
        }
        return obj;
      },
      iterations
    );

    results.push({
      properties: count,
      consistent: timeConsistent,
      dynamic: timeDynamic,
    });
  }

  return results;
}

function runBenchmarkDeletionProps(
  iterations: number = 100_000
): BenchmarkResult[] {
  const propSizes = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const graphData = benchmarkProperties(propSizes, iterations);

  return graphData;
}

export default runBenchmarkDeletionProps;
