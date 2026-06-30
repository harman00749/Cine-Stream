function StatusMessage({ title, text }) {
  return (
    <div className="status-message" role="status">
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  )
}

export default StatusMessage
