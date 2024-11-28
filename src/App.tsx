import React, { useState } from "react";
import { ReportList } from "./views/ReportList";

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    "underEvaluation",
    "complaintIgnored",
    "soundRemoved",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex space-x-0">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm font-medium border border-gray-700 bg-gray-800 hover:bg-gray-700
              ${
                selectedCategory === category
                  ? "bg-blue-400 text-white"
                  : "text-gray-300"
              }
              ${index === 0 ? "rounded-l-lg" : ""}
              ${index === categories.length - 1 ? "rounded-r-lg" : ""}
              ${index > 0 && "border-l-0"}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-8 w-full max-w-4xl">
        <ReportList category={selectedCategory} />
      </div>
    </div>
  );
};

export default App;
