import { ReactNode } from "react";
import { FormItemValuePresenter } from ".";

type Props = {
  label: string;
  children: ReactNode;
  md?: {
    label: number;
    value: number;
  };
};

export const FormItemValue = ({ label, children, md }: Props) => {
  return (
    <FormItemValuePresenter label={label} md={md}>
      {children}
    </FormItemValuePresenter>
  );
};
