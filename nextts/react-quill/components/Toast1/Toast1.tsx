import dynamic from "next/dynamic";
import React from "react";
import { Editor, EditorProps } from "@toast-ui/react-editor";

const Eidtor = dynamic<EditorProps>(
  () => import("@toast-ui/react-editor").then((m) => m.Editor),
  { ssr: false }
);

export interface TuiEditorWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

export const ToastEditor = () => {
  return (
    <Eidtor
      initialValue="Toast Editor word typing "
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
    />
  );
};
