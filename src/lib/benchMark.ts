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

export default benchmark;
