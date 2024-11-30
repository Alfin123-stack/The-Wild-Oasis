import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function addCabin(newData) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
