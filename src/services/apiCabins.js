import { PAGE_SIZE } from "../utils/constant";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins({ page }) {
  let query = supabase.from("cabins").select("*", { count: "exact" });

  // PAGINATING
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data: cabins, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return {cabins, error, count};
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function addEditCabin(newData, id) {
  const hasImagePath = newData.image?.startsWith?.(supabaseUrl);
  // https://ibegegtgtblntxsvrxlg.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newData.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // query reuseable
  let query = supabase.from("cabins");

  // create cabin
  if (!id) {
    query = query.insert([{ ...newData, image: imagePath }]);
  }

  // Edit Cabin
  if (id) {
    query = query.update({ ...newData, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  // add image to storage bucket
  if (!hasImagePath) {
    const { error: errorStorage } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newData.image);

    if (errorStorage) {
      await supabase.from("cabins").delete().eq("id", data.id);
    }
  }
  return data;
}
