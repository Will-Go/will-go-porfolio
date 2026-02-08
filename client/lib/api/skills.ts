"use client";

import { supabase } from "@/lib/supabase/client";

export interface TechSkill {
  id: string;
  name: string;
  started_at: string;
  created_at: string;
  modified_at: string;
}

export async function getSkills(): Promise<TechSkill[]> {
  const { data, error } = await supabase.from("skills").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
