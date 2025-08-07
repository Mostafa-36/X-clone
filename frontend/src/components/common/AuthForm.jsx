import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const FomContext = createContext();

const AuthForm = ({ children, onSubmit }) => {
  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient();

  const { mutate, reset, isError, isPending, error } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      toast.success("upload has been successfully!");
      queryClient.invalidateQueries(["authUser"]);
      reset();
    },
    retry: false,
  });

  return (
    <FomContext.Provider
      value={{ register, handleSubmit, isError, isPending, error }}
    >
      <form
        onSubmit={handleSubmit(mutate)}
        className="lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col"
      >
        {children}
      </form>
    </FomContext.Provider>
  );
};

const FormInput = ({ type = "", placeholder = "", name = "", icon }) => {
  const { register } = useContext(FomContext);
  return (
    <div className="flex gap-4 flex-wrap">
      <label className="input input-bordered rounded flex items-center gap-2 flex-1">
        {icon}
        <input
          type={type}
          className="grow "
          placeholder={placeholder}
          name={name}
          {...register(name, { required: true })}
        />
      </label>
    </div>
  );
};

const FormSubmit = ({ name }) => {
  const { isError, isPending, error } = useContext(FomContext);
  return (
    <>
      <button className="btn rounded-full btn-primary text-white">
        {isPending ? "Loading..." : name}
      </button>
      {isError && (
        <p className="text-red-500">{error?.message || "no error"}</p>
      )}
    </>
  );
};

AuthForm.input = FormInput;
AuthForm.submit = FormSubmit;

export default AuthForm;
