namespace Polygon {

    /**
     * Interface of Point
     */
    interface Point {
        x: number,
        y: number,

        [propName: string]: any;
    }

    /**
     * Creates a regular n-sided polygon
     * @param {number} nSided Amount of edges
     * @param {number} sideLength Length of polygon's edge
     * @param {Polygon.Point} center Center of polygon
     * @returns {Polygon.Point[]}
     */
    export function CreateRegular(nSided: number, sideLength: number, center?: Point): Point[] {
        //https://www.mathopenref.com/polygonradius.html
        if (center === undefined) center = {x: 0, y: 0};
        let radius: number = sideLength / (2 * Math.sin(180 / nSided));
        let polygon: Point[] = [];
        for (let i = 0; i < 2 * Math.PI; i += (2 * Math.PI) / nSided) {
            let x = (radius * Math.cos(i)) + center.x;
            let y = (radius * Math.sin(i)) + center.y;
            polygon.push({x: x, y: y});
        }
        return polygon;
    }

    /**
     * Calculates the centre (centroid) of the set of vertices.
     * @param {Polygon.Point[]} polygon
     * @returns {Polygon.Point}
     */
    export function GetCenterPoint(polygon: Point[]): Point {
        let area: number = GetArea(polygon, true),
            centre: Point = {x: 0, y: 0};
        for (let i = 0; i < polygon.length; i++) {
            let j = (i + 1) % polygon.length;
            let cross: number = (polygon[i].x * polygon[j].y) - (polygon[i].y * polygon[j].x);
            centre.x += (polygon[i].x + polygon[j].x) * cross;
            centre.y += (polygon[i].y + polygon[j].y) * cross;
        }
        centre.x /= 6 * area;
        centre.y /= 6 * area;
        return centre;
    }

    /**
     * Calculates area of polygon
     * @param {Polygon.Point[]} polygon
     * @param {boolean} signed
     * @returns {number}
     */
    export function GetArea(polygon: Point[], signed?: boolean): number {
        if (signed === undefined) signed = false;
        let area = 0, j = polygon.length - 1;
        for (let i = 0; i < polygon.length; i++) {
            area += (polygon[j].x - polygon[i].x) * (polygon[j].y + polygon[i].y);
            j = i;
        }
        if (signed) return area / 2;
        return Math.abs(area) / 2;
    }

    /**
     * Calculates edges of polygon
     * @param {Polygon.Point[]} polygon
     * @returns {Polygon.Point[][]}
     */
    export function GetEdges(polygon: Point[]): Point[][] {
        let returnValues = [];
        let numberOfVertexPositions = polygon.length;
        for (let i = 0; i < numberOfVertexPositions; i++) {
            let vertexPosition = polygon[i];
            let iNext = i + 1;
            if (iNext >= numberOfVertexPositions) iNext = 0;
            let vertexPositionNext = polygon[iNext];
            let edge = [vertexPosition, vertexPositionNext];
            returnValues.push(edge);
        }
        return returnValues;
    }

    /**
     * Translates the set of vertices in-place by given vector.
     * @param {Polygon.Point[]} polygon
     * @param {Polygon.Point} vector
     */
    export function TranslateBy(polygon: Point[], vector: Point): void {
        for (let v of polygon) {
            v.x += vector.x;
            v.y += vector.y;
        }
    }

    /**
     * Moves polygon center to new position
     * @param {Polygon.Point[]} polygon
     * @param {Polygon.Point} position
     */
    export function TranslateTo(polygon: Point[], position: Point): void {
        let cp: Point = GetCenterPoint(polygon);
        position.x -= cp.x;
        position.y -= cp.y;
        for (let k of polygon) {
            k.x += position.x;
            k.y += position.y;
        }
    }

    /**
     * Rotates the polygon around center by angle radians.
     * @param {Polygon.Point[]} polygon Polygon to rotate
     * @param {number} angle The angle to rotate, in radians.
     * @param {Polygon.Point} point The point around which to rotate.
     */
    export function Rotate(polygon: Point[], angle: number, point: Point): void {
        if (angle === 0) return;
        let cos = Math.cos(angle),
            sin = Math.sin(angle);
        for (let i = 0; i < polygon.length; i++) {
            let vertice = polygon[i],
                dx = vertice.x - point.x,
                dy = vertice.y - point.y;
            vertice.x = point.x + (dx * cos - dy * sin);
            vertice.y = point.y + (dx * sin + dy * cos);
        }
    }

    /**
     * Scales the vertices from a point in-place.
     * @param {Polygon.Point[]} polygon
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {Polygon.Point} point
     */
    export function Scale(polygon: Point[], scaleX: number, scaleY: number, point?: Point): void {
        if (scaleX === 1 && scaleY === 1) return;
        point = point || GetCenterPoint(polygon);
        for (let i = 0; i < polygon.length; i++) {
            let vertex = polygon[i];
            let delta: Point = {x: 0, y: 0};
            delta.x = vertex.x - point.x;
            delta.y = vertex.y - point.y;
            polygon[i].x = point.x + delta.x * scaleX;
            polygon[i].y = point.y + delta.y * scaleY;
        }
    }

    /**
     * Sorts the input vertices into clockwise order in place.
     * @param {Polygon.Point[]} polygon
     */
    export function SortClockwise(polygon: Point[]): void {
        const mean = (vertices: Point[]): Point => {
            let average = {x: 0, y: 0};
            for (let i = 0; i < vertices.length; i++) {
                average.x += vertices[i].x;
                average.y += vertices[i].y;
            }
            average.x /= vertices.length;
            average.y /= vertices.length;
            return average;
        };
        const angle = (vectorA: Point, vectorB: Point): number => Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
        let centre: Point = mean(polygon);
        polygon.sort(function (vertexA, vertexB) {
            return angle(centre, vertexA) - angle(centre, vertexB);
        });
    }

}