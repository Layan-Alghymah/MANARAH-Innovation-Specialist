import { IdeaDetailsClient } from "./idea-details-client";
import { notFound } from "next/navigation";
import { evaluations, ideas } from "@/mock-data";

export default async function IdeaDetailsPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ tab?: string }> }) {
  const { id } = await params;
  const { tab = "overview" } = await searchParams;
  if (!ideas.some(item => item.id === id) && !evaluations.some(item => item.id === id)) notFound();
  return <IdeaDetailsClient id={id} initialTab={tab} />;
}
