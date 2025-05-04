import createConsistentObject from "./createConsistentObject";
import createDynamicObject from "./createDynamicObject";
import { BenchmarkResult } from "./types";
import benchmark from "./benchMark";

// Run benchmarks
function benchmarkCreationProperties(propCounts: number[], iterations: number) {
  const results: BenchmarkResult[] = [];

  for (const count of propCounts) {
    const timeConsistent = benchmark(
      `Consistent Object with ${count} properties`,
      () => createConsistentObject(count),
      iterations
    );
    const timeDynamic = benchmark(
      `Dynamic Object with ${count} properties`,
      () => createDynamicObject(count),
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

function runBenchmarkCreationProps(
  iterations: number = 100_000
): BenchmarkResult[] {
  const propSizes = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const graphData = benchmarkCreationProperties(propSizes, iterations);

  return graphData;
}

export default runBenchmarkCreationProps;
