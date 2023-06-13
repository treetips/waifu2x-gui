import { Box, Divider, Input, MenuItem, Select, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { ComponentProps } from "react";
import { SecureDirType } from "../../types";
import { FileList } from "../FileList";
import { FileListForm } from "../FileListForm";
import { FormItemValue } from "../FormItemValue";
import { FileIoForm } from "./container";

type Props = {
  secureDirs: SecureDirType;
} & ComponentProps<typeof FileIoForm>;

export const FileIoFormPresenter = ({
  secureDirs,
  inputPrefixDirPath,
  handleInputPrefixDirPath,
  inputSuffixDirPath,
  handleInputSuffixDirPath,
  filterRegexText,
  handleFilterRegexText,
  outputPrefixDirPath,
  handleOutputPrefixDirPath,
  outputSuffixDirPath,
  handleOutputSuffixDirPath,
  fileDataDtos,
}: Props) => {
  const Separator = () => (
    <Divider
      sx={{ width: "100%", border: "0.5px dotted lightgray", mt: 0.5, mb: 0.5 }}
    />
  );

  return (
    <Box sx={{ flexGrow: 1 }} p={1}>
      <Grid2 container>
        <FormItemValue label="Input directory">
          <Stack direction="row">
            <Select
              value={inputPrefixDirPath}
              size="small"
              sx={{ mr: 1 }}
              onChange={handleInputPrefixDirPath}
            >
              {Object.entries(secureDirs).map(
                ([dirId, dirPath]: [string, string]) => (
                  <MenuItem key={dirId} value={dirId}>
                    {dirPath}
                  </MenuItem>
                )
              )}
            </Select>

            <Input
              placeholder="path/to/"
              value={inputSuffixDirPath}
              onChange={handleInputSuffixDirPath}
              fullWidth
            />
          </Stack>
        </FormItemValue>

        <FormItemValue label="">
          <FileListForm
            filterRegexText={filterRegexText}
            handleFilterRegexText={handleFilterRegexText}
          />
          <FileList fileDataDtos={fileDataDtos} />
        </FormItemValue>

        <Separator />

        <FormItemValue label="Output directory">
          <Stack direction="row">
            <Select
              value={outputPrefixDirPath}
              size="small"
              sx={{ mr: 1 }}
              onChange={handleOutputPrefixDirPath}
            >
              {Object.entries(secureDirs).map(
                ([dirId, dirPath]: [string, string]) => (
                  <MenuItem key={dirId} value={dirId}>
                    {dirPath}
                  </MenuItem>
                )
              )}
            </Select>

            <Input
              placeholder="path/to/"
              value={outputSuffixDirPath}
              onChange={handleOutputSuffixDirPath}
              fullWidth
            />
          </Stack>
        </FormItemValue>
      </Grid2>
    </Box>
  );
};
