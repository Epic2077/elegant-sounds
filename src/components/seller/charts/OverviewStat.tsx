"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { value: "4000$", month: "January", Sale: 186 },
  { value: "2500$", month: "February", Sale: 305 },
  { value: "1000$", month: "March", Sale: 237 },
  { value: "500$", month: "April", Sale: 73 },
  { value: "150$", month: "May", Sale: 209 },
  { value: "0$", month: "June", Sale: 214 },
  { value: "2000$", month: "July", Sale: 158 },
  { value: "3500$", month: "August", Sale: 265 },
  { value: "1500$", month: "September", Sale: 196 },
  { value: "800$", month: "October", Sale: 134 },
  { value: "1200$", month: "November", Sale: 178 },
  { value: "3000$", month: "December", Sale: 289 },
];

const chartConfig = {
  Sale: {
    label: "Sale",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function OverviewStat() {
  return (
    <Card className="w-[813px] h-[440px]">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Year 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Sale" fill="var(--color-Sale)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
