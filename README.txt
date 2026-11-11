ECO CONNECT V4.0 — Business Suite

Deploy: Upload all files in this folder to the root of the existing GitHub repository connected to Cloudflare Pages.

Database: This build retains the existing Supabase project URL, publishable key, existing table names (bills, bill_items, customers, ec_payments, ec_expenses, ec_inventory, profiles), and bill-number RPC ec_next_bill_no(). It does not reset or recreate database tables.

Important: The existing database and login accounts are used. Do not run database reset SQL. The app needs internet access for Supabase and the PDF library CDN.

New in V4.0: refreshed responsive styling, corner hamburger menu with slide-out navigation, vertically stacked Plain and Deco item sections, smooth scroll to New Bill form, and centered ॥ श्री गणेशाय नमः ॥ on the PDF invoice.
