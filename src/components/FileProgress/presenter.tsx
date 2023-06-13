import { Box, LinearProgress, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { FileProgress } from "./container";

type Props = ComponentProps<typeof FileProgress>;

export const FileProgressPresenter = ({
  numberOfFiles,
  numberOfProcess,
}: Props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={(numberOfProcess / numberOfFiles) * 100}
          sx={{ height: 15 }}
          color={numberOfProcess === numberOfFiles ? "success" : "info"}
        />
      </Box>
      <Box sx={{ minWidth: 80 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.floor((numberOfProcess / numberOfFiles) * 100)}%`}
          {` ${numberOfProcess}/${numberOfFiles}`}
        </Typography>
      </Box>
    </Box>
  );
};
