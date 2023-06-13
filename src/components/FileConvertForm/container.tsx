import { ChangeEvent } from "react";
import { FileConvertFormPresenter } from ".";

type Props = {
  type: string;
  handleType: (e: ChangeEvent<HTMLInputElement>) => void;
  scale: string;
  handleScale: (e: ChangeEvent<HTMLInputElement>) => void;
  noise: string;
  handleNoise: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const FileConvertForm = (props: Props) => {
  return <FileConvertFormPresenter {...props} />;
};
