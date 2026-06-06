import React from "react";
import { useState, useEffect, useActionState } from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const [tasks, settasks] = useState([]);
  const [users, setusers] = useState([]);
  const [usertable, setusertable] = useState("");
  const [addOrEditTask, setAddOrEditTask] = useState("add task");
  const [message, createTaskAction, isPending] = useActionState(createTask, "");
  const [editTaskData, editTaskAction, isPendingEdit] = useActionState(
    updateTask,
    "",
  );
  const [editTaskId, seteditTaskId] = useState(null);

  // task delete function
  async function deleteTask(id) {
    const res = await fetch(`http://127.0.0.1:8000/deletetask/${id}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      settasks((prev) => prev.filter((task) => task.id !== id));
    }
  }

  // task create function
  async function createTask(_, formdata) {
    const data = Object.fromEntries(formdata.entries());
    const res = await fetch("http://127.0.0.1:8000/createtask/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resdata = await res.json();
    settasks((prev) => [...prev, resdata.data]);
    resdata.data
      ? alert("Task created successfully")
      : alert("Failed to create task");
  }

  // fetch tasks and users on component mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/getusers/")
      .then((response) => response.json())
      .then((data) => {
        settasks(data.tasks);
        setusers(data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // filter tasks
  const filteredTasks =
    usertable === ""
      ? tasks
      : tasks.filter((task) => task.status === usertable);

  // task update function
  async function updateTask(_, formdata) {
    const data = Object.fromEntries(formdata.entries());
    const res = await fetch(
      `http://127.0.0.1:8000/updatetask/${editTaskId.id}/`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const resdata = await res.json();
    resdata.data
      ? alert("Task updated successfully")
      : alert("Failed to update task");
    // update local state with edited task and exit edit mode
    settasks((prev) =>
      prev.map((t) => (t.id === resdata.data.id ? resdata.data : t)),
    );
    seteditTaskId(null);
  }
  // dashboard UI
  return (
    <div className="bg-light">
      <nav className="navbar navbar-dark bg-dark px-4">
        <h1 className="navbar-brand" to="/login">
          {localStorage.getItem("username")}
        </h1>

        <NavLink className="btn btn-outline-light" to="/login">
          Logout
        </NavLink>
      </nav>

      <div className="container mt-4">
        {/* cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Total Tasks</h5>
              <h2>{tasks.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Completed</h5>

              <h2>
                {tasks.filter((task) => task.status === "completed").length}
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Pending</h5>

              <h2>
                {tasks.filter((task) => task.status === "pending").length}
              </h2>
            </div>
          </div>
        </div>

        {/* add task and edit task */}
        <div className="card shadow-sm p-4 mb-4">
          <h4 className="mb-3">
            {editTaskId === null ? "Add Task" : "Edit Task"}{" "}
          </h4>
          {editTaskId === null ? (
            <form action={createTaskAction}>
              <div className="row g-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Task title"
                    name="title"
                  />
                </div>

                <div className="col-md-4">
                  <select className="form-select" name="assigned_user">
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <select className="form-select" name="priority">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="col-12">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Task description"
                    name="description"
                  ></textarea>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-dark">
                    {isPending ? "Adding..." : "Create Task"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form action={editTaskAction}>
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={editTaskId.title}
                    name="title"
                  />
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    name="status"
                    defaultValue={editTaskId.status}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    name="priority"
                    defaultValue={editTaskId.priority}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="col-12 mt-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    defaultValue={editTaskId.description}
                    name="description"
                  ></textarea>
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary">
                    Update Task
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* task table */}
        <div className="card shadow-sm p-4">
          <div className="d-flex justify-content-between mb-3">
            <h4>Task List</h4>

            <select
              className="form-select w-auto"
              onChange={(e) => setusertable(e.target.value)}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No tasks found
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>

                    <td>{task.assigned_user.username}</td>

                    <td>
                      <span
                        className={`badge ${
                          task.status === "pending"
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          task.priority === "high"
                            ? "bg-danger"
                            : task.priority === "medium"
                              ? "bg-warning"
                              : "bg-success"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          console.log(task);
                          seteditTaskId(task);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
