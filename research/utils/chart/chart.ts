import { document } from "jsr:@ry/jupyter-helper";
import * as Plot from 'npm:@observablehq/plot';
import { Graphable } from "./Point.ts";
import { Line } from "../line/line.ts";

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 350;
const LINE_COLORS = [
    'rgb(255, 255, 255)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(103, 255, 86)',
    'rgb(255, 99, 132)',
];


type TickObj = { [K in string]: (number | Date | any) }

export class Chart<T_X extends Graphable = Date, T_Y extends Graphable = number> {
    lines: Line<T_X, T_Y>[] = [];

    add_line(line: Line<T_X, T_Y>): void;
    add_line<T_Obj extends TickObj, K_X extends keyof T_Obj, K_Y extends keyof T_Obj>(
        obj_array: T_Obj[],
        keys: { x: K_X, y: K_Y },
        options?: Plot.LineOptions
    ): void;
    add_line<T_Obj extends TickObj, K_X extends keyof T_Obj, K_Y extends keyof T_Obj>(
        obj_array_or_line: T_Obj[] | Line<T_Obj[K_X], T_Obj[K_Y]>,
        keys?: { x: K_X, y: K_Y },
        options?: Plot.LineOptions
    ) {
        const stroke = options?.stroke || LINE_COLORS[this.lines.length % LINE_COLORS.length]
        if (obj_array_or_line instanceof Line) {
            obj_array_or_line.render_options = { stroke, ...obj_array_or_line.render_options }
            this.lines.push(obj_array_or_line);
            return;
        }
        if (!keys) {
            throw new Error("Keys are required when passing an object array");
        }
        const line_from_obj = Line.from_object_array(obj_array_or_line, keys, { stroke, ...options })
        this.lines.push(line_from_obj);
    }

    render() {

        const timeString = `@ ${new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        })}`;
        
        const marks = this.lines.map(line => line.to_plot_line())
        const plot = Plot.plot({
            marks,
            grid: true,
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            style: {
                background: "#1a1a1a",

            },
            caption: timeString,
            document,
            color: {
                legend: true,
            }
        });

        return plot

    }


}

