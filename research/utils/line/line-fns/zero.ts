import { Graphable } from "../../chart/Point.ts";
import { Line } from "../line.ts";

export function zero<T_X extends Graphable, T_Y extends number>(line_1: Line<T_X, T_Y>): Line<T_X, T_Y> {
    
    return line_1.map(() => 0) as Line<T_X, T_Y>;
}