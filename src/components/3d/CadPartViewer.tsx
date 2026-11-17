"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  RotateCcw,
  CheckCircle2,
  Info,
  Compass,
} from "lucide-react";

type MaterialType = "titanium" | "teal_aluminum" | "mirror_ss" | "brass";
type RenderMode = "hybrid" | "solid" | "wireframe";

interface InspectionPoint {
  id: string;
  title: string;
  metric: string;
  standard: string;
  coords: [number, number, number];
}

const inspectionPoints: InspectionPoint[] = [
  {
    id: "bore",
    title: "Center Bore Tolerance",
    metric: "Ø 45.000 +0.005 / -0.000 mm",
    standard: "ISO 286-1 Grade H7",
    coords: [0, 1.2, 0],
  },
  {
    id: "blade",
    title: "5-Axis Impeller Blade",
    metric: "Curvature Tolerance ± 0.012 mm",
    standard: "AS9100D Aerodynamic Spec",
    coords: [1.8, 0.4, 0.8],
  },
  {
    id: "flange",
    title: "Mounting Flange Face",
    metric: "Perpendicularity 0.008 mm",
    standard: "Ra 0.4 µm Surface Finish",
    coords: [-1.7, -1.1, -0.6],
  },
];

export function CadPartViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [materialType, setMaterialType] = useState<MaterialType>("teal_aluminum");
  const [renderMode, setRenderMode] = useState<RenderMode>("hybrid");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activePoint, setActivePoint] = useState<InspectionPoint>(inspectionPoints[0]);
  const [rotationReadout, setRotationReadout] = useState({ x: 22, y: 45 });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const solidMeshesRef = useRef<THREE.Mesh[]>([]);
  const wireframesRef = useRef<THREE.LineSegments[]>([]);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const isAutoRotatingRef = useRef(isAutoRotating);

  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.5, 6.2);

    // 2. Renderer setup with high DPI and alpha
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 3. Lighting setup (Enterprise Studio Rig)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x00c4cc, 1.8);
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    rimLight.position.set(0, 6, -6);
    scene.add(rimLight);

    // 4. Procedural Precision Industrial CAD Model (5-Axis Turbine Impeller + Flange)
    const rootGroup = new THREE.Group();
    groupRef.current = rootGroup;
    scene.add(rootGroup);

    const solidMeshes: THREE.Mesh[] = [];
    const wireframeMeshes: THREE.LineSegments[] = [];

    // Helper to get material
    function getStandardMaterial(type: MaterialType) {
      switch (type) {
        case "titanium":
          return new THREE.MeshStandardMaterial({
            color: 0xc8d1d9,
            metalness: 0.92,
            roughness: 0.28,
          });
        case "teal_aluminum":
          return new THREE.MeshStandardMaterial({
            color: 0x00a8b3,
            metalness: 0.85,
            roughness: 0.22,
          });
        case "mirror_ss":
          return new THREE.MeshStandardMaterial({
            color: 0xf1f5f9,
            metalness: 0.98,
            roughness: 0.08,
          });
        case "brass":
          return new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.88,
            roughness: 0.3,
          });
      }
    }

    const currentMaterial = getStandardMaterial("teal_aluminum");
    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      linewidth: 1,
      transparent: true,
      opacity: 0.45,
    });

    function addPart(geom: THREE.BufferGeometry, pos: [number, number, number] = [0, 0, 0], rot: [number, number, number] = [0, 0, 0]) {
      const mesh = new THREE.Mesh(geom, currentMaterial);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      rootGroup.add(mesh);
      solidMeshes.push(mesh);

      const edges = new THREE.EdgesGeometry(geom, 25);
      const wire = new THREE.LineSegments(edges, wireMaterial);
      wire.position.set(...pos);
      wire.rotation.set(...rot);
      rootGroup.add(wire);
      wireframeMeshes.push(wire);
    }

    // A. Central Hub Rotor
    const hubGeom = new THREE.CylinderGeometry(0.7, 1.3, 2.2, 32);
    addPart(hubGeom, [0, 0, 0]);

    // B. Inner Bore Cylinder Hole ring (step collar)
    const collarGeom = new THREE.CylinderGeometry(0.5, 0.5, 2.4, 32);
    addPart(collarGeom, [0, 0.1, 0]);

    // C. Base Mounting Flange
    const flangeGeom = new THREE.CylinderGeometry(2.3, 2.3, 0.35, 48);
    addPart(flangeGeom, [0, -1.1, 0]);

    // D. Outer Flange Chamfer Step
    const chamferGeom = new THREE.TorusGeometry(2.25, 0.12, 16, 64);
    addPart(chamferGeom, [0, -0.95, 0], [Math.PI / 2, 0, 0]);

    // E. 8 Aerodynamic Helical Impeller Blades
    const bladeCount = 9;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const bladeGeom = new THREE.BoxGeometry(0.12, 1.4, 1.1);
      bladeGeom.rotateY(0.4);
      bladeGeom.rotateZ(0.25);
      const x = Math.cos(angle) * 1.1;
      const z = Math.sin(angle) * 1.1;
      addPart(bladeGeom, [x, 0.1, z], [0, -angle, 0]);
    }

    // F. Bolt Holes PCD Ring (PCD 120mm simulation)
    const boltHoleCount = 6;
    for (let b = 0; b < boltHoleCount; b++) {
      const bAngle = (b / boltHoleCount) * Math.PI * 2;
      const bx = Math.cos(bAngle) * 1.85;
      const bz = Math.sin(bAngle) * 1.85;
      const boltGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.45, 16);
      addPart(boltGeom, [bx, -1.1, bz]);
    }

    solidMeshesRef.current = solidMeshes;
    wireframesRef.current = wireframeMeshes;

    // Initial slight pitch angle
    rootGroup.rotation.x = 0.35;
    rootGroup.rotation.y = 0.75;

    // 5. Interaction Events (Mouse Drag & Touch)
    function onMouseDown(e: MouseEvent) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseMove(e: MouseEvent) {
      if (!isDraggingRef.current || !groupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.008;
      groupRef.current.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

      setRotationReadout({
        x: Math.round(((groupRef.current.rotation.x * 180) / Math.PI) % 360),
        y: Math.round(((groupRef.current.rotation.y * 180) / Math.PI) % 360),
      });
    }

    function onMouseUp() {
      isDraggingRef.current = false;
    }

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (!isDraggingRef.current || !groupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.008;
      groupRef.current.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }

    function onTouchEnd() {
      isDraggingRef.current = false;
    }

    const domElement = canvas;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // 6. Resize handler
    function handleResize() {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }

    window.addEventListener("resize", handleResize);

    // 7. Render Animation Loop
    let animationFrameId: number;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (rootGroup && isAutoRotatingRef.current && !isDraggingRef.current) {
        rootGroup.rotation.y += 0.004;
        setRotationReadout({
          x: Math.round(((rootGroup.rotation.x * 180) / Math.PI) % 360),
          y: Math.round(((rootGroup.rotation.y * 180) / Math.PI) % 360),
        });
      }

      renderer.render(scene, camera);
    }
    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);

      solidMeshes.forEach((m) => {
        m.geometry.dispose();
      });
      wireframeMeshes.forEach((w) => {
        w.geometry.dispose();
      });
      currentMaterial.dispose();
      wireMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Handle Dynamic Material Change
  useEffect(() => {
    if (!solidMeshesRef.current.length) return;
    let color = 0x00a8b3;
    let metalness = 0.85;
    let roughness = 0.22;

    switch (materialType) {
      case "titanium":
        color = 0xc8d1d9;
        metalness = 0.92;
        roughness = 0.28;
        break;
      case "teal_aluminum":
        color = 0x00a8b3;
        metalness = 0.85;
        roughness = 0.22;
        break;
      case "mirror_ss":
        color = 0xf1f5f9;
        metalness = 0.98;
        roughness = 0.08;
        break;
      case "brass":
        color = 0xd4af37;
        metalness = 0.88;
        roughness = 0.3;
        break;
    }

    solidMeshesRef.current.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.color.setHex(color);
        mesh.material.metalness = metalness;
        mesh.material.roughness = roughness;
        mesh.material.needsUpdate = true;
      }
    });
  }, [materialType]);

  // Handle Render Mode Change
  useEffect(() => {
    solidMeshesRef.current.forEach((m) => {
      m.visible = renderMode === "solid" || renderMode === "hybrid";
    });
    wireframesRef.current.forEach((w) => {
      w.visible = renderMode === "wireframe" || renderMode === "hybrid";
    });
  }, [renderMode]);

  function handleResetView() {
    if (groupRef.current) {
      groupRef.current.rotation.set(0.35, 0.75, 0);
      setRotationReadout({ x: 20, y: 43 });
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #0F253B 0%, #081624 60%, #040B12 100%)",
        border: "1px solid rgba(13,148,136,0.25)",
        boxShadow:
          "0 25px 60px -15px rgba(2,13,20,0.6), inset 0 1px 0 rgba(0,196,204,0.15)",
      }}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Top Left: CAD Telemetry HUD */}
      <div className="absolute top-5 left-5 pointer-events-none flex flex-col gap-1.5 z-10">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-widest text-teal-300 uppercase">
            3D CAD Kernel · Live Render
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
          <span>PART: 5-AXIS IMPELLER TURBINE</span>
          <span className="text-teal-500">|</span>
          <span>
            ROT: X:{rotationReadout.x}° Y:{rotationReadout.y}°
          </span>
        </div>
      </div>

      {/* Top Right: View Controls */}
      <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition border ${
            isAutoRotating
              ? "bg-teal-500/20 text-teal-300 border-teal-500/40"
              : "bg-slate-900/80 text-slate-400 border-slate-700/80 hover:text-white"
          }`}
          title="Toggle Auto Rotation"
        >
          <Compass className={`size-3.5 ${isAutoRotating ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Orbit</span>
        </button>

        <button
          onClick={handleResetView}
          className="flex items-center gap-1.5 rounded-xl bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 border border-slate-700/80 hover:text-white hover:border-slate-600 backdrop-blur-md transition"
          title="Reset Camera Angle"
        >
          <RotateCcw className="size-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Floating Interactive 3D Tolerance Callouts */}
      <div className="absolute bottom-24 sm:bottom-6 left-5 right-5 sm:right-auto sm:max-w-md z-10">
        <div className="rounded-2xl border border-teal-500/30 bg-slate-950/85 p-4 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="size-3 text-teal-400" />
              Coordinate Inspection Callout
            </span>
            <div className="flex gap-1">
              {inspectionPoints.map((pt, idx) => (
                <button
                  key={pt.id}
                  onClick={() => setActivePoint(pt)}
                  className={`size-6 rounded-md text-[10px] font-mono font-bold transition ${
                    activePoint.id === pt.id
                      ? "bg-teal-500 text-slate-950 shadow-sm"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2.5">
            <p className="text-sm font-bold text-white">{activePoint.title}</p>
            <p className="text-xs font-mono font-bold text-teal-300 mt-0.5">
              {activePoint.metric}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <Info className="size-3 text-slate-500" />
              Verified by {activePoint.standard}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Right: Material & Wireframe Controls */}
      <div className="absolute bottom-5 right-5 flex flex-wrap items-center gap-2 z-10">
        {/* Render Mode Switcher */}
        <div className="flex items-center rounded-xl bg-slate-950/80 p-1 border border-slate-800 backdrop-blur-md">
          <button
            onClick={() => setRenderMode("hybrid")}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              renderMode === "hybrid"
                ? "bg-teal-500 text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Hybrid
          </button>
          <button
            onClick={() => setRenderMode("solid")}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              renderMode === "solid"
                ? "bg-teal-500 text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Solid
          </button>
          <button
            onClick={() => setRenderMode("wireframe")}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              renderMode === "wireframe"
                ? "bg-teal-500 text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            CAD Wire
          </button>
        </div>

        {/* Material Finish Switcher */}
        <div className="flex items-center rounded-xl bg-slate-950/80 p-1 border border-slate-800 backdrop-blur-md">
          <button
            onClick={() => setMaterialType("teal_aluminum")}
            className={`rounded-lg px-2 py-1 text-[11px] font-semibold transition ${
              materialType === "teal_aluminum"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white"
            }`}
            title="Anodized Teal Aluminum"
          >
            Teal AL
          </button>
          <button
            onClick={() => setMaterialType("titanium")}
            className={`rounded-lg px-2 py-1 text-[11px] font-semibold transition ${
              materialType === "titanium"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white"
            }`}
            title="Titanium Grade 5"
          >
            Titanium
          </button>
          <button
            onClick={() => setMaterialType("mirror_ss")}
            className={`rounded-lg px-2 py-1 text-[11px] font-semibold transition ${
              materialType === "mirror_ss"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white"
            }`}
            title="Mirror Stainless Steel"
          >
            SS 316L
          </button>
          <button
            onClick={() => setMaterialType("brass")}
            className={`rounded-lg px-2 py-1 text-[11px] font-semibold transition ${
              materialType === "brass"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white"
            }`}
            title="Naval Brass C360"
          >
            Brass
          </button>
        </div>
      </div>
    </div>
  );
}
