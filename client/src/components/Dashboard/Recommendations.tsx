// Recommendations.tsx
import React from "react";
import { LightBulbIcon, RocketLaunchIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"; // Example icons from Heroicons

interface Recommendation {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const recommendations: Recommendation[] = [
  {
    title: "Exploring Generative AI",
    description: "Learn about the latest advancements in generative AI and how to leverage them.",
    icon: <LightBulbIcon className="h-6 w-6 text-gray-500" />,
  },
  {
    title: "Automating Workflows",
    description: "Discover how to use AI to streamline your daily tasks and boost productivity.",
    icon: <RocketLaunchIcon className="h-6 w-6 text-gray-500" />,
  },
  {
    title: "Responsible AI Development",
    description: "Learn about the ethical considerations and best practices for AI development.",
    icon: <ShieldCheckIcon className="h-6 w-6 text-gray-500" />,
  },
];

const Recommendations: React.FC = () => {
  return (
    <div className="max-w-full flex flex-col  gap-8 p-4 ml-4 dark:bg-colorGradient2">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Recommendations</h2>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white py-4 px-4  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-colorGradient1 "
          >
            <div className="flex items-start space-x-4  ">
              <div className="p-2 rounded-full bg-gray-100 ">{rec.icon}</div>
              <div>
                <h3 className="text-lg font-semibold dark:text-white">{rec.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-bold py-2">{rec.description}</p>
              </div>
            </div>
            <button className="text-sm font-semibold text-black border border-gray-400 hover:bg-white rounded p-2 dark:text-white dark:hover:text-black">
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
