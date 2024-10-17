import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskUpdateModal = ({ task, token, onClose, onUpdate }) => {
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  useEffect(() => {
    setUpdatedTask({ ...task });
  }, [task]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/tasks/${task._id}`,
        updatedTask,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  return (
    <div className="modal">
      <h3>Update Task</h3>
      <label>Title:</label>
      <input
        type="text"
        value={updatedTask.title}
        onChange={(e) =>
          setUpdatedTask({ ...updatedTask, title: e.target.value })
        }
      />
      <label>Description:</label>
      <input
        type="text"
        value={updatedTask.description}
        onChange={(e) =>
          setUpdatedTask({ ...updatedTask, description: e.target.value })
        }
      />
      <label>Status:</label>
      <select
        value={updatedTask.status}
        onChange={(e) =>
          setUpdatedTask({ ...updatedTask, status: e.target.value })
        }
      >
        <option value="en cours">En Cours</option>
        <option value="terminée">Terminée</option>
        <option value="nouvelle">Nouvelle</option>{" "}
        {/* Add your additional option */}
      </select>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default TaskUpdateModal;
