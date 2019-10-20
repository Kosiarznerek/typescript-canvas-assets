class Vector2 {
    public x: number;
    public y: number;

    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
        return this;
    }

    public static Add(v1: Vector2, v2: Vector2): Vector2 {
        let x = v1.x + v2.x;
        let y = v1.y + v2.y;
        return new Vector2(x, y);
    }

    public static AddScalar(v: Vector2, s: number): Vector2 {
        let x = v.x + s;
        let y = v.y + s;
        return new Vector2(x, y);
    }

    public static Subtract(v1: Vector2, v2: Vector2): Vector2 {
        let x = v1.x - v2.x;
        let y = v1.y - v2.y;
        return new Vector2(x, y);
    }

    public static SubtractScalar(v: Vector2, s: number): Vector2 {
        let x = v.x - s;
        let y = v.y - s;
        return new Vector2(x, y);
    }

    public static Multiply(v1: Vector2, v2: Vector2): Vector2 {
        let x = v1.x * v2.x;
        let y = v1.y * v2.y;
        return new Vector2(x, y);
    }

    public static MultiplyScalar(v: Vector2, s: number): Vector2 {
        let x = v.x * s;
        let y = v.y * s;
        return new Vector2(x, y);
    }

    public static Divide(v1: Vector2, v2: Vector2): Vector2 {
        let x = v1.x / v2.x;
        let y = v1.y / v2.y;
        return new Vector2(x, y);
    }

    public static DivideScalar(v: Vector2, s: number): Vector2 {
        let x = v.x / s;
        let y = v.y / s;
        return new Vector2(x, y);
    }

    public static Length(v: Vector2): number {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    public static Normalize(v: Vector2): Vector2 {
        let length: number = Math.sqrt(v.x * v.x + v.y * v.y) || 1;
        let x = v.x / length;
        let y = v.y / length;
        return new Vector2(x, y);
    }

    public static DistanceBetween(v1: Vector2, v2: Vector2): number {
        let dx: number = v1.x - v2.x, dy = v1.y - v2.y;
        let dsq: number = dx * dx + dy * dy;
        return Math.sqrt(dsq);
    }

    public static SetLength(v: Vector2, length: number): Vector2 {
        //Normalize
        let len: number = Math.sqrt(v.x * v.x + v.y * v.y) || 1;
        let x = v.x / len;
        let y = v.y / len;

        //Multiply
        x *= length;
        y *= length;
        return new Vector2(x, y);
    }

    public static RotateAround(v: Vector2, center: Vector2, angle: number): Vector2 {
        let c: number = Math.cos(angle), s = Math.sin(angle);

        let x: number = v.x - center.x;
        let y: number = v.y - center.y;

        let nx = x * c - y * s + center.x;
        let ny = x * s + y * c + center.y;
        return new Vector2(nx, ny);
    }

    /**
     * Converts point object to Vector2 object
     * @returns {Vector2}
     * @param point
     */
    public static ConvertObject(point: { x: number, y: number, [propName: string]: any }): Vector2 {
        return new Vector2(point.x, point.y);
    }

    /**
     * Converts array of point to Vector2 array
     * @returns {Vector2[]}
     * @param points
     */
    public static ConvertArray(points: Array<{ x: number, y: number, [propName: string]: any }>): Vector2[] {
        let toReturn: Vector2[] = [];
        for (let i = 0; i < points.length; i++) toReturn.push(new Vector2(points[i].x, points[i].y));
        return toReturn;
    }

    /**
     * Returns a new Vector2 with the same x and y values as this one.
     * @returns {Vector2}
     */
    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    /**
     * Copies the values of the passed Vector2's x and y properties to this Vector2.
     * @param {Vector2} v
     */
    public copy(v: Vector2): Vector2 {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    /**
     * Addition of two Vectors
     * @param {Vector2} v
     */
    public add(v: Vector2): Vector2 {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * Scalar addition by given value
     * @param {number} s
     */
    public addScalar(s: number): Vector2 {
        this.x += s;
        this.y += s;
        return this;
    }

    /**
     * Subtraction of two Vectors
     * @param {Vector2} v
     */
    public subtract(v: Vector2): Vector2 {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * Scalar subtraction by given value
     * @param {number} s
     */
    public subtractScalar(s: number): Vector2 {
        this.x -= s;
        this.y -= s;
        return this;
    }

    /**
     * Multiplication of two Vectors
     * @param {Vector2} v
     */
    public multiply(v: Vector2): Vector2 {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    /**
     * Scalar multiplication by given value
     * @param {number} s
     */
    public multiplyScalar(s: number): Vector2 {
        this.x *= s;
        this.y *= s;
        return this;
    }

    /**
     * Division of two Vectors
     * @param {Vector2} v
     */
    public divide(v: Vector2): Vector2 {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    /**
     * Scalar division by given value
     * @param {number} s
     */
    public divideScalar(s: number): Vector2 {
        this.x /= s;
        this.y /= s;
        return this;
    }

    /**
     * Calculates Vector's length
     * @returns {number}
     */
    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Sets length of Vector to 1
     */
    public normalize(): Vector2 {
        let length: number = Math.sqrt(this.x * this.x + this.y * this.y) || 1;
        this.x /= length;
        this.y /= length;
        return this;
    }

    /**
     * Calculates distance between two Vectors
     * @param {Vector2} v
     * @returns {number}
     */
    public distanceTo(v: Vector2): number {
        let dx: number = this.x - v.x, dy = this.y - v.y;
        let dsq: number = dx * dx + dy * dy;
        return Math.sqrt(dsq);
    }

    /**
     * Sets the length of vector to given value
     * @param {number} length
     */
    public setLength(length: number): Vector2 {
        //Normalize
        let len: number = Math.sqrt(this.x * this.x + this.y * this.y) || 1;
        this.x /= len;
        this.y /= len;

        //Multiply
        this.x *= length;
        this.y *= length;
        return this;
    }

    /**
     * Rotates the vector around center by angle radians.
     * @param {Vector2} center The point around which to rotate.
     * @param {number} angle The angle to rotate, in radians.
     */
    public rotateAround(center: Vector2, angle: number): Vector2 {
        let c: number = Math.cos(angle), s = Math.sin(angle);

        let x: number = this.x - center.x;
        let y: number = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }

    /**
     * Sets random direction to vector
     * @returns {Vector2}
     */
    public setRandomDirection(): Vector2 {
        const getRandomArbitrary = (min: number, max: number): number => Math.random() * (max - min) + min;
        this.x = getRandomArbitrary(-100, 100);
        this.y = getRandomArbitrary(-100, 100);
        this.normalize();
        return this;
    }
}
