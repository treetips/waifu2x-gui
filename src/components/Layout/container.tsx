import { ReactNode } from "react";
import { LayoutPresenter } from ".";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <LayoutPresenter>{children}</LayoutPresenter>;
};
