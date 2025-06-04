// deno-lint-ignore-file no-explicit-any
import * as Plot from 'npm:@observablehq/plot';
import { Graphable, Point } from "../chart/Point.ts";
import { line_transforms } from "./line-transforms.ts";
export class Line<T_X extends Graphable, T_Y extends Graphable> {
    x: T_X[];
    y: T_Y[];
    history: string[];
    render_options: Plot.LineOptions;
    /**
        To create a line with no points, pass an empty array.
     */
    constructor(points: Point<T_X, T_Y>[], render_options: Plot.LineOptions = {}, history: string[] = []) {
        this.x = points.map(point => point.x)
        this.y = points.map(point => point.y)
        this.render_options = render_options
        this.history = history
    }

    map(fn: (y: T_Y, index: number) => number) {
        const points = this.y.map((y, index) =>
            new Point(this.x[index], fn(y, index))
        )
        return new Line(points)
    }

    for_each(fn: (y: T_Y, index: number, x: T_X) => any) {
        this.y.forEach((y, index) => {
            fn(y, index, this.x[index])
        })
    }

    to_array() {
        this.warn_if_lengths_are_unequal()
        return this.x.map((x, index) => [x, this.y[index]])
    }

    to_plot_line() {
        return Plot.line(this.to_array(), this.render_options)
    }
    push(x: T_X, y: T_Y): void
    push(point: Point<T_X, T_Y>): void
    push(x_or_point: Point<T_X, T_Y> | T_X, y?: T_Y) {
        if (x_or_point instanceof Point) {
            this.x.push(x_or_point.x);
            this.y.push(x_or_point.y);
            return
        }
        if (y === undefined) {
            throw new Error("y must be defined")
        }
        this.x.push(x_or_point)
        this.y.push(y)
    }

    static from_object_array<T_Obj extends { [K in keyof T_Obj]: Graphable }, K_X extends keyof T_Obj, K_Y extends keyof T_Obj,>(array: T_Obj[], keys: { x: K_X, y: K_Y }, options?: Plot.LineOptions) {
        const points = array.map(point =>
            new Point<T_Obj[K_X], T_Obj[K_Y]>(point[keys.x], point[keys.y])
        );
        return new Line(points, options);
    }

    get_point(index: number) {
        return new Point(this.x[index], this.y[index])
    }
    clone(): Line<T_X, T_Y> {
        return new Line(
            this.x.map((x, index) => new Point(x, this.y[index])),
            this.render_options ? structuredClone(this.render_options) : undefined,
            structuredClone(this.history)
        );
    }

    length() {
        this.warn_if_lengths_are_unequal()
        return this.x.length
    }

    private warn_if_lengths_are_unequal() {
        if (this.x.length !== this.y.length)
            console.warn("X and Y aren't the same length");
    }

    transform<T extends keyof typeof line_transforms>(name: T, ...args: Tail<Parameters<typeof line_transforms[T]>>):ReturnType<typeof line_transforms[T]> {
        const new_line = this.clone()
        new_line.add_history(name)
        return line_transforms[name](new_line, ...args)
    }

    add_history(name: string) {
        this.history.push(name)
    }
}

type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;
