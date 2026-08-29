"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/requireAdmin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AdminEditorialActionContentType = "article" | "news" | "story" | "historical_echo";
type AdminEditorialUnpublishTargetStatus = "draft" | "archived";

const contentTypes = new Set<AdminEditorialActionContentType>([
  "article",
  "news",
  "story",
  "historical_echo",
]);

const unpublishTargetStatuses = new Set<AdminEditorialUnpublishTargetStatus>(["draft", "archived"]);

const adminPathByContentType: Record<AdminEditorialActionContentType, string> = {
  article: "/admin/generated-content/articles",
  news: "/admin/news-radar",
  story: "/admin/story-library",
  historical_echo: "/admin/historical-echo",
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function parseContentType(value: string): AdminEditorialActionContentType | null {
  const normalized = value.trim().toLowerCase();
  return contentTypes.has(normalized as AdminEditorialActionContentType) ? (normalized as AdminEditorialActionContentType) : null;
}

function parseUnpublishTargetStatus(value: string): AdminEditorialUnpublishTargetStatus | null {
  const normalized = value.trim().toLowerCase();
  return unpublishTargetStatuses.has(normalized as AdminEditorialUnpublishTargetStatus) ? (normalized as AdminEditorialUnpublishTargetStatus) : null;
}

function redirectWithStatus(path: string, status: string): never {
  redirect(`${path}?adminAction=${encodeURIComponent(status)}`);
}

export async function updateAdminEditorialInternalNotesAction(formData: FormData): Promise<void> {
  const contentType = parseContentType(readString(formData, "contentType"));
  const redirectPath = contentType ? adminPathByContentType[contentType] : "/admin";

  if (!contentType) redirectWithStatus(redirectPath, "invalid_content_type");

  const contentId = readString(formData, "contentId").trim();
  if (!uuidPattern.test(contentId)) redirectWithStatus(redirectPath, "invalid_content_id");

  const internalNotes = readString(formData, "internalNotes");
  if (internalNotes.length > 4000) redirectWithStatus(redirectPath, "notes_too_long");

  await requireAdmin();

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("update_editorial_internal_notes", {
    p_content_type: contentType,
    p_content_id: contentId,
    p_internal_notes: internalNotes,
  });

  if (error) {
    const status = error.message.includes("admin_editorial_action_forbidden") ? "forbidden" : "notes_failed";
    redirectWithStatus(redirectPath, status);
  }

  revalidatePath(redirectPath);
  redirectWithStatus(redirectPath, "notes_saved");
}

export async function unpublishAdminEditorialContentAction(formData: FormData): Promise<void> {
  const contentType = parseContentType(readString(formData, "contentType"));
  const redirectPath = contentType ? adminPathByContentType[contentType] : "/admin";

  if (!contentType) redirectWithStatus(redirectPath, "invalid_content_type");

  const contentId = readString(formData, "contentId").trim();
  if (!uuidPattern.test(contentId)) redirectWithStatus(redirectPath, "invalid_content_id");

  const targetStatus = parseUnpublishTargetStatus(readString(formData, "targetStatus"));
  if (!targetStatus) redirectWithStatus(redirectPath, "invalid_unpublish_target");

  const reason = readString(formData, "reason");
  if (reason.length > 1000) redirectWithStatus(redirectPath, "unpublish_reason_too_long");

  const confirmed = readString(formData, "confirmUnpublish") === "on";
  if (!confirmed) redirectWithStatus(redirectPath, "unpublish_confirmation_required");

  await requireAdmin();

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("unpublish_editorial_content", {
    p_content_type: contentType,
    p_content_id: contentId,
    p_target_status: targetStatus,
    p_reason: reason,
  });

  if (error) {
    let status = "unpublish_failed";
    if (error.message.includes("admin_editorial_action_forbidden")) status = "forbidden";
    if (error.message.includes("admin_editorial_record_not_published")) status = "record_not_published";
    redirectWithStatus(redirectPath, status);
  }

  revalidatePath(redirectPath);
  redirectWithStatus(redirectPath, "content_unpublished");
}
