import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area
} from "recharts";

export default function ChartWrapper({ title, data, dataKey }) {
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );


  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.getAttribute("data-theme") === "dark");
    });

    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <h4>{title}</h4>
        <p>No data available</p>
      </div>
    );
  }

  const formatTime = (val) =>
    new Date(val).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });


  const darkBG = "#020d1aff";            
  const darkLine = "#edeef5ff";          
  const darkGrid = "rgba(248, 242, 242, 0.2)";
  const darkAxis = "#f4f3faff";          
  const darkTooltipBG = "#004a9a";
  const darkTooltipText = "#06021dff";

  const lightLine = "#1976d2";
  const lightAreaFill = "#050220ff";
  const lightGrid = "rgba(0,0,0,0.1)";
  const lightAxis = "#444";
  const lightTooltipBG = "#040216ff";
  const lightTooltipText = "#111";

  return (
    <div
      className="chart-card"
      style={{
        background: isDark ? darkBG : "white",
        borderRadius: "12px",
        padding: "20px",
        transition: "0.3s",
      }}
    >
      <h4 style={{ color: isDark ? "white" : "#111" }}>{title}</h4>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          

          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? darkGrid : lightGrid} />


          <XAxis
            dataKey="time"
            tickFormatter={formatTime}
            minTickGap={35}
            tick={{ fontSize: 12, fill: isDark ? darkAxis : lightAxis }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: isDark ? darkAxis : lightAxis }}
            axisLine={false}
            tickLine={false}
          />


          <Tooltip
            labelFormatter={formatTime}
            contentStyle={{
              background: isDark ? darkTooltipBG : lightTooltipBG,
              border: "none",
              borderRadius: "8px",
              color: isDark ? darkTooltipText : lightTooltipText,
            }}
            itemStyle={{
              color: isDark ? darkTooltipText : lightTooltipText,
            }}
          />


          {!isDark && (
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="none"
              fill={lightAreaFill}
              fillOpacity={0.4}
            />
          )}


          {isDark && (
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="none"
              fill={darkBG}
              fillOpacity={1}
            />
          )}

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={isDark ? darkLine : lightLine}
            strokeWidth={3}
            dot={{
              r: 5,
              fill: isDark ? darkLine : "#ffffff",
              stroke: isDark ? darkLine : lightLine,
              strokeWidth: 2,
            }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
