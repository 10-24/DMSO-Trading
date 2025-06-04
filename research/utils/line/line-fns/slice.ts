import { Graphable } from "../../chart/Point.ts";
import { Line } from "../line.ts";


export function slice<T_X extends Graphable, T_Y extends number>(line: Line<T_X, T_Y>, interval: { start?: number, end?: number }): Line<T_X, T_Y> {

    const start = interval.start ?? 0;
    const end = interval.end === undefined ? line.length() : interval.end < 0 ? line.length() + interval.end : interval.end;

    for (let i = 0; i < start; i++) {
        line.x.shift()
        line.y.shift()
    }
    for (let i = end; i < line.length(); i++) {
        line.x.pop()
        line.y.pop()
    }
    return line;

}