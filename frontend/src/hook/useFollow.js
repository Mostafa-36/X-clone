import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFollow } from "../utils/service/apiAuth";
import toast from "react-hot-toast";

function useFollow() {
  const queryClient = useQueryClient();

  const { mutate: followUnfollow, isPending: isFollowing } = useMutation({
    mutationFn: toggleFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.refetchQueries({ queryKey: ["suggestedUsers"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { followUnfollow, isFollowing };
}

export default useFollow;
