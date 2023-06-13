import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ComponentProps } from "react";
import { FormItemValue } from "../FormItemValue";
import { FileConvertForm } from "./container";

type Props = ComponentProps<typeof FileConvertForm>;

export const FileConvertFormPresenter = ({
  type,
  handleType,
  scale,
  handleScale,
  noise,
  handleNoise,
}: Props) => {
  const Separator = () => (
    <Divider
      sx={{ width: "100%", border: "0.5px dotted lightgray", mt: 0.5, mb: 0.5 }}
    />
  );
  return (
    <Box sx={{ flexGrow: 1 }} p={1}>
      <Grid2 container>
        <FormItemValue label="Type">
          <RadioGroup onChange={handleType} value={type}>
            <Stack direction="row" spacing={2}>
              <FormControlLabel value="a" control={<Radio />} label="Anime" />
              <FormControlLabel value="p" control={<Radio />} label="Photo" />
            </Stack>
          </RadioGroup>
        </FormItemValue>

        <Separator />

        <FormItemValue label="Scale">
          <RadioGroup onChange={handleScale} value={scale}>
            <Stack direction="row" spacing={2}>
              {[1, 2].map((i) => (
                <FormControlLabel
                  key={i}
                  value={String(i)}
                  control={<Radio />}
                  label={`x ${i}`}
                />
              ))}
            </Stack>
          </RadioGroup>
        </FormItemValue>

        <Separator />

        <FormItemValue label="Noise">
          <RadioGroup onChange={handleNoise} value={noise}>
            <Stack direction="row" spacing={2}>
              {[1, 2, 3, 4].map((i) => (
                <FormControlLabel
                  key={i}
                  value={String(i)}
                  control={<Radio />}
                  label={`x ${i}`}
                />
              ))}
            </Stack>
          </RadioGroup>
        </FormItemValue>
      </Grid2>
    </Box>
  );
};
