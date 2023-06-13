import {
  Alert,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FormItemValue } from "../FormItemValue";

type Props = {
  waifu2xScopeName: string;
  onWaifu2xScopeName: (e: SelectChangeEvent<string>) => void;
  waifu2xBinaryPaths: {
    key: string;
    value: string;
  }[];
  existWaifu2xCmd: boolean;
};

export const SettingsPresenter = ({
  waifu2xScopeName,
  onWaifu2xScopeName,
  waifu2xBinaryPaths,
  existWaifu2xCmd,
}: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }} p={1}>
      <Grid2 container>
        <FormItemValue label="waifu2x binary path" md={{ label: 3, value: 9 }}>
          <Stack direction="row">
            <Select
              value={waifu2xScopeName}
              size="small"
              sx={{ mr: 1 }}
              onChange={onWaifu2xScopeName}
              fullWidth
            >
              {waifu2xBinaryPaths.map((waifu2xBinaryPathItem) => (
                <MenuItem
                  key={waifu2xBinaryPathItem.key}
                  value={waifu2xBinaryPathItem.key}
                >
                  {waifu2xBinaryPathItem.value}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          {existWaifu2xCmd === false && (
            <Alert severity="error">waifu2x binary path is not found.</Alert>
          )}
        </FormItemValue>
      </Grid2>
    </Box>
  );
};
