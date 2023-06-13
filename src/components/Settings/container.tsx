import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { SettingsPresenter } from ".";
import { useGlobalState, useWaifu2x } from "../../hooks";
import { waifu2xBinaryPaths } from "../../types";

export const Settings = () => {
  const { waifu2xScopeName, setWaifu2xScopeName } = useGlobalState();
  const [existWaifu2xCmd, setExistWaifu2xCmd] = useState(true);
  const { lsWaifu2xCmd } = useWaifu2x();

  const handleWaifu2xScopeName = (e: SelectChangeEvent<string>) =>
    setWaifu2xScopeName(e.target.value);

  useEffect(() => {
    (async () => {
      setExistWaifu2xCmd(!(await lsWaifu2xCmd()).stderr);
    })();
  }, [lsWaifu2xCmd]);

  return (
    <SettingsPresenter
      waifu2xScopeName={waifu2xScopeName}
      onWaifu2xScopeName={handleWaifu2xScopeName}
      waifu2xBinaryPaths={waifu2xBinaryPaths}
      existWaifu2xCmd={existWaifu2xCmd}
    />
  );
};
