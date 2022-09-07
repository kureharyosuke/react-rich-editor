import React, { useState } from "react";

const ALLOW_FILE_EXTENSION = "jpg, jpeg, png";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB

export const FileUpload = () => {
  const [file, setFile] = useState<File>();
  const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    const files = (currentTarget.files as FileList)[0];

    if (file === undefined) return;

    if (!fileExtensionValid(files)) {
      currentTarget.value = "";
      alert(
        `업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`
      );
      return;
    }

    if (files.size > FILE_SIZE_MAX_LIMIT) {
      currentTarget.value = "";
      alert("업로드 가능한 최대 용량은 5MB입니다. ");
      return;
    }

    setFile(files);
  };

  const fileExtensionValid = ({ name }: { name: string }): boolean => {
    const extension = removeFil;
  };

  return <div>FileUpload</div>;
};
