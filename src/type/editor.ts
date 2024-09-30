/**
 * Editor Types
 *
 * Types that relate to the collaboration document editor.
 **/

type Editor = string;
type Editorlist = Editor[];

type DocumentContent = {
  content: string;
  length: number;
};

export type MessageValue = Editorlist | DocumentContent;
