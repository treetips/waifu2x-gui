export const useFileName = () => {
  const getFileExtension = (fileName: string) => {
    return fileName.split(".").pop();
  };

  const getFileNameWithoutExtension = (fileName: string) => {
    return fileName.split(".").slice(0, -1).join(".");
  };

  const joinDirectories = (...dirs: string[]) => {
    return dirs
      .map((dir) => {
        const prefix = dir.at(0);
        if (prefix !== "/") {
          return `/${dir}`;
        }
        return dir;
      })
      .map((dir) => {
        const suffix = dir.at(-1);
        if (suffix === "/") {
          return dir.slice(0, -1);
        }
        return dir;
      })
      .join("");
  };

  return {
    getFileExtension,
    getFileNameWithoutExtension,
    joinDirectories,
  } as const;
};
