import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { Post } from "../../types";
import { Link } from "react-router-dom";
interface PostsExcerpt {
  post: Post;
}

const PostsExcerpt = (props: PostsExcerpt) => {
  return (
    <article className={"postArticle"}>
      <h3 className={"postTitle"}>{props.post.title}</h3>
      <p className={"postContent"}>{props.post.body.substring(0, 75)}...</p>
      <Link to={`post/${props.post.id}`}>View Post</Link>
      <p>
        <PostAuthor userId={props.post.userId} />
        <TimeAgo date={props.post.date} />
      </p>
    </article>
  );
};

export default PostsExcerpt;
