import { Search as SearchIcon } from "@mui/icons-material";
import { Box, Stack, TextField } from "@mui/material";
import { ComponentProps } from "react";
import { FileListForm } from "./container";

type Props = ComponentProps<typeof FileListForm>;

export const FileListFormPresenter = ({
  filterRegexText,
  handleFilterRegexText,
}: Props) => {
  return (
    <Stack>
      <Box
        sx={{ display: "flex", alignItems: "flex-end" }}
        mb={1}
        pl={1}
        pr={1}
      >
        <SearchIcon sx={{ mr: 1 }} />
        <TextField
          label="You can search for word or regular expressions."
          variant="standard"
          value={filterRegexText}
          onChange={handleFilterRegexText}
          fullWidth
        />
      </Box>
    </Stack>
  );
};
