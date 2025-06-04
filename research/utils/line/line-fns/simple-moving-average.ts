import {  Graphable, Point } from "../../chart/Point.ts";
import { Line } from "../line.ts";

export function simple_moving_avg<T_X extends Graphable, T_Y extends number>(line: Line<T_X, T_Y>,kernal_len: number,): Line<T_X, T_Y> {
 
    const moving_avg = new Line<T_X,T_Y>([]);
    
    
	const simulated_kernal_val = 1 / kernal_len;

	for (let data_index = kernal_len - 1; data_index < line.y.length; data_index++) {
        let avg = 0;
		
        
		for (let kernal_index = 0; kernal_index < kernal_len; kernal_index++) {
            const sma_index = data_index - kernal_index;
			avg += line.y[sma_index] * simulated_kernal_val;
		}
		const point = new Point(line.x[data_index], avg as T_Y);
		moving_avg.push(point);
	}
	return moving_avg;
}