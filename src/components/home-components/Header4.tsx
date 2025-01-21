import LeftToRightFade from "@/widget/animations/leftToRightFade-Animation";
import React from "react";

interface Header4Props {
  title: string;
}

const Header4: React.FC<Header4Props> = ({ title }) => {
  return (
    <LeftToRightFade>
      <h2 className="text-[40px] font-medium">{title}</h2>
    </LeftToRightFade>
  );
};

export default Header4;
