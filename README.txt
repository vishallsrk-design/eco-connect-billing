ECO CONNECT V4.7 — USER MANAGEMENT UPDATE
=========================================

This ZIP is based on the V4.6 file supplied in this chat. Existing branding,
rates, bill pattern, disclaimer, menu and other business modules are retained.

Included changes
----------------
1. Admin > User Management (Owner only).
2. Owner can create staff accounts with username + password.
3. Access levels: Standard staff (role=user) and full financial access (role=mayur).
   The Mayur account is displayed by the user's own name, "Mayur"; "Manager" is not shown.
4. All signed-in users can view all bills and create new bills.
5. Owner and Mayur can view dashboard financial totals, expenses, payments and reports.
   Standard staff cannot access those screens/data after the SQL policies are applied.
6. Only Owner can delete bills or manage users.
7. Bill creator name and created timestamp are stored/displayed.
8. Bill item labels remain in the existing green theme; item text is bold, QTY bold,
   RATE and AMOUNT black + bold. Plain/Deco label text is slightly larger while
   retaining the existing green/white treatment and placement.
9. Print/PDF uses A4 portrait and avoids splitting the bill into multiple pages where
   the bill content fits. Very long bills may still need a second page; one-page fit
   depends on the number of line items and device/PDF renderer.

IMPORTANT DEPLOYMENT STEPS
--------------------------
A. Back up your Supabase schema and records before applying database changes.
B. In Supabase SQL Editor, run SETUP_USER_MANAGEMENT.sql.
   It adds profile/bill audit columns and RLS policies. It does not delete business
   records. It does replace/enable the named ECO CONNECT policies; review existing
   policies first if you have custom access rules.
C. Deploy the Edge Function:
   supabase functions deploy ec-user-admin
D. Set Edge Function secrets (never put the service-role key in index.html):
   supabase secrets set SUPABASE_URL="https://vhrvbgygpyzplearbxol.supabase.co"
   supabase secrets set SUPABASE_ANON_KEY="<your Supabase publishable/anon key>"
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<your service_role key>"
E. Confirm your existing Owner account has public.profiles.role = 'owner'.
F. Upload index.html, eco-connect-logo.png and ganpati-hero.png to the GitHub
   repository root and let Cloudflare Pages redeploy.

LOGIN
-----
The app keeps the existing Supabase email/password login. New users can sign in with
the username they were assigned (the app maps it to @ecoconnect.local) and their
password. Owner should share credentials privately and ask users to change their
password after first login.

SECURITY NOTE
-------------
The Edge Function checks the authenticated caller's profile role and uses the
service-role key only server-side. Do not publish that key. The SQL policies are
needed for server-side enforcement; hiding menu items alone is not security.


EXPORT BILLING ADDITION
-----------------------
- New Bill offers LOCAL and EXPORT modes.
- Local bill uses the existing bill pattern.
- Export mode calculates cartons and CBM from the supplied packing chart.
- 6, 8 and 10 inch quantities must be multiples of 4; the app warns with lower/higher valid quantities.
- Other listed sizes use one idol per carton.
- Export PDF includes a separate compact table: Size, Qty, Cartons, CBM, total cartons and total CBM.
- Net/gross weight totals are also shown.
- Run the updated SETUP_USER_MANAGEMENT.sql to add export_mode and export_details columns.
