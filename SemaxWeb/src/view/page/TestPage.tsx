import { useEffect, useRef } from "react";
import classes from './css/TestPage.module.css'
import vertexShaderSourceCode from './shader/vertex_shader.glsl?raw'
import fragmentShaderSourceCode from './shader/fragment_shader.glsl?raw'

const TestPage = () => {
    const canvasRef = useRef<null | HTMLCanvasElement>(null);

    const glRef = useRef<null | WebGL2RenderingContext>(null);
    const glBufferRef = useRef<null | WebGLBuffer>(null);
    const glProgramRef = useRef<null | WebGLProgram>(null);
    const glVertexCountRef = useRef<number>(0);


    const scaleRef = useRef<number>(0.8);

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

    const initWebGL = () => {
        const canvas = canvasRef.current;
        if(canvas === null) return;
        const gl = canvas.getContext('webgl2')
        if(!gl) {
            console.error("Cannot open canvas")
            return;
        }

        glRef.current = gl;

        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        gl.viewport(0, 0, canvas.width, canvas.height)

        // (R, G, B, A) = (Red, Green, Blue, Alfa)
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Gpu like to use a 32bit float and javascript uses a 64bit float 
        // that why we use a 32bit float array
        const dotVertices = makeDotsArraylist(canvas.clientWidth, canvas.clientHeight, 20);

        const dotBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, dotBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, dotVertices, gl.STATIC_DRAW)

        glBufferRef.current = dotBuffer;
        glVertexCountRef.current = dotVertices.length / 2

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSourceCode);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSourceCode);

        const shaderProgram = createProgram(gl, [vertexShader, fragmentShader])
        startRenderLoop(gl, shaderProgram);
        drawDots();

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

    const startRenderLoop = (
        gl: WebGL2RenderingContext,
        program: WebGLProgram
    ) => {
        const timeLoc = gl.getUniformLocation(program, "u_time");
        let start = performance.now();

        function render() {
            const t = (performance.now() - start) * 0.001;
            gl.uniform1f(timeLoc, t);

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, glVertexCountRef.current);

            requestAnimationFrame(render);
        }

        render();
    };


    const createProgram = (gl: WebGL2RenderingContext, shaders: WebGLShader[]) => {
        const shaderProgram = gl.createProgram();
        for(let shader of shaders) {
            gl.attachShader(shaderProgram, shader);
        }

        // Link program to check if vertex and fragment shader are compatiable with each other
        gl.linkProgram(shaderProgram);

        if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shaderProgram) || "Program compile error");
        }

        glProgramRef.current = shaderProgram;
        return shaderProgram;
    }

    const drawDots = () => {
        const gl = glRef.current;
        const buffer = glBufferRef.current;
        const program = glProgramRef.current;
        const vertexCount = glVertexCountRef.current;
        if (!gl || !program || !buffer) return;

        gl.clearColor(0.08, 0.08, 0.08, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(program);

        const tiltUniform = gl.getUniformLocation(program, "u_tilt");
        const fovUniform = gl.getUniformLocation(program, "u_fov");
        const offsetYUniform = gl.getUniformLocation(program, "u_offsetY");
        const scaleUniform = gl.getUniformLocation(program, "u_scale");

        gl.uniform1f(tiltUniform, Math.PI / 4);         // 45° backward tilt
        gl.uniform1f(fovUniform, 1.3);                  // controls perspective
        gl.uniform1f(offsetYUniform, 0.3);              // shift grid up
        gl.uniform1f(scaleUniform, scaleRef.current);   // shrink grid

        // Ask for position of the attribute
        const vertPos = gl.getAttribLocation(program, 'vertPosition')

        gl.enableVertexAttribArray(vertPos);

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(
            /* index: which attribute to use */
            vertPos,
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
            vertexCount
        )
    }


    useEffect(() => {
        initWebGL();
    }, [])

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

    return (
        <div style={{marginTop: '80px'}}>
            <canvas className={classes.canvas} ref={canvasRef}></canvas>
        </div>
    )
}

export default TestPage;