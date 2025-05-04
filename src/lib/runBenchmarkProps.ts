import createConsistentObject from "./createConsistentObject";
import createDynamicObject from "./createDynamicObject";

function benchmark(
  label: string,
  fn: () => Record<string, number>,
  iterations: number = 1_000_000,
  print: boolean = false
) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  const elapsed = +(end - start).toFixed(2);
  if (print) {
    console.log(`${label}: ${elapsed} ms`);
  }
  return elapsed;
}

export type BenchmarkResult = {
  properties: number;
  consistent: number;
  dynamic: number;
};

// Run benchmarks
function benchmarkProperties(propCounts: number[], iterations: number) {
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

function runBenchmarkProps(iterations: number = 100_000): BenchmarkResult[] {
  const propSizes = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const graphData = benchmarkProperties(propSizes, iterations);

  return graphData;
}

export default runBenchmarkProps;
