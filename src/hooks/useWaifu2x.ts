import { Command } from "@tauri-apps/api/shell";
import { useCallback, useState } from "react";
import { useEnvironment } from ".";
import { FileDataDto, waifu2xBinaryPaths } from "../types";
import { useFileName } from "./useFileName";
import { useGlobalState } from "./useGlobalState";

export const useWaifu2x = () => {
  const [progress, setProgress] = useState(false);
  const { getFileNameWithoutExtension } = useFileName();
  const { osName, hardwareName } = useEnvironment();
  const { waifu2xScopeName } = useGlobalState();

  const executeWaifu2x = async (args: {
    fileDataDtos: FileDataDto[];
    outputDirPath: string;
    type: string;
    scale: string;
    noise: string;
    callback: {
      start: () => void;
      end: () => void;
    };
  }) => {
    const { fileDataDtos, outputDirPath, type, scale, noise, callback } = args;

    callback.start();
    setProgress(true);

    for (const fileDataDto of fileDataDtos) {
      const pngFileName = `${getFileNameWithoutExtension(
        fileDataDto.fileName
      )}.png`;
      const outputFilePath = `${outputDirPath}/${pngFileName}`;
      const command = new Command(waifu2xScopeName, [
        "--type",
        type,
        "--scale",
        scale,
        "--noise",
        noise,
        "--input",
        fileDataDto.filePath,
        "--output",
        outputFilePath,
      ]);

      try {
        await command.execute();
      } finally {
        callback.end();
      }
    }
    setProgress(false);
  };

  const getShellScopeName = useCallback(async () => {
    switch (osName.toLocaleLowerCase()) {
      case "darwin": {
        switch (hardwareName.toLowerCase()) {
          case "arm64":
            return "run-waifu2x-for-apple-silicon-macos";
          default:
            return "run-waifu2x-for-intel-macos";
        }
      }
      case "linux":
        return "run-waifu2x-for-linux";
      default:
        throw Error("Windows not supported.");
    }
  }, [hardwareName, osName]);

  const getWaifu2xBinPath = () =>
    waifu2xBinaryPaths.filter(({ key }) => key === waifu2xScopeName).at(-1);

  const lsWaifu2xCmd = async () => {
    const command = new Command("ls", [
      getWaifu2xBinPath()?.value || "undefined",
    ]);
    const output = await command.execute();
    return { ...output };
  };

  return {
    progressWaifu2x: progress,
    executeWaifu2x,
    getShellScopeName,
    lsWaifu2xCmd,
  } as const;
};
