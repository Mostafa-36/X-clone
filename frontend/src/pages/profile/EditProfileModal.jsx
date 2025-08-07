import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuthUser from "../../hook/useAuthUser";
import { updateUser } from "../../utils/service/apiAuth";

const EditProfileModal = () => {
  const ref = useRef(null);

  const { handleSubmit, register } = useForm();

  const { authUser } = useAuthUser();

  const { mutate: updateInfo, isPending: isUpdating } = useMutation({
    mutationFn: updateUser,
    mutationKey: ["authUser"],
    onSuccess: () => {
      toast.success("update info successfully");
      ref.current.click();
    },
  });

  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box border rounded-md border-gray-700 shadow-md">
          <h3 className="font-bold text-lg my-3">Update Profile</h3>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(updateInfo)}
          >
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("fullName")}
                defaultValue={authUser.fullName}
              />
              <input
                type="text"
                placeholder="Username"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("username")}
                defaultValue={authUser.username}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("email")}
                defaultValue={authUser.email}
              />
              <textarea
                placeholder="Bio"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("bio")}
                defaultValue={authUser.bio}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                placeholder="Current Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("currentPassword")}
              />
              <input
                type="password"
                placeholder="New Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                {...register("newPassword")}
              />
            </div>
            <input
              type="text"
              placeholder="Link"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              {...register("link")}
              defaultValue={authUser.link}
            />
            <button className="btn btn-primary rounded-full btn-sm text-white">
              {!isUpdating ? "Update" : "Loading..."}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none" ref={ref}>
            close
          </button>
        </form>
      </dialog>
    </>
  );
};
export default EditProfileModal;
