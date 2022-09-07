import React, { useState, useEffect } from "react";

export const ImageUpload = () => {
  const [imageFiles, setImageFiles] = useState<FileList>();
  const [base64s, setBase64s] = useState<{ image: File; url: any }[]>([]);

  useEffect(() => {
    //ileList의 타입인 files의 state가 바뀔 때마다 encodeFileToBase64로 files를 인코딩한 값을 Base64에 넣어준다.
    if (imageFiles) {
      setBase64s([]);
      Array.from(imageFiles).forEach((image) => {
        encodeFileToBase64(image).then((data) =>
          setBase64s((prev) => [...prev, { image: image, url: data }])
        );
      });
    }
  }, [imageFiles]);

  // 이미지 파일 Base64 인코딩
  const encodeFileToBase64 = (image: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event: any) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const deleteImage = (clickedImage: File) => {
    const dataTransfer = new DataTransfer();

    Array.from(imageFiles as FileList)
      .filter((file) => file !== clickedImage)
      .forEach((file) => {
        dataTransfer.items.add(file);
      });

    setImageFiles(dataTransfer.files);
  };

  return <div>ImageUpload</div>;
};
