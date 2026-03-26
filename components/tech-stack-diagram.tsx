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
  accent?: string;
}

function PixelNode({ data }: NodeProps) {
  const d = data as unknown as NodeData;
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

// ── Colors ──────────────────────────────────────────────────────────────────

const PINK = "#ff1493";  // Game Client
const CYAN = "#06b6d4";  // Game Engine (TFS)
const GOLD = "#f59e0b";  // Web Layer
const ROSE = "#e11d48";  // Database
const LIME = "#84cc16";  // Dev Tools

// ── Architecture:
//
//   [OTClient]  →  TCP 7171  →  [TFS 1.4.2 C++]  ↔  [MySQL]
//                                      ↘
//                              [RME]  [Object Builder]
//   [Browser]  →  HTTP  →  [NGINX]  →  [MyAcc (Gesior)]  ↔  [MySQL]
//

const initialNodes = [
  // Group labels
  {
    id: "gl-client",
    type: "groupLabel",
    position: { x: 20, y: 0 },
    data: { label: "🎮 Game Client", accent: PINK },
    draggable: false,
    selectable: false,
  },
  {
    id: "gl-server",
    type: "groupLabel",
    position: { x: 280, y: 0 },
    data: { label: "⚙️ Game Server", accent: CYAN },
    draggable: false,
    selectable: false,
  },
  {
    id: "gl-db",
    type: "groupLabel",
    position: { x: 560, y: 0 },
    data: { label: "💾 Database", accent: ROSE },
    draggable: false,
    selectable: false,
  },
  {
    id: "gl-web",
    type: "groupLabel",
    position: { x: 280, y: 230 },
    data: { label: "🌐 Web Layer", accent: GOLD },
    draggable: false,
    selectable: false,
  },
  {
    id: "gl-tools",
    type: "groupLabel",
    position: { x: 20, y: 340 },
    data: { label: "🛠 Dev Tools", accent: LIME },
    draggable: false,
    selectable: false,
  },

  // Game Client
  {
    id: "otclient",
    type: "pixelNode",
    position: { x: 20, y: 25 },
    data: { label: "OTClient", sub: "Player Interface", group: "GAME CLIENT", accent: PINK },
  },

  // Game Server
  {
    id: "tfs",
    type: "pixelNode",
    position: { x: 280, y: 25 },
    data: { label: "TFS 1.4.2", sub: "C++ Game Engine", group: "GAME SERVER", accent: CYAN },
  },

  // Database
  {
    id: "mysql",
    type: "pixelNode",
    position: { x: 560, y: 25 },
    data: { label: "MySQL", sub: "Data Persistence", group: "DATABASE", accent: ROSE },
  },

  // Web Layer
  {
    id: "nginx",
    type: "pixelNode",
    position: { x: 200, y: 255 },
    data: { label: "NGINX", sub: "Web Server", group: "WEB LAYER", accent: GOLD },
  },
  {
    id: "myacc",
    type: "pixelNode",
    position: { x: 400, y: 255 },
    data: { label: "MyAcc", sub: "Account System", group: "WEB LAYER", accent: GOLD },
  },

  // Dev Tools
  {
    id: "rme",
    type: "pixelNode",
    position: { x: 20, y: 365 },
    data: { label: "RME", sub: "Map Editor", group: "DEV TOOLS", accent: LIME },
  },
  {
    id: "objbuilder",
    type: "pixelNode",
    position: { x: 240, y: 365 },
    data: { label: "Object Builder", sub: "Sprites & Assets", group: "DEV TOOLS", accent: LIME },
  },
];

const edgeStyle = (color: string) => ({
  stroke: color,
  strokeWidth: 2,
});

const lbl = (t: string) => ({ label: t, labelStyle: { fill: "#aaa", fontFamily: "VT323", fontSize: 13 } });

const initialEdges = [
  // OTClient ↔ TFS via TCP 7171
  { id: "e1", source: "otclient", target: "tfs", animated: true, style: edgeStyle(PINK), ...lbl("TCP :7171") },
  // TFS ↔ MySQL
  { id: "e2", source: "tfs", target: "mysql", animated: false, style: edgeStyle(ROSE), ...lbl("Read/Write") },
  // NGINX → MyAcc
  { id: "e3", source: "nginx", target: "myacc", animated: false, style: edgeStyle(GOLD), ...lbl("serves") },
  // MyAcc ↔ MySQL
  { id: "e4", source: "myacc", target: "mysql", animated: false, style: edgeStyle(ROSE), ...lbl("accounts") },
  // RME → TFS (map files)
  { id: "e5", source: "rme", target: "tfs", animated: false, style: edgeStyle(LIME), ...lbl("map files") },
  // Object Builder → TFS (sprites/dat)
  { id: "e6", source: "objbuilder", target: "tfs", animated: false, style: edgeStyle(LIME), ...lbl(".spr/.dat") },
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
        height: 520,
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
        SERTANIA ONLINE — Technology Architecture
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
        Custom MMORPG · TFS · MySQL · OTClient · NGINX
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
