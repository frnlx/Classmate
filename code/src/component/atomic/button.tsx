import { ReactNode } from "react";

type prop = {
  children: ReactNode
}

const Button = (p: prop) => {
  return (
    <button type="button" className="">
      {p.children}
    </button>
  );
}
 
export default Button;