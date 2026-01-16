import type { EdgeType, FlowLine, PaletteKey } from "../types/coverGenerator";
import { CANVAS_CONFIG, PALETTES } from "../constants/coverGenerator";

export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};

export const generateFlowLine = (
    edge: EdgeType,
    index: number,
    palette: PaletteKey,
    curviness: number,
    lineWidth: number
): FlowLine => {
    const paletteData = PALETTES[palette];
    const color =
        paletteData.lines[Math.floor(Math.random() * paletteData.lines.length)];
    const points: { x: number; y: number }[] = [];
    const numPoints = 15 + Math.floor(Math.random() * 10);
    const curveFactor = curviness / 100;

    let startX: number, startY: number;
    let directionX: number, directionY: number;

    switch (edge) {
        case "top":
            startX = Math.random() * CANVAS_CONFIG.width;
            startY = -20;
            directionX = (Math.random() - 0.5) * 0.3;
            directionY = 1;
            break;
        case "bottom":
            startX = Math.random() * CANVAS_CONFIG.width;
            startY = CANVAS_CONFIG.height + 20;
            directionX = (Math.random() - 0.5) * 0.3;
            directionY = -1;
            break;
        case "left":
            startX = -20;
            startY = Math.random() * CANVAS_CONFIG.height;
            directionX = 1;
            directionY = (Math.random() - 0.5) * 0.3;
            break;
        case "right":
            startX = CANVAS_CONFIG.width + 20;
            startY = Math.random() * CANVAS_CONFIG.height;
            directionX = -1;
            directionY = (Math.random() - 0.5) * 0.3;
            break;
    }

    let x = startX;
    let y = startY;
    const waveAmp = 150 + Math.random() * 200;

    for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints;
        const wave =
            Math.sin(t * Math.PI * 2 * (1 + Math.random() * 0.5) + index) *
            waveAmp *
            curveFactor;

        if (edge === "top" || edge === "bottom") {
            x = startX + wave + directionX * t * 500;
            y = startY + directionY * t * 1200;
        } else {
            x = startX + directionX * t * 1200;
            y = startY + wave + directionY * t * 500;
        }

        x += (Math.random() - 0.5) * 30 * curveFactor;
        y += (Math.random() - 0.5) * 30 * curveFactor;

        points.push({ x, y });
    }

    return {
        points,
        color,
        lineWidth: lineWidth * (0.5 + Math.random() * 1),
        speed: 0.0005 + Math.random() * 0.001,
        phase: Math.random() * Math.PI * 2,
        edge,
    };
};

export const createFlowLines = (
    count: number,
    palette: PaletteKey,
    curviness: number,
    lineWidth: number
): FlowLine[] => {
    const lines: FlowLine[] = [];
    const edges: EdgeType[] = ["top", "bottom", "left", "right"];

    for (let i = 0; i < count; i++) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        lines.push(generateFlowLine(edge, i, palette, curviness, lineWidth));
    }

    return lines;
};

export const drawGlitchedCurve = (
    ctx: CanvasRenderingContext2D,
    points: { x: number; y: number }[],
    lineWidth: number,
    color: string,
    glitchFactor: number,
    time: number,
    lineIndex: number
): void => {
    if (points.length < 2) return;

    const glitch = glitchFactor / 100;
    const rgb = hexToRgb(color);

    if (glitch > 0.2) {
        const splitOffset =
            glitch * 15 * (1 + Math.sin(time * 2 + lineIndex) * 0.5);

        ctx.save();
        ctx.strokeStyle = `rgba(${rgb.r}, 0, 0, ${0.4 * glitch})`;
        ctx.lineWidth = lineWidth * 0.8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(points[0].x - splitOffset, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x - splitOffset, points[i].y);
        }
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = `rgba(0, 0, ${rgb.b}, ${0.4 * glitch})`;
        ctx.lineWidth = lineWidth * 0.8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(points[0].x + splitOffset, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x + splitOffset, points[i].y);
        }
        ctx.stroke();
        ctx.restore();
    }

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const segmentLength = Math.max(
        2,
        Math.floor(points.length / (3 + Math.floor(glitch * 5)))
    );

    for (let seg = 0; seg < points.length - 1; seg += segmentLength) {
        const endSeg = Math.min(seg + segmentLength, points.length - 1);

        const shouldGlitch = Math.random() < glitch * 0.7;
        const glitchOffsetX = shouldGlitch
            ? (Math.random() - 0.5) * glitch * 80
            : 0;
        const glitchOffsetY = shouldGlitch
            ? (Math.random() - 0.5) * glitch * 40
            : 0;

        if (Math.random() < glitch * 0.15) continue;

        ctx.beginPath();
        ctx.moveTo(
            points[seg].x + glitchOffsetX,
            points[seg].y + glitchOffsetY
        );

        for (let i = seg + 1; i <= endSeg; i++) {
            const xc = (points[i - 1].x + points[i].x) / 2 + glitchOffsetX;
            const yc = (points[i - 1].y + points[i].y) / 2 + glitchOffsetY;

            const jitterX = (Math.random() - 0.5) * glitch * 10;
            const jitterY = (Math.random() - 0.5) * glitch * 10;

            ctx.quadraticCurveTo(
                points[i - 1].x + glitchOffsetX + jitterX,
                points[i - 1].y + glitchOffsetY + jitterY,
                xc,
                yc
            );
        }

        ctx.stroke();
    }

    ctx.restore();

    if (glitch > 0.3) {
        const numSlices = Math.floor(glitch * 4);
        for (let s = 0; s < numSlices; s++) {
            if (Math.random() > 0.6) continue;

            const sliceY = points[Math.floor(Math.random() * points.length)].y;
            const sliceHeight = 2 + Math.random() * lineWidth * 0.5;
            const sliceOffset = (Math.random() - 0.5) * glitch * 100;

            ctx.save();
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.6;

            const nearPoints = points.filter(
                (p) => Math.abs(p.y - sliceY) < lineWidth
            );
            if (nearPoints.length > 0) {
                const p =
                    nearPoints[Math.floor(Math.random() * nearPoints.length)];
                ctx.fillRect(
                    p.x + sliceOffset - lineWidth,
                    sliceY - sliceHeight / 2,
                    lineWidth * 2,
                    sliceHeight
                );
            }
            ctx.restore();
        }
    }

    if (glitch > 0.5 && Math.random() < glitch * 0.3) {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * glitch})`;
        ctx.lineWidth = 1;
        const scanY = Math.random() * CANVAS_CONFIG.height;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(CANVAS_CONFIG.width, scanY);
        ctx.stroke();
        ctx.restore();
    }
};

export const drawBackground = (
    ctx: CanvasRenderingContext2D,
    palette: PaletteKey,
    glitchIntensity: number
): void => {
    const { width, height } = CANVAS_CONFIG;
    const paletteData = PALETTES[palette];
    const glitch = glitchIntensity / 100;

    ctx.fillStyle = paletteData.bg;
    ctx.fillRect(0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const noiseIntensity = 15 + glitch * 25;

    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * noiseIntensity;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    if (glitch > 0.3) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
        for (let y = 0; y < height; y += 3) {
            ctx.fillRect(0, y, width, 1);
        }
        ctx.restore();
    }
};

export const drawGlobalGlitchEffects = (
    ctx: CanvasRenderingContext2D,
    palette: PaletteKey,
    glitchIntensity: number
): void => {
    const { width, height } = CANVAS_CONFIG;
    const paletteData = PALETTES[palette];
    const glitch = glitchIntensity / 100;

    if (glitch > 0.6 && Math.random() < 0.1) {
        ctx.save();
        ctx.fillStyle =
            paletteData.lines[
                Math.floor(Math.random() * paletteData.lines.length)
            ];
        ctx.globalAlpha = 0.1;
        const blockX = Math.random() * width;
        const blockY = Math.random() * height;
        const blockW = 50 + Math.random() * 200;
        const blockH = 5 + Math.random() * 20;
        ctx.fillRect(blockX, blockY, blockW, blockH);
        ctx.restore();
    }
};

export const drawFlowLines = (
    ctx: CanvasRenderingContext2D,
    lines: FlowLine[],
    glitchIntensity: number,
    time: number
): void => {
    const glitch = glitchIntensity / 100;

    lines.forEach((line, index) => {
        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.filter = `blur(${line.lineWidth * 0.6}px)`;
        drawGlitchedCurve(
            ctx,
            line.points,
            line.lineWidth * 1.5,
            line.color,
            glitchIntensity * 0.3,
            time,
            index
        );
        ctx.restore();

        drawGlitchedCurve(
            ctx,
            line.points,
            line.lineWidth,
            line.color,
            glitchIntensity,
            time,
            index
        );

        if (glitch > 0.4 && Math.random() < glitch * 0.3) {
            ctx.save();
            ctx.globalAlpha = 0.3;
            const ghostOffset = (Math.random() - 0.5) * glitch * 50;
            ctx.translate(ghostOffset, ghostOffset * 0.5);
            drawGlitchedCurve(
                ctx,
                line.points,
                line.lineWidth * 0.7,
                line.color,
                glitchIntensity * 0.5,
                time + 1,
                index
            );
            ctx.restore();
        }
    });
};
