import { SelectChangeEvent } from "@mui/material";
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FileContainerPresenter } from ".";
import {
  useFileName,
  useSecureDir,
  useTargetFiles,
  useWaifu2x,
} from "../../hooks";
import { FileDataDto } from "../../types";

export const FileContainer = () => {
  //#########################################################
  // Hooks
  //#########################################################
  const {
    getSecureDirs,
    defaultInputPrefixDirPath,
    defaultOutputPrefixDirPath,
  } = useSecureDir();
  //#########################################################
  // States
  //#########################################################
  const { progressWaifu2x, executeWaifu2x } = useWaifu2x();
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  const [numberOfProcess, setNumberOfProcess] = useState(0);
  //------------------------------------------
  // Convert Options
  //------------------------------------------
  const [type, setType] = useState("a");
  const [scale, setScale] = useState("2");
  const [noise, setNoise] = useState("3");
  //------------------------------------------
  // TAB
  //------------------------------------------
  const [tabIndex, setTabIndex] = useState(0);
  //------------------------------------------
  // Input
  //------------------------------------------
  const [inputPrefixDirPath, setInputPrefixDirPath] = useState<number>(
    defaultInputPrefixDirPath
  );
  const [inputSuffixDirPath, setInputSuffixDirPath] = useState("");
  const [inputDirPath, setInputDirPath] = useState("");
  //------------------------------------------
  // Output
  //------------------------------------------
  const [outputPrefixDirPath, setOutputPrefixDirPath] = useState<number>(
    defaultOutputPrefixDirPath
  );
  const [outputSuffixDirPath, setOutputSuffixDirPath] = useState("");
  const [outputDirPath, setOutputDirPath] = useState("");
  const [filterRegexText, setFilterRegexText] = useState<string>("");
  const [fileDataDtos, setFileDataDtos] = useState<FileDataDto[]>();
  const { joinDirectories } = useFileName();
  const { getTargetFiles } = useTargetFiles();

  //#########################################################
  // Handler Functions
  //#########################################################
  //------------------------------------------
  // Convert Options
  //------------------------------------------
  const handleType = (e: ChangeEvent<HTMLInputElement>) =>
    setType(e.target.value);
  const handleScale = (e: ChangeEvent<HTMLInputElement>) =>
    setScale(e.target.value);
  const handleNoise = (e: ChangeEvent<HTMLInputElement>) =>
    setNoise(e.target.value);
  //------------------------------------------
  // TAB
  //------------------------------------------
  const handleChangeTabs = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  //------------------------------------------
  // Input
  //------------------------------------------
  const handleInputPrefixDirPath = (e: SelectChangeEvent<number>) => {
    resetNumberOfProcess();
    setInputPrefixDirPath(Number(e.target.value));
  };
  const handleInputSuffixDirPath = (e: ChangeEvent<HTMLInputElement>) =>
    setInputSuffixDirPath(e.target.value);
  const handleInputPath = useCallback(
    async (prefixDirId: number, suffixDir: string) => {
      const secureDirs = await getSecureDirs();
      const prefixDir = secureDirs[prefixDirId];
      const inputDirPath = joinDirectories(prefixDir, suffixDir);
      setInputDirPath(inputDirPath);
    },
    [getSecureDirs, joinDirectories]
  );
  //------------------------------------------
  // Output
  //------------------------------------------
  const handleOutputPrefixDirPath = (e: SelectChangeEvent<number>) => {
    resetNumberOfProcess();
    setOutputPrefixDirPath(Number(e.target.value));
  };
  const handleOutputSuffixDirPath = (e: ChangeEvent<HTMLInputElement>) =>
    setOutputSuffixDirPath(e.target.value);
  const handleOutputPath = useCallback(
    async (prefixDirId: number, suffixDir: string) => {
      const secureDirs = await getSecureDirs();
      const prefixDir = secureDirs[prefixDirId];
      const outputDirPath = joinDirectories(prefixDir, suffixDir);
      setOutputDirPath(outputDirPath);
    },
    [getSecureDirs, joinDirectories]
  );

  const handleFilterRegexText = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    resetNumberOfProcess();
    setFilterRegexText(e.target.value);
  };

  const searchTargetFiles = useCallback(
    async (filterRegexText: string) => {
      const fileDataDtos = await getTargetFiles(
        inputDirPath,
        (fileName: string) => {
          return new RegExp(filterRegexText, "g").test(fileName);
        }
      );
      if (!fileDataDtos) {
        setFileDataDtos(undefined);
        return;
      }
      setFileDataDtos(fileDataDtos);
    },
    [getTargetFiles, inputDirPath]
  );
  //------------------------------------------
  // Progress
  //------------------------------------------
  const incrementNumberOfProcess = () =>
    setNumberOfProcess((previouNumber) => previouNumber + 1);
  const resetNumberOfProcess = () => setNumberOfProcess(0);
  //------------------------------------------
  // Execute
  //------------------------------------------
  const handleWaifu2x = async () => {
    if (!fileDataDtos?.length) {
      return;
    }
    await executeWaifu2x({
      fileDataDtos,
      outputDirPath,
      type,
      scale,
      noise,
      callback: {
        start: resetNumberOfProcess,
        end: incrementNumberOfProcess,
      },
    });
  };

  useEffect(() => {
    (async () => {
      await searchTargetFiles(filterRegexText);
      setNumberOfFiles(fileDataDtos?.length || 0);
    })();
  }, [fileDataDtos?.length, filterRegexText, searchTargetFiles]);

  useEffect(() => {
    (async () => {
      await handleInputPath(inputPrefixDirPath, inputSuffixDirPath);
    })();
  }, [handleInputPath, inputPrefixDirPath, inputSuffixDirPath]);

  useEffect(() => {
    (async () => {
      await handleOutputPath(outputPrefixDirPath, outputSuffixDirPath);
    })();
  }, [handleOutputPath, outputPrefixDirPath, outputSuffixDirPath]);

  return (
    <FileContainerPresenter
      numberOfFiles={numberOfFiles}
      numberOfProcess={numberOfProcess}
      progress={progressWaifu2x}
      handleWaifu2x={handleWaifu2x}
      tabIndex={tabIndex}
      handleChangeTabs={handleChangeTabs}
      inputPrefixDirPath={inputPrefixDirPath}
      handleInputPrefixDirPath={handleInputPrefixDirPath}
      inputSuffixDirPath={inputSuffixDirPath}
      handleInputSuffixDirPath={handleInputSuffixDirPath}
      outputPrefixDirPath={outputPrefixDirPath}
      handleOutputPrefixDirPath={handleOutputPrefixDirPath}
      outputSuffixDirPath={outputSuffixDirPath}
      handleOutputSuffixDirPath={handleOutputSuffixDirPath}
      outputDirPath={outputDirPath}
      filterRegexText={filterRegexText}
      handleFilterRegexText={handleFilterRegexText}
      fileDataDtos={fileDataDtos}
      type={type}
      handleType={handleType}
      scale={scale}
      handleScale={handleScale}
      noise={noise}
      handleNoise={handleNoise}
    />
  );
};
