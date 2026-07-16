import { enqueueJob } from "@queue/client";
import { loadProviderAccessToken } from "./load-user-git-credentials.js";
export async function enqueueGitPublishJob(input) {
    const token = await loadProviderAccessToken(input.supabase, input.userId, input.provider);
    if (!token) {
        return {
            error: `${input.provider} not connected`,
            status: 403,
        };
    }
    const payload = {
        provider: input.provider,
        target: input.target,
        userId: input.userId,
        elementId: input.elementId,
        html: input.html,
        productName: input.productName,
        owner: input.owner?.trim(),
        repo: input.repo?.trim(),
        branch: input.branch?.trim() || "main",
        orgLandingPath: input.orgLandingPath?.trim(),
    };
    const { data: jobRow, error } = await input.supabase
        .from("jobs")
        .insert({
        project_id: input.projectId,
        type: "git_publish",
        status: "pending",
        payload,
    })
        .select("id")
        .single();
    if (error || !jobRow?.id) {
        return { error: error?.message ?? "Failed to create job", status: 500 };
    }
    const bullId = await enqueueJob({
        jobId: jobRow.id,
        projectId: input.projectId,
        type: "git_publish",
        payload,
    });
    if (!bullId) {
        await input.supabase
            .from("jobs")
            .update({ status: "failed", error: "Failed to enqueue git_publish" })
            .eq("id", jobRow.id);
        return { error: "Failed to enqueue job", status: 503 };
    }
    return { jobId: jobRow.id };
}
