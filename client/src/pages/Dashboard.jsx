import{ useNavigate }from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate=useNavigate();
  const [users, setUsers] = useState([]);
  const [tasks,setTasks]=useState([]);
  const [search, setSearch] =
  useState("");
  const [statusFilter,
  setStatusFilter] =
  useState("All");
   const totalStudents =
  users.length;

const totalTasks =
  tasks.length;

const completedTasks =
  tasks.filter(
    (task) =>
      task.status ===
      "Completed"
  ).length;

const pendingTasks =
  tasks.filter(
    (task) =>
      task.status ===
      "Pending"
  ).length;
 useEffect(() => {
  const token =
    localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  fetchUsers();
  fetchTasks();
}, []);
  const fetchUsers = async () => {
    try {
      const token =
  localStorage.getItem("token");

const res = await axios.get(
  "http://localhost:5000/api/users",
  {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }
);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTasks = async () => {
  try {
    const token =
  localStorage.getItem("token");

const res = await axios.get(
  "http://localhost:5000/api/tasks",
  {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }
);

    setTasks(res.data);
  } catch (error) {
    console.log(error);
  }
};
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

  return (
    <div className="dashboard-container">
      <div className="welcome-card">
  <h1>Welcome 👋</h1>

  <p>
    Stay updated with campus activities,
    announcements and upcoming events.
  </p>
  <p>
  Total Students:
  {totalStudents}
</p>

<p>
  Total Tasks:
  {totalTasks}
</p>

<p>
  Completed Tasks:
  {completedTasks}
</p>

<p>
  Pending Tasks:
  {pendingTasks}
</p>

  <button
    className="form-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>

      <div className="dashboard-cards">
        <div className="dash-card">
          <h2>📚 Courses</h2>
          <p>5 Active Courses</p>
        </div>

        <div className="dash-card">
          <h2>📢 Announcements</h2>
          <p>3 New Updates</p>
        </div>

        <div className="dash-card">
          <h2>🎉 Events</h2>
          <p>2 Upcoming Events</p>
        </div>

        <div className="dash-card">
          <h2>📝 Assignments</h2>
          <p>4 Pending Tasks</p>
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Announcements</h2>

        <ul>
          <li>📢 Hackathon Registration Open</li>
          <li>🎓 Placement Drive Next Week</li>
          <li>☁️ Cloud Workshop on Friday</li>
        </ul>
      </div>

      <div className="recent-section">
  <h2>Registered Students</h2>

  <input
    type="text"
    placeholder="Search by name or email"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="search-box"
  />

  {users.length === 0 ? (
    <p>No students registered yet.</p>
  ) : (
    users
      .filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          user.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )
      .map((user) => (
        <div
          key={user._id}
          className="student-card"
        >
          <h3>{user.name}</h3>

          <p>{user.email}</p>

          <small>
            Registered on:{" "}
            {new Date(
              user.registrationDate
            ).toLocaleDateString()}
          </small>
        </div>
      ))
  )}
</div>
      <div className="recent-section">
  <h2>Student Tasks</h2>

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }
  >
    <option value="All">
      All
    </option>
    <option value="Pending">
      Pending
    </option>
    <option value="Completed">
      Completed
    </option>
  </select>

  {tasks.length === 0 ? (
    <p>No tasks available.</p>
  ) : (
    tasks
      .filter((task) => {
        if (
          statusFilter === "All"
        ) {
          return true;
        }

        return (
          task.status ===
          statusFilter
        );
      })
      .map((task) => (
        <div
          key={task._id}
          className="student-card"
        >
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            <strong>Status:</strong>{" "}
            {task.status}
          </p>

          <p>
            <strong>Assigned To:</strong>{" "}
            {task.assignedUser}
          </p>
        </div>
      ))
  )}
</div>

    </div>
  );
}

export default Dashboard;