import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import ProjectTile from "./ProjectTile";

import { usePortalStore } from "@stores";
import { Project } from "@types";

const API_BASE_URL = 'http://localhost/project-showcase-api';

const ProjectsCarousel = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "projects");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!isActive) setActiveId(null);
  }, [isActive]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`);
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Gagal mendapatkan proyek:", error);
      }
    }
    fetchProjects();
  }, []);

  const onClick = (id: number) => {
    if (!isMobile) return;
    setActiveId(id === activeId ? null : id);
  };

  const tiles = useMemo(() => {
    const fov = Math.PI;
    const distance = 13;
    const count = projects.length;

    return projects.map((project, i) => {
      const angle = (fov / count) * i;
      const z = -distance * Math.sin(angle);
      const x = -distance * Math.cos(angle);
      const rotY = Math.PI / 2 - angle;

      return (
        <ProjectTile
          key={project.id || i}
          project={project}
          index={i}
          position={[x, 1, z]}
          rotation={[0, rotY, 0]}
          activeId={activeId}
          onClick={() => onClick(i)}
        />
      );
    });
  }, [activeId, isActive, projects]);

  return (
    <group rotation={[0, -Math.PI / 12, 0]}>
      {tiles}
    </group>
  );
};

export default ProjectsCarousel;