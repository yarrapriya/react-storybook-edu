import { SerifyOptions, ValueTypes, mergeOptions } from './serify';
import { isPlainObject } from './serify-helper';

// const deserifyNode = (value: any, options: SerifyOptions): any => {
//   if (isPrimitive(value)) return value;

//   if (isPlainObject(value) && value.serifyKey === options.serifyKey) {
//     if (!Object.prototype.hasOwnProperty.call(value, 'type') || !Object.prototype.hasOwnProperty.call(value, 'value')) {
//       throw new Error(`invalid serified object: ${JSON.stringify(value)}`);
//     }

//     const serifyType = options.types[value.type as ValueTypes];
//     if (!serifyType) {
//       throw new Error(`${value.type} is not a supported serify type`);
//     }

//     if (typeof serifyType.deserifier !== 'function') {
//       throw new Error(`invalid ${value.type} deserifier`);
//     }

//     return serifyType.deserifier(deserifyNode(value.value, options));
//   }

//   let copy: any;
//   if (Array.isArray(value)) copy = [...value];
//   if (isPlainObject(value)) copy = { ...value };
//   for (const p in copy) {
//     copy[p] = deserifyNode(copy[p], options);
//   }

//   return copy ?? value;
// };
const deserifyNode = (value: any, options: SerifyOptions): any => {
  if (typeof value === 'string' && value.startsWith('BigInt(')) {
    // Deserialize BigInt from string representation
    // console.log('desirify', value, typeof value);
    return BigInt(value.slice(7, -1));
  }
  if (
    value === null ||
    value === undefined ||
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    typeof value === 'string' ||
    typeof value === 'symbol'
  ) {
    return value;
  }
  if (isPlainObject(value)) {
    if (value.serifyKey === options.serifyKey) {
      if (
        !Object.prototype.hasOwnProperty.call(value, 'type') ||
        !Object.prototype.hasOwnProperty.call(value, 'value')
      ) {
        throw new Error(`invalid serified object: ${JSON.stringify(value)}`);
      }

      const serifyType = options.types[value.type as ValueTypes];
      if (!serifyType) {
        throw new Error(`${value.type} is not a supported serify type`);
      }

      if (typeof serifyType.deserifier !== 'function') {
        throw new Error(`invalid ${value.type} deserifier`);
      }

      return serifyType.deserifier(deserifyNode(value.value, options));
    }

    const copy: Record<string, any> = {};
    for (const p in value) {
      copy[p] = deserifyNode(value[p], options);
    }

    return copy;
  }

  if (Array.isArray(value)) {
    return value.map((item: any) => deserifyNode(item, options));
  }

  throw new Error(`unsupported type: ${typeof value}`);
};

export const deserify = <T>(
  value: T,
  options: SerifyOptions = { serifyKey: null, types: {} }
): T => deserifyNode(value, mergeOptions(options)) as T;
