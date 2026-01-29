#version 300 es
precision mediump float;

in float v_depth;
out vec4 color;

void main() {
    float alpha = smoothstep(0.0, 1.0, v_depth);
    color = vec4(0.35, 0.75, 0.7, alpha);
}