export default function formatError(message, type) {
  if (message !== null) {
    if (type === "small") {
      return <small className="red">{message}</small>;
    }
  }
}
