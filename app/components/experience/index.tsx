import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { usePortalStore } from "@stores";
import { useRef } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from 'three';
import Contact from "./contact";
import GridTile from "./GridTile";
import Projects from "./projects";
import Skills from "./skills";
import Work from "./work";

const Experience = () => {
  const titleRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();
  const isActive = usePortalStore((state) => !!state.activePortalId);
  const activePortalId = usePortalStore((state) => state.activePortalId);

  const fontProps = {
    font: "./soria-font.ttf",
    fontSize: 0.4,
    color: 'white',
  };

  useFrame((state, delta) => {
    const d = data.range(0.8, 0.2);
    const e = data.range(0.7, 0.2);

    if (!isActive) {
      // Only pan camera left and right when fully in the Experience section (after door animation)
      const panFactor = data.range(0.8, 0.1); // 0 during door animation, 1 at Experience tiles
      const targetX = state.pointer.x * (isMobile ? 4 : 6) * panFactor;
      state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 3, delta);
    } else {
      // Zoom in on the active portal
      let targetX = 0;
      switch (activePortalId) {
        case 'work': targetX = isMobile ? -1 : -2; break;
        case 'projects': targetX = isMobile ? 1 : 2; break;
        case 'skills': targetX = isMobile ? -3 : -6; break;
        case 'contact': targetX = isMobile ? 3 : 6; break;
      }
      
      // Move X to center the active tile
      state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 4, delta);
      // Move Y closer to the floor (-41.5) to zoom in from the scroll height (-37)
      state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, -39.5, 4, delta);
      // Reset rotation sway from ScrollWrapper
      state.camera.rotation.y = THREE.MathUtils.damp(state.camera.rotation.y, 0, 4, delta);
    }

    if (groupRef.current && !isActive) {
      groupRef.current.position.y = d > 0 ? -1 : -30;
      groupRef.current.visible = d > 0;
    }

    if (titleRef.current) {
      titleRef.current.children.forEach((text, i) => {
        const y = Math.max(Math.min((1 - d) * (10 - i), 10), 0.5);
        text.position.y = THREE.MathUtils.damp(text.position.y, y, 7, delta);
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        (text as any).fillOpacity = e;
      });
    }
  });

  const getTitle = () => {
    const title = 'experience'.toUpperCase();
    return title.split('').map((char, i) => {
      const diff = isMobile ? 0.4 : 0.8;
      return (
        <Text key={i} {...fontProps} position={[i * diff, 2, 1]}>{char}</Text>
      );
    });
  };

  return (
    <group position={[0, -41.5, 12]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
      {/* <mesh receiveShadow position={[-5, 0, 0.1]}>
        <planeGeometry args={[10, 5, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh> */}
      <group rotation={[0, 0, Math.PI / 2]}>
        <group ref={titleRef} position={[isMobile ? -1.8 : -3.6, 2, -2]}>
          {getTitle()}
        </group>

        <group position={[0, -1, 0]} ref={groupRef}>
          <GridTile title='MY JOURNEY'
            id="work"
            color='#b9c6d6'
            textAlign='left'
            position={new THREE.Vector3(isMobile ? -1 : -2, 0, isMobile ? 0.4 : 0)}>
            <Work />
          </GridTile>
          <GridTile title='SIDE PROJECTS'
            id="projects"
            color='#bdd1e3'
            textAlign='right'
            position={new THREE.Vector3(isMobile ? 1 : 2, 0, 0)}>
            <Projects />
          </GridTile>
          <GridTile title='SKILLS & TOOLS'
            id="skills"
            color='#0f1d30'
            textAlign='left'
            position={new THREE.Vector3(isMobile ? -3 : -6, 0, 0)}>
            <Skills />
          </GridTile>
          <GridTile title='CONTACT ME'
            id="contact"
            color='#06040a'
            textAlign='right'
            position={new THREE.Vector3(isMobile ? 3 : 6, 0, 0)}>
            <Contact />
          </GridTile>
        </group>
      </group>
    </group>
  );
};

export default Experience;