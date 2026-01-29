import { useEffect, useRef } from "react";
import classes from './css/TestPage.module.css'

import vertextTriangleShader from './shader/triangle.vert.glsl?raw'
import fragmentTriangleShader from './shader/triangle.frag.glsl?raw'

const TriangleTest = () => {
    const canvasRef = useRef<null | HTMLCanvasElement>(null);

    const glRef = useRef<null | WebGL2RenderingContext>(null);

    const canvasSizeRef = useRef<WebGLUniformLocation | null>(null);
    const shapeLocation = useRef<WebGLUniformLocation | null>(null);
    const shapeSize = useRef<WebGLUniformLocation | null>(null);
    const vertColor = useRef<WebGLUniformLocation | null>(null);

    // Gpu like to use a 32bit float and javascript uses a 64bit float 
    // that why we use a 32bit float array
    const vertex = new Float32Array([
        0.0, 0.5,
        0.5, -0.5,
        -0.5, -0.5
    ]);

    const rgbList = new Uint8Array([
        255, 0, 0,
        0, 255, 0,
        0, 0, 255
    ]);

    const randomColor = new Uint8Array([
        Math.random() * 255,
        Math.random() * 255,
        Math.random() * 255
    ]);

    useEffect(() => {
        makeTriangle();
    }, [])

    const makeTriangle = () => {
        const canvas = canvasRef.current;
        if(canvas === null) throw new Error("Canvas not found");
        
        const gl = getContext(canvas);

        glRef.current = gl;

        // (R, G, B, A) = (Red, Green, Blue, Alfa)
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const triangleBuffer = createBuffer(gl, vertex);
        const rgbBuffer = createBuffer(gl, rgbList);
        const randomBuffer = createBuffer(gl, randomColor);


        const program = createProgram(gl, vertextTriangleShader, fragmentTriangleShader);

        // Render the frame
        // Ask for position of the attribute
        const vertPos = gl.getAttribLocation(program, 'vertPosition')
        const vertColorPos = gl.getAttribLocation(program, 'vertColor');
        
        const canvasSize = gl.getUniformLocation(program, 'canvasSize')
        const shapeLocation = gl.getUniformLocation(program, 'shapeLocation')
        const shapeSize = gl.getUniformLocation(program, 'shapeSize')

        const rgbTriangleBuffer = createTwoBufferVao(gl, triangleBuffer, rgbBuffer, vertPos, vertColorPos)
        const randomTriangleBuffer = createTwoBufferVao(gl, triangleBuffer, randomBuffer, vertPos, vertColorPos)

        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        gl.clearColor(0.08, 0.08, 0.08, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height)

        gl.useProgram(program);

        // Set uniforms shared across frame
        gl.uniform2f(canvasSize, canvas.width, canvas.height)

        // First triangle
        gl.uniform2f(shapeLocation, 200, 300)
        gl.uniform1f(shapeSize, 200)
        gl.bindVertexArray(rgbTriangleBuffer);
        gl.drawArrays(gl.TRIANGLES, 0, vertex.length / 2)
        
        // Second triangle
        gl.uniform2f(shapeLocation, 600, 300)
        gl.uniform1f(shapeSize, 400)
        gl.bindVertexArray(randomTriangleBuffer);
        gl.drawArrays(gl.TRIANGLES, 0, vertex.length / 2)

        /*
        Draw call (also configures primitive assembly)
        gl.drawArrays(
            how to organize the triangles together
            gl.TRIANGLES, 
            what is first vertex that we should look at
            0, 
            vertices: which attribute to use
            vertex.length / 2
        )
        */
    }

    const getContext = (canvas: HTMLCanvasElement) => {
        const gl = canvas.getContext('webgl2')

        if(!gl) throw new Error("WebGL2 not supported");

        return gl;
    }

    const createBuffer = (gl: WebGL2RenderingContext, data: BufferSource) => {
        const buffer = gl.createBuffer();
        if(!buffer) {
            throw new Error("Failed to allocate buffer");
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        return buffer;
    }

    const createProgram = (gl: WebGL2RenderingContext, vertexShader: string, fragmentShader: string) => {
        const vertexShaderObj = createShader(gl, gl.VERTEX_SHADER, vertexShader);
        const fragmentShaderObj = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);

        const program = gl.createProgram();
        gl.attachShader(program, vertexShaderObj);
        gl.attachShader(program, fragmentShaderObj);

        // Link program to check if vertex and fragment shader are compatiable with each other
        gl.linkProgram(program);

        if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program) || "Program compile error");
        }

        return program;
    }


    const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
        const shader = gl.createShader(type)!;

        gl.shaderSource(shader, source);
        gl.compileShader(shader)

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shader) || "Shader compile error");
        }
        return shader;

    }

    // VAO = Vertex Array Object
    const createTwoBufferVao = (
        gl: WebGL2RenderingContext, 
        vertices: WebGLBuffer, colors: WebGLBuffer,
        posAttribLocation: number, colorAttribLocationPos: number
    ) => {
        const vao = gl.createVertexArray();

        if(!vao) throw new Error("Failed to create VAO");

        // Bind the VAO so we can setup its attrib pointers and buffers
        gl.bindVertexArray(vao);

        // Enable the attribute locations
        gl.enableVertexAttribArray(posAttribLocation);
        gl.enableVertexAttribArray(colorAttribLocationPos);

        // Bind the buffers and setup the attribute pointers
        gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
        gl.vertexAttribPointer(posAttribLocation, 2, gl.FLOAT, false, 0, 0);

        // Bind the color buffer and setup the attribute pointer
        gl.bindBuffer(gl.ARRAY_BUFFER, colors);
        gl.vertexAttribPointer(colorAttribLocationPos, 3, gl.UNSIGNED_BYTE, true, 0, 0);

        gl.bindVertexArray(null);
        return vao;

        /* 
        gl.vertexAttribPointer(
            index: which attribute to use
            vertPos,
            size: how many components in that attribute
            2,
            type: wwhat is the data type stored in the GPU buffer for this attribute?
            gl.FLOAT,
            normalized: determines how to convert ints to floats, if that's what you're doing
            false,
            stride: how many bytes to move forward in the buffer to find the same attribute for the next vertex
            0,
            offset: how many bytes should the input assembler skip into the buffer when reading attributes
            0
        )
        */
    }

    return (
        <div style={{marginTop: '80px'}}>
            <canvas className={classes.canvas} ref={canvasRef}></canvas>
        </div>
    )
}

export default TriangleTest;