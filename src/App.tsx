import React from "react";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePagePost from "./features/posts/SinglePagePost";
import EditPostForm from "./features/posts/EditPostForm";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePagePost />} />
          <Route path="edit/:postEdit" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
