import { maybeDecryptIntegrationToken } from "@majico-xyz/integrations";
export async function loadGitHubInstallationToken(supabase, userId) {
    const { data } = await supabase
        .from("user_github_installations")
        .select("encrypted_token_payload, installation_id")
        .eq("user_id", userId)
        .maybeSingle();
    if (!data?.encrypted_token_payload)
        return null;
    return maybeDecryptIntegrationToken(data.encrypted_token_payload);
}
export async function loadGitLabAccessToken(supabase, userId) {
    const { data } = await supabase
        .from("user_gitlab_tokens")
        .select("access_token")
        .eq("user_id", userId)
        .maybeSingle();
    if (!data?.access_token)
        return null;
    return maybeDecryptIntegrationToken(data.access_token);
}
export async function loadProviderAccessToken(supabase, userId, provider) {
    if (provider === "github")
        return loadGitHubInstallationToken(supabase, userId);
    return loadGitLabAccessToken(supabase, userId);
}
