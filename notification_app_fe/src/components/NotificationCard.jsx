import './NotificationCard.css'

function NotificationCard(props) {
  let notif = props.notification

  let typeText = 'Other'
  let bgColor = 'lightgray'

  if (notif.type === 'placements') {
    typeText = 'Placements'
    bgColor = 'red'
  } else if (notif.type === 'results') {
    typeText = 'Results'
    bgColor = 'yellow'
  } else if (notif.type === 'events') {
    typeText = 'Events'
    bgColor = 'lightgreen'
  }

  // simple time display
  let timeText = notif.timestamp

  return (
    <div
      className="notif-card"
      style={{
        border: '2px solid black',
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: notif.read ? 'white' : '#fafaf4',
      }}
    >
      <div>
        <span style={{ fontSize: '12px' }}>ID: {notif.id}</span>
        <span
          style={{
            marginLeft: '10px',
            padding: '3px 8px',
            backgroundColor: bgColor,
            border: '1px solid black',
          }}
        >
          {typeText}
        </span>
        {notif.read === false && (
          <span style={{ color: 'red', marginLeft: '10px', fontWeight: 'bold' }}>
            NEW
          </span>
        )}
      </div>

      <p style={{ marginTop: '8px', marginBottom: '5px' }}>{notif.message}</p>
      <small>Time: {timeText}</small>
    </div>
  )
}

export default NotificationCard
