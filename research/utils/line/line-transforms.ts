
import { exponential_moving_avg } from "./line-fns/exponential-moving-average.ts";
import { shift_x } from "./line-fns/shift-x.ts";
import { shift_y } from "./line-fns/shift-y.ts";
import { simple_moving_avg } from "./line-fns/simple-moving-average.ts";
import { slice } from "./line-fns/slice.ts";
import { slope } from "./line-fns/slope.ts";
import { subtract } from "./line-fns/subtract.ts";
import { zero } from "./line-fns/zero.ts";
export const line_transforms = {
    shift_x,
    shift_y,
    simple_moving_avg,
    exponential_moving_avg,
    slice,
    subtract,
    zero,
    slope,
}

