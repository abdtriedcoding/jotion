import { IconPicker } from "./icon-picker";
import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { CoverImageModal } from "@/components/modals/cover-image-upload";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

interface ItemProps {
  document: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar = ({ document, preview }: ItemProps) => {
  const updateDocument = useMutation(api.documents.updateDocument);
  const removeIcon = useMutation(api.documents.removeIcon);

  const onIconSelect = (icon: string) => {
    updateDocument({
      id: document._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: document._id,
    });
  };

  return (
    <>
      {!!document.icon && !preview && (
        <div className="flex group w-fit items-center gap-x-2 pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {document.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover:opacity-100 transition text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!document.icon && preview && (
        <p className="text-6xl pt-6">{document.icon}</p>
      )}
      <div className="opacity-100 flex items-center gap-x-1 py-4">
        {!document.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button className="text-xs" variant="outline" size="sm">
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!document.coverImage && !preview && (
          <CoverImageModal id={document._id}>
            <Button className="text-xs" variant="outline" size="sm">
              <ImageIcon className="h-4 w-4 mr-2" />
              Add cover
            </Button>
          </CoverImageModal>
        )}
      </div>
    </>
  );
};
