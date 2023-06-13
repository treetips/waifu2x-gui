import { FileListPresenter } from ".";
import { FileDataDto } from "../../types";

type Props = {
  fileDataDtos?: FileDataDto[];
};

export const FileList = ({ fileDataDtos }: Props) => {
  return (
    <>{fileDataDtos && <FileListPresenter fileDataDtos={fileDataDtos} />}</>
  );
};
