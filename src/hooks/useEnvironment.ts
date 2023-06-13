import { Command } from "@tauri-apps/api/shell";
import { useCallback, useEffect, useState } from "react";

export const useEnvironment = () => {
  const [osName, setOsName] = useState("");
  const [hardwareName, setHardwareName] = useState("");

  const getOsName = useCallback(async () => {
    const command = new Command("uname-o");
    return await command.execute();
  }, []);

  const getHardwareName = useCallback(async () => {
    const command = new Command("uname-m");
    return await command.execute();
  }, []);

  useEffect(() => {
    (async () => {
      const output = await getOsName();
      setOsName(output.stdout);
    })();
  }, [getOsName]);

  useEffect(() => {
    (async () => {
      const output = await getHardwareName();
      setHardwareName(output.stdout);
    })();
  }, [getHardwareName]);

  return {
    osName,
    hardwareName,
    getOsName,
    getHardwareName,
  } as const;
};
