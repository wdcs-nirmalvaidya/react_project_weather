export default function ErrorBox({ message }) {
  return (
    <div className="error-box glass-card fade-in">
      ❗ {message}
    </div>
  );
}
