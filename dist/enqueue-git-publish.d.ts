import type { SupabaseClient } from "@supabase/supabase-js";
import type { GitProviderId } from "@majico-xyz/git-providers";
import type { GitPublishTarget } from "@queue/handlers/git-publish";
export declare function enqueueGitPublishJob(input: {
    supabase: SupabaseClient;
    userId: string;
    projectId: string;
    provider: GitProviderId;
    target: GitPublishTarget;
    elementId?: string;
    html?: string;
    productName?: string;
    owner?: string;
    repo?: string;
    branch?: string;
    orgLandingPath?: string;
}): Promise<{
    jobId: string;
} | {
    error: string;
    status: number;
}>;
