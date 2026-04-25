import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2024',
    title: 'Lulus SMA/SMK',
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
    year: '2024 - Sekarang',
    title: 'Freelance & Projects',
    subtitle: 'Backend · Fullstack · IoT',
    position: 'right',
  },
]