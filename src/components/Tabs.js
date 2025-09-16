import React from 'react';

const Tabs = ({ tabs, activeKey, onChange }) => {
  return (
    <div className="tabs">
      <div className="tab-list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeKey === tab.key}
            className={activeKey === tab.key ? 'active' : ''}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

