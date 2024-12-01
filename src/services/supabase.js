import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ibegegtgtblntxsvrxlg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZWdlZ3RndGJsbnR4c3ZyeGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MjM0MTEsImV4cCI6MjA0ODA5OTQxMX0.5dAJGaVmmsDukHl05FhN6VrY6YNnRLjDIn02tbFJp-w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
