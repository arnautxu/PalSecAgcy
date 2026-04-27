import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useRef, useMemo } from "react"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import * as THREE from "three"
import { publicUrl } from "@/utils/publicUrl"

// SVG canvas dimensions (from viewBox)
const SVG_W = 413.2
const SVG_H = 169.1
// World-space scale: logo will be ~3.5 units wide
const SCALE = 0.0085
// Extrude depth in SVG units → ~0.19 world units
const DEPTH = 22

function LogoMesh({
  mouseRef,
  isHoveredRef,
  reduced,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
  isHoveredRef: React.MutableRefObject<boolean>
  reduced: boolean
}) {
  const data = useLoader(SVGLoader, publicUrl("/brand/logo.svg"))
  const groupRef = useRef<THREE.Group>(null)

  // Rotation state — kept in refs to avoid re-renders
  const baseY = useRef(0)   // idle angle accumulator
  const smoothY = useRef(0) // lagged display angle
  const tiltY = useRef(0)   // mouse-driven Y overlay
  const tiltX = useRef(0)   // mouse-driven X overlay

  const meshes = useMemo(() => {
    return data.paths.flatMap((path, pi) => {
      const shapes = SVGLoader.createShapes(path)
      // Identify red paths by color value (r > 0.5 → red #ea0029, else dark #1d1d1b)
      const isRed = (path.color as THREE.Color).r > 0.5
      return shapes.map((shape, si) => {
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: DEPTH,
          bevelEnabled: true,
          bevelThickness: 1.5,
          bevelSize: 0.7,
          bevelSegments: 2,
        })
        return (
          <mesh key={`${pi}-${si}`} geometry={geo}>
            <meshStandardMaterial
              color={isRed ? "#ff1a1a" : "#282828"}
              roughness={0.5}
              metalness={0}
            />
          </mesh>
        )
      })
    })
  }, [data])

  useFrame((_, delta) => {
    if (!groupRef.current || reduced) return
    const hovered = isHoveredRef.current

    // Advance idle angle always; freeze baseY to smoothY while hovered
    // so we resume from the correct position on leave
    baseY.current += delta * 0.28
    if (hovered) baseY.current = smoothY.current

    // Smooth mouse tilt — snaps to 0 when not hovered
    const targetTiltY = hovered ? mouseRef.current.x * 0.4 : 0
    const targetTiltX = hovered ? -mouseRef.current.y * 0.25 : 0
    tiltY.current += (targetTiltY - tiltY.current) * 0.07
    tiltX.current += (targetTiltX - tiltX.current) * 0.07

    // Smooth idle follow (only advances when not hovered)
    if (!hovered) {
      smoothY.current += (baseY.current - smoothY.current) * 0.04
    }

    groupRef.current.rotation.y = smoothY.current + tiltY.current
    groupRef.current.rotation.x = tiltX.current
  })

  return (
    // Flip Y axis (SVG y-down → Three.js y-up) and center the logo at origin
    <group
      ref={groupRef}
      scale={[SCALE, -SCALE, SCALE]}
      position={[(-SVG_W / 2) * SCALE, (SVG_H / 2) * SCALE, 0]}
    >
      {meshes}
    </group>
  )
}

export function Logo3D({ reduced = false }: { reduced?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isHoveredRef = useRef(false)

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect || !e.touches[0]) return
    mouseRef.current = {
      x: ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1,
    }
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      onMouseMove={onMouseMove}
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => {
        isHoveredRef.current = false
        mouseRef.current = { x: 0, y: 0 }
      }}
      onTouchStart={() => { isHoveredRef.current = true }}
      onTouchMove={onTouchMove}
      onTouchEnd={() => {
        isHoveredRef.current = false
        mouseRef.current = { x: 0, y: 0 }
      }}
      aria-label="Logotipo PALSEC AGCY en 3D interactivo"
      role="img"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Key light from top-right + soft fill from bottom-left */}
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 8, 5]} intensity={1.0} />
        <directionalLight position={[-2, -3, 3]} intensity={0.25} />
        <Suspense fallback={null}>
          <LogoMesh
            mouseRef={mouseRef}
            isHoveredRef={isHoveredRef}
            reduced={reduced}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
