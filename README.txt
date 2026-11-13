ECO CONNECT V4.9 FINAL — APPROVED BILL LAYOUT FIXES
=========================================

This ZIP is based on the user's supplied ECO CONNECT V4.7 file. Existing branding,
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


Final invoice-only corrections (existing app/dashboard preserved)
------------------------------------------------------------------
- Kept the existing ECO CONNECT invoice layout and green/gold theme; no dashboard
  or business workflow redesign.
- Used the supplied ECO CONNECT Ganesha logo already included in the package.
- Aligned Vishal and Mayur contact rows with matching label/number styling.
- Kept the line below ECO-FRIENDLY GANPATI IDOLS:
  “Manufacturer & Exporter of Natural Clay Idol”.
- Added CARTON and CBM to the main size-wise table and its totals summary.
- Removed the separate Export Details block from the bottom of the bill.
- Added the user's original blue handwritten signature as a proportion-preserving
  image on the Authorized Signatory line (signature-original.png).
- Kept the existing disclaimer, seller identity, buyer details, A4 portrait PDF,
  and current Supabase/business modules intact.

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
   Use the current Supabase Edge Function secret configuration for your project.
   Never expose service-role or secret keys in index.html or share them in chat.
E. Confirm your existing Owner account has public.profiles.role = 'owner'.
F. Upload index.html, eco-connect-logo.png, ganpati-hero.png and signature-original.png to the GitHub
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
- Carton and CBM values are included in the main size-wise bill table and totals.
- No separate Export Item Details section is printed at the bottom of the bill.
- CBM per carton follows the supplied chart: 6in 0.034; 8in 0.057; 10in 0.057; 12in 0.038; 15in 0.053; 18in 0.092; 21in 0.124; 24in 0.185; 27in 0.206; 30in 0.350; 36in 0.601; 48in 3.212.
- Net Weight and Total Gross Weight are not displayed or calculated.
- Run the updated SETUP_USER_MANAGEMENT.sql to add export_mode and export_details columns.


VERSION 4.8 CHANGE SUMMARY
--------------------------
- Export Details block compacted and right-aligned in the bill/PDF.
- Removed Net Weight and Total Gross Weight from export billing output and calculations.
- Existing packing chart, carton calculations, CBM calculations, bill layout and other
  application modules are retained from the supplied V4.7 source.


V4.9 packing calculation correction
-----------------------------------
- Carton/CBM chart uses the exact size-wise values supplied by the user.
- 6, 8 and 10 inch export quantities are validated as multiples of 4 using the combined Plain + Deco quantity for each size.
- 12 to 48 inch use 1 piece per carton and the supplied CBM per carton.
- No other app layout, theme, modules, rates, disclaimer, or Supabase configuration was intentionally changed.
