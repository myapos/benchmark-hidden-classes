function createDynamicObject(propCount: number): Record<string, number> {
  const obj: Record<string, number> = {};

  for (let i = 1; i <= propCount && propCount <= 50; i++) {
    obj[String.fromCharCode(96 + i)] = i;
  }

  return obj;
}

export default createDynamicObject;
