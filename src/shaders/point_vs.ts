const point_vs: string = `
    attribute float aIndex;
    attribute vec3 aStarPos;
    varying float vIndex;
    uniform float uTime;
    void main() {
        vIndex = aIndex;
        // gl_PointSize = 6.0 + 5.0 * sin(0.002 * uTime + aIndex * 1.5);
        gl_PointSize = 15.0;
        // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(aStarPos, 1.0);
    }
`;

export { point_vs };