import { useState } from 'react'
import NotificationCard from './components/NotificationCard'
import './App.css'

function App() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'placements',
      message: 'Google is visiting campus for placements on Dec 15',
      timestamp: '2024-12-10T10:00:00',
      read: false,
    },
    {
      id: '2',
      type: 'results',
      message: 'Your semester results are now available',
      timestamp: '2024-12-10T09:30:00',
      read: false,
    },
    {
      id: '3',
      type: 'placements',
      message: 'Microsoft internship drive - Apply now',
      timestamp: '2024-12-09T15:00:00',
      read: true,
    },
    {
      id: '4',
      type: 'events',
      message: 'Campus Tech Fest starting tomorrow',
      timestamp: '2024-12-09T12:00:00',
      read: false,
    },
    {
      id: '5',
      type: 'results',
      message: 'Your assignment has been graded',
      timestamp: '2024-12-08T18:00:00',
      read: true,
    },
    {
      id: '6',
      type: 'events',
      message: 'Annual sports day registration open',
      timestamp: '2024-12-08T10:00:00',
      read: false,
    },
  ])

  const [filter, setFilter] = useState('all')
  const [topN, setTopN] = useState(5)

  // count unread messages
  let unreadCount = 0
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].read === false) {
      unreadCount = unreadCount + 1
    }
  }

  // sort notifications - placements first, then results, then events
  function sortNotifications(list) {
    let sorted = []
    for (let i = 0; i < list.length; i++) {
      sorted.push(list[i])
    }

    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        let priorityA = 3
        let priorityB = 3

        if (sorted[i].type === 'placements') priorityA = 1
        if (sorted[i].type === 'results') priorityA = 2
        if (sorted[i].type === 'events') priorityA = 3

        if (sorted[j].type === 'placements') priorityB = 1
        if (sorted[j].type === 'results') priorityB = 2
        if (sorted[j].type === 'events') priorityB = 3

        if (priorityA > priorityB) {
          let temp = sorted[i]
          sorted[i] = sorted[j]
          sorted[j] = temp
        }
      }
    }

    return sorted
  }

  // get list to show on screen
  let listToShow = []

  if (filter === 'all') {
    listToShow = sortNotifications(notifications)
  } else {
    let unreadList = []
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].read === false) {
        unreadList.push(notifications[i])
      }
    }
    listToShow = sortNotifications(unreadList)

    let limitedList = []
    for (let i = 0; i < topN && i < listToShow.length; i++) {
      limitedList.push(listToShow[i])
    }
    listToShow = limitedList
  }

  function handleMarkAllRead() {
    let updated = []
    for (let i = 0; i < notifications.length; i++) {
      updated.push({
        id: notifications[i].id,
        type: notifications[i].type,
        message: notifications[i].message,
        timestamp: notifications[i].timestamp,
        read: true,
      })
    }
    setNotifications(updated)
  }

  return (
    <div className="main-box">
      <div className="top-header" style={{ backgroundColor: 'blue', color: 'white', padding: '15px' }}>
        <h1>Campus Notifications</h1>
        <p>My College Notification App</p>
        <div className="red-circle">{unreadCount}</div>
      </div>

      <div className="filter-box">
        <p><b>Filter:</b></p>
        <button
          className={filter === 'all' ? 'active-btn' : 'normal-btn'}
          onClick={function () { setFilter('all') }}
        >
          All
        </button>
        <button
          className={filter === 'unread' ? 'active-btn' : 'normal-btn'}
          onClick={function () { setFilter('unread') }}
          style={{ marginLeft: '10px' }}
        >
          Unread Only
        </button>

        {filter === 'unread' && (
          <div style={{ marginTop: '15px' }}>
            <p>Show Top {topN} Messages</p>
            <input
              type="range"
              min="1"
              max="20"
              value={topN}
              onChange={function (e) { setTopN(Number(e.target.value)) }}
            />
          </div>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <button className="blue-btn" onClick={handleMarkAllRead}>
          Mark All as Read
        </button>
        {filter === 'unread' && (
          <span style={{ marginLeft: '10px', fontSize: '14px' }}>
            showing top {topN} unread
          </span>
        )}
      </div>

      <div>
        {listToShow.length === 0 && (
          <div className="empty-box">
            <p>No notifications found!!!</p>
          </div>
        )}

        {listToShow.map(function (item) {
          return (
            <NotificationCard
              key={item.id}
              notification={item}
            />
          )
        })}
      </div>

      <div className="bottom-text">
        <p>
          Total: {notifications.length} | Showing: {listToShow.length} | Unread: {unreadCount}
        </p>
      </div>
    </div>
  )
}

export default App
