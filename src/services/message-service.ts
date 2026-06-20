import { getSupabase } from "@/lib/db";
import type { Role } from "@/types/auth";

export type ProjectMessage = {
  id: string;
  projectId: string;
  senderRole: Role;
  senderId: string;
  content: string;
  attachmentUrls: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProjectMessageRow = {
  id: string;
  project_id: string;
  sender_role: Role;
  sender_id: string;
  content: string;
  attachment_urls: string[];
  created_at: string;
  updated_at: string;
};

export function mapMessage(row: ProjectMessageRow): ProjectMessage {
  return {
    id: row.id,
    projectId: row.project_id,
    senderRole: row.sender_role,
    senderId: row.sender_id,
    content: row.content,
    attachmentUrls: row.attachment_urls || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function getProjectMessages(projectId: string): Promise<ProjectMessage[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("project_messages")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })
    .returns<ProjectMessageRow[]>();

  if (error) throw new Error(error.message);
  return (data || []).map(mapMessage);
}

export async function createProjectMessage(input: {
  projectId: string;
  senderRole: Role;
  senderId: string;
  content: string;
  attachmentUrls?: string[];
}): Promise<ProjectMessage> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("project_messages")
    .insert({
      project_id: input.projectId,
      sender_role: input.senderRole,
      sender_id: input.senderId,
      content: input.content,
      attachment_urls: input.attachmentUrls || []
    })
    .select("*")
    .single<ProjectMessageRow>();

  if (error) throw new Error(error.message);
  return mapMessage(data);
}
