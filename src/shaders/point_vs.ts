const point_vs: string = `
    attribute float aIndex;
    attribute vec3 aStarPos;
    varying float vIndex;
    uniform float uTime;
    uniform float percent;
    void main() {
        vIndex = aIndex;
        vec3 currentPos = mix(aStarPos, position, percent);
        vec4 mvPosition = modelViewMatrix * vec4( currentPos, 1.0 );
        float size = mix((0.01 + 10000.0 / length( mvPosition.xyz )) * 1.0, 2.5, percent);
        gl_PointSize = size;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(currentPos, 1.0);
    }
`;

export { point_vs };