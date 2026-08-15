import { ProjectDetailsClient } from "./project-details-client";
import { notFound } from "next/navigation";
import { assignedProjects } from "@/mock-data";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Mock scope guard only; the integrated application must repeat this check server-side through RBAC.
  if (!assignedProjects.some(project => project.id === id)) notFound();
  return <ProjectDetailsClient id={id} />;
}
