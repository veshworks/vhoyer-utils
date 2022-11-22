import { test, describe, it, expect} from 'vitest';
import * as utils from '../coordinates';

const xy = (x: number, y: number = x) => ({x,y});
const wh = (w: number, h: number = w) => ({width: w,height: h});
test('xy and wh works as expected', () => {
  expect(xy(2, 4)).toEqual({ x: 2, y: 4 });
  expect(xy(2)).toEqual({ x: 2, y: 2 });
  expect(wh(2, 4)).toEqual({ width: 2, height: 4 });
  expect(wh(2)).toEqual({ width: 2, height: 2 });
});

describe('Utils > coordinates', () => {
  it('whtoxy converts a wh to a xy', () => {
    expect(utils.whtoxy(wh(1))).toEqual(xy(1));
    expect(utils.whtoxy(wh(5, 8))).toEqual(xy(5, 8));
  });

  it('xytowh converts a xy to a wh', () => {
    expect(utils.xytowh(xy(1))).toEqual(wh(1));
    expect(utils.xytowh(xy(5, 8))).toEqual(wh(5, 8));
  });

  it('xySame returns a coordinate', () => {
    expect(utils.xySame(1)).toEqual(xy(1));
    expect(utils.xySame(2)).toEqual(xy(2));
  });

  it('xyNeg returns negative coordinates', () => {
    expect(utils.xyNeg(xy(1, 4))).toEqual(xy(-1, -4));
    expect(utils.xyNeg(xy(-2, 6))).toEqual(xy(2, -6));
    expect(utils.xyNeg(xy(-3, -5))).toEqual(xy(3, 5));
  });

  it('xyInvert returns the coordinates 1/xy', () => {
    expect(utils.xyInvert(xy(2, 4))).toEqual(xy(1/2, 1/4));
    expect(utils.xyInvert(xy(1/2, 1/4))).toEqual(xy(2, 4));
  });

  it('xyCenter returns the middle point of a size', () => {
    expect(utils.xyCenter(wh(4, 6))).toEqual(xy(2, 3));
    expect(utils.xyCenter(wh(8, 2))).toEqual(xy(4, 1));
  });

  it('xyDivide divides N members one for another', () => {
    expect(utils.xyDivide(xy(8), xy(2))).toEqual(xy(4));
    expect(utils.xyDivide(xy(8), xy(2), xy(2), xy(2))).toEqual(xy(1));
  });

  it('xyTimes multiplies N members together', () => {
    expect(utils.xyTimes(xy(8), xy(2))).toEqual(xy(16));
    expect(utils.xyTimes(xy(2), xy(2), xy(2))).toEqual(xy(8));
  });

  it('xyAdd adds N members together', () => {
    expect(utils.xyAdd(xy(8), xy(2))).toEqual(xy(10));
    expect(utils.xyAdd(xy(8), xy(-3))).toEqual(xy(5));
  });

  it('xyMin gets the minimum member between N members', () => {
    expect(utils.xyMin(xy(8, 2), xy(21, 1))).toEqual(xy(8, 1));
    expect(utils.xyMin(xy(8, 2), xy(21, 1), xy(1, 0))).toEqual(xy(1, 0));
  });

  it('xyMax gets the maximum meber between N members', () => {
    expect(utils.xyMax(xy(8, 2), xy(21, 1))).toEqual(xy(21, 2));
    expect(utils.xyMax(xy(8, 2), xy(21, 1), xy(1, 0))).toEqual(xy(21, 2));
  });

  it('xySet overrides left member with right member xy values', () => {
    const other = Symbol();
    const target = { x: 2, y: 2, other };

    const subject = utils.xySet(target, xy(5, 2));

    expect(subject).toBe(target);
    expect(subject).toEqual({ x: 5, y: 2, other });
  });

  it('xyIncrement increments the left most member with the sum of the N other members', () => {
    const other = Symbol();
    const target = { x: 2, y: 2, other };

    const subject = utils.xyIncrement(target, xy(5, 2));

    expect(subject).toBe(target);
    expect(subject).toEqual({ x: 7, y: 4, other });

    utils.xyIncrement(target, xy(1, 1), xy(2, 0));

    expect(subject).toEqual({ x: 10, y: 5, other });
  });

  it('xyMultiply multiplies the left most member with the product of the N other members', () => {
    const other = Symbol();
    const target = { x: 2, y: 2, other };

    const subject = utils.xyMultiply(target, xy(5, 2));

    expect(subject).toBe(target);
    expect(subject).toEqual({ x: 10, y: 4, other });

    utils.xyMultiply(target, xy(1, 1), xy(2, 0));

    expect(subject).toEqual({ x: 20, y: 0, other });
  });

  it('xyApply runs a function between all x and y members of all parameters and returns', () => {
    expect(utils.xyApply(Math.floor, xy(3.5, 6.9))).toEqual(xy(3, 6));
    expect(utils.xyApply(Math.pow, xy(2), xy(3))).toEqual(xy(8));
    expect(utils.xyApply(Math.max, xy(1, 2), xy(3, 1), xy(20))).toEqual(xy(20));
  });

  it('xyCentroid calculates the centroid of N points given', () => {
    // example from
    // https://study.com/academy/lesson/how-to-find-the-centroid-of-a-triangle.html
    expect(utils.xyCentroid(xy(20,25), xy(30, 6), xy(4, 5))).toEqual(xy(18, 12));
  });

  it('xyDistanceSquared calculates the distance squared between two points given', () => {
    expect(utils.xyDistanceSquared(xy(2), xy(2))).toEqual(0);
    expect(utils.xyDistanceSquared(xy(1), xy(2))).toEqual(2);
    expect(utils.xyDistanceSquared(xy(0), xy(2))).toEqual(8);
    expect(utils.xyDistanceSquared(xy(0, 0), xy(10, 0))).toEqual(100);
  });
});
