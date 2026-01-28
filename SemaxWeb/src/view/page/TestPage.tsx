import { useEffect, useRef } from "react";
import classes from './css/TestPage.module.css'

const TestPage = () => {
    const canvasRef = useRef<null | HTMLCanvasElement>(null)
    const scaleRef = useRef<number>(0.65);

    const makeDotsArraylist = (width: number, height: number, spacing = 10) => {
    // WebGL expects coordinates in normalized device coordinates [-1, 1]
    const verticesPoints: number[] = [];

    for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
            // Convert pixel coordinates to WebGL coordinates
            const xGl = (x / width) * 2 - 1; // 0..width -> -1..1
            const yGl = -((y / height) * 2 - 1); // flip Y for WebGL coords
            verticesPoints.push(xGl, yGl);
        }
    }

    return new Float32Array(verticesPoints);
};

    useEffect(() => {
        // makeTriangle();
        makeDotsGrid();
    }, [])

     const makeDotsGrid = () => {
        const canvas = canvasRef.current;
        if(canvas === null) return;
        const gl = canvas.getContext('webgl2')
        if(!gl) {
            console.error("Cannot open canvas")
            return;
        }

        // (R, G, B, A) = (Red, Green, Blue, Alfa)
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Gpu like to use a 32bit float and javascript uses a 64bit float 
        // that why we use a 32bit float array
        const dotVertices = makeDotsArraylist(canvas.clientWidth, canvas.clientHeight, 30);



        const dotBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, dotBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, dotVertices, gl.STATIC_DRAW)

        const vertexShaderSourceCode = `#version 300 es
        precision mediump float;

        //Two Floating point in it: X, Y
        in vec2 vertPosition;
        uniform float u_tilt;     // backward tilt
        uniform float u_fov;      // perspective
        uniform float u_offsetY;  // shift grid up
        uniform float u_scale;    // shrink grid

        void main() {
            // scale first
            float x = vertPosition.x * u_scale;
            float y = vertPosition.y * u_scale;
            float z = 0.0;

            // rotate backward around X-axis
            float cosA = cos(u_tilt);
            float sinA = sin(u_tilt);
            float yRot = y * cosA - z * sinA;
            float zRot = y * sinA + z * cosA;

            // move grid up
            yRot += u_offsetY;

            // perspective projection
            float scale = u_fov / (u_fov + zRot);
            vec2 projected = vec2(x * scale, yRot * scale);

            gl_Position = vec4(projected, 0.0, 1.0);
            gl_PointSize = 5.0; // visible dots
        }`;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!

        gl.shaderSource(vertexShader, vertexShaderSourceCode);
        gl.compileShader(vertexShader)

        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            const compileError = gl.getShaderInfoLog(vertexShader);
            console.error(compileError)
            return;
        }

        const fragmentShaderSourceCode = `#version 300 es
        precision mediump float;

        out vec4 outputColor;

        void main() {
            // (R, G, B, A)
            outputColor = vec4(0.294, 0.0, 0.51, 1.0);
        }`;

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!

        gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
        gl.compileShader(fragmentShader)

        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            const compileError = gl.getShaderInfoLog(fragmentShader);
            console.error(compileError)
            return;
        }

        // Connect vertex and fragment shader to progam (do not use vertex and fragment shader independly)
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);

        // Link program to check if vertex and fragment shader are compatiable with each other
        gl.linkProgram(shaderProgram);

        if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            const linkError = gl.getProgramInfoLog(shaderProgram);
            console.error(linkError);
            return;
        }

        // Ask for position of the attribute
        const vertexPosAttributeLocation = gl.getAttribLocation(shaderProgram, 'vertPosition')

        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight

        gl.clearColor(0.08, 0.08, 0.08, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.viewport(0, 0, canvas.width, canvas.height)

        const tiltUniform = gl.getUniformLocation(shaderProgram, "u_tilt");
        const fovUniform = gl.getUniformLocation(shaderProgram, "u_fov");
        const offsetYUniform = gl.getUniformLocation(shaderProgram, "u_offsetY");
        const scaleUniform = gl.getUniformLocation(shaderProgram, "u_scale");

        gl.useProgram(shaderProgram);

        gl.uniform1f(tiltUniform, Math.PI / 4); // 45° backward tilt
        gl.uniform1f(fovUniform, 1.3);         // controls perspective
        gl.uniform1f(offsetYUniform, 0.3); // shift grid up
        gl.uniform1f(scaleUniform, 0.65);   // shrink grid

        gl.enableVertexAttribArray(vertexPosAttributeLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, dotBuffer);
        gl.vertexAttribPointer(
            /* index: which attribute to use */
            vertexPosAttributeLocation,
            /* size: how many components in that attribute */
            2,
            /* type: wwhat is the data type stored in the GPU buffer for this attribute? */
            gl.FLOAT,
            /* normalized: determines how to convert ints to floats, if that's what you're doing */
            false,
            /* stride: how many bytes to move forward in the buffer to find the same attribute for the next vertex */
            0,
            /* offset: how many bytes should the input assembler skip into the buffer when reading attributes  */
            0
        )

        // Draw call (also configures primitive assembly)
        gl.drawArrays(
            /* how to organize the triangles together */
            gl.POINTS, 
            /* what is first vertex that we should look at */
            0, 
            /* vertices: which attribute to use */
            dotVertices.length / 2
        )
    }

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            // Change scale by scroll direction
            scaleRef.current += e.deltaY * -0.001; // scroll up → bigger, scroll down → smaller
            scaleRef.current = Math.min(Math.max(scaleRef.current, 0.1), 2.0); // clamp 0.1..2
            drawDots(); // redraw with new scale
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    useEffect(() => {
        drawDots();
    }, []);

    const drawDots = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl2");
        if (!gl) return;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0.08, 0.08, 0.08, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const dotVertices = makeDotsArraylist(canvas.clientWidth, canvas.clientHeight, 30);
        const dotBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, dotBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, dotVertices, gl.STATIC_DRAW);

         const vertexShaderSourceCode = `#version 300 es
        precision mediump float;

        //Two Floating point in it: X, Y
        in vec2 vertPosition;
        uniform float u_tilt;     // backward tilt
        uniform float u_fov;      // perspective
        uniform float u_offsetY;  // shift grid up
        uniform float u_scale;    // shrink grid

        void main() {
            // scale first
            float x = vertPosition.x * u_scale;
            float y = vertPosition.y * u_scale;
            float z = 0.0;

            // rotate backward around X-axis
            float cosA = cos(u_tilt);
            float sinA = sin(u_tilt);
            float yRot = y * cosA - z * sinA;
            float zRot = y * sinA + z * cosA;

            // move grid up
            yRot += u_offsetY;

            // perspective projection
            float scale = u_fov / (u_fov + zRot);
            vec2 projected = vec2(x * scale, yRot * scale);

            gl_Position = vec4(projected, 0.0, 1.0);
            gl_PointSize = 5.0; // visible dots
        }`;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!

        gl.shaderSource(vertexShader, vertexShaderSourceCode);
        gl.compileShader(vertexShader)

        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            const compileError = gl.getShaderInfoLog(vertexShader);
            console.error(compileError)
            return;
        }

        const fragmentShaderSourceCode = `#version 300 es
        precision mediump float;

        out vec4 outputColor;

        void main() {
            // (R, G, B, A)
            outputColor = vec4(0.294, 0.0, 0.51, 1.0);
        }`;

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!

        gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
        gl.compileShader(fragmentShader)

        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            const compileError = gl.getShaderInfoLog(fragmentShader);
            console.error(compileError)
            return;
        }

        // Connect vertex and fragment shader to progam (do not use vertex and fragment shader independly)
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);

        // Link program to check if vertex and fragment shader are compatiable with each other
        gl.linkProgram(shaderProgram);

        if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            const linkError = gl.getProgramInfoLog(shaderProgram);
            console.error(linkError);
            return;
        }

        // Ask for position of the attribute
        const vertexPosAttributeLocation = gl.getAttribLocation(shaderProgram, 'vertPosition')

        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight

        gl.clearColor(0.08, 0.08, 0.08, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.viewport(0, 0, canvas.width, canvas.height)

        const tiltUniform = gl.getUniformLocation(shaderProgram, "u_tilt");
        const fovUniform = gl.getUniformLocation(shaderProgram, "u_fov");
        const offsetYUniform = gl.getUniformLocation(shaderProgram, "u_offsetY");
        const scaleUniform = gl.getUniformLocation(shaderProgram, "u_scale");

        gl.useProgram(shaderProgram);
        gl.uniform1f(tiltUniform, Math.PI / 4);
        gl.uniform1f(fovUniform, 1.3);
        gl.uniform1f(offsetYUniform, 0.3);
        gl.uniform1f(scaleUniform, scaleRef.current); // use dynamic scale

        gl.enableVertexAttribArray(vertexPosAttributeLocation);
        gl.vertexAttribPointer(vertexPosAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, dotVertices.length / 2);
};


    const makeTriangle = () => {
        const canvas = canvasRef.current;
        if(canvas === null) return;
        const gl = canvas.getContext('webgl2')
        if(!gl) {
            console.error("Cannot open canvas")
            return;
        }

        // (R, G, B, A) = (Red, Green, Blue, Alfa)
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Gpu like to use a 32bit float and javascript uses a 64bit float 
        // that why we use a 32bit float array
        const triangleVertices = [
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ];

        const triangleVerticesCpuBuffer = new Float32Array(triangleVertices);

        const triangleGeoBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, triangleVerticesCpuBuffer, gl.STATIC_DRAW)

        const vertexShaderSourceCode = `#version 300 es
        precision mediump float;

        //Two Floating point in it: X, Y
        in vec2 vertPosition;

        //Three floating points in it: R, G, B
        // in vec3 vertColor;

        // varying vec3 fragColor;

        void main() {
            // fragColor = vertColor;
            gl_Position = vec4(vertPosition, 0.0, 1.0);
        }`;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!

        gl.shaderSource(vertexShader, vertexShaderSourceCode);
        gl.compileShader(vertexShader)

        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            const compileError = gl.getShaderInfoLog(vertexShader);
            console.error(compileError)
            return;
        }

        const fragmentShaderSourceCode = `#version 300 es
        precision mediump float;

        out vec4 outputColor;

        void main() {
            // (R, G, B, A)
            outputColor = vec4(0.294, 0.0, 0.51, 1.0);
        }`;

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!

        gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
        gl.compileShader(fragmentShader)

        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            const compileError = gl.getShaderInfoLog(fragmentShader);
            console.error(compileError)
            return;
        }

        // Connect vertex and fragment shader to progam (do not use vertex and fragment shader independly)
        const triangleShaderProgam = gl.createProgram();
        gl.attachShader(triangleShaderProgam, vertexShader);
        gl.attachShader(triangleShaderProgam, fragmentShader);

        // Link program to check if vertex and fragment shader are compatiable with each other
        gl.linkProgram(triangleShaderProgam);

        if(!gl.getProgramParameter(triangleShaderProgam, gl.LINK_STATUS)) {
            const linkError = gl.getProgramInfoLog(triangleShaderProgam);
            console.error(linkError);
            return;
        }

        // Ask for position of the attribute
        const vertexPosAttributeLocation = gl.getAttribLocation(triangleShaderProgam, 'vertPosition')

        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight

        gl.clearColor(0.08, 0.08, 0.08, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.viewport(0, 0, canvas.width, canvas.height)

        gl.useProgram(triangleShaderProgam);
        gl.enableVertexAttribArray(vertexPosAttributeLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
        gl.vertexAttribPointer(
            /* index: which attribute to use */
            vertexPosAttributeLocation,
            /* size: how many components in that attribute */
            2,
            /* type: wwhat is the data type stored in the GPU buffer for this attribute? */
            gl.FLOAT,
            /* normalized: determines how to convert ints to floats, if that's what you're doing */
            false,
            /* stride: how many bytes to move forward in the buffer to find the same attribute for the next vertex */
            0,
            /* offset: how many bytes should the input assembler skip into the buffer when reading attributes  */
            0
        )

        // Draw call (also configures primitive assembly)
        gl.drawArrays(
            /* how to organize the triangles together */
            gl.TRIANGLES, 
            /* what is first vertex that we should look at */
            0, 
            /* vertices: which attribute to use */
            3
        )
    }

    return (
        <div style={{marginTop: '80px'}}>
            <canvas className={classes.canvas} ref={canvasRef}></canvas>
        </div>
    )
}

export default TestPage;