import { getSupabase } from "@/lib/db";
import type { ProjectMilestone, ProjectMilestoneRow } from "@/models/ProjectMilestone";
import type { MilestoneCreatorRole, MilestoneStatus } from "@/types/auth";

export function mapMilestone(row: ProjectMilestoneRow): ProjectMilestone {
  return {
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    description: row.description,
    status: row.status,
    attachmentUrls: row.attachment_urls || [],
    dueDate: row.due_date,
    completedAt: row.completed_at,
    createdByRole: row.created_by_role,
    createdById: row.created_by_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function getProjectMilestones(projectId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("project_milestones")
    .select("*")
    .eq("project_id", projectId)
    .order("due_date", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true })
    .returns<ProjectMilestoneRow[]>();

  if (error) throw new Error(error.message);
  return data.map(mapMilestone);
}

export async function createMilestone(input: {
  projectId: string;
  title: string;
  description?: string | null;
  dueDate?: string | null;
  createdByRole: MilestoneCreatorRole;
  createdById: string;
}) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("project_milestones")
    .insert({
      project_id: input.projectId,
      title: input.title,
      description: input.description || null,
      due_date: input.dueDate || null,
      created_by_role: input.createdByRole,
      created_by_id: input.createdById
    })
    .select("*")
    .single<ProjectMilestoneRow>();

  if (error) throw new Error(error.message);
  return mapMilestone(data);
}

export async function updateMilestone(input: {
  milestoneId: string;
  projectId: string;
  title?: string;
  description?: string | null;
  dueDate?: string | null;
  status?: MilestoneStatus;
  attachmentUrls?: string[];
}) {
  const supabase = getSupabase();
  const completedAt = input.status === "completed" ? new Date().toISOString() : null;
  const { data, error } = await supabase
    .from("project_milestones")
    .update({
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.description !== undefined ? { description: input.description || null } : {}),
      ...(input.dueDate !== undefined ? { due_date: input.dueDate || null } : {}),
      ...(input.status ? { status: input.status, completed_at: completedAt } : {}),
      ...(input.attachmentUrls !== undefined ? { attachment_urls: input.attachmentUrls } : {}),
      updated_at: new Date().toISOString()
    })
    .eq("id", input.milestoneId)
    .eq("project_id", input.projectId)
    .select("*")
    .single<ProjectMilestoneRow>();

  if (error) throw new Error(error.message);
  return mapMilestone(data);
}

export async function deleteMilestone(projectId: string, milestoneId: string) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("project_milestones")
    .delete()
    .eq("id", milestoneId)
    .eq("project_id", projectId);

  if (error) throw new Error(error.message);
}
