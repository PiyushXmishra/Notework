import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FileText, Star, Pen } from "lucide-react"

export function UserStats() {
    const [mostFrequent, setMostFrequent] = useState<{ element: string; count: number } | null>(null);

    useEffect(() => {
        // Retrieve array from sessionStorage
        const stringsArray = JSON.parse(sessionStorage.getItem("activity") || "[]");
    
        const findMostFrequentElement = (arr: string[]): { element: string; count: number } | null => {
          if (arr.length === 0) return null;
    
          const frequencyMap: Record<string, number> = {};
    
          // Count occurrences of each element
          arr.forEach((item) => {
            frequencyMap[item] = (frequencyMap[item] || 0) + 1;
          });
    
          // Find the element with the highest frequency
          let maxElement = "";
          let maxCount = 0;
    
          for (const [key, value] of Object.entries(frequencyMap)) {
            if (value > maxCount) {
              maxCount = value;
              maxElement = key;
            }
          }
    
          return { element: maxElement, count: maxCount };
        };
    
        const result = findMostFrequentElement(stringsArray.genre);
        setMostFrequent(result);

    }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-0.5 gap-8 ml-4 mt-8">
      <Card  className="dark:bg-colorGradient1 dark:border-none w-10/12">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold dark:text-white">Your Summaries</CardTitle>
          <Pen className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-white">23</div>
          <p className="text-xs text-muted-foreground dark:text-gray-300">+4 this week</p>
        </CardContent>
      </Card>
      <Card className="dark:bg-colorGradient1 dark:border-none w-10/12">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold dark:text-white ">Total Pdfs</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-white">14</div>
          <p className="text-xs text-muted-foreground dark:text-gray-300">-30 sec from last week</p>
        </CardContent>
      </Card>
      <Card className="dark:bg-colorGradient1 dark:border-none w-10/12">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold dark:text-white">Favorite Category</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
        </CardHeader>
        <CardContent>
       <div className="text-2xl font-bold dark:text-white">{ mostFrequent ?mostFrequent.element: "Technology"}</div>
          
          <p className="text-xs text-muted-foreground dark:text-gray-300">Based on your summaries</p>
        </CardContent>
      </Card>
    </div>
  )
}

