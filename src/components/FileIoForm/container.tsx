import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import { useSecureDir } from "../../hooks";
import { SecureDirType } from "../../types";
import { FileList } from "../FileList";
import { FileListForm } from "../FileListForm";
import { FileIoFormPresenter } from "./presenter";

type Props = {
  inputPrefixDirPath: number;
  handleInputPrefixDirPath: (e: SelectChangeEvent<number>) => void;
  inputSuffixDirPath: string;
  handleInputSuffixDirPath: (e: ChangeEvent<HTMLInputElement>) => void;
  outputPrefixDirPath: number;
  handleOutputPrefixDirPath: (e: SelectChangeEvent<number>) => void;
  outputSuffixDirPath: string;
  handleOutputSuffixDirPath: (e: ChangeEvent<HTMLInputElement>) => void;
  outputDirPath: string;
} & Pick<
  ComponentProps<typeof FileListForm>,
  "filterRegexText" | "handleFilterRegexText"
> &
  Pick<ComponentProps<typeof FileList>, "fileDataDtos">;

export const FileIoForm = (props: Props) => {
  const [secureDirs, setSecureDirs] = useState<SecureDirType>();
  const { getSecureDirs } = useSecureDir();

  useEffect(() => {
    (async () => {
      setSecureDirs(await getSecureDirs());
    })();
  }, [getSecureDirs]);

  return (
    <>
      {secureDirs && <FileIoFormPresenter {...props} secureDirs={secureDirs} />}
    </>
  );
};
