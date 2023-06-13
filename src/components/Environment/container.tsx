import { EnvironmentPresenter } from ".";
import { useEnvironment, useGlobalState } from "../../hooks";
import { waifu2xBinaryPaths } from "../../types";

export const Environment = () => {
  const { osName, hardwareName } = useEnvironment();
  const { waifu2xScopeName } = useGlobalState();

  const waifu2xPath = waifu2xBinaryPaths
    .filter(({ key }) => key === waifu2xScopeName)
    .at(-1);

  return (
    <EnvironmentPresenter
      {...{ osName, hardwareName, waifu2xPath: waifu2xPath?.value }}
    />
  );
};
