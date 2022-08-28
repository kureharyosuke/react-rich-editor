/**
 * Helper functions for the SlateEditor component.
 */
import { Editor, Transforms } from "slate";

export const LIST_TYPES = ["numbered-list", "bulleted-list"];

/**
 * Checks whether a format block is active or not in the editor.
 * @param editor The current Slate editor
 * @param format The format block that is being checked
 */
export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

/**
 * Toggles a format block to be on / off.
 * @param editor The current Slate editor
 * @param format The format block that is being checked
 */
export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

/**
 * Checks whether a format mark is active or not in the editor.
 * @param editor The current Slate editor
 * @param format The format mark that is being checked
 */
export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

/**
 * Toggles a format mark to be on / off.
 * @param editor The current Slate editor
 * @param format The format mark that is being checked
 */
export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

/**
 * Check whether the link button is active or not in the editor.
 * @param editor The current Slate editor
 */
export const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
  return !!link;
};

/**
 * Unwraps a link node from the editor.
 * @param editor The current Slate editor
 */
export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
};

/**
 * Wraps a link node to the editor.
 * @param editor The current Slate editor
 * @param url The url to wrap into a node
 */
export const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

/**
 * This will insert a link into the Slate editor.
 * @param editor The current Slate editor
 * @param url The url to insert
 */
export const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};
