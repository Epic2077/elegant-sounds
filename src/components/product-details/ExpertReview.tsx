"use client";

import { IProduct } from "@/app/api/dashboard/server-api/types";
import { Card, CardContent } from "../ui/card";
import Header4 from "../home-components/Header4";

export function ExpertReview({ products }: { products: IProduct }) {
  return (
    <Card className="w-full mt-20">
      <CardContent className="w-full p-6 rounded-xl">
        <div className="text-center">
          <div className="p-6">
            <Header4 title="Expert Review" />
            <div className="w-full h-[2px] bg-muted my-10 mt-5"></div>
            <p className="text-base text-center leading-7">
              {products.expert_review !== ""
                ? products.expert_review
                : "No Review Available"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
