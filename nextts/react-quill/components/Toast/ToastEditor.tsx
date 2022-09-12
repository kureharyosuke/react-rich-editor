import dynamic from "next/dynamic";
import React, { useRef, useCallback, forwardRef, useState } from "react";
import { Editor as EditorType, EditorProps } from "@toast-ui/react-editor";
import { TuiEditorWithForwardedProps } from "./TUIEditorWrapper";

interface IEditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

interface ITUIEditorProps extends EditorProps {
  onChange(value: string): void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(
  async () => {
    const [mod] = await Promise.all([
      import("./TUIEditorWrapper"),
      // import('@toast-ui/editor/dist/i18n/ko-kr'), // to implement Korean
    ]);
    return mod.default;
  },
  {
    loading: () => <div>loading</div>,
    ssr: false,
  }
);
// eslint-disable-next-line react/display-name
const EditorWithForwardedRef = React.memo(
  forwardRef<EditorType | undefined, IEditorPropsWithHandlers>((props, ref) => (
    <Editor
      {...props}
      forwardedRef={ref as React.MutableRefObject<EditorType>}
    />
  ))
);

const TUIEditor = ({ onChange, ...props }: ITUIEditorProps) => {
  // const { initialValue, height } = props;
  const [initialValue, setInitialValue] = useState<any>([]);

  const editorRef = useRef<EditorType>();
  const handleChange = useCallback(() => {
    if (!editorRef.current) {
      return;
    }

    onChange(editorRef.current.getInstance().getHTML());
  }, [editorRef, onChange]);

  return (
    <div>
      <EditorWithForwardedRef
        ref={editorRef}
        language="ko-KR"
        previewStyle="tab"
        hideModeSwitch
        usageStatistics={false}
        initialValue={initialValue}
        height={"600px"}
        onChange={handleChange}
        initialEditType="wysiwyg"
        toolbarItems={[
          [
            "heading",
            "bold",
            "italic",
            "strike",
            "hr",
            "ul",
            "ol",
            "indent",
            "outdent",
            "link",
          ],
        ]}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            // console.log(blob);
            setInitialValue([...initialValue, blob] as any[]);
          },
        }}
        {...props}
      />
    </div>
  );
};

export default React.memo(TUIEditor);
