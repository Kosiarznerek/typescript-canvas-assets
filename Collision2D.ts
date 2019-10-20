/**
 * SPECIFICATION
 *
 * 1) POINT:object = {x:number, y:number}
 * 2) CIRCLE:object = {center: POINT, radius: number}
 * 3) LINE SEGMENT:POINT[2] = [POINT, POINT]
 * 4) POLYGON:POINT[x>=3] = [POINT, POINT, POINT, ...]
 */
namespace Collision2D {

    /**
     * Interface of Point
     */
    interface Point {
        x: number,
        y: number,

        [propName: string]: any;
    }

    /**
     * Interface of Circle
     */
    interface Circle {
        radius: number,
        center: Point,

        [propName: string]: any;
    }

    /**
     * Checks if a point lies on a line segment (between 2 other points)
     * @param {Collision2D.Point} point Object with 'x' and 'y' property
     * @param {Collision2D.Point[]} line Array with two points
     * @param threshold Number x>=0 allows to decrease algorithm precision. Default is 0 (the highest precision)
     * @returns {boolean} True when it does
     */
    export function PointOnLineSegment(point: Point, line: Point[], threshold = 0): boolean {
        //https://stackoverflow.com/questions/11907947/how-to-check-if-a-point-lies-on-a-line-between-2-other-points
        let currPoint: Point = point, point1: Point = line[0], point2: Point = line[1];
        let dxc: number = currPoint.x - point1.x;
        let dyc: number = currPoint.y - point1.y;
        let dxl: number = point2.x - point1.x;
        let dyl: number = point2.y - point1.y;
        let cross: number = dxc * dyl - dyc * dxl;
        if (Math.abs(cross) > threshold) return false;
        if (Math.abs(dxl) >= Math.abs(dyl))
            return dxl > 0 ?
                point1.x <= currPoint.x && currPoint.x <= point2.x :
                point2.x <= currPoint.x && currPoint.x <= point1.x;
        else
            return dyl > 0 ?
                point1.y <= currPoint.y && currPoint.y <= point2.y :
                point2.y <= currPoint.y && currPoint.y <= point1.y;
    }

    /**
     * Checks if point belongs to circle.
     * Point belongs to circle when dist < radius
     * @param {Collision2D.Point} point Object with 'x' and 'y' property
     * @param {Collision2D.Circle} circle Object with 'center':Point and 'radius':number property
     * @returns {boolean} True when point is inside circle
     */
    export function PointInsideCircle(point: Point, circle: Circle): boolean {
        let p1: Point = point, p2: Point = circle.center;
        let dist = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * p1.y - p2.y);
        return (dist < circle.radius);
    }

    /**
     * Checks if point belongs to circle.
     * @param {Collision2D.Point} point Object with 'x' and 'y' property
     * @param {Collision2D.Point[]} polygon Array of points
     * @returns {boolean} True when point is inside polygon
     */
    export function PointInsidePolygon(point: Point, polygon: Point[]): boolean {
        //https://github.com/substack/point-in-polygon
        let x: number = point.x;
        let y: number = point.y;
        let inside: boolean = false;

        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            let xi: number = polygon[i].x;
            let yi: number = polygon[i].y;
            let xj: number = polygon[j].x;
            let yj: number = polygon[j].y;
            let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside
        }

        return inside
    }

    /**
     * Calculates cross point of two line segments.
     * @param {Collision2D.Point[]} line1 Array with two points represents line1
     * @param {Collision2D.Point[]} line2 Array with two points represents line1
     * @returns {Collision2D.Point | null} Cross point {x: number, y: number} or null if point doesn't exist
     */
    export function LineSegmentsIntersection(line1: Point[], line2: Point[]): Point | null {
        //https://stackoverflow.com/questions/563198/whats-the-most-efficent-way-to-calculate-where-two-line-segments-intersect
        let e1 = line1, e2 = line2;
        let s1_x, s1_y, s2_x, s2_y;
        s1_x = e1[1].x - e1[0].x;
        s1_y = e1[1].y - e1[0].y;
        s2_x = e2[1].x - e2[0].x;
        s2_y = e2[1].y - e2[0].y;

        let s, t;
        s = (-s1_y * (e1[0].x - e2[0].x) + s1_x * (e1[0].y - e2[0].y)) / (-s2_x * s1_y + s1_x * s2_y);
        t = (s2_x * (e1[0].y - e2[0].y) - s2_y * (e1[0].x - e2[0].x)) / (-s2_x * s1_y + s1_x * s2_y);

        if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
            let x = ((e1[1].x - e1[0].x) * (e2[1].x * e2[0].y - e2[1].y * e2[0].x) - (e2[1].x - e2[0].x) * (e1[1].x * e1[0].y - e1[1].y * e1[0].x)) / ((e1[1].y - e1[0].y) * (e2[1].x - e2[0].x) - (e2[1].y - e2[0].y) * (e1[1].x - e1[0].x));
            let y = ((e2[1].y - e2[0].y) * (e1[1].x * e1[0].y - e1[1].y * e1[0].x) - (e1[1].y - e1[0].y) * (e2[1].x * e2[0].y - e2[1].y * e2[0].x)) / ((e2[1].y - e2[0].y) * (e1[1].x - e1[0].x) - (e1[1].y - e1[0].y) * (e2[1].x - e2[0].x));
            return {x: x, y: y};
        } else return null;
    }

    /**
     * Checks if two line segments overlaps each other.
     * @param {Collision2D.Point[]} line1 Array with two points represents line1
     * @param {Collision2D.Point[]} line2 Array with two points represents line1
     * @returns {boolean}
     */
    export function LineSegmentsOverlapping(line1: Point[], line2: Point[]): boolean {
        let pointA: Point = line1[0], pointB: Point = line1[1];
        let pointC: Point = line2[0], pointD: Point = line2[1];
        return (PointOnLineSegment(pointC, line1) && PointOnLineSegment(pointB, line2)) ||
            (PointOnLineSegment(pointD, line1) && PointOnLineSegment(pointB, line2)) ||
            (PointOnLineSegment(pointA, line2) && PointOnLineSegment(pointC, line1)) ||
            (PointOnLineSegment(pointA, line2) && PointOnLineSegment(pointD, line1)) ||
            (PointOnLineSegment(pointA, line2) && PointOnLineSegment(pointB, line2)) ||
            (PointOnLineSegment(pointD, line1) && PointOnLineSegment(pointC, line1))
    }

    /**
     * Calculates cross points of line segment and circle
     * @param {Collision2D.Point[]} line Array with two points
     * @param {Collision2D.Circle} circle Object with 'center':Point and 'radius':number property
     * @returns {Collision2D.Point[] | null} Array of cross points {x:number, y:number} or null if point doesn't exist
     */
    export function LineSegmentCircleIntersection(line: Point[], circle: Circle): Point[] | null {
        //https://stackoverflow.com/questions/37224912/circle-line-segment-collision
        let b: number, c: number, d: number, u1: number, u2: number, ret: Point[], retP1: Point, retP2: Point,
            v1: Point, v2: Point;
        v1 = {x: 0, y: 0};
        v2 = {x: 0, y: 0};
        v1.x = line[1].x - line[0].x;
        v1.y = line[1].y - line[0].y;
        v2.x = line[0].x - circle.center.x;
        v2.y = line[0].y - circle.center.y;
        b = (v1.x * v2.x + v1.y * v2.y);
        c = 2 * (v1.x * v1.x + v1.y * v1.y);
        b *= -2;
        d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
        if (isNaN(d)) return null;
        u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
        u2 = (b + d) / c;
        retP1 = {x: 0, y: 0};   // return points
        retP2 = {x: 0, y: 0};
        ret = []; // return array
        if (u1 <= 1 && u1 >= 0) {  // add point if on the line segment
            retP1.x = line[0].x + v1.x * u1;
            retP1.y = line[0].y + v1.y * u1;
            ret[0] = retP1;
        }
        if (u2 <= 1 && u2 >= 0) {  // second add point if on the line segment
            retP2.x = line[0].x + v1.x * u2;
            retP2.y = line[0].y + v1.y * u2;
            ret[ret.length] = retP2;
        }
        if (ret.length == 0) return null;
        return ret;
    }

    /**
     * Calculates cross point of line segment and polygon
     * @param {Collision2D.Point[]} line Array with two points
     * @param {Collision2D.Point[]} polygon Array of points
     * @returns {Collision2D.Point[] | null} Array of cross points {x:number, y:number} or null if point doesn't exist
     */
    export function LineSegmentPolygonIntersection(line: Point[], polygon: Point[]): Point[] | null {
        let toReturn: Point[] = [];

        let poly_edges: Array<Point[]> = _GetPolygonEdges(polygon);
        for (let i = 0; i < poly_edges.length; i++) {
            let edge: Point[] = poly_edges[i];
            let cross_point: Point | null = LineSegmentsIntersection(edge, line);
            if (cross_point !== null) toReturn.push(cross_point);
        }

        if (toReturn.length === 0) return null;
        else return toReturn;
    }

    /**
     * Converts polygon's vertices into edges
     * @param {Collision2D.Point[]} polygon Array of polygon's vertices
     * @returns {Array<Collision2D.Point[]>} Array line segments representing all edges of polygon
     * @private
     */
    function _GetPolygonEdges(polygon: Point[]): Array<Point[]> {
        let returnValues = [];

        for (let i = 0; i < polygon.length; i++) {
            let vertexPosition: Point = polygon[i];
            let iNext = i + 1;
            if (iNext >= polygon.length) iNext = 0;
            let vertexPositionNext: Point = polygon[iNext];
            let edge = [vertexPosition, vertexPositionNext];
            returnValues.push(edge);
        }

        return returnValues;
    }

    /**
     * Calculates cross points of two polygons
     * @param {Collision2D.Point[]} polygon1 Array of points
     * @param {Collision2D.Point[]} polygon2 Array of points
     * @returns {Collision2D.Point[] | null} Array of cross points {x:number, y:number} or null if point doesn't exist
     */
    export function PolygonsIntersection(polygon1: Point[], polygon2: Point[]): Point[] | null {
        let toReturn: Point[] = [];

        let pe1 = _GetPolygonEdges(polygon1);
        let pe2 = _GetPolygonEdges(polygon2);
        for (let i = 0; i < pe1.length; i++) {
            for (let j = 0; j < pe2.length; j++) {
                let p: Point | null = LineSegmentsIntersection(pe1[i], pe2[j]);
                if (p !== null) toReturn.push(p);
            }
        }

        if (toReturn.length === 0) return null;
        else return toReturn;
    }

    /**
     * Checks if two polygons overlaps each other.
     * They are overlapping when they have got intersection points or one of them is inside other
     * (Inside each other does not mean they have got intersection points, but they are overlapping)
     * @param {Collision2D.Point[]} polygon1 Array of points
     * @param {Collision2D.Point[]} polygon2 Array of points
     * @returns {boolean} True when they are overlapping
     */
    export function PolygonsOverlapping(polygon1: Point[], polygon2: Point[]): boolean {
        let in_points: Point[] | null = PolygonsIntersection(polygon1, polygon2);
        if (in_points !== null) return true;
        return PointInsidePolygon(polygon1[0], polygon2) || PointInsidePolygon(polygon2[0], polygon1);
    }

    /**
     * Calculates cross points of two circles.
     * @param {Collision2D.Circle} circle1 Object with 'center':Point and 'radius':number property
     * @param {Collision2D.Circle} circle2 Object with 'center':Point and 'radius':number property
     * @returns {Collision2D.Point[] | null} Array of cross points {x:number, y:number} or null if point doesn't exist
     */
    export function CirclesIntersection(circle1: Circle, circle2: Circle): Point[] | null {
        //https://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci
        let x0 = circle1.center.x, y0 = circle1.center.y, r0 = circle1.radius;
        let x1 = circle2.center.x, y1 = circle2.center.y, r1 = circle2.radius;
        let a: number, dx: number, dy: number, d: number, h: number, rx: number, ry: number;
        let x2: number, y2: number;
        dx = x1 - x0;
        dy = y1 - y0;
        d = Math.sqrt((dy * dy) + (dx * dx));
        if (d > (r0 + r1)) return null;
        if (d < Math.abs(r0 - r1)) return null;
        a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);
        x2 = x0 + (dx * a / d);
        y2 = y0 + (dy * a / d);
        h = Math.sqrt((r0 * r0) - (a * a));
        rx = -dy * (h / d);
        ry = dx * (h / d);
        let xi: number = x2 + rx;
        let xi_prime: number = x2 - rx;
        let yi: number = y2 + ry;
        let yi_prime: number = y2 - ry;
        if (xi == xi_prime && yi == yi_prime) return [{x: xi, y: yi}];
        else return [
            {x: xi, y: yi},
            {x: xi_prime, y: yi_prime}
        ]
    }

    /**
     * Checks if two circles overlaps each other.
     * They are overlapping when sum of their radii is greater than dist between their centers
     * @param {Collision2D.Circle} circle1 Object with 'center':Point and 'radius':number property
     * @param {Collision2D.Circle} circle2 Object with 'center':Point and 'radius':number property
     * @returns {boolean} True when they are overlapping
     */
    export function CirclesOverlapping(circle1: Circle, circle2: Circle): boolean {
        let p1: Point = circle1.center, p2 = circle2.center;
        let dist: number = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * p1.y - p2.y);
        let r_sum: number = circle1.radius + circle2.radius;
        return dist < r_sum;
    }

    /**
     * Calculates cross points between circle and polygon
     * @param {Collision2D.Circle} circle Object with 'center':Point and 'radius':number property
     * @param {Collision2D.Point[]} polygon Array of points
     * @returns {Collision2D.Point[] | null} Array of cross points {x:number, y:number} or null if point doesn't exist
     */
    export function CirclePolygonIntersection(circle: Circle, polygon: Point[]): Point[] | null {
        let toReturn: Point[] = [];

        let poly_edges: Array<Point[]> = _GetPolygonEdges(polygon);
        for (let i = 0; i < poly_edges.length; i++) {
            let edge: Point[] = poly_edges[i];
            let cross_points: Point[] | null = LineSegmentCircleIntersection(edge, circle);
            if (cross_points !== null) for (let point of cross_points) toReturn.push(point);
        }

        if (toReturn.length === 0) return null;
        else return toReturn;
    }

    /**
     * Checks if circle overlaps polygon
     * They are overlapping when they have got intersection points or one of them is inside other
     * (Inside each other does not mean they have got intersection points, but they are overlapping)
     * @param {Collision2D.Circle} circle Object with 'center':Point and 'radius':number property
     * @param {Collision2D.Point[]} polygon Array of points
     * @returns {boolean} True when they are overlapping
     */
    export function CirclePolygonOverlapping(circle: Circle, polygon: Point[]): boolean {
        let cross_points: Point[] | null = CirclePolygonIntersection(circle, polygon);
        if (cross_points !== null) return true;
        if (PointInsideCircle(polygon[0], circle)) return true;
        return PointInsidePolygon(circle.center, polygon);
    }
}
