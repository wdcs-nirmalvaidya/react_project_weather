export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs glass-card fade-in">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-btn ${active === tab ? "active" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}
