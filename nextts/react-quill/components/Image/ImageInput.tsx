import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

export const ImageInput = () => {
  const [img, setImg] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<File[]>([]);
  console.log(
    `🚀 ~ file: ImageInput.tsx ~ line 6 ~ ImageInput ~ previewImg`,
    previewImg[0]
  );

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target; //  사용자가 선택한 파일들
    const reader = new FileReader();
    const fileArr = [...Object.values(files!)];
    console.log(
      `🚀 ~ file: ImageInput.tsx ~ line 16 ~ uploadFile ~ fileArr`,
      fileArr
    );
    // const filesArray = Array.from(files!).map((file) =>
    //   URL.createObjectURL(file)
    // );
    // console.log(
    //   `🚀 ~ file: ImageInput.tsx ~ line 18 ~ uploadFile ~ filesArray`,
    //   filesArray
    // );
    // const fileArray = Array.from(files!);
    setImg(fileArr); //
    let fileURLs: any = [];
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length; // 최대 10개

    // 프리뷰
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
  //       // !!중요1. formData활용!!
  //       const formData = new FormData();
  //       formData.append("file", img);

  //       // Axios를 이용해서 Back-End로 파일 업로드 요청!
  //       // !!중요2. header에 content-type에 multipart/form-data를 설정!!
  //       const axiosResponse = await axiosDefaultInstance.post<
  //         ApiResponse<FileUploadResponse>
  //       >("/files", formData, {
  //         headers: { "content-type": "multipart/form-data" },
  //       });

  //       // HttpStatus가 200번호 구역이 아니거나
  //       // 서버에서 응답 코드로 0(성공)을 주지 않았을 경우
  //       if (
  //         axiosResponse.status < 200 ||
  //         axiosResponse.status >= 300 ||
  //         axiosResponse.data.resultCode !== 0
  //       ) {
  //         // Error를 발생시켜 Catch문을 타게 만들어주는데, 서버에 응답받은 메시지를 넣어준다!
  //         // 서버에서 응답 메시지를 받지 못했을경우 기본 메시지 설정또한 함께 해준다
  //         throw Error(axiosResponse.data.message || "문제가 발생했어요!");
  //       }
  //       // 파일 업로드 성공!
  //       alert("파일 업로드 성공!");
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
              <button onClick={() => deleteFile(idx)}>❌</button>
            </div>
          );
        })}
    </div>
  );
};
