import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2024',
    title: 'Lulus SMA/SMK',
    subtitle: 'High School Graduate',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-3.5, -1, -6),
    year: '2024 - Sekarang',
    title: 'UPN Veteran Jawa Timur',
    subtitle: 'S1 Informatics Engineering',
    position: 'left',
  },
  {
    point: new THREE.Vector3(2, -0.5, -12),
    year: '2025',
    title: 'Full-Stack Developer',
    subtitle: 'React Native · Node.js · Next.js',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-3, 2, -18),
    year: 'Future',
    title: 'Building Impactful Solutions',
    subtitle: 'Always Learning New Things',
    position: 'left',
  },  
]