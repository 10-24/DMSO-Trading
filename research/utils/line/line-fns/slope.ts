import { Graphable, Point } from "../../chart/Point.ts";
import { Line } from "../line.ts";

export function slope<T_X extends number, T_Y extends number>(line_1: Line<T_X, T_Y>): Line<number, number> {
    
    const slopes = new Line<number, number>([]);
    for (let i = 1; i < line_1.length() - 1; i++) {
        const slope_1 = get_slope(line_1.y[i],line_1.y[i-1]);
        const slope_2 = get_slope(line_1.y[i+1],line_1.y[i]);
        const avg_slope = (slope_1 + slope_2) / 2;
        slopes.push(line_1.x[i], avg_slope);
    }
    return slopes;

    function get_slope(y_2: number,y_1: number, ) {
        return y_2 - y_1;
    }
}