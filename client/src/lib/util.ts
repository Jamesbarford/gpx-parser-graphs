import { isObject } from "lodash";

export function objectHasAllKeys(obj: any, keys: Array<string>): boolean {
    if (!isObject(obj)) return false;
    return keys.every(key => key in obj);
}
