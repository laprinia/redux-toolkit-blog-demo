import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { Link, useParams } from "react-router-dom";
const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId || ""));

  if (!post) {
    return (
      <section>
        <h2> Post not found!</h2>
      </section>
    );
  }
  return (
    <article className={"postArticle"}>
      <h3 className={"postTitle"}>{post.title}</h3>
      <p className={"postContent"}>{post.body}</p>
      <p>
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo date={post.date} />
      </p>
    </article>
  );
};

export default SinglePostPage;
