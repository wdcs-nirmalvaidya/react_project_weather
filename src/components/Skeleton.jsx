export default function Skeleton({ height = "20px", width = "100%", style = {} }) {
  return (
    <div
      style={{
        background: "#e0e0e0",
        borderRadius: "6px",
        margin: "6px 0",
        height,
        width,
        animation: "pulse 1.5s infinite",
        ...style
      }}
    />
  );
}
