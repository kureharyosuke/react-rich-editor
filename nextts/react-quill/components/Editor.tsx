import React, { useState } from "react";
// import ReactQuill, { Mixin, Toolbar, Quill } from "react-quill";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export const Editor = () => {
  const [value, setValue] = useState<string>("");
  return (
    <div>
      <ReactQuill value={value} onChange={(value) => setValue(value)} />
      <div>Free View: {value}</div>
    </div>
  );
};
