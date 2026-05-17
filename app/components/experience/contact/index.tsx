import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Contact = () => {
  const texture = useTexture('/contact-bg.svg');
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group>
      <mesh>
        <planeGeometry args={[4, 4, 1]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};

export default Contact;
