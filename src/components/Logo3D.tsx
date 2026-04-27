import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useRef, useMemo } from "react"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import * as THREE from "three"
import { publicUrl } from "@/utils/publicUrl"

const SVG_W = 413.2
const SVG_H = 169.1
// Scale: logo ~3.7 world-units wide
const SCALE = 0.009
// Depth scatter in SVG units — creates the cloud depth when rotating
const Z_SPREAD = 20

/** Soft gaussian circle texture for particle sprites */
function makeSpriteTex(): THREE.CanvasTexture {
  const s = 64
  const c = document.createElement("canvas")
  c.width = s
  c.height = s
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.3, "rgba(255,255,255,0.65)")
  g.addColorStop(0.65, "rgba(255,255,255,0.15)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  return new THREE.CanvasTexture(c)
}

/** Sample points along a path's outline (and hole outlines) */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function samplePath(path: any, outlineCount: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  const shapes = SVGLoader.createShapes(path)
  shapes.forEach((shape) => {
    shape.getSpacedPoints(outlineCount).forEach((p) => {
      pts.push(new THREE.Vector3(p.x, p.y, (Math.random() - 0.5) * Z_SPREAD * 2))
    })
    // Preserve hole outlines (letter counters like P, A, a, g)
    shape.holes.forEach((hole) => {
      hole.getSpacedPoints(Math.floor(outlineCount * 0.35)).forEach((p) => {
        pts.push(new THREE.Vector3(p.x, p.y, (Math.random() - 0.5) * Z_SPREAD * 2))
      })
    })
  })
  return pts
}

function buildGeo(pts: THREE.Vector3[]): THREE.BufferGeometry {
  const pos = new Float32Array(pts.length * 3)
  pts.forEach((p, i) => {
    pos[i * 3] = p.x
    pos[i * 3 + 1] = p.y
    pos[i * 3 + 2] = p.z
  })
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
  return geo
}

function ParticleMesh({
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

  const baseY = useRef(0)
  const smoothY = useRef(0)
  const tiltY = useRef(0)
  const tiltX = useRef(0)

  const { redGeo, darkGeo, tex } = useMemo(() => {
    const tex = makeSpriteTex()
    const red: THREE.Vector3[] = []
    const dark: THREE.Vector3[] = []

    data.paths.forEach((path) => {
      const isRed = (path.color as THREE.Color).r > 0.5
      // PALSEC paths are larger → more samples; agcy. paths are smaller
      const count = isRed ? 220 : 130
      const pts = samplePath(path, count)
      if (isRed) red.push(...pts)
      else dark.push(...pts)
    })

    return { redGeo: buildGeo(red), darkGeo: buildGeo(dark), tex }
  }, [data])

  useFrame((_, delta) => {
    if (!groupRef.current || reduced) return
    const hovered = isHoveredRef.current

    baseY.current += delta * 0.22
    if (hovered) baseY.current = smoothY.current

    const targetTiltY = hovered ? mouseRef.current.x * 0.38 : 0
    const targetTiltX = hovered ? -mouseRef.current.y * 0.22 : 0
    tiltY.current += (targetTiltY - tiltY.current) * 0.07
    tiltX.current += (targetTiltX - tiltX.current) * 0.07

    if (!hovered) {
      smoothY.current += (baseY.current - smoothY.current) * 0.04
    }

    groupRef.current.rotation.y = smoothY.current + tiltY.current
    groupRef.current.rotation.x = tiltX.current
  })

  return (
    <group
      ref={groupRef}
      scale={[SCALE, -SCALE, SCALE]}
      position={[(-SVG_W / 2) * SCALE, (SVG_H / 2) * SCALE, 0]}
    >
      {/* PALSEC — red particles */}
      <points geometry={redGeo}>
        <pointsMaterial
          color="#ff1a1a"
          size={0.024}
          sizeAttenuation
          map={tex}
          transparent
          opacity={0.88}
          depthWrite={false}
          alphaTest={0.01}
        />
      </points>
      {/* agcy. — dark particles, slightly more transparent */}
      <points geometry={darkGeo}>
        <pointsMaterial
          color="#282828"
          size={0.020}
          sizeAttenuation
          map={tex}
          transparent
          opacity={0.65}
          depthWrite={false}
          alphaTest={0.01}
        />
      </points>
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
        camera={{ position: [0, 0, 6], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* No lights needed — PointsMaterial is unlit */}
        <Suspense fallback={null}>
          <ParticleMesh
            mouseRef={mouseRef}
            isHoveredRef={isHoveredRef}
            reduced={reduced}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
