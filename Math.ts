interface Math {
    randomInt: (min: number, max: number) => number,
    randomFloat: (min: number, max: number) => number,
    mapLinear: (value: number, in_min: number, in_max: number, out_min: number, out_max: number) => number,
    generateUUID: () => string;
    radiansToDegrees: (value: number) => number;
    degreesToRadians: (value: number) => number;
    clamp: (value: number, min: number, max: number) => number;
    isPowerOfTwo: (value: number) => boolean;
}

/**
 * Returns a random integer in a specific range
 * @param {number} min Minimum value (inclusive)
 * @param {number} max Maximum value (inclusive)
 * @returns {number}
 */
Math.randomInt = (min: number, max: number): number => {
    //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Returns a random floating point number in a specific range
 * @param {number} low Minimum value (inclusive)
 * @param {number} high Maximum value (inclusive)
 * @returns {number}
 */
Math.randomFloat = (low: number, high: number): number => {
    return low + Math.random() * (high - low);
};

/**
 * Linear mapping of x from range [a1, a2] to range [b1, b2].
 * @param {number} x Value to be mapped.
 * @param {number} a1 Minimum value for range A.
 * @param {number} a2 Maximum value for range A.
 * @param {number} b1 Minimum value for range B.
 * @param {number} b2 Maximum value for range B.
 * @returns {number}
 */
Math.mapLinear = (x: number, a1: number, a2: number, b1: number, b2: number): number => {
    return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
};

/**
 * Generates globally-unique identifier
 * @returns {string}
 */
Math.generateUUID = (): string => {
    let lut: string[] = [];
    for (let i = 0; i < 256; i++) lut[i] = (i < 16 ? '0' : '') + (i).toString(16).toUpperCase();

    let d0: number = Math.random() * 0xffffffff | 0;
    let d1: number = Math.random() * 0xffffffff | 0;
    let d2: number = Math.random() * 0xffffffff | 0;
    let d3: number = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
        lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
        lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
        lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
};

/**
 * Converts radians to degrees.
 * @param {number} radians
 * @returns {number}
 */
Math.radiansToDegrees = (radians: number): number => {
    const RAD2DEG: number = 180 / Math.PI;
    return radians * RAD2DEG;
};

/**
 * Converts degrees to radians.
 * @param {number} degrees
 * @returns {number}
 */
Math.degreesToRadians = (degrees: number): number => {
    const DEG2RAD: number = Math.PI / 180;
    return degrees * DEG2RAD;
};

/**
 * Clamps the value to be between min and max.
 * @param {number} value Value to be clamped.
 * @param {number} min Minimum value.
 * @param {number} max Maximum value.
 * @returns {number}
 */
Math.clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
};

/**
 * Return true if n is a power of 2.
 * @param {number} value
 * @returns {boolean}
 */
Math.isPowerOfTwo = (value: number): boolean => {
    return (value & (value - 1)) === 0 && value !== 0;
};