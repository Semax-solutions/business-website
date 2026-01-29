#version 300 es
precision mediump float;

in vec2 vertPosition;

uniform vec2 canvasSize;
uniform vec2 shapeLocation;
uniform float shapeSize;

void main() {
    vec2 finalVertexPosition = vertPosition * shapeSize + shapeLocation;
    vec2 clipPosition = (finalVertexPosition / canvasSize) * 2.0 - 1.0;
    gl_Position = vec4(clipPosition, 0.0, 1.0);
}
