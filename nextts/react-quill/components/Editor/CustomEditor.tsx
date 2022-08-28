import dynamic from "next/dynamic";
import React, { useState } from "react";

//https://blog.logrocket.com/build-a-wysiwyg-text-editor-using-quill/

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: [] }],
    [{ color: [] }, { background: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["image"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export const CustomEditor = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <QuillNoSSRWrapper
        onChange={(value) => setValue(value)}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="QuillNoSSRWrapper goes here..."
      />
      {value}
    </div>
  );
};
