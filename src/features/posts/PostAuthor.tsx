import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";

interface PostAuthorProps {
  userId: string;
}
function PostAuthor(props: PostAuthorProps) {
  const users = useSelector(selectAllUsers);
  const author = users.find((user: any) => user.id === props.userId);
  return <span>by {author ? author.username : "unknown"}</span>;
}

export default PostAuthor;
