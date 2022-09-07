import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

export const ImageInput = () => {
  const [previewImg, setPreviewImg] = useState<File[]>();
  const [img, setImg] = useState([]);

  const insertImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files === undefined) return;

    const render = new FileReader();
    if (files !== null) {
      render.readAsDataURL(files[0]);
    }
    render.onloadend = () => {
      const previewImgUrl = render.result;
      if (previewImgUrl !== null) {
        // setPreviewImg([...previewImg, previewImgUrl]);
      }
    };
  };
  return (
    <div>
      <input
        type="file"
        accept=".png, .jpeg, .jpg, .pdf"
        onChange={(e) => insertImg(e)}
      />
      <img />
      <div>❌</div>
    </div>
  );
};
