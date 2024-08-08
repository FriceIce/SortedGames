import { initializeApp } from "firebase/app";

// Authentication
import { getAuth } from "firebase/auth";

// Database
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { UserInformations } from "../definitions";

// Web app Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sorted-games.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DB,
  projectId: "sorted-games",
  storageBucket: "sorted-games.appspot.com",
  messagingSenderId: "147441363425",
  appId: "1:147441363425:web:768d019d81300f73730aa0",
  measurementId: "G-Q33ETRQZRD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);

// DB
const database = getDatabase();

// Write
export const createUser = async (
  userId: string,
  email: string,
  username: string,
  profileImg: string
) => {
  return set(ref(database, `users/${userId}`), {
    username: username,
    email: email,
    profileImg: profileImg,
  })
    .then(() => {
      console.log("User created successfully");
    })
    .catch(() => console.log("Failed to create user"));
};

// Read
export const readUserData = async (userId: string) => {
  const userRef = ref(database, "users/" + userId);
  return onValue(
    userRef,
    (snapshot) => {
      console.log(snapshot.val());
    },
    { onlyOnce: true }
  );
};

// Delete - game
export const deleteSavedGame = async (userId: string, gameId: number) => {
  return remove(ref(database, "SavedGames/" + userId + "/" + gameId))
    .then(() => console.log("Game deleted successfully"))
    .catch((error) =>
      console.log("Something went wrong deleting the game... Info: " + error)
    );
};

//PUT - profile image
export const updateProfileImage = async (
  userId: string,
  imageUrl: string,
  user: UserInformations
) => {
  return set(ref(database, "users/" + userId), {
    email: user.email,
    username: user.username,
    profileImg: imageUrl,
  });
};
