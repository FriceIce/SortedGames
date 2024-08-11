import type { Inputfield } from "../definitions";
import { useFormContext } from "react-hook-form";

const Inputfield = ({ label, type, createAccount, required }: Inputfield) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const { pattern, errorMessage } = differentPatterns(label, createAccount);

  return (
    <div className="space-y-1">
      <p className="capitalize">{label}</p>
      <input
        type={type}
        {...register(label, {
          required: required,
          pattern: pattern,
        })}
        className="bg-[#28293d] border border-gray-600 h-10 w-full rounded-md px-2"
      />
      {errors[label] && errors[label]!.type === "required" && (
        <p className="text-red-400 text-xs">
          <span className="capitalize mr-1 leading-[1.4]">{label}</span>
          is mandatory.
        </p>
      )}

      {errors[label] && errors[label]!.type === "pattern" && (
        <p className="text-red-400 errorMsg text-xs  leading-[1.4]">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Inputfield;

const differentPatterns = (
  property: string,
  createAccount: boolean | undefined
) => {
  let pattern;
  let errorMessage;

  if (property === "email" && createAccount) {
    pattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    errorMessage = "Invalid email address. Please enter a valid email address.";
  } else if (property === "email" && !createAccount) {
    pattern = /^(?!.*[>]).*$/; // No HTML tags
    errorMessage = "Invalid input.";
  }

  if (property === "password" && createAccount) {
    pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    errorMessage =
      "The password must contain at least 6 characters, at least one uppercase letter, one lowercase letter, one number, and one special character.";
  } else if (property === "password" && createAccount) {
    pattern = /^(?!.*[>]).*$/; // No HTML tags
    errorMessage = "Invalid input.";
  }

  if (property === "validate") {
    pattern = /^(?!.*[>]).*$/; // No HTML tags
    errorMessage = "Invalid input.";
  }

  if (property === "username") {
    pattern = /^[a-zA-ZåäöÅÄÖ\s]{2,}$/;
    errorMessage = "Please enter a valid username with at least two letters.";
  }

  return { pattern, errorMessage };
};
