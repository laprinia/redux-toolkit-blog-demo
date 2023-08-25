import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";
import { selectPostById, updatePost } from "./postsSlice";
import { User } from "../../types";
import "./EditPostForm.css";

function EditPostForm() {
  const { postEdit } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, postEdit || ""));
  console.log(postEdit);
  const users: User[] = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section className="editPostForm">
        <h2>Post not found</h2>
      </section>
    );
  }

  const onTitleChanged = (e: any) => setTitle(e.target.value);
  const onAuthorChanged = (e: any) => setUserId(e.target.value);
  const onContentChanged = (e: any) => setContent(e.target.value);
  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        await dispatch(
          updatePost({ id: post.id, title, body: content, userId }) as any,
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postEdit}`);
      } catch (error) {
        console.error(error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  return (
    <section className="editPostForm">
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          className="inputField"
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          defaultValue={userId}
          onChange={onAuthorChanged}
          className="inputField selectField"
        >
          <option value=""></option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
          className="textareaField"
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
          className={!canSave ? "disabledSaveButton" : "saveButton"}
        >
          Save Post
        </button>
      </form>
    </section>
  );
}

export default EditPostForm;
