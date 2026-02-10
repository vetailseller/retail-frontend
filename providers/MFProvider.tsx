//@ts-ignore
import "tailwindcss/tailwind.css";

import { ReactNode } from "react";

const MFProvider = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default MFProvider;
