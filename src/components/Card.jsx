export default function Card({ title, children }) {
  return (
    <div className="card glass-card fade-in">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-body">{children}</div>
    </div>
  );
}
