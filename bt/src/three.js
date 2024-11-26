import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SolarSystem = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Tạo scene, camera, và renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Tạo mặt trời
        const sunGeometry = new THREE.SphereGeometry(30, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // Tạo các hành tinh
        const planets = [
            { name: 'Mercury', radius: 5, distance: 50, speed: 0.1, color: 0xaaaaaa, initialAngle: 0 },
            { name: 'Venus', radius: 10, distance: 70, speed: 0.07, color: 0xffff00, initialAngle: Math.PI / 4 },
            { name: 'Earth', radius: 10, distance: 100, speed: 0.05, color: 0x0000ff, initialAngle: Math.PI / 2 },
            { name: 'Mars', radius: 8, distance: 130, speed: 0.03, color: 0xff0000, initialAngle: Math.PI * 3 / 4 },
            { name: 'Jupiter', radius: 20, distance: 160, speed: 0.02, color: 0xffa500, initialAngle: Math.PI },
            { name: 'Saturn', radius: 18, distance: 200, speed: 0.015, color: 0xdaa520, initialAngle: Math.PI * 5 / 4 },
            { name: 'Uranus', radius: 15, distance: 240, speed: 0.03, color: 0x00ffff, initialAngle: Math.PI * 3 / 2 },
            { name: 'Neptune', radius: 15, distance: 280, speed: 0.08, color: 0x0000ff, initialAngle: Math.PI * 7 / 4 },
        ];

        const planetMeshes = planets.map((planet) => {
            const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: planet.color });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = planet.distance;
            scene.add(mesh);
            return { mesh, speed: planet.speed, distance: planet.distance, angle: planet.initialAngle };
        });

        // Đặt camera góc nhìn 3D
        camera.position.set(200, 200, 300); // Camera ở vị trí góc (x: 200, y: 200, z: 300)
        camera.lookAt(0, 0, 0); // Nhìn vào Mặt trời

        // Hàm animate để render các hành tinh xoay quanh mặt trời
        const animate = () => {
            requestAnimationFrame(animate);

            planetMeshes.forEach((planet) => {
                planet.angle += planet.speed; // Cập nhật góc quay
                planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
                planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
            });

            renderer.render(scene, camera);
        };

        animate(); // Bắt đầu render

        // Clean up khi component unmount
        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default SolarSystem;
