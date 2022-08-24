import type { NextPage } from "next";
import { CustomEditor } from "../../components/CustomEditor";
import { Editor } from "../../components/Editor";

const EditorPage: NextPage = () => {
  return (
    <div>
      <CustomEditor />
      {/* <Editor /> */}
    </div>
  );
};

export default EditorPage;
