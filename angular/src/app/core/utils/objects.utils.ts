import { isEqual } from "lodash";


export const getUpdatedFields = <T extends Object>(originalObject: T, updates: T): Partial<T> => {
  return Object.keys(updates).reduce((acc, key) => {

    const originalObjectValue = (originalObject as any)[key];
    const obj2Value = (updates as any)[key];

    if ( originalObjectValue !== undefined && obj2Value !== undefined && !isEqual(originalObjectValue, obj2Value)) {
      (acc as any)[key] = obj2Value;
    }
    return acc;
  }, {});
}
