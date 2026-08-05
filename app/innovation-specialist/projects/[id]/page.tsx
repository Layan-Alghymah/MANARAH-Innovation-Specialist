import { ProjectDetailsClient } from "./project-details-client";
import { notFound } from "next/navigation";
import { projects } from "@/mock-data";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!projects.some(project => project.id === id)) notFound();
  return <ProjectDetailsClient id={id} />;
}
