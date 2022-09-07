import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

export const ImageInput = () => {
  const [previewImg, setPreviewImg] = useState<File[]>([]);
  console.log(
    `🚀 ~ file: ImageInput.tsx ~ line 6 ~ ImageInput ~ previewImg`,
    previewImg
  );
  const [img, setImg] = useState([]);

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target; //  사용자가 선택한 파일들
    const fileArray = Array.from(files!);
    setPreviewImg(fileArray); //
    let fileURLs: any = [];
    let filesLength = fileArray.length > 10 ? 10 : fileArray.length; // 최대 10개

    // 프리뷰
    for (let i = 0; i < filesLength; i++) {
      let file = fileArray[i];
      let reader = new FileReader();
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

  return (
    <div>
      <input
        type="file"
        accept=".png, .jpeg, .jpg, .pdf"
        onChange={(e) => uploadFile(e)}
      />
      {/* <img src={previewImg} width={"100px"} height={"100px"} /> */}
      {previewImg.length > 1 &&
        previewImg.map((img, idx) => {
          return <img key={idx} src={img} width={"100px"} height={"100px"} />;
        })}
      <div>❌</div>
    </div>
  );
};
