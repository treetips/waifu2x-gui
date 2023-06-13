import { Box, Card } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FormItemValue } from "../FormItemValue";

type Props = {
  osName: string;
  hardwareName: string;
  waifu2xPath?: string;
};

export const EnvironmentPresenter = ({
  osName,
  hardwareName,
  waifu2xPath,
}: Props) => {
  return (
    <Card elevation={5}>
      <Box sx={{ flexGrow: 1 }} p={1}>
        <Grid2 container>
          <FormItemValue label="OS" md={{ label: 3, value: 9 }}>
            {osName}
          </FormItemValue>
          <FormItemValue label="hardwareName" md={{ label: 3, value: 9 }}>
            {hardwareName}
          </FormItemValue>
          <FormItemValue
            label="waifu2x binary path"
            md={{ label: 3, value: 9 }}
          >
            {waifu2xPath}
          </FormItemValue>
        </Grid2>
      </Box>
    </Card>
  );
};
