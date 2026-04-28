import { useEffect, useState } from "react";

function TPOViewNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/notifications")   // ✅ correct URL
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 30, background: "#f4f7f6", minHeight: "100vh" }}>

      <h2 style={{ textAlign: "center", color: "#0f7c45" }}>
        📩 Sent Notifications
      </h2>

      <div style={{ maxWidth: 700, margin: "20px auto" }}>

        {notifications.length === 0 ? (
          <p style={{ textAlign: "center" }}>No notifications yet</p>
        ) : (
          notifications.map((n) => (
            <div key={n._id} style={{
              background: "#fff",
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
              border: "1.5px solid #0f7c45",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
            }}>
              <h3 style={{ margin: 0 }}>{n.title}</h3>

              <p style={{ margin: "8px 0", color: "#555" }}>
                {n.message}
              </p>

              <div style={{ fontSize: 13, color: "#777" }}>
                <b>Branches:</b> {n.branches.join(", ")}
              </div>

              <div style={{ fontSize: 12, marginTop: 5 }}>
                {new Date(n.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default TPOViewNotifications;