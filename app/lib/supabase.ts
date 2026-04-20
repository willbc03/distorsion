import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nwmuupeskdnecsfflckp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53bXV1cGVza2RuZWNzZmZsY2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDc2MzcsImV4cCI6MjA5MjI4MzYzN30.M9zeb4Dsn0XSBND4WyRbT28lefheg3NFUoq2IBJMHyE";

export const supabase = createClient(supabaseUrl, supabaseKey);