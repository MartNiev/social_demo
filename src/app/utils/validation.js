import { getProfile } from "./userProfile";

export function findProfile(username) {
  const profile = getProfile(username);

  if (profile === null) return false;
  else return true;
}

export function validateLogin(loginObject) {
  const username = loginObject.username;
  const password = loginObject.password;

  const profile = getProfile(username);

  if (password === profile.password) return true;
}
