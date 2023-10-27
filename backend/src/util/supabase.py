from supabase import create_client
import os



supabase_url = os.environ.get("SUPABASE_URL")
supabase_anon_key = os.environ.get("SUPABASE_ANON_KEY")
supabase_admin_key = os.environ.get("SUPABASE_ADMIN_KEY")

assert supabase_url is not None
assert supabase_anon_key is not None
assert supabase_admin_key is not None

supabase_anon = create_client(supabase_url, supabase_anon_key)
supabase_admin = create_client(supabase_url, supabase_admin_key)