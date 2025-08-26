import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function edashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskStatusCount, setTaskStatusCount] = useState({ pending: 0, "in-progress": 0, completed: 0 });
  
  const COLORS = ["#FFBB28", "#0088FE", "#00C49F"];

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/tasks", {
        headers: { Authorization: token },
      });
      setTasks(res.data);
      // Count task statuses for chart
      const statusCount = { pending: 0, "in-progress": 0, completed: 0 };
      res.data.forEach(task => statusCount[task.status]++);
      setTaskStatusCount(statusCount);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTaskStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, { status }, {
        headers: { Authorization: token },
      });
      fetchTasks(); // Refresh tasks
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const data = [
    { name: "Pending", value: taskStatusCount.pending },
    { name: "In Progress", value: taskStatusCount["in-progress"] },
    { name: "Completed", value: taskStatusCount.completed },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-5">Employee Dashboard</h1>

      {/* Profile & Summary */}
      <div className="flex flex-col md:flex-row gap-5 mb-10">
        <div className="bg-white p-5 rounded shadow flex-1">
          <h2 className="text-xl font-semibold mb-3">Your Profile</h2>
          <p><span className="font-semibold">Name:</span> John Doe</p>
          <p><span className="font-semibold">Role:</span> Employee</p>
          <p><span className="font-semibold">Total Tasks:</span> {tasks.length}</p>
        </div>

        {/* Task Progress Chart */}
        <div className="bg-white p-5 rounded shadow flex-1">
          <h2 className="text-xl font-semibold mb-3">Task Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Deadline</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.description}</td>
                <td className="p-2">{new Date(task.deadline).toLocaleDateString()}</td>
                <td className="p-2 capitalize">{task.status}</td>
                <td className="p-2 flex gap-2">
                  {task.status !== "completed" && (
                    <>
                      {task.status !== "in-progress" && (
                        <button
                          onClick={() => updateTaskStatus(task.id, "in-progress")}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Start
                        </button>
                      )}
                      <button
                        onClick={() => updateTaskStatus(task.id, "completed")}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Complete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
