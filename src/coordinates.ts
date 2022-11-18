type XY = { x: number; y: number };
type WH = { width: number; height: number };
type Transform = (...args: number[]) => number;

const xyDivideTwo = ({ x: x1, y: y1 }: XY, { x: x2, y: y2 }: XY) => ({ x: x1 / x2, y: y1 / y2 });
const xyTimesTwo = ({ x: x1, y: y1 }: XY, { x: x2, y: y2 }: XY) => ({ x: x1 * x2, y: y1 * y2 });
const xyAddTwo = ({ x: x1, y: y1 }: XY, { x: x2, y: y2 }: XY) => ({ x: x1 + x2, y: y1 + y2 });
const xyMinTwo = ({ x: x1, y: y1 }: XY, { x: x2, y: y2 }: XY) => ({ x: Math.min(x1, x2), y: Math.min(y1, y2) });
const xyMaxTwo = ({ x: x1, y: y1 }: XY, { x: x2, y: y2 }: XY) => ({ x: Math.max(x1, x2), y: Math.max(y1, y2) });

export const xyDivide = (...xys: XY[]) => xys.reduce(xyDivideTwo);
export const xyTimes = (...xys: XY[]) => xys.reduce(xyTimesTwo);
export const xyAdd = (...xys: XY[]) => xys.reduce(xyAddTwo);
export const xyMin = (...xys: XY[]) => xys.reduce(xyMinTwo);
export const xyMax = (...xys: XY[]) => xys.reduce(xyMaxTwo);

export const xyInvert = ({ x, y }: XY) => ({ x: 1 / x, y: 1 / y });
export const xyNeg = ({ x, y }: XY) => ({ x: -x, y: -y });
export const xySame = (v: number) => ({ x: v, y: v });
export const xyCenter = ({ width, height }: WH) => ({ x: (width / 2), y: (height / 2) });

export const whtoxy = ({ width, height }: WH) => ({ x: width, y: height });
export const xytowh = ({ x, y }: XY) => ({ width: x, height: y });

export const xySet = (target: XY, { x, y }: XY) => Object.assign(target, { x, y });
export const xyIncrement = (target: XY, ...xys: XY[]) => xySet(target, xyAdd(target, ...xys));
export const xyMultiply = (target: XY, ...xys: XY[]) => xySet(target, xyTimes(target, ...xys));

export const xyApply = (fn: Transform, ...xys: XY[]) => ({ x: fn(...xys.map(p => p.x)), y: fn(...xys.map(p => p.y)) });

export const xyCentroid = (...xys: XY[]) => xyDivide(xyAdd(...xys), xySame(xys.length));
export const xyDistanceSquared = ({ x: x1, y: y1 }: XY, { x: x2, y: y2 }: XY) => Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
