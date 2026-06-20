import axios from "axios";

function TaskCard({ task, fetchTasks }) {
  const deleteTask = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${task._id}`
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async () => {
    const newTitle = prompt(
      "Enter New Title",
      task.title
    );

    if (!newTitle) return;

    const newDescription = prompt(
      "Enter New Description",
      task.description
    );

    const newStatus = prompt(
      "Pending / In Progress / Completed",
      task.status
    );

    const newPriority = prompt(
      "Low / Medium / High",
      task.priority
    );

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          title: newTitle,
          description: newDescription,
          status: newStatus,
          priority: newPriority,
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>{task.title}</h2>

      <p>{task.description}</p>

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      <p>
        <strong>Priority:</strong> {task.priority}
      </p>

      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "Not Set"}
      </p>

      <button
        onClick={editTask}
        style={{
          background: "green",
          color: "white",
          padding: "10px",
          border: "none",
          marginRight: "10px",
          cursor: "pointer",
        }}
      >
        Edit
      </button>

      <button
        onClick={deleteTask}
        style={{
          background: "red",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;