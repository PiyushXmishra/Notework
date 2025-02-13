

import { Pie, PieChart, Label } from "recharts"
import type { LabelProps } from "recharts"
import { ChartPie } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { useEffect, useState } from "react"
import React from "react"
import { useAuthContext } from "../../hooks/useAuth";

interface Activity {
  genre: string[]
}

interface ChartDataItem {
  topic: string
  visitors: number
  fill: string
}

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

const colorPalette = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export default function BarChartComponent() {
  const [chartData, setChartData] = useState<ChartDataItem[]>([])
  const [chartConfig, setChartConfig] = useState<ChartConfig>({})
  const {activity}=useAuthContext()
  useEffect(() => {
    const fetchActivityData = () => {
      const activityData = sessionStorage.getItem("activity")
      if (activityData) {
        const activity: Activity = JSON.parse(activityData)

        const topicCounts: { [key: string]: number } = {}
        activity.genre.forEach((topic) => {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1
        })

        const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1])

        // Take top 3 topics
        const top3Topics = sortedTopics.slice(0, 4)

        // Calculate the sum of other topics
        const otherCount = sortedTopics.slice(4).reduce((sum, [, count]) => sum + count, 0)

        const newChartData: ChartDataItem[] = [
          ...top3Topics.map(([topic, count], index) => ({
            topic,
            visitors: count,
          fill: colorPalette[index],
          })),
          {
            topic: "Other",
            visitors: otherCount,
            fill: `var(--color-other)`,
          },
        ]

        const newChartConfig: ChartConfig = {
          ...Object.fromEntries(
            top3Topics.map(([topic], index) => [
              topic,
              {
                label: topic,
                color: colorPalette[index],
              },
            ]),
          ),
          Other: {
            label: "Other",
            color: colorPalette[3],
          },
        }

        setChartData(newChartData)
        setChartConfig(newChartConfig)
      }
    }

    fetchActivityData()
  }, [])

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  if (chartData.length === 0) {
    return <div>No activity data available</div>
  }

  return (
    <Card className=" w-full flex-col border-none justify-center items-center mb-24 py-6 ">
      <CardHeader className="items-center pb-0 ">
        <CardTitle className="dark:text-white text-3xl ">Your Interests & Asked Topics</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 lg:mt-20 md:mt-15 mt-12">
     { !activity?.heading[0] ? <div className="flex flex-row justify-center items-center gap-8"><ChartPie className="h-28 w-32 dark:text-white"/>
     <div className="flex flex-col">
     <p className="dark:text-white lg:text-xl md:text-lg ">Analysis of your interested topics will show up here as soon as </p>
     <p className="dark:text-white lg:text-xl md:text-lg "> you create some summaries on <b className="font-bold">Notework</b>.</p>
     </div>
     </div>  : <ChartContainer config={chartConfig} className="w-full mx-auto aspect-square sm:h-[600px] h-[700px] ">
        <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="topic"  innerRadius={90} 
               strokeWidth={5}>
                <Label
                  content={(props: LabelProps) => {
                    const { viewBox } = props
                    const centerX = viewBox?.cx ?? 0
                    const centerY = viewBox?.cy ?? 0
                    return (
                      <g>
                        <text
                          x={centerX}
                          y={centerY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-foreground dark:fill-white font-bold"
                          fontSize="clamp(16px, 4vw, 24px)"
                        >
                          {totalVisitors.toLocaleString()}
                        </text>
                        <text
                          x={centerX}
            y={centerY + 25}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-muted-foreground dark:fill-white sm:text-2xl font-bold"
                          fontSize="clamp(12px, 3vw, 18px)"
                        >
                          Prompts
                        </text>
                      </g>
                    )
                  }}
                />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="topic" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center dark:text-white text-lg"
            />
          </PieChart>
        </ChartContainer>}
      </CardContent>
      <CardFooter />
    </Card>
  )
}

