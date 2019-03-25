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
        gl_PointSize = (1.0+ 3000.0 / length( mvPosition.xyz )) * 5.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(currentPos, 1.0);
    }
`;

export { point_vs };