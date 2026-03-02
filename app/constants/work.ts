import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2024',
    title: 'SMKN 3 Buduran',
    subtitle: 'Lulus',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-3, -2, -5),
    year: '2024 - Sekarang',
    title: 'UPN Veteran Jawa Timur',
    subtitle: 'S1 Informatika',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 0, -10),
    year: '2025 - Sekarang',
    title: 'Nexus Omni',
    subtitle: 'Founder — RT/RW Net',
    position: 'right',
  },
]