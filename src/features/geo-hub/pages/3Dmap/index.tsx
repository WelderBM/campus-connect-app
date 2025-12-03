import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import type { University, HUD, Coordinates } from "@/types";

interface Map3DProps {
  university: University;
  huds: HUD[];
}

export const Map3D: React.FC<Map3DProps> = ({ university }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
    const earthTexture = new THREE.TextureLoader().load(
      university.backgroundImage ||
        "https://placehold.co/500x500/0000FF/FFFFFF?text=UNI"
    );
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 5,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    camera.position.z = 4;

    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const addUniversityMarker = (coords: Coordinates, color: string) => {
      const position = latLonToVector3(coords[0], coords[1], 2.01);
      const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position);
      earth.add(marker);
    };

    addUniversityMarker(
      university.centerCoordinates,
      university.continentColor || "#FFFFFF"
    );

    const handleResize = () => {
      const newWidth = mountRef.current ? mountRef.current.clientWidth : 0;
      const newHeight = mountRef.current ? mountRef.current.clientHeight : 0;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      if (!isRotating) {
        earth.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleMouseDown = (event: MouseEvent) => {
      setIsRotating(true);
      setMouseDownPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
      setIsRotating(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isRotating) return;

      const deltaX = event.clientX - mouseDownPosition.x;
      const deltaY = event.clientY - mouseDownPosition.y;

      earth.rotation.y += deltaX * 0.005;
      earth.rotation.x += deltaY * 0.005;

      setMouseDownPosition({ x: event.clientX, y: event.clientY });
    };

    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
    };
  }, [
    university.backgroundImage,
    university.centerCoordinates,
    university.continentColor,
    isRotating,
  ]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-screen bg-gray-900 flex justify-center items-center"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-10">
        <h1 className="text-4xl font-extrabold">{university.shortName}</h1>
        <p className="text-xl mt-2">Navegue com o mouse!</p>
      </div>
    </div>
  );
};
