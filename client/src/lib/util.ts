import { isObject } from "lodash";

export function objectHasAllKeys(obj: any, keys: Array<string>): boolean {
    if (!isObject(obj)) return false;
    return keys.every(key => key in obj);
}

export function shallowUpdate<S>(state: S, patch: Partial<S>): S {
    return Object.assign({}, state, patch);
}
