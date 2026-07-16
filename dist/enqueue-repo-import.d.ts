import type { SupabaseClient } from "@supabase/supabase-js";
import type { GitProviderId } from "@majico-xyz/git-providers";
export declare function enqueueRepoImportJob(input: {
    supabase: SupabaseClient;
    userId: string;
    projectId: string;
    provider: GitProviderId;
    owner: string;
    repo: string;
    ref?: string;
}): Promise<{
    jobId: string;
} | {
    error: string;
    status: number;
}>;
