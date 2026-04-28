import { useState, useEffect } from "react";
import "../styles/notification.css";

function TopNotification() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/tpo/notifications")
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {/* 🔔 Bell Icon */}
      <div className="bell-icon" onClick={() => setOpen(!open)}>
        🔔
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="notification-box">
          <h4>Notifications</h4>

          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="notification-item">
                <strong>{n.title}</strong>
                <p>{n.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default TopNotification;