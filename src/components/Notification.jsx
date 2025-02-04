
import PropTypes from 'prop-types'

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

  if (!message) {
    return null
  }

  return (
    <div style={notificationStyles}>{message.text}</div>
  ) 
}

Notification.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    success: PropTypes.bool
  })
}
export default Notification
