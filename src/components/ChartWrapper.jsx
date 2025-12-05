import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function ChartWrapper({ title, data, dataKey }) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <h4>{title}</h4>
        <p>No data available</p>
      </div>
    );
  }

  // Format time → "02:30 PM"
  const formatTime = (val) =>
    new Date(val).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="chart-card">
      <h4>{title}</h4>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis
            dataKey="time"
            tickFormatter={formatTime}
            minTickGap={35}
            tick={{ fontSize: 12, fill: "#444" }}
          />

          <YAxis tick={{ fontSize: 12, fill: "#444" }} />

          <Tooltip
            labelFormatter={formatTime}
          />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#1976d2"
            strokeWidth={3}
            dot={{ r: 5, fill: "white", stroke: "#1976d2", strokeWidth: 2 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
