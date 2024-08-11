import { initializeApp } from "firebase/app";

// Authentication
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

// Database
import { getDatabase, onValue, ref, set, update } from "firebase/database";

// *
import { GameMiniCard, UserSnapshot } from "../definitions";
import { AppDispatch } from "../redux/store";

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

// auth, google & DB
export const auth = getAuth(app);
const database = getDatabase();
const provider = new GoogleAuthProvider();

// Write
export const createUser = async (
  userId: string,
  email: string,
  username: string,
  profileImg: string
) => {
  return set(ref(database, `users/${userId}`), {
    userId,
    username: username,
    email: email,
    profileImg: profileImg,
    savedGames: [] as GameMiniCard[],
  })
    .then(() => {
      console.log("User created successfully");
    })
    .catch(() => console.log("Failed to create user"));
};

// Read - get user data
export const readUserData = async (userId: string, dispatch: AppDispatch) => {
  const userRef = ref(database, "users/" + userId);
  return new Promise((resolve) => {
    onValue(userRef, (snapshot) => {
      const data = snapshot;
      if (data.exists()) {
        const { SavedGames, email, profileImg, username, userId } =
          data.val() as UserSnapshot;
        dispatch({
          type: "user/setUserState",
          payload: { userId, email, profileImg, username },
        });
        dispatch({
          type: "user/setSavedGames",
          payload: SavedGames,
        });
        resolve(data.val());
      }
      if (!data.exists()) {
        console.log("No data available!");
        resolve(data.exists());
      }
    });
  });
};

// Google sign in
export const signInWithGoogle = (dispatch: AppDispatch) => {
  // This will display "Authenticating with Google" text under the spinner.
  dispatch({ type: "user/setGoogleAuthText", payload: true });
  dispatch({ type: "user/setUserState", payload: null }); // This will trigger a loading screen when the user is in the proccess of sigining in with google.
  signInWithPopup(auth, provider)
    .then(() => {
      dispatch({ type: "user/setGoogleAuthText", payload: false });
      console.log("Google sign in success.");
    })
    .catch(() => {
      alert("Google authentication failed. Refresh the page and try again.");
      dispatch({ type: "user/setUserState", payload: false });
    });
  return;
};

// Check for user status changes
export const userStatus = (dispatch: AppDispatch) => {
  return onAuthStateChanged(auth, (user) => {
    // User is signed in.
    if (user) {
      const response = readUserData(
        user.uid,
        dispatch
      ) as Promise<UserSnapshot>;

      // A promise that checks if the user has any data stored in the database. No data = new member. Has data = currently a member.
      response.then((data) => {
        if (!data) {
          const profileImg =
            "/SortedGames/images/avatars/withBackground/avocado-rambler.svg";
          const { email, displayName: username } = user;

          createUser(
            user.uid,
            email as string,
            username as string,
            profileImg
          ).then(() => {
            dispatch({
              type: "user/setUserState",
              payload: { userId: user.uid, email, profileImg, username },
            });
            dispatch({ type: "user/setSavedGames", payload: [] });
          });
        }
        if (data) {
          const { userId, email, profileImg, SavedGames, username } = data;
          readUserData(userId, dispatch).then(() => {
            dispatch({
              type: "user/setUserState",
              payload: { userId: user.uid, email, profileImg, username },
            });
            dispatch({ type: "user/setSavedGames", payload: SavedGames });
          });
        }
      });
    }

    // User is signed out
    if (!user) dispatch({ type: "user/setUserState", payload: false });
  });
};

//sign out user
export const signOut = async () => {
  return await auth
    .signOut()
    .then(() => {
      console.log("User signed out successfully");
      return true; //success
    })
    .catch(() => {
      console.log("User not signed out successfully");
      return false; //failure
    });
};

//PUT - update profile image
export const updateAvatar = async (userId: string, imageUrl: string) => {
  return update(ref(database, "users/" + userId), {
    profileImg: imageUrl,
  });
};

// PUT - update Saved games list.
export const updateSavedGamesList = async (
  userId: string,
  dispatch: AppDispatch,
  newList: GameMiniCard[]
) => {
  return await update(ref(database, "users/" + userId), {
    SavedGames: newList,
  })
    .then(() => {
      dispatch({ type: "user/setUpdateSavedGamesList", payload: newList });
      // console.log("Updating savedGames list with success");
    })
    .catch(() => console.error("Updating savedGames list failed"));
};
