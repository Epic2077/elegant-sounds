import LeftToRightFade from "@/widget/animations/leftToRightFade-Animation";
import React from "react";
import { Bento } from "./BentoGrid";
import Header4 from "../Header4";

const Collection = () => {
  return (
    <div className="flex flex-col gap-12">
      <LeftToRightFade>
        <Header4 title="Shop Collection" />
      </LeftToRightFade>
      <div className=" px-32 ">
        <Bento />
      </div>
    </div>
  );
};

export default Collection;
