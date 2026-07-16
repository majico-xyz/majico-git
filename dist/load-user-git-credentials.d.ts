import type { SupabaseClient } from "@supabase/supabase-js";
import type { GitProviderId } from "@majico-xyz/git-providers";
export declare function loadGitHubInstallationToken(supabase: SupabaseClient, userId: string): Promise<string | null>;
export declare function loadGitLabAccessToken(supabase: SupabaseClient, userId: string): Promise<string | null>;
export declare function loadProviderAccessToken(supabase: SupabaseClient, userId: string, provider: GitProviderId): Promise<string | null>;
