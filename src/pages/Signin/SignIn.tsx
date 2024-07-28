import React from "react";
import Inputfield from "../../Components/Inputfield";
import { useDispatch } from "react-redux";

// React hook form
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import type { FormValues } from "../../definitions";
import { userUrl } from "../../modules/fetchOptions";
import fetchUserData from "../../modules/fetchUser";

const SignIn = () => {
  const [createAccount, setCreateAccount] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // React hook form
  const methods = useForm<FormValues>();

  // submit function for form validation
  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    // console.log(formValues);

    if (createAccount)
      fetchUserData(userUrl("register"), dispatch, null, formValues);
    if (!createAccount)
      fetchUserData(userUrl("login"), dispatch, null, formValues);

    // navigate("/dashboard");
  };

  return (
    <div className="space-y-6 text-sm w-5/6 max-w-[470px] mx-auto">
      {/* Google button */}
      <div className="bg-white flex justify-center items-center gap-2 h-[38px] rounded-3xl mt-14 ">
        <img
          src="/SortedGames/icons/google-icon.svg"
          alt="google icon."
          className="size-6"
        />
        <p className="text-black font-semibold cursor-pointer">
          Continue with Gooogle
        </p>
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
