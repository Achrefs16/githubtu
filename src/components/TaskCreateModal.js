import React, { useState } from "react";
import axios from "axios";

const TaskCreateModal = ({ token, onClose, onCreate }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "en cours", // Default status
  });

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        newTask,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      onCreate(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating task:", error.message);
    }
  };

  return (
    <div className="modal">
      <h3>Create Task</h3>
      <label>Title:</label>
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <label>Description:</label>
      <input
        type="text"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
      />
      <label>Status:</label>
      <select
        value={newTask.status}
        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
      >
        <option value="en cours">En Cours</option>
        <option value="terminée">Terminée</option>
        <option value="nouvelle">Nouvelle</option>{" "}
        {/* Add your additional option */}
      </select>
      <button onClick={handleCreate}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default TaskCreateModal;
