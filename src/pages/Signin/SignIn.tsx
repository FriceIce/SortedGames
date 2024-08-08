import React from "react";
import { useDispatch } from "react-redux";
import Inputfield from "../../Components/Inputfield";

// React hook form
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import type { FormValues } from "../../definitions";
import { googleAuth } from "../../modules/googleAuth";

//firebase
import { auth, createUser, readUserData } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignIn = () => {
  const [createAccount, setCreateAccount] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // React hook form
  const methods = useForm<FormValues>();

  // submit function for form validation
  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    // console.log(formValues);
    const { email, password, username } = formValues;
    const profileImgPath =
      "/SortedGames/images/avatars/withBackground/avocado-rambler.svg";

    if (createAccount && username)
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          const user = userCredentials.user;
          createUser(user.uid, email, username, profileImgPath);
          // console.log(userCredentials.user);
        }
      );
    if (!createAccount)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          readUserData(user.uid);
          // console.log(userCredentials.user);
        })
        .catch((error) => {
          console.log(error);
        });
    // navigate("/dashboard");
  };

  return (
    <div className="space-y-6 text-sm w-5/6 max-w-[470px] mx-auto">
      {/* Google button */}
      <div
        className="bg-white flex justify-center items-center gap-2 h-[38px] rounded-3xl mt-14 cursor-pointer"
        onClick={googleAuth}
      >
        <img
          src="/SortedGames/icons/google-icon.svg"
          alt="google icon."
          className="size-6"
        />
        <p className="text-black font-semibold">Continue with Gooogle</p>
      </div>

      {/* OR divider */}
      <div className="bg-[#3E4055] h-[2px] rounded-lg relative z-[-2]">
        <p className="bg-[#101720] w-fit mx-auto translate-y-[-45%] px-1 relative z-[-1]">
          OR
        </p>
      </div>

      <FormProvider {...methods}>
        <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Email and password input */}
          <div className="space-y-4">
            {createAccount && (
              <Inputfield
                required={true}
                label={"username"}
                type={"text"}
                createAccount={false}
              />
            )}
            <Inputfield
              required={true}
              label={"email"}
              type={"text"}
              createAccount={createAccount ? true : false}
            />
            <div className="space-y-2">
              <Inputfield
                required={true}
                label={"password"}
                type={"password"}
                createAccount={createAccount ? true : false}
              />
              <p
                className="text-[#7c61ec]"
                onClick={() => {
                  if (createAccount) return setCreateAccount(false);
                }}
              >
                {createAccount ? "Sign in" : "Forgot password?"}
              </p>
            </div>
          </div>
          {/* Sign in button with create account */}
          <div className="font-semibold">
            <button
              type="submit"
              className="bg-[#7c61ec] w-full h-[45px] rounded-3xl cursor-pointer"
            >
              Sign in
            </button>
            <p
              className={`text-center mt-4 cursor-pointer ${
                createAccount && "opacity-0"
              }`}
              onClick={() => setCreateAccount(true)}
            >
              No account?
              <span className="ml-1 text-[#7c61ec]">Join now</span>
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignIn;
