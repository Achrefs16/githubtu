import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskUpdateModal from "./TaskUpdateModal";

import TaskCreateModal from "./TaskCreateModal";
import "../App.css";
const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks", {
          headers: {
            Authorization: token,
          },
        });

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        // Redirect to login on error
        // history.push('/login'); // Uncomment if you're using useHistory
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleUpdateClick = (task) => {
    setSelectedTask(task);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
        headers: {
          Authorization: token,
        },
      });

      // Refresh the task list after deletion
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <button
        className="button"
        onClick={handleCreateClick}
      >
        Create Task
      </button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="task-item"
          >
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <div className="task-buttons">
              <button
                className="update-button"
                onClick={() => handleUpdateClick(task)}
              >
                Update
              </button>
              <button onClick={() => handleDeleteClick(task._id)}>
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showUpdateModal && (
        <div className="overlay">
          <div className="modal">
            <TaskUpdateModal
              task={selectedTask}
              token={token}
              onClose={() => {
                setShowUpdateModal(false);
                setSelectedTask(null);
              }}
              onUpdate={(updatedTask) => {
                const updatedTasks = tasks.map((task) =>
                  task._id === updatedTask._id ? updatedTask : task
                );
                setTasks(updatedTasks);
              }}
            />
          </div>
        </div>
      )}
      {showCreateModal && (
        <div className="overlay">
          <div className="modal">
            <TaskCreateModal
              token={token}
              onClose={() => setShowCreateModal(false)}
              onCreate={(newTask) => {
                setTasks([...tasks, newTask]);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
