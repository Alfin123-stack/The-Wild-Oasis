import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error("users could not get signup");
  }
  return data;
}
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error("users could not get loaded");
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error("users could not get loaded");
  }
  return data?.user;
}

export async function logout() {
  const { data, error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error("users could not get loaded");
  }
  return data;
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  // update user
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error);
    throw new Error("users could not get updated");
  }
  if (!avatar) return data;

  // add avatar to storage
  const userAvatar = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(userAvatar, avatar);
  if (storageError) {
    console.error(storageError);
    throw new Error("Avatar could not be updated");
  }

  // add avatar url to update user
  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${userAvatar}`,
      },
    });
  if (updateUserError) {
    console.error(updateUserError);
    throw new Error("Avatar could not be updated");
  }

  return updatedUser;
}
