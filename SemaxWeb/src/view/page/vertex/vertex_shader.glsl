#version 300 es
precision mediump float;

//Two Floating point in it: X, Y
in vec2 vertPosition;

//Three floating points in it: R, G, B
in vec3 vertColor;

varying vec3 fragColor;

void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}