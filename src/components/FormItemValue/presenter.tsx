import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ComponentProps } from "react";
import { FormItemValue } from ".";

type Props = ComponentProps<typeof FormItemValue>;

export const FormItemValuePresenter = ({
  label,
  children,
  md = {
    label: 2,
    value: 10,
  },
}: Props) => {
  return (
    <>
      <Grid2 md={md.label} xs={12} display="flex" alignItems="center">
        <Typography>{label}</Typography>
      </Grid2>
      <Grid2 md={md.value} xs={12}>
        {children}
      </Grid2>
    </>
  );
};
