import type { SupabaseClient } from "@supabase/supabase-js";
import { maybeDecryptIntegrationToken } from "@majico-xyz/integrations";
import type { GitProviderId } from "@majico-xyz/git-providers";

export async function loadGitHubInstallationToken(
  supabase: SupabaseClient,
  userId: string
): Promise<string | null> {
  const { data } = await supabase
    .from("user_github_installations")
    .select("encrypted_token_payload, installation_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (!data?.encrypted_token_payload) return null;
  return maybeDecryptIntegrationToken(data.encrypted_token_payload);
}

export async function loadGitLabAccessToken(
  supabase: SupabaseClient,
  userId: string
): Promise<string | null> {
  const { data } = await supabase
    .from("user_gitlab_tokens")
    .select("access_token")
    .eq("user_id", userId)
    .maybeSingle();
  if (!data?.access_token) return null;
  return maybeDecryptIntegrationToken(data.access_token);
}

export async function loadProviderAccessToken(
  supabase: SupabaseClient,
  userId: string,
  provider: GitProviderId
): Promise<string | null> {
  if (provider === "github")
    return loadGitHubInstallationToken(supabase, userId);
  return loadGitLabAccessToken(supabase, userId);
}
