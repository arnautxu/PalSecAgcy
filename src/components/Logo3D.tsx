import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { Suspense, useRef, useMemo } from "react"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import * as THREE from "three"
import { publicUrl } from "@/utils/publicUrl"

const SVG_W = 413.2
const SVG_H = 169.1
const SCALE = 0.012
const Z_SPREAD = 20

// Particle physics constants (in SVG units)
const REPEL_RADIUS = 32   // how far the cursor influence reaches
const REPEL_FORCE = 6.0   // repulsion impulse strength
const SPRING = 0.10       // fraction pulled back to origin per frame
const DAMPING = 0.84      // velocity multiplier per frame

/** Soft gaussian sprite texture */
function makeSpriteTex(): THREE.CanvasTexture {
  const s = 64
  const c = document.createElement("canvas")
  c.width = s; c.height = s
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0,    "rgba(255,255,255,1)")
  g.addColorStop(0.3,  "rgba(255,255,255,0.65)")
  g.addColorStop(0.65, "rgba(255,255,255,0.15)")
  g.addColorStop(1,    "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  return new THREE.CanvasTexture(c)
}

function rndZ() { return (Math.random() - 0.5) * Z_SPREAD * 2 }

function insidePoly(poly: THREE.Vector2[], x: number, y: number): boolean {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y
    const xj = poly[j].x, yj = poly[j].y
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      inside = !inside
  }
  return inside
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function samplePath(path: any, outlineCount: number, fillSpacing: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  const shapes = SVGLoader.createShapes(path)
  shapes.forEach((shape) => {
    shape.getSpacedPoints(outlineCount).forEach((p) =>
      pts.push(new THREE.Vector3(p.x, p.y, rndZ())))
    shape.holes.forEach((hole) =>
      hole.getSpacedPoints(Math.floor(outlineCount * 0.4)).forEach((p) =>
        pts.push(new THREE.Vector3(p.x, p.y, rndZ()))))
    const outerPoly = shape.getPoints(120)
    const holePoly  = shape.holes.map((h) => h.getPoints(60))
    const box = new THREE.Box2()
    outerPoly.forEach((p) => box.expandByPoint(p))
    for (let x = box.min.x; x <= box.max.x; x += fillSpacing)
      for (let y = box.min.y; y <= box.max.y; y += fillSpacing)
        if (insidePoly(outerPoly, x, y) && !holePoly.some((h) => insidePoly(h, x, y)))
          pts.push(new THREE.Vector3(x, y, rndZ()))
  })
  return pts
}

/** Apply per-particle repulsion + spring physics. Mutates curr and vel in place. */
function tickPhysics(
  curr: Float32Array, orig: Float32Array, vel: Float32Array,
  svgMouseX: number, svgMouseY: number, hovered: boolean,
): boolean {
  const n = curr.length / 3
  let anyActive = false
  for (let i = 0; i < n; i++) {
    const i3 = i * 3
    const ox = orig[i3], oy = orig[i3 + 1], oz = orig[i3 + 2]
    let cx = curr[i3], cy = curr[i3 + 1], cz = curr[i3 + 2]
    let vx = vel[i3],  vy = vel[i3 + 1],  vz = vel[i3 + 2]

    // Repulsion from cursor
    if (hovered) {
      const dx = cx - svgMouseX
      const dy = cy - svgMouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < REPEL_RADIUS && dist > 0.1) {
        const t = 1 - dist / REPEL_RADIUS       // 0→1 as we get closer
        const f = (REPEL_FORCE * t) / dist
        vx += dx * f
        vy += dy * f
        vz += (Math.random() - 0.5) * REPEL_FORCE * t * 6
      }
    }

    // Spring back to original position
    vx += (ox - cx) * SPRING
    vy += (oy - cy) * SPRING
    vz += (oz - cz) * SPRING

    // Damping
    vx *= DAMPING; vy *= DAMPING; vz *= DAMPING

    cx += vx; cy += vy; cz += vz

    curr[i3] = cx; curr[i3 + 1] = cy; curr[i3 + 2] = cz
    vel[i3]  = vx; vel[i3 + 1]  = vy; vel[i3 + 2]  = vz

    if (Math.abs(vx) + Math.abs(vy) + Math.abs(vz) > 0.05) anyActive = true
  }
  return anyActive
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
  const { size, camera } = useThree()

  // Live position/velocity buffers — mutated each frame
  const redOrig = useRef<Float32Array>(new Float32Array(0))
  const redCurr = useRef<Float32Array>(new Float32Array(0))
  const redVel  = useRef<Float32Array>(new Float32Array(0))
  const drkOrig = useRef<Float32Array>(new Float32Array(0))
  const drkCurr = useRef<Float32Array>(new Float32Array(0))
  const drkVel  = useRef<Float32Array>(new Float32Array(0))
  const activeRef = useRef(false)

  const { redGeo, darkGeo, tex } = useMemo(() => {
    const tex  = makeSpriteTex()
    const red: THREE.Vector3[] = []
    const dark: THREE.Vector3[] = []

    data.paths.forEach((path) => {
      const isRed = (path.color as THREE.Color).r > 0.5
      const pts   = samplePath(path, isRed ? 900 : 550, isRed ? 2 : 3)
      if (isRed) red.push(...pts)
      else       dark.push(...pts)
    })

    // Build flat Float32Arrays and share with physics refs
    const toF32 = (pts: THREE.Vector3[]) => {
      const a = new Float32Array(pts.length * 3)
      pts.forEach((p, i) => { a[i*3]=p.x; a[i*3+1]=p.y; a[i*3+2]=p.z })
      return a
    }
    const rArr = toF32(red);  redOrig.current = rArr; redCurr.current = rArr.slice(); redVel.current = new Float32Array(rArr.length)
    const dArr = toF32(dark); drkOrig.current = dArr; drkCurr.current = dArr.slice(); drkVel.current = new Float32Array(dArr.length)

    const makeGeo = (arr: Float32Array) => {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.BufferAttribute(arr, 3))
      return geo
    }
    return { redGeo: makeGeo(redCurr.current), darkGeo: makeGeo(drkCurr.current), tex }
  }, [data])

  useFrame(() => {
    if (reduced) return
    const hovered = isHoveredRef.current
    if (!hovered && !activeRef.current) return

    // Convert mouse NDC → SVG space
    const cam = camera as THREE.PerspectiveCamera
    const halfH = Math.tan((cam.fov * Math.PI) / 180 / 2) * cam.position.z
    const halfW = halfH * (size.width / size.height)
    const worldX = mouseRef.current.x * halfW
    const worldY = mouseRef.current.y * halfH
    // group: scale (SCALE, -SCALE, SCALE), pos ((-W/2)*S, (H/2)*S, 0)
    const svgX = worldX / SCALE + SVG_W / 2
    const svgY = SVG_H / 2 - worldY / SCALE

    const a = tickPhysics(redCurr.current, redOrig.current, redVel.current, svgX, svgY, hovered)
    const b = tickPhysics(drkCurr.current, drkOrig.current, drkVel.current, svgX, svgY, hovered)
    activeRef.current = a || b

    ;(redGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true
    ;(darkGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true
  })

  return (
    <group
      scale={[SCALE, -SCALE, SCALE]}
      position={[(-SVG_W / 2) * SCALE, (SVG_H / 2) * SCALE, 0]}
    >
      <points geometry={redGeo}>
        <pointsMaterial color="#ff1a1a" size={0.022} sizeAttenuation
          map={tex} transparent opacity={0.88} depthWrite={false} alphaTest={0.01} />
      </points>
      <points geometry={darkGeo}>
        <pointsMaterial color="#282828" size={0.018} sizeAttenuation
          map={tex} transparent opacity={0.65} depthWrite={false} alphaTest={0.01} />
      </points>
    </group>
  )
}

export function Logo3D({ reduced = false }: { reduced?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef     = useRef({ x: 0, y: 0 })
  const isHoveredRef = useRef(false)

  const onMouseMove = (e: React.MouseEvent) => {
    const r = containerRef.current?.getBoundingClientRect()
    if (!r) return
    mouseRef.current = {
      x:  ((e.clientX - r.left) / r.width)  * 2 - 1,
      y: -((e.clientY - r.top)  / r.height) * 2 + 1,
    }
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const r = containerRef.current?.getBoundingClientRect()
    if (!r || !e.touches[0]) return
    mouseRef.current = {
      x:  ((e.touches[0].clientX - r.left) / r.width)  * 2 - 1,
      y: -((e.touches[0].clientY - r.top)  / r.height) * 2 + 1,
    }
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-crosshair select-none"
      onMouseMove={onMouseMove}
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => { isHoveredRef.current = false; mouseRef.current = { x: 0, y: 0 } }}
      onTouchStart={() => { isHoveredRef.current = true }}
      onTouchMove={onTouchMove}
      onTouchEnd={() => { isHoveredRef.current = false; mouseRef.current = { x: 0, y: 0 } }}
      aria-label="Logotipo PALSEC AGCY interactivo"
      role="img"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ParticleMesh mouseRef={mouseRef} isHoveredRef={isHoveredRef} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  )
}
