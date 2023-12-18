import { Middleware } from '@reduxjs/toolkit';
import { isPlainObject } from './serify-helper';

export interface Serifier<T> {
  serifier: (unserified: T) => any;
  deserifier: (serified: any) => T;
}

export interface SerifyOptions {
  serifyKey: null | string;
  types: {
    BigInt?: Serifier<bigint>;
    Date?: Serifier<Date>;
    Map?: Serifier<Map<any, any>>;
    Set?: Serifier<Set<any>>;
  };
}

export const defaultOptions: SerifyOptions = {
  serifyKey: null,
  types: {
    BigInt: {
      serifier: (unserified) => unserified.toString(),
      deserifier: (serified) => BigInt(serified),
    },
    Date: {
      serifier: (unserified) => unserified.getTime(),
      deserifier: (serified) => new Date(serified),
    },
    Map: {
      serifier: (unserified) => [...unserified.entries()],
      deserifier: (serified) => new Map(serified),
    },
    Set: {
      serifier: (unserified) => [...unserified.values()],
      deserifier: (serified) => new Set(serified),
    },
  },
};

export const mergeOptions = (
  options: SerifyOptions = { serifyKey: null, types: {} }
) => ({
  serifyKey: options.serifyKey ?? defaultOptions.serifyKey,
  types: { ...defaultOptions.types, ...options.types },
});

export const serifyMiddleware =
  (options: SerifyOptions): Middleware =>
  (api) =>
  (next) =>
  async (action) => {
    action.payload = serify(action.payload, options);
    next(action);
  };

export const serifyKey = Symbol('serifyKey');

export type ValueTypes = keyof SerifyOptions['types'];

// const serifyNode = (value: any, options: SerifyOptions): any => {
//   if (value.serifyKey === options.serifyKey) return value;
//   const valueType: ValueTypes =
//     value.constructor?.[serifyKey] ?? value.constructor?.name;
//   const serifyType = options.types[valueType];
//   if (serifyType) {
//     if (typeof serifyType.serifier !== 'function')
//       throw new Error(`invalid ${valueType} serifier`);

//     const serified = {
//       serifyKey: options.serifyKey,
//       type: valueType,
//       value: serifyNode(serifyType.serifier(value), options),
//     };
//     return serified;
//   }
//   if (typeof value === 'bigint') {
//     // Handle BigInt serialization here (e.g., converting it to a string)
//     return String(value);
//   }
//   let copy;
//   // console.log('servify value', copy, value, valueType, serifyType);
//   console.log('servify', typeof value, isPlainObject(value));
//   if (Array.isArray(value)) copy = [...value];
//   if (isPlainObject(value)) copy = { ...value };
//   for (const p in copy) copy[p] = serifyNode(copy[p], options);
//   return copy ?? value;
// };
const serifyNode = (value: any, options: SerifyOptions): any => {
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

  if (typeof value === 'bigint') {
    return `BigInt(${String(value)})`;
  }
  if (isPlainObject(value)) {
    const valueType: ValueTypes =
      value.constructor?.[serifyKey] ?? value.constructor?.name;
    const serifyType = options.types[valueType];

    if (serifyType) {
      if (typeof serifyType.serifier !== 'function')
        throw new Error(`invalid ${valueType} serifier`);

      const serified = {
        serifyKey: options.serifyKey,
        type: valueType,
        value: serifyNode(serifyType.serifier(value), options),
      };
      return serified;
    }
    const copy: any = {};
    for (const p in value) {
      copy[p] = serifyNode(value[p], options);
    }
    return copy;
  }
  if (Array.isArray(value)) {
    const copy = value.map((item: any) => serifyNode(item, options));
    return copy;
  }

  throw new Error(`unsupported type: ${typeof value}`);
};

export const serify = (value: any, options: SerifyOptions) =>
  serifyNode(value, mergeOptions(options));
