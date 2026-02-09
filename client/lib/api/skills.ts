"use client";

import { supabase } from "@/lib/supabase/client";

export interface TechSkill {
  id: string;
  name: string;
  started_at: string;
  created_at: string;
  modified_at: string;
}

export async function getSkills(orderBy?: {
  column: string;
  ascending: boolean;
}): Promise<TechSkill[]> {
  let query = supabase.from("skills").select("*");

  if (orderBy) {
    query = query.order(orderBy.column, { ascending: orderBy.ascending });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
