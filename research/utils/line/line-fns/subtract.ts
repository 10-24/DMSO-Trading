import { Graphable } from "../../chart/Point.ts";
import { Line } from "../line.ts";

export function subtract<T_X extends Graphable, T_Y extends number>(line_1: Line<T_X, T_Y>, line_2: Line<T_X, T_Y>): Line<T_X, T_Y> {
    
    return line_1.map((y, index) => y - line_2.y[index]) as Line<T_X, T_Y>;
}
