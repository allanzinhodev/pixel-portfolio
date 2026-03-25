"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Handle,
  Position,
  BackgroundVariant,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// ── Custom node styles ──────────────────────────────────────────────────────

interface NodeData {
  label: string;
  sub?: string;
  group?: string;
  accent?: string; // tailwind bg class or hex
}

function PixelNode({ data }: NodeProps) {
  const d = data as NodeData;
  const accent = d.accent ?? "#ff1493";
  return (
    <div
      style={{
        background: "#0f0f0f",
        border: `3px solid ${accent}`,
        boxShadow: `4px 4px 0 0 ${accent}55`,
        padding: "10px 18px",
        minWidth: 150,
        fontFamily: "'VT323', monospace",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: accent, border: "none" }} />
      <div style={{ color: accent, fontSize: 11, letterSpacing: 2, marginBottom: 2 }}>
        {d.group ?? ""}
      </div>
      <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold", lineHeight: 1.2 }}>
        {d.label}
      </div>
      {d.sub && (
        <div style={{ color: "#aaa", fontSize: 14, marginTop: 2 }}>{d.sub}</div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: accent, border: "none" }} />
    </div>
  );
}

function GroupLabel({ data }: { data: NodeData }) {
  return (
    <div
      style={{
        color: data.accent ?? "#ff1493",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 9,
        letterSpacing: 1,
      }}
    >
      {data.label}
    </div>
  );
}

const nodeTypes = {
  pixelNode: PixelNode,
  groupLabel: GroupLabel,
};

// ── Node & Edge definitions ─────────────────────────────────────────────────

const PINK = "#ff1493";
const ROSE = "#e11d48";
const CYAN = "#06b6d4";
const GOLD = "#f59e0b";
const LIME = "#84cc16";

const initialNodes = [
  // Group labels
  {
    id: "gl-core",
    type: "groupLabel",
    position: { x: 320, y: 0 },
    data: { label: "🕹 Core", accent: PINK },
    draggable: false,
    selectable: false,
  },
  {
    id: "gl-render",
    type: "groupLabel",
    position: { x: 60, y: 130 },
    data: { label: "🖼 Rendering", accent: CYAN },
    draggable: false,
    selectable: false,
  },
  {
    id: "gl-client",
    type: "groupLabel",
    position: { x: 570, y: 130 },
    data: { label: "🌐 Web Layer", accent: GOLD },
    draggable: false,
    selectable: false,
  },
  {
    id: "gl-audio",
    type: "groupLabel",
    position: { x: 60, y: 310 },
    data: { label: "🔊 Audio", accent: LIME },
    draggable: false,
    selectable: false,
  },
  {
    id: "gl-storage",
    type: "groupLabel",
    position: { x: 560, y: 310 },
    data: { label: "💾 Storage", accent: ROSE },
    draggable: false,
    selectable: false,
  },

  // Core
  {
    id: "react",
    type: "pixelNode",
    position: { x: 290, y: 25 },
    data: { label: "React", sub: "UI & State", group: "CORE", accent: PINK },
  },

  // Rendering
  {
    id: "canvas",
    type: "pixelNode",
    position: { x: 30, y: 160 },
    data: { label: "Canvas API", sub: "Game Rendering", group: "RENDERING", accent: CYAN },
  },
  {
    id: "gameloop",
    type: "pixelNode",
    position: { x: 290, y: 175 },
    data: { label: "Game Loop", sub: "requestAnimationFrame", group: "RENDERING", accent: CYAN },
  },

  // Web Layer
  {
    id: "controls",
    type: "pixelNode",
    position: { x: 540, y: 160 },
    data: { label: "Controls", sub: "Keyboard / Touch", group: "WEB LAYER", accent: GOLD },
  },

  // Audio
  {
    id: "audio",
    type: "pixelNode",
    position: { x: 30, y: 345 },
    data: { label: "Web Audio API", sub: "SFX & Music", group: "AUDIO", accent: LIME },
  },

  // Storage
  {
    id: "storage",
    type: "pixelNode",
    position: { x: 540, y: 345 },
    data: { label: "Local Storage", sub: "Scores & Saves", group: "STORAGE", accent: ROSE },
  },
];

const edgeStyle = (color: string) => ({
  stroke: color,
  strokeWidth: 2,
});

const initialEdges = [
  { id: "e1", source: "react", target: "canvas", animated: true, style: edgeStyle(CYAN), label: "renders to", labelStyle: { fill: "#aaa", fontFamily: "VT323", fontSize: 13 } },
  { id: "e2", source: "react", target: "gameloop", animated: true, style: edgeStyle(PINK) },
  { id: "e3", source: "react", target: "controls", animated: false, style: edgeStyle(GOLD), label: "listens to", labelStyle: { fill: "#aaa", fontFamily: "VT323", fontSize: 13 } },
  { id: "e4", source: "gameloop", target: "canvas", animated: true, style: edgeStyle(CYAN), label: "drives" , labelStyle: { fill: "#aaa", fontFamily: "VT323", fontSize: 13 }},
  { id: "e5", source: "gameloop", target: "audio", animated: false, style: edgeStyle(LIME), label: "triggers", labelStyle: { fill: "#aaa", fontFamily: "VT323", fontSize: 13 } },
  { id: "e6", source: "gameloop", target: "storage", animated: false, style: edgeStyle(ROSE), label: "Read/Write", labelStyle: { fill: "#aaa", fontFamily: "VT323", fontSize: 13 } },
];

// ── Main component ──────────────────────────────────────────────────────────

function DiagramInner() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div
      style={{
        width: "100%",
        height: 480,
        border: "3px solid #ff1493",
        boxShadow: "6px 6px 0 0 #ff149355",
        background: "#080808",
        position: "relative",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 16,
          zIndex: 10,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 9,
          color: PINK,
          letterSpacing: 1,
          pointerEvents: "none",
        }}
      >
        PIXEL ARCADE — Technology Stack
      </div>
      <div
        style={{
          position: "absolute",
          top: 26,
          left: 16,
          zIndex: 10,
          fontFamily: "'VT323', monospace",
          fontSize: 13,
          color: "#888",
          pointerEvents: "none",
        }}
      >
        Browser-native · No server required
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1a1a1a" />
      </ReactFlow>
    </div>
  );
}

export function TechStackDiagram() {
  return (
    <ReactFlowProvider>
      <DiagramInner />
    </ReactFlowProvider>
  );
}
