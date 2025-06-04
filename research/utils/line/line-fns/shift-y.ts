import { Graphable } from "../../chart/Point.ts";
import { Line } from "../line.ts";

export function shift_y<T_X extends Graphable, T_Y extends number>(line_1: Line<T_X, T_Y>,shift:number): Line<T_X, T_Y> {
    
    return line_1.map(y => y + shift) as Line<T_X, T_Y>;
}