import { exists, readDir } from "@tauri-apps/api/fs";
import { useCallback } from "react";
import { FileDataDto } from "../types";
import { useFileName } from "./useFileName";

const SUPPORT_SOURCE_EXTENSIONS = ["jpeg", "jpg", "png", "gif", "webp"];

export const useTargetFiles = () => {
  const { getFileExtension } = useFileName();

  const getTargetFiles = useCallback(
    async (
      inputDirPath: string,
      filterCallback?: (fileName: string) => boolean
    ): Promise<FileDataDto[] | undefined> => {
      if (!inputDirPath) {
        return undefined;
      }

      const isExistsInputDirPath = await exists(inputDirPath);
      if (!isExistsInputDirPath) {
        return undefined;
      }

      const entries = await readDir(inputDirPath, {
        // dir: BaseDirectory.Download,
        recursive: false,
      });

      const fileDataDtos: FileDataDto[] = [];
      for (const entry of entries) {
        //======================================================
        // Directory
        //======================================================
        if (entry.children) {
          // processEntries(entry.children);
          continue;
        }
        //======================================================
        // File
        //======================================================
        if (!entry.name) {
          continue;
        }
        const fileName = entry.name;
        if (filterCallback && !filterCallback(fileName)) {
          continue;
        }

        const fileExtension = getFileExtension(fileName);
        if (!fileExtension) {
          continue;
        }
        const isSupported = SUPPORT_SOURCE_EXTENSIONS.includes(
          fileExtension.toLowerCase()
        );
        if (!isSupported) {
          continue;
        }

        fileDataDtos.push({
          id: fileName,
          filePath: entry.path,
          fileName,
          fileExtension,
        });
      }

      return fileDataDtos;
    },
    [getFileExtension]
  );

  return {
    getTargetFiles,
  };
};
