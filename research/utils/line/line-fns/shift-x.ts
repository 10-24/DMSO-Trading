import { Graphable } from "../../chart/Point.ts";
import { Line } from "../line.ts";

export function shift_x<T_X extends Graphable, T_Y extends number>(line: Line<T_X, T_Y>, indecies: number): Line<T_X, T_Y> {

    if (indecies === 0)
        return line;

    for (let i = 0; i < Math.abs(indecies); i++)
        if (indecies < 0) {
            line.y.shift()
            line.x.pop()
        } else {
            line.y.pop()
            line.x.shift()
        }
    return line

}