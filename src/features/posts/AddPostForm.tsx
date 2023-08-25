import React, { useState } from "react";
import { addNewPost } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";
import "./AddPostForm.css";
import { selectAllUsers } from "../users/userSlice";
import { nanoid } from "@reduxjs/toolkit";
function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePost = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addNewPost({
            id: nanoid(),
            title,
            body: content,
            userId: userId || "unknown",
          }) as any,
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.log("Failed to post");
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  return (
    <section className={"addPostForm"}>
      <h2>Add a New Post</h2>
      <form>
        <label className={"formLabel"} htmlFor="postTitle">
          Post Title:
        </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className={"inputField"}
        ></input>
        <label className={"formLabel"} htmlFor="postContent">
          Post Content:
        </label>
        <select
          className="inputField selectField"
          id="postAuthor"
          value={userId ? userId : "Choose a user"}
          onChange={(event) => {
            setUserId(event.target.value);
          }}
        >
          {users.map((user: any) => {
            return (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            );
          })}
        </select>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          className={"textareaField"}
        ></textarea>
        <button
          type="button"
          onClick={() => {
            onSavePost();
          }}
          disabled={!canSave}
          className={!canSave ? "disabledSaveButton" : "saveButton"}
        >
          Save Post
        </button>
      </form>
    </section>
  );
}

export default AddPostForm;
