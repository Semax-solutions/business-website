#version 300 es
precision mediump float;

in vec2 vertPosition;

uniform float u_time;
uniform float u_tilt;
uniform float u_fov;
uniform float u_offsetY;
uniform float u_scale;

out float v_depth;

void main() {
    vec3 pos = vec3(
        vertPosition.x * u_scale,
        vertPosition.y * u_scale,
        0.0
    );

    // wave
    pos.z += sin(pos.x * 3.0 + u_time) * 0.15;

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

    gl_PointSize = 3.5 * depth;
    v_depth = depth;
}