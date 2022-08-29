import dynamic from "next/dynamic";
import React, { useState, useMemo } from "react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */

const formats = ["header", "font", "size", "bold", "image"];

export const Editor1 = () => {
  const [contents, setContents] = useState("");

  // onChange expects a function with these 4 arguments
  const handleChange = (content, delta, source, editor) => {
    setContents(editor.getContents());
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  const modules = useMemo(
    () => ({
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
    }),
    []
  );

  return (
    <div>
      <QuillNoSSRWrapper
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Editor1 goes here..."
      />
      <button onClick={submit}>Sumbit</button>
      <QuillNoSSRWrapper value={contents} readOnly={true} theme={"snow"} />
    </div>
  );
};
