export interface Data {
  path?: string;
  value?: string;
}

export const flatten = (value: any, path: string): Data[] => {
  if (Array.isArray(value)) {
    return value.flatMap((v, index) => flatten(v, `${path}[${index}]`));
  }
  // Since null values are allowed but typeof null === "object", the "&& value" is used to skip this
  if (typeof value === "object" && value) {
    return Object.keys(value).flatMap((key) => flatten(value[key], path ? `${path}.${key}` : key));
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
    return [{ path: path, value: value }];
  }
  throw new Error(`Unexpected value '${value}' in '${path}'`);
};
