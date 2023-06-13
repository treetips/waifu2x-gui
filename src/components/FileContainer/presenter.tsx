import { LoadingButton } from "@mui/lab";
import { Box, Card, Stack, Tab, Tabs } from "@mui/material";
import { ComponentProps, SyntheticEvent } from "react";
import { FileConvertForm } from "../FileConvertForm";
import { FileIoForm } from "../FileIoForm";
import { FileList } from "../FileList";
import { FileListForm } from "../FileListForm";
import { FileProgress } from "../FileProgress";

type Props = {
  progress: boolean;
  tabIndex: number;
  handleChangeTabs: (event: SyntheticEvent, newValue: number) => void;
  handleWaifu2x: () => Promise<void>;
} & ComponentProps<typeof FileIoForm> &
  ComponentProps<typeof FileConvertForm> &
  ComponentProps<typeof FileProgress> &
  ComponentProps<typeof FileListForm> &
  ComponentProps<typeof FileList>;

export const FileContainerPresenter = ({
  progress,
  tabIndex,
  handleChangeTabs,
  handleWaifu2x,
  numberOfFiles,
  numberOfProcess,
  inputPrefixDirPath,
  handleInputPrefixDirPath,
  inputSuffixDirPath,
  handleInputSuffixDirPath,
  outputPrefixDirPath,
  handleOutputPrefixDirPath,
  outputSuffixDirPath,
  handleOutputSuffixDirPath,
  filterRegexText,
  handleFilterRegexText,
  outputDirPath,
  fileDataDtos,
  type,
  handleType,
  scale,
  handleScale,
  noise,
  handleNoise,
}: Props) => {
  return (
    <Stack spacing={1}>
      <Card elevation={4}>
        <FileProgress
          numberOfFiles={numberOfFiles}
          numberOfProcess={numberOfProcess}
        />
        <LoadingButton
          variant="contained"
          disabled={progress}
          loading={progress}
          onClick={handleWaifu2x}
          fullWidth
        >
          Convert
        </LoadingButton>
      </Card>

      <Card elevation={4}>
        <Tabs
          value={tabIndex}
          onChange={handleChangeTabs}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Input / Output" value={0} />
          <Tab label="Convert Options" value={1} />
        </Tabs>

        {tabIndex === 0 && (
          <Box p={1}>
            <FileIoForm
              inputPrefixDirPath={inputPrefixDirPath}
              handleInputPrefixDirPath={handleInputPrefixDirPath}
              inputSuffixDirPath={inputSuffixDirPath}
              handleInputSuffixDirPath={handleInputSuffixDirPath}
              outputPrefixDirPath={outputPrefixDirPath}
              handleOutputPrefixDirPath={handleOutputPrefixDirPath}
              outputSuffixDirPath={outputSuffixDirPath}
              handleOutputSuffixDirPath={handleOutputSuffixDirPath}
              outputDirPath={outputDirPath}
              fileDataDtos={fileDataDtos}
              filterRegexText={filterRegexText}
              handleFilterRegexText={handleFilterRegexText}
            />
          </Box>
        )}

        {tabIndex === 1 && (
          <Box p={1}>
            <FileConvertForm
              type={type}
              handleType={handleType}
              scale={scale}
              handleScale={handleScale}
              noise={noise}
              handleNoise={handleNoise}
            />
          </Box>
        )}
      </Card>
    </Stack>
  );
};
