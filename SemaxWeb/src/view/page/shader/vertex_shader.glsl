#version 300 es
precision mediump float;

in vec2 vertPosition;

uniform float u_time;
uniform float u_tilt;
uniform float u_fov;
uniform float u_offsetY;
uniform float u_scale;

out float v_depth;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
    vec3 pos = vec3(
        vertPosition.x * u_scale,
        vertPosition.y * u_scale,
        0.0
    );

    // wave
    vec2 segmentSize = vec2(0.45, 0.45);
    vec2 segmentId = floor(vertPosition / segmentSize);
    vec2 segmentCenter = (segmentId + 0.5) * segmentSize;
    float dist = length(vertPosition - segmentCenter);
    float influence = smoothstep(
        segmentSize.x * 0.6,
        0.0,
        dist
    );
    float segmentRand = hash(segmentId);
    float waveSpeed = 0.5;     // ⬇ slower = fewer waves
    float waveHeight = 0.16;   // ⬆ deeper & higher
    float wavePhase = segmentRand * 6.2831;

    float t = u_time * waveSpeed + wavePhase;
    pos.z += sin(t) * waveHeight * influence;

    // tilt grid backward (X axis)
    float c = cos(u_tilt);
    float s = sin(u_tilt);
    vec3 rotated = vec3(
        pos.x,
        pos.y * c - pos.z * s,
        pos.y * s + pos.z * c
    );

    rotated.y += u_offsetY;

    // perspective
    float depth = u_fov / (u_fov + rotated.z);
    gl_Position = vec4(rotated.xy * depth, 0.0, 1.0);

    gl_PointSize = 1.5 * depth;
    v_depth = depth;
}