import {
  audioDir,
  desktopDir,
  downloadDir,
  pictureDir,
  videoDir,
} from "@tauri-apps/api/path";
import { useCallback } from "react";
import { SecureDirType } from "../types";

export const useSecureDir = () => {
  const defaultInputPrefixDirPath = 1;
  const defaultOutputPrefixDirPath = 1;

  const getSecureDirs = useCallback(async (): Promise<SecureDirType> => {
    return {
      1: await desktopDir(),
      2: await downloadDir(),
      3: await pictureDir(),
      4: await videoDir(),
      5: await audioDir(),
    };
  }, []);

  return {
    getSecureDirs,
    defaultInputPrefixDirPath,
    defaultOutputPrefixDirPath,
  } as const;
};
