class Profile {
  firstname;
  lastname;
  age;
  username;
  password;
  follow = [];

  constructor(firstname, lastname, age, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.username = username;
    this.password = password;
  }

  saveProfile(profile) {
    localStorage.setItem(this.username, JSON.stringify(profile));
  }
}

export function setCurrentUser(username) {
  localStorage.setItem("currentUser", username);
}

export function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

export function getProfile(username) {
  return JSON.parse(localStorage.getItem(username));
}

export default function createProfile(userObject) {
  const profile = new Profile(
    userObject.firstname,
    userObject.lastname,
    userObject.age,
    userObject.username,
    userObject.password,
  );
  console.log(profile);
  profile.saveProfile(profile);
  return profile;
}
