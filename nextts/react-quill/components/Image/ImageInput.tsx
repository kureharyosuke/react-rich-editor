import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

export const ImageInput = () => {
  const [img, setImg] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<File[]>([]);
  console.log(
    `🚀 ~ file: ImageInput.tsx ~ line 6 ~ ImageInput ~ previewImg`,
    previewImg
  );

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target; //  사용자가 선택한 파일들
    const reader = new FileReader();
    // const test = reader.readAsDataURL(files as any);
    // console.log(
    //   `🚀 ~ file: ImageInput.tsx ~ line 16 ~ uploadFile ~ test`,
    //   test
    // );
    const fileArray = Array.from(files!);
    setImg(fileArray); //
    let fileURLs: any = [];
    let filesLength = fileArray.length > 10 ? 10 : fileArray.length; // 최대 10개

    // 프리뷰
    for (let i = 0; i < filesLength; i++) {
      let file = fileArray[i];
      reader.onload = () => {
        fileURLs[i] = reader.result;
        console.log(
          `🚀 ~ file: ImageInput.tsx ~ line 37 ~ uploadFile ~ reader.result`,
          reader.result
        );
        setPreviewImg([...previewImg, fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteFile = (index: number) => {
    const imageArr = img.filter((el, idx) => idx !== index);
    const previewArr = previewImg.filter((el, idx) => idx !== index);
    setImg([...imageArr]);
    setPreviewImg([...previewArr]);
  };

  return (
    <div>
      <input
        type="file"
        accept=".png, .jpeg, .jpg, .pdf"
        onChange={(e) => uploadFile(e)}
      />
      {previewImg.length > 0 &&
        previewImg.map((img, idx) => {
          return (
            <div key={idx}>
              <img src={img} width={"100px"} height={"100px"} />
              <button onClick={() => deleteFile(idx)}>❌</button>
            </div>
          );
        })}
    </div>
  );
};
