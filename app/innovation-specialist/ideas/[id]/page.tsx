import { IdeaDetailsClient } from "./idea-details-client";
import { notFound } from "next/navigation";
import { assignedIdeas } from "@/mock-data";

export default async function IdeaDetailsPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ tab?: string }> }) {
  const { id } = await params;
  const { tab = "overview" } = await searchParams;
  // Mock scope guard only; the integrated application must repeat this check server-side through RBAC.
  if (!assignedIdeas.some(item => item.id === id)) notFound();
  return <IdeaDetailsClient id={id} initialTab={tab} />;
}
