


"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart"
const chartData = [
  { topic: "Cricket", visitors: 275, fill: "var(--color-chrome)" },
  { topic: "Movie", visitors: 200, fill: "var(--color-safari)" },
  { topic: "Science", visitors: 287, fill: "var(--color-firefox)" },
  { topic: "Calculus", visitors: 173, fill: "var(--color-edge)" },
  { topic: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  cricket: {
    label: "Cricket",
    color: "hsl(var(--chart-1))",
  },
  movie: {
    label: "Movie",
    color: "hsl(var(--chart-2))",
  },
  science: {
    label: "Science",
    color: "hsl(var(--chart-3))",
  },
  calculus: {
    label: "Calculus",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function BarChartComponent() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex-col border-none justify-center items-center  ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="dark:text-white text-3xl">Your Interests & Asked Topics</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]  "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="topic"
              innerRadius={80}
              strokeWidth={5}

            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground dark:fill-white text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 32}
                          className="fill-muted-foreground dark:fill-white  text-lg"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm dark:text-white">
        <div className="flex items-center gap-2  leading-none lg:text-3xl md:text-2xl sm:text-xl text-xl font-bold">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground lg:text-xl md:text-lg sm:text-lg dark:text-gray-300 text-gray-700">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}



