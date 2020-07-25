import util from "util";

export function log(myObject: any) {
    console.log(util.inspect(myObject, { showHidden: false, depth: null, colors: true }));
}
