import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec3 pos = position;
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    
    float dist = length(uMouse - worldPosition.xz);
    float influence = smoothstep(15.0, 0.0, dist);
    
    float wave1 = sin(worldPosition.x * 0.15 + uTime) * cos(worldPosition.z * 0.1 + uTime) * 2.0;
    float wave2 = sin(worldPosition.x * 0.5 - uTime * 2.0) * cos(worldPosition.z * 0.4 + uTime) * 0.5;
    
    pos.y += (wave1 + wave2) * influence;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    vec3 finalColor = uColor;
    finalColor *= smoothstep(0.0, 0.5, vUv.y);
    gl_FragColor = vec4(finalColor, 0.25);
  }
`;

export default function HeroGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.set(0, 25, 40);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Grid plane
    const uniforms = {
      uTime: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color(0x44444d) },
    };

    const geometry = new THREE.PlaneGeometry(100, 100, 60, 60);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2.5;
    scene.add(plane);

    // Invisible hit plane for raycasting
    const hitGeometry = new THREE.PlaneGeometry(500, 500);
    const hitMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const hitPlane = new THREE.Mesh(hitGeometry, hitMaterial);
    hitPlane.rotation.x = -Math.PI / 2;
    scene.add(hitPlane);

    const raycaster = new THREE.Raycaster();
    const mouseTarget = new THREE.Vector2(0, 0);
    const mouseLerp = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObject(hitPlane);
      if (intersects.length > 0) {
        mouseTarget.set(intersects[0].point.x, intersects[0].point.z);
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      uniforms.uTime.value += 0.02;
      mouseLerp.lerp(mouseTarget, 0.1);
      uniforms.uMouse.value.set(mouseLerp.x, mouseLerp.y);
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      hitGeometry.dispose();
      hitMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    />
  );
}
