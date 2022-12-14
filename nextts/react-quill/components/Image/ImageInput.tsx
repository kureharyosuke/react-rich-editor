import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

export const ImageInput = () => {
  const [img, setImg] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<File[]>([]);
  console.log(
    `๐ ~ file: ImageInput.tsx ~ line 6 ~ ImageInput ~ previewImg`,
    previewImg[0]
  );

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target; //  ์ฌ์ฉ์๊ฐ ์ ํํ ํ์ผ๋ค
    const reader = new FileReader();
    const fileArr = [...Object.values(files!)];
    console.log(
      `๐ ~ file: ImageInput.tsx ~ line 16 ~ uploadFile ~ fileArr`,
      fileArr
    );
    // const filesArray = Array.from(files!).map((file) =>
    //   URL.createObjectURL(file)
    // );
    // console.log(
    //   `๐ ~ file: ImageInput.tsx ~ line 18 ~ uploadFile ~ filesArray`,
    //   filesArray
    // );
    // const fileArray = Array.from(files!);
    setImg(fileArr); //
    let fileURLs: any = [];
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length; // ์ต๋ 10๊ฐ

    // ํ๋ฆฌ๋ทฐ
    for (let i = 0; i < filesLength; i++) {
      let file = fileArr[i];
      reader.onload = () => {
        fileURLs[i] = reader.result;
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

  // const fileUploadHandler = async () => {
  //   // narrowing(?)
  //   if (img !== undefined) {
  //     try {
  //       // !!์ค์1. formDataํ์ฉ!!
  //       const formData = new FormData();
  //       formData.append("file", img);

  //       // Axios๋ฅผ ์ด์ฉํด์ Back-End๋ก ํ์ผ ์๋ก๋ ์์ฒญ!
  //       // !!์ค์2. header์ content-type์ multipart/form-data๋ฅผ ์ค์ !!
  //       const axiosResponse = await axiosDefaultInstance.post<
  //         ApiResponse<FileUploadResponse>
  //       >("/files", formData, {
  //         headers: { "content-type": "multipart/form-data" },
  //       });

  //       // HttpStatus๊ฐ 200๋ฒํธ ๊ตฌ์ญ์ด ์๋๊ฑฐ๋
  //       // ์๋ฒ์์ ์๋ต ์ฝ๋๋ก 0(์ฑ๊ณต)์ ์ฃผ์ง ์์์ ๊ฒฝ์ฐ
  //       if (
  //         axiosResponse.status < 200 ||
  //         axiosResponse.status >= 300 ||
  //         axiosResponse.data.resultCode !== 0
  //       ) {
  //         // Error๋ฅผ ๋ฐ์์์ผ Catch๋ฌธ์ ํ๊ฒ ๋ง๋ค์ด์ฃผ๋๋ฐ, ์๋ฒ์ ์๋ต๋ฐ์ ๋ฉ์์ง๋ฅผ ๋ฃ์ด์ค๋ค!
  //         // ์๋ฒ์์ ์๋ต ๋ฉ์์ง๋ฅผ ๋ฐ์ง ๋ชปํ์๊ฒฝ์ฐ ๊ธฐ๋ณธ ๋ฉ์์ง ์ค์ ๋ํ ํจ๊ป ํด์ค๋ค
  //         throw Error(axiosResponse.data.message || "๋ฌธ์ ๊ฐ ๋ฐ์ํ์ด์!");
  //       }
  //       // ํ์ผ ์๋ก๋ ์ฑ๊ณต!
  //       alert("ํ์ผ ์๋ก๋ ์ฑ๊ณต!");
  //       console.log(axiosResponse.data.data);
  //     } catch (e) {
  //       console.error(e);
  //       alert((e as { message: string }).message);
  //     }
  //   }
  // };

  return (
    <div style={{ display: "flex" }}>
      <input
        type="file"
        // multiple={true}
        accept=".png, .jpeg, .jpg, .pdf"
        onChange={(e) => uploadFile(e)}
      />
      {previewImg.length > 0 &&
        previewImg.map((img, idx) => {
          return (
            <div key={idx} style={{ display: "flex" }}>
              <img src={img} width={"200px"} height={"100px"} />
              <button onClick={() => deleteFile(idx)}>โ</button>
            </div>
          );
        })}
    </div>
  );
};
