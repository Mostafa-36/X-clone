import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../../utils/service/apiAuth";
import PostSkeleton from "../skeletons/PostSkeleton";
import Post from "./Post";

const Posts = ({ postsType, user = "" }) => {
  let { username } = useParams();

  let getEndPoint = (postsType) => {
    switch (postsType) {
      case "following":
        return "following";
      case "likes":
        return "likes/" + user?._id;
      case "posts":
        return "user/" + username;
      default:
        return "";
    }
  };

  const {
    data: posts,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryFn: () => getPosts(getEndPoint(postsType)),
    queryKey: ["posts"],
  });

  useEffect(
    function () {
      refetch();
    },
    [postsType, user._id, refetch]
  );

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
