export class Point<T_X extends Graphable, T_Y extends Graphable> {
    constructor(public x: T_X, public y: T_Y) { }
    static from_array<T_X extends Graphable, T_Y extends Graphable>(arr: [T_X, T_Y]) {
        return new Point<T_X, T_Y>(arr[0], arr[1]);
    }
}

export type Graphable = Date | number