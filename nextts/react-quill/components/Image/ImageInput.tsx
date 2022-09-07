import React from "react";

export const ImageInput = () => {
  const insertImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files !== null) {
      const file = event.currentTarget.files[0];
      console.log(`🚀 ~ file: Image.tsx ~ line 7 ~ insertImg ~ file`, file);
      // fileの処理
    }
  };
  return (
    <div>
      <input
        type="file"
        accept=".png, .jpeg, .jpg, .pdf"
        onChange={(e) => insertImg(e)}
      />
    </div>
  );
};
