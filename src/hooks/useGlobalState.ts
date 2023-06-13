import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { waifu2xBinPathAtom } from "../globalState";
import { SettingCacheKey, waifu2xBinaryPaths } from "../types";

export const useGlobalState = () => {
  const [waifu2xScopeNameState, setWaifu2xScopeNameState] =
    useRecoilState(waifu2xBinPathAtom);

  const setWaifu2xScopeName = useCallback(
    (path: string) => {
      setWaifu2xScopeNameState(path);
      localStorage.setItem(SettingCacheKey.WAIFU2X_PATH, path);
    },
    [setWaifu2xScopeNameState]
  );

  useEffect(() => {
    const cacheWaifu2xPath = localStorage.getItem(SettingCacheKey.WAIFU2X_PATH);
    if (cacheWaifu2xPath) {
      setWaifu2xScopeNameState(cacheWaifu2xPath);
      return;
    }
    setWaifu2xScopeNameState(waifu2xBinaryPaths[0].key);
  }, [setWaifu2xScopeNameState]);

  return {
    waifu2xScopeName: waifu2xScopeNameState,
    setWaifu2xScopeName,
  } as const;
};
