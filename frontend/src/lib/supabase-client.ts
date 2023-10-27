import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase-types';
import invariant from 'tiny-invariant';

invariant(process.env.NEXT_PUBLIC_SUPABASE_URL, "NEXT_PUBLIC_SUPABASE_URL is not defined")
invariant(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, "SUPABASE_ANON_KEY is not defined")
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);