import { Graphable } from "../../chart/Point.ts";
import { Line } from "../line.ts";


/**  0 < `decay` < 1 */
export function exponential_moving_avg<T_X extends Graphable, T_Y extends number>(line: Line<T_X, T_Y>,decay: number): Line<T_X, T_Y> {
    if(decay <= 0 || decay >= 1)
        throw new Error("decay must be between 0 and 1")
    const ema = new Line<T_X, T_Y>([]);
    
    line.for_each((y, index, x) => {
        if (index === 0)
            return ema.push(x, y)
        const ema_val = y * decay + ((1 - decay) * ema.y[index - 1])
        ema.push(x, ema_val as T_Y)
    })
    return ema;

}
