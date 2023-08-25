import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../types";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import "./PostList.css";
import PostsExcerpt from "./PostsExcerpt";

function PostsList() {
  const dispatch = useDispatch();
  const fetchPostsAction = fetchPosts() as any;
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPostsAction);
    }
  }, [postsStatus, dispatch]);
  return (
    <section className={"postsList"}>
      {postsStatus === "succeeded" &&
        posts
          .slice()
          .sort((a: Post, b: Post) => b.date.localeCompare(a.date))
          .map((post: Post) => <PostsExcerpt key={post.id} post={post} />)}
      {postsStatus === "loading" && <p>Loading...</p>}
      {postsStatus === "failed" && <p>{error}</p>}
    </section>
  );
}

export default PostsList;
