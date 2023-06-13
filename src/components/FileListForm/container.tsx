import { ChangeEvent } from "react";
import { FileListFormPresenter } from ".";

type Props = {
  filterRegexText: string;
  handleFilterRegexText: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const FileListForm = ({
  filterRegexText,
  handleFilterRegexText,
}: Props) => {
  return (
    <FileListFormPresenter
      filterRegexText={filterRegexText}
      handleFilterRegexText={handleFilterRegexText}
    />
  );
};
