// ECO CONNECT secure user provisioning Edge Function
// Deploy with Supabase CLI. Set SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY secrets.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders() });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Missing authorization" }, 401);
    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!);
const serviceKey = secretKeys["default"];
    const callerClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: { user: caller }, error: authError } = await callerClient.auth.getUser();
    if (authError || !caller) return json({ error: "Not authenticated" }, 401);

    const OWNER_USER_ID = "b321c498-33b7-4a1f-8901-0a477fe4d268";

if (caller.id !== OWNER_USER_ID) {
  return json({ error: "Only Owner can create users" }, 403);
}

const admin = createClient(url, serviceKey);
    

    const body = await req.json();
    if (body.action !== "create") return json({ error: "Unsupported action" }, 400);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const display_name = String(body.display_name || "").trim();
    const role = body.role === "mayur" ? "mayur" : "user";
    if (!email || !password || password.length < 8 || !display_name) return json({ error: "Name, username and password (minimum 8 characters) are required" }, 400);

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, user_metadata: { display_name }
    });
    if (createError || !created.user) return json({ error: createError?.message || "Could not create user" }, 400);

    const { error: upsertError } = await admin.from("profiles").upsert({
      id: created.user.id, role, display_name,
      permissions: role === "mayur"
        ? { view_all_bills: true, create_bills: true, financial_dashboard: true, view_expenses: true, view_reports: true }
        : { view_all_bills: true, create_bills: true, financial_dashboard: false, view_expenses: false, view_reports: false }
    }, { onConflict: "id" });
    if (upsertError) {
      await admin.auth.admin.deleteUser(created.user.id);
      return json({ error: "Profile setup failed: " + upsertError.message }, 500);
    }
    return json({ user_id: created.user.id, display_name, role });
  } catch (e) {
    return json({ error: e?.message || "Unexpected error" }, 500);
  }
});

function corsHeaders() {
  return { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
}
function json(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), { status, headers: { ...corsHeaders(), "Content-Type": "application/json" } });
}
