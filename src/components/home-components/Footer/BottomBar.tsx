"use client";

import { LinkPreview } from "@/components/ui/link-preview";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const BottomBar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center w-full justify-between gap-4 md:gap-7">
      <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-center">
        <h6 className="text-sm text-muted-foreground">
          Copyright &copy; 3legant. All rights reserved
        </h6>
        <h6 className="text-sm text-muted-foreground">Made by Ashkan2077</h6>
        <h6 className="text-sm text-white">Privacy Policy</h6>
        <h6 className="text-sm text-white">Terms of Use</h6>
      </div>
      <div className="flex gap-6">
        <Link href="#">
          <InstagramLogoIcon className="w-6 h-6 text-white" />
        </Link>
        <LinkPreview url="https://github.com/Epic2077">
          <GitHubLogoIcon className="w-6 h-6 text-white" />
        </LinkPreview>
        <LinkPreview url="https://www.linkedin.com/in/mohammadhosseinsadeghi/">
          <LinkedInLogoIcon className="w-6 h-6 text-white" />
        </LinkPreview>
      </div>
    </div>
  );
};

export default BottomBar;
