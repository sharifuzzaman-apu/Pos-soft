'use client';

import { useState } from 'react';

export default function Tabs({
  tabs = [],
  defaultTab = 0,
  onChange,
  className = '',
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) onChange(index);
  };

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`px-4 py-2 font-medium text-sm transition-all duration-200 border-b-2 ${
              activeTab === index
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">{tabs[activeTab]?.content}</div>
    </div>
  );
}
