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
    <div className="flex items-center w-full justify-between">
      <div className="flex gap-7">
        <h6 className="text-sm text-muted-foreground">
          Copyright &copy; 3legant. All rights reserved
        </h6>
        <h6 className="text-sm text-muted-foreground">Made by Ashkan2077</h6>
        <h6 className="text-sm">Privacy Policy</h6>
        <h6 className="text-sm">Terms of Use</h6>
      </div>
      <div className="flex gap-6">
        <Link href="#">
          <InstagramLogoIcon className="w-6 h-6" />
        </Link>
        <LinkPreview url="https://github.com/Epic2077">
          <GitHubLogoIcon className="w-6 h-6" />
        </LinkPreview>
        <Link href="#">
          <LinkedInLogoIcon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
