import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface ItemProps {
  id: Id<"documents">;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ id, initialContent, editable }: ItemProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: id,
      content,
    });
  };

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: handleUpload,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      onChange={() => {
        onChange(JSON.stringify(editor.document));
      }}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};
