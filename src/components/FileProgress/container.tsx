import { FileProgressPresenter } from "./presenter";

type Props = {
  numberOfFiles: number;
  numberOfProcess: number;
};

export const FileProgress = ({ numberOfFiles, numberOfProcess }: Props) => {
  return (
    <FileProgressPresenter
      numberOfFiles={numberOfFiles || 0}
      numberOfProcess={numberOfProcess || 0}
    />
  );
};
