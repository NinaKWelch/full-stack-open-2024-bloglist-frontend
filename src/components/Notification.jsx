const Notification = ({ message }) => {
  const notificationStyles = {
    border: `1px solid ${message.success ? "green" : "red"}`,
    color: message.success ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyles}>{message.text}</div>
  ) 
}

export default Notification
