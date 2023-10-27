import { supabaseClient } from "@/lib/supabase-client";


// Function to fetch data (READ)
export const fetchData = async (table: string) => {
    let { data, error } = await supabaseClient
      .from(table)
      .select('*');
    if (error) throw error;
    return data;
  };
  
  // Function to add data (CREATE)
  export const addData = async (table: string, payload: Record<string, any>) => {
    let { data, error } = await supabaseClient
      .from(table)
      .insert([payload]);
    if (error) throw error;
    return data;
  };
  
  // Function to update data (UPDATE)
  export const updateData = async (table: string, id: string, payload: Record<string, any>) => {
    let { data, error } = await supabaseClient
      .from(table)
      .update(payload)
      .eq('id', id); // assuming 'id' is the primary key of the table
    if (error) throw error;
    return data;
  };
  
  // Function to delete data (DELETE)
  export const deleteData = async (table: string, id: string) => {
    let { data, error } = await supabaseClient
      .from(table)
      .delete()
      .eq('id', id); // assuming 'id' is the primary key of the table
    if (error) throw error;
    return data;
  };