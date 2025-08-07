import { useQuery } from "@tanstack/react-query";
import { getMe } from "../utils/service/apiAuth";

function useAuthUser() {
  const { data: authUser = null, isLoading } = useQuery({
    queryFn: getMe,
    queryKey: ["authUser"],
    retry: false,
  });

  return { authUser, isLoading };
}

export default useAuthUser;
