import React from "react";

const StatisticsCards = ({ statistics }) => {
  if (!statistics || statistics.totalBooks === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
        <div className="text-sm text-gray-600 font-medium">Total Books</div>
        <div className="text-2xl font-bold text-gray-800 mt-1">
          {statistics.totalBooks}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
        <div className="text-sm text-gray-600 font-medium">Total Value</div>
        <div className="text-2xl font-bold text-gray-800 mt-1">
          ${statistics.totalValue.toFixed(2)}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
        <div className="text-sm text-gray-600 font-medium">Average Price</div>
        <div className="text-2xl font-bold text-gray-800 mt-1">
          ${statistics.averagePrice.toFixed(2)}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
        <div className="text-sm text-gray-600 font-medium">Total Pages</div>
        <div className="text-2xl font-bold text-gray-800 mt-1">
          {statistics.totalPages.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;

