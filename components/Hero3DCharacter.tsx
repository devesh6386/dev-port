"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import { useMemo, useRef, useState } from "react";

const SKIN = "#d9a47c",
  HOOD = "#18181B",
  EMERALD = "#10B981",
  CYAN = "#06B6D4";

const lerp = THREE.MathUtils.lerp;

function useScreenTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 320;

    const g = c.getContext("2d")!;
    g.fillStyle = "#03120e";
    g.fillRect(0, 0, 512, 320);
    g.font = "15px monospace";

    [
      "$ uvicorn app.main:fastapi",
      "INFO hybrid_retrieve   38ms",
      "INFO groq.tool_call     94ms",
      "INFO pydantic.parse     11ms",
      "200 OK  total=143ms",
      "> agent.run(query)_",
    ].forEach((l, i) => {
      g.fillStyle = i % 2 ? CYAN : EMERALD;
      g.fillText(l, 18, 34 + i * 26);
    });

    const n: [number, number][] = [
      [330, 200],
      [410, 240],
      [470, 190],
      [390, 285],
      [300, 270],
    ];

    g.strokeStyle = "#8B5CF6";
    g.lineWidth = 2;

    n.forEach(([x, y], i) => {
      const [a, b] = n[(i + 1) % n.length];
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(a, b);
      g.stroke();
    });

    n.forEach(([x, y]) => {
      g.fillStyle = EMERALD;
      g.beginPath();
      g.arc(x, y, 7, 0, 7);
      g.fill();
    });

    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function Dev({ pulse }: { pulse: () => void }) {
  const root = useRef<THREE.Group>(null!);
  const head = useRef<THREE.Group>(null!);
  const torso = useRef<THREE.Group>(null!);
  const lids = useRef<THREE.Group>(null!);
  const rArm = useRef<THREE.Group>(null!);
  const lArm = useRef<THREE.Group>(null!);
  const lHand = useRef<THREE.Mesh>(null!);
  const wave = useRef(0);
  const nextBlink = useRef(3);
  const [sayingHi, setSayingHi] = useState(false);

  const tex = useScreenTexture();

  useFrame(({ pointer }, dt) => {
    const t = performance.now() / 1000;
    const w = wave.current > 0;

    if (w) wave.current -= dt;

    head.current.rotation.y = lerp(
      head.current.rotation.y,
      pointer.x * 0.5,
      0.08
    );

    head.current.rotation.x = lerp(
      head.current.rotation.x,
      -pointer.y * 0.25 + (w ? Math.sin(t * 9) * 0.12 : 0),
      0.08
    );

    torso.current.rotation.y = lerp(
      torso.current.rotation.y,
      pointer.x * 0.2,
      0.05
    );

    torso.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.012);

    if (t > nextBlink.current) {
      nextBlink.current = t + 3 + Math.random();
      lids.current.userData.b = t;
    }

    const b = t - (lids.current.userData.b ?? -9);

    lids.current.scale.y =
      b < 0.15 ? 0.05 + Math.abs(b - 0.075) * 12 : 0.05;

    lids.current.visible = b < 0.15;

    lArm.current.rotation.x = -0.9 + Math.sin(t * 14) * 0.03;
    lHand.current.position.y = -0.95 + Math.sin(t * 16) * 0.025;

    rArm.current.rotation.x = lerp(
      rArm.current.rotation.x,
      w ? 0 : -0.9,
      0.12
    );

    rArm.current.rotation.z = lerp(
      rArm.current.rotation.z,
      w ? -2.4 + Math.sin(t * 12) * 0.3 : 0,
      0.12
    );

    root.current.position.y = Math.sin(t * 1.2) * 0.02;
  });

  const arm = (
    side: number,
    ref: React.RefObject<THREE.Group | null>,
    hand?: React.RefObject<THREE.Mesh | null>
  ) => (
    <group ref={ref} position={[side * 0.78, 0.45, 0]}>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.16, 0.14, 1, 16]} />
        <meshStandardMaterial color={HOOD} roughness={0.8} />
      </mesh>

      <mesh ref={hand} position={[0, -0.95, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.55} />
      </mesh>
    </group>
  );

  return (
    <group
      ref={root}
      onClick={(e) => {
        e.stopPropagation();
        wave.current = 2.2;
        setSayingHi(true);
        setTimeout(() => setSayingHi(false), 2000);
        pulse();
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <group ref={torso}>
        <RoundedBox
          args={[1.5, 1.4, 0.8]}
          radius={0.35}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial color={HOOD} roughness={0.85} />
        </RoundedBox>

        <mesh position={[0, 0.72, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.14, 16, 32]} />
          <meshStandardMaterial color={HOOD} roughness={0.9} />
        </mesh>

        {/* Glowing cyan hoodie drawstrings */}
        {[-0.1, 0.1].map((x) => (
          <group key={x}>
            <mesh position={[x, 0.36, 0.42]}>
              <cylinderGeometry args={[0.015, 0.015, 0.44]} />
              <meshStandardMaterial
                color={CYAN}
                emissive={CYAN}
                emissiveIntensity={1.2}
              />
            </mesh>
          </group>
        ))}

        {/* Chest <DG/> badge */}
        <mesh position={[0.4, 0.35, 0.41]}>
          <planeGeometry args={[0.34, 0.16]} />
          <meshBasicMaterial color="#04140f" />
        </mesh>

        <Html position={[0.4, 0.35, 0.42]} center transform distanceFactor={3}>
          <span
            style={{
              font: "700 11px monospace",
              color: EMERALD,
              textShadow: `0 0 8px ${EMERALD}`,
            }}
          >
            &lt;DG/&gt;
          </span>
        </Html>

        {arm(1, lArm, lHand)}
        {arm(-1, rArm)}

        <group ref={head} position={[0, 1.2, 0]}>
          <mesh scale={[1, 1.12, 0.95]}>
            <sphereGeometry args={[0.52, 48, 48]} />
            <meshStandardMaterial color={SKIN} roughness={0.55} />
          </mesh>

          <mesh position={[0, -0.22, 0.06]} scale={[0.9, 0.7, 0.85]}>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial color={SKIN} roughness={0.55} />
          </mesh>

          <mesh
            position={[0, 0.08, -0.04]}
            rotation={[-0.25, 0, 0]}
            scale={[1.06, 1.1, 1.02]}
          >
            <sphereGeometry
              args={[0.53, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2.1]}
            />
            <meshStandardMaterial color="#14110f" roughness={0.7} />
          </mesh>

          {[
            [-0.3, 0.5, 0.3],
            [0, 0.58, 0.3],
            [0.3, 0.5, 0.3],
          ].map((p, i) => (
            <RoundedBox
              key={i}
              args={[0.28, 0.14, 0.2]}
              radius={0.06}
              position={p as [number, number, number]}
              rotation={[0.5, 0, (i - 1) * -0.4]}
            >
              <meshStandardMaterial color="#14110f" roughness={0.7} />
            </RoundedBox>
          ))}

          {[-1, 1].map((s) => (
            <group key={s} position={[s * 0.19, 0.05, 0.42]}>
              <mesh>
                <sphereGeometry args={[0.065, 24, 24]} />
                <meshStandardMaterial color="#fff" roughness={0.2} />
              </mesh>

              <mesh position={[0, 0, 0.04]}>
                <sphereGeometry args={[0.035, 16, 16]} />
                <meshStandardMaterial color="#0b0b0e" />
              </mesh>

              <mesh position={[0.015, 0.02, 0.075]}>
                <sphereGeometry args={[0.012, 8, 8]} />
                <meshBasicMaterial color="#fff" />
              </mesh>

              <mesh position={[0, 0.14, 0.02]} rotation={[0, 0, s * 0.1]}>
                <boxGeometry args={[0.16, 0.025, 0.03]} />
                <meshStandardMaterial color="#14110f" />
              </mesh>

              <mesh>
                <torusGeometry args={[0.16, 0.012, 12, 48]} />
                <meshStandardMaterial
                  color="#2b2f36"
                  metalness={0.9}
                  roughness={0.25}
                />
              </mesh>

              <mesh position={[0, 0, 0.005]}>
                <circleGeometry args={[0.155, 32]} />
                <meshPhysicalMaterial
                  transmission={0.6}
                  roughness={0.1}
                  thickness={0.05}
                  color={CYAN}
                  emissive={CYAN}
                  emissiveIntensity={0.08}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            </group>
          ))}

          <mesh position={[0, 0.05, 0.43]}>
            <boxGeometry args={[0.1, 0.014, 0.014]} />
            <meshStandardMaterial color="#2b2f36" metalness={0.9} />
          </mesh>

          <group ref={lids} position={[0, 0.05, 0.45]} visible={false}>
            {[-0.19, 0.19].map((x) => (
              <mesh key={x} position={[x, 0, 0]} scale={[1, 0.05, 1]}>
                <boxGeometry args={[0.14, 0.14, 0.02]} />
                <meshStandardMaterial color={SKIN} />
              </mesh>
            ))}
          </group>

          <mesh position={[0, -0.2, 0.46]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.09, 0.012, 8, 24, Math.PI]} />
            <meshStandardMaterial color="#8a4b3b" />
          </mesh>

          {sayingHi && (
            <Html position={[0.75, 0.45, 0.2]} center distanceFactor={5}>
              <div className="mono whitespace-nowrap rounded-full border border-emerald-400/50 bg-[#071813]/90 px-3 py-1 text-xs text-emerald-300 shadow-lg">
                Hey! 👋
              </div>
            </Html>
          )}
        </group>
      </group>

      {/* Desk */}
      <RoundedBox
        args={[3.7, 0.12, 1.45]}
        radius={0.05}
        position={[0, -0.85, 0.9]}
      >
        <meshPhysicalMaterial
          color="#0c0e12"
          metalness={0.65}
          roughness={0.18}
          transmission={0.15}
        />
      </RoundedBox>

      {/* Subtle violet/emerald under-desk glow strip */}
      <mesh position={[0, -0.92, 1.58]}>
        <boxGeometry args={[3.4, 0.02, 0.04]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>

      {/* Coffee Mug on desk */}
      <group position={[1.28, -0.66, 1.1]}>
        <mesh>
          <cylinderGeometry args={[0.11, 0.1, 0.24, 24]} />
          <meshStandardMaterial color="#e4e4e7" roughness={0.3} />
        </mesh>
        <mesh position={[0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.06, 0.018, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#e4e4e7" roughness={0.3} />
        </mesh>
      </group>

      {/* Floating holographic terminal display */}
      <group position={[-1.45, 0.65, 0.55]} rotation={[0, 0.28, 0]}>
        <mesh>
          <planeGeometry args={[1.45, 0.92]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
      </group>

      {/* Laptop */}
      <group position={[-0.08, -0.78, 0.95]}>
        <RoundedBox args={[1.5, 0.05, 1]} radius={0.02}>
          <meshStandardMaterial
            color="#5b6068"
            metalness={0.9}
            roughness={0.35}
          />
        </RoundedBox>

        <mesh position={[0, 0.03, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.3, 0.55]} />
          <meshBasicMaterial color={EMERALD} transparent opacity={0.12} />
        </mesh>

        <group position={[0, 0.03, -0.5]} rotation={[0.1, 0, 0]}>
          <RoundedBox
            args={[1.5, 0.95, 0.04]}
            radius={0.02}
            position={[0, 0.48, 0]}
          >
            <meshStandardMaterial
              color="#14161a"
              metalness={0.85}
              roughness={0.3}
            />
          </RoundedBox>

          {/* Back lid glowing <DG/> badge facing camera */}
          <Html
            position={[0, 0.48, 0.03]}
            center
            transform
            distanceFactor={3.4}
          >
            <span
              style={{
                font: "700 12px monospace",
                color: EMERALD,
                textShadow: `0 0 10px ${EMERALD}`,
              }}
            >
              &lt;DG/&gt;
            </span>
          </Html>

          <mesh position={[0, 0.48, -0.025]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.38, 0.84]} />
            <meshBasicMaterial map={tex} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Rig({ burst }: { burst: number }) {
  const ring = useRef<THREE.Mesh>(null!);
  const orbit = useRef<THREE.Group>(null!);
  const start = useRef(-9);
  const last = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (burst !== last.current) {
      last.current = burst;
      start.current = t;
    }

    const k = t - start.current;
    const on = k < 1.4;

    ring.current.visible = on;
    ring.current.scale.setScalar(1 + k * 3);

    (ring.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
      0,
      1 - k / 1.4
    );

    orbit.current.rotation.y = t * 0.35;
    orbit.current.scale.setScalar(on ? 1 + Math.sin(k * 6) * 0.05 : 1);
  });

  const labels = ["LLM Agents", "Hybrid RAG", "FastAPI + SQL"];

  return (
    <>
      <mesh
        ref={ring}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.9, 0.4]}
        visible={false}
      >
        <ringGeometry args={[0.9, 1, 64]} />
        <meshBasicMaterial color={EMERALD} transparent />
      </mesh>

      <group ref={orbit} position={[0, 0.45, 0]}>
        {labels.map((l, i) => {
          const a = (i / 3) * Math.PI * 2;

          return (
            <Float
              key={l}
              speed={2}
              floatIntensity={0.6}
              position={[
                Math.sin(a) * 2.55,
                (i - 1) * 0.48,
                Math.cos(a) * 2.15 - 0.3,
              ]}
            >
              <Html center transform distanceFactor={5} zIndexRange={[0, 0]}>
                <div
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,.16)",
                    background:
                      "linear-gradient(135deg,rgba(6,182,212,.18),rgba(139,92,246,.22))",
                    backdropFilter: "blur(8px)",
                    color: "#e4e4e7",
                    font: "500 12px ui-monospace,monospace",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  • {l}
                </div>
              </Html>
            </Float>
          );
        })}
      </group>
    </>
  );
}

export default function Hero3DCharacter() {
  const [burst, setBurst] = useState(0);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.85, 6.2], fov: 38 }} shadows>
      <ambientLight intensity={0.28} />

      <directionalLight position={[3, 4, 4]} intensity={1.4} color="#ffd9b8" />

      <pointLight
        position={[0, 0.6, 2.4]}
        intensity={6}
        distance={5}
        color={CYAN}
      />

      <spotLight
        position={[-3, 3, -3]}
        intensity={60}
        angle={0.6}
        penumbra={0.8}
        color={EMERALD}
      />

      <Environment preset="city" environmentIntensity={0.35} />

      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
        <Dev pulse={() => setBurst((b) => b + 1)} />
      </Float>

      <Rig burst={burst} />

      <Sparkles
        count={42}
        scale={[6, 4, 4]}
        size={2}
        speed={0.3}
        color={CYAN}
      />

      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.5}
        blur={2.5}
        scale={8}
        far={3}
      />
    </Canvas>
  );
}