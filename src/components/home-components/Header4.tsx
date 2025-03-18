import LeftToRightFade from "@/widget/animations/leftToRightFade-Animation";
import React from "react";

interface Header4Props {
  title: string;
}

const Header4: React.FC<Header4Props> = ({ title }) => {
  return (
    <LeftToRightFade>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
        {title}
      </h2>
    </LeftToRightFade>
  );
};

export default Header4;
