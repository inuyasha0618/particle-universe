const point_fs: string = `
    uniform sampler2D tex;
    uniform float uTime;
    varying float vIndex;
    float N21(vec2 p);
    void main() {
        vec3 baseColor = sin(vec3(3.45, 6.56, 8.78) * uTime * 0.0003 + vIndex * 0.5) * 0.5 + 0.5;
        gl_FragColor = vec4(baseColor * texture2D(tex, gl_PointCoord).rgb, 1.0);
    }
`;

export { point_fs };