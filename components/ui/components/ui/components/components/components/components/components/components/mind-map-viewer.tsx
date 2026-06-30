"use client";

import { forwardRef, useCallback, useRef, useState } from "react";
import type { MindMapData } from "@/lib/data";

interface MindMapViewerProps {
  data: MindMapData;
  accentColor: string;
}

const NODE_RADIUS = 32;
const CENTER_G = 200;
const CHILD_RADIUS = 160;
const FONT_SIZE = 14;

interface LayoutNode {
  id: string;
  label: string;
  description?: string;
  isCenter?: boolean;
  x: number;
  y: number;
}

export function computeLayout(data: MindMapData): LayoutNode[] {
  const center = data.nodes.find((n) => n.isCenter);
  const children = data.nodes.filter((n) => !n.isCenter);
  const result: LayoutNode[] = [];
  if (center) {
    result.push({ ...center, x: 0, y: 0 });
  }
  children.forEach((child, i) => {
    const angle = (2 * Math.PI * i) / children.length - Math.PI / 2;
    result.push({
      ...child,
      x: Math.cos(angle) * CHILD_RADIUS,
      y: Math.sin(angle) * CHILD_RADIUS,
    });
  });
  return result;
}

export function computeBounds(layout: LayoutNode[]): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const node of layout) {
    const halfW = node.isCenter
      ? NODE_RADIUS + 8
      : (node.label.length * (FONT_SIZE * 0.6)) / 2 + 14;
    const halfH = node.isCenter ? NODE_RADIUS + 8 : 18;

    minX = Math.min(minX, node.x - halfW);
    minY = Math.min(minY, node.y - halfH);
    maxX = Math.max(maxX, node.x + halfW);
    maxY = Math.max(maxY, node.y + halfH);
  }

  const padding = 40;
  minX -= padding;
  minY -= padding;
  maxX += padding;
  maxY += padding;

  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

const textWidthCache = new Map<string, number>();
function textWidth(text: string): number {
  const cached = textWidthCache.get(text);
  if (cached !== undefined) return cached;
  const w = text.length * (FONT_SIZE * 0.6);
  textWidthCache.set(text, w);
  return w;
}

export const MindMapViewer = forwardRef<SVGSVGElement, MindMapViewerProps>(
  function MindMapViewer({ data, accentColor }, ref) {
    const internalRef = useRef<SVGSVGElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [dragging, setDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const offsetStart = useRef({ x: 0, y: 0 });

    const setRefs = useCallback(
      (node: SVGSVGElement | null) => {
        (internalRef as React.MutableRefObject<SVGSVGElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const layout = computeLayout(data);
    const centerNode = layout.find((n) => n.isCenter);
    const childNodes = layout.filter((n) => !n.isCenter);

    const toNode = (id: string) => layout.find((n) => n.id === id);

    const onWheel = useCallback((e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale((s) => Math.max(0.3, Math.min(3, s * delta)));
    }, []);

    const onMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (e.button !== 0) return;
        setDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        offsetStart.current = { ...offset };
      },
      [offset]
    );

    const onMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (!dragging) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setOffset({
          x: offsetStart.current.x + dx,
          y: offsetStart.current.y + dy,
        });
      },
      [dragging]
    );

    const onMouseUp = useCallback(() => {
      setDragging(false);
    }, []);

    return (
      <svg
        ref={setRefs}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <g
          transform={`translate(${CENTER_G + offset.x}, ${CENTER_G + offset.y}) scale(${scale})`}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 8 3, 0 6"
                fill={accentColor}
                opacity={0.5}
              />
            </marker>
          </defs>

          {data.edges.map((edge, i) => {
            const from = toNode(edge.from);
            const to = toNode(edge.to);
            if (!from || !to) return null;
            return (
              <line
                key={`edge-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={accentColor}
                strokeWidth={2}
                opacity={0.4}
                markerEnd="url(#arrowhead)"
              />
            );
          })}

          {childNodes.map((node) => (
            <g key={node.id}>
              <rect
                x={node.x - textWidth(node.label) / 2 - 14}
                y={node.y - 18}
                width={textWidth(node.label) + 28}
                height={36}
                rx={18}
                ry={18}
                fill="white"
                stroke={accentColor}
                strokeWidth={2}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fontSize={FONT_SIZE}
                fill={accentColor}
                className="select-none"
                style={{ fontWeight: 500 }}
              >
                {node.label}
              </text>
            </g>
          ))}

          {centerNode && (
            <g>
              <circle
                cx={centerNode.x}
                cy={centerNode.y}
                r={NODE_RADIUS + 8}
                fill={accentColor}
                opacity={0.15}
              />
              <circle
                cx={centerNode.x}
                cy={centerNode.y}
                r={NODE_RADIUS}
                fill={accentColor}
                stroke="white"
                strokeWidth={3}
                filter="drop-shadow(0 4px 12px rgba(0,0,0,0.2))"
              />
              <text
                x={centerNode.x}
                y={centerNode.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={FONT_SIZE}
                fill="white"
                className="select-none"
                style={{ fontWeight: 700 }}
              >
                {centerNode.label.length > 12
                  ? centerNode.label.slice(0, 11) + "…"
                  : centerNode.label}
              </text>
            </g>
          )}
        </g>
      </svg>
    );
  }
);
