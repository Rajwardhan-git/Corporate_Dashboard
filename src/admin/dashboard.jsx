import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", role: "employee", active: true },
    { id: 2, name: "Jane Smith", role: "employee", active: false },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", description: "Desc 1", deadline: "2025-09-01", assigned_to: 1, status: "pending" },
    { id: 2, title: "Task 2", description: "Desc 2", deadline: "2025-09-03", assigned_to: 2, status: "in-progress" },
    { id: 3, title: "Task 3", description: "Desc 3", deadline: "2025-09-05", assigned_to: 1, status: "completed" },
  ]);

  const [newTask, setNewTask] = useState({ title: "", description: "", deadline: "", assigned_to: "" });

  const COLORS = ["#FBBF24", "#3B82F6", "#10B981"];

  // Task Count
  const taskStatusCount = { pending: 0, "in-progress": 0, completed: 0 };
  tasks.forEach(task => taskStatusCount[task.status]++);

  const data = [
    { name: "Pending", value: taskStatusCount.pending },
    { name: "In Progress", value: taskStatusCount["in-progress"] },
    { name: "Completed", value: taskStatusCount.completed },
  ];

  const handleTaskSubmit = () => {
    if (!newTask.title || !newTask.description || !newTask.deadline || !newTask.assigned_to) return;
    const newId = tasks.length + 1;
    setTasks([...tasks, { ...newTask, id: newId, status: "pending" }]);
    setNewTask({ title: "", description: "", deadline: "", assigned_to: "" });
  };

  const statusColors = {
    pending: "bg-yellow-200 text-yellow-800",
    "in-progress": "bg-blue-200 text-blue-800",
    completed: "bg-green-200 text-green-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-3">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Dashboard</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Employees</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Tasks</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-gray-800"
        >
          Admin Dashboard
        </motion.h1>

        {/* Profile & Chart */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          
          {/* Profile Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-50 p-6 rounded-2xl shadow-lg flex-1"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Profile</h2>
            <p><span className="font-semibold">Name:</span> Admin</p>
            <p><span className="font-semibold">Role:</span> Admin</p>
            <p><span className="font-semibold">Total Employees:</span> {employees.length}</p>
            <p><span className="font-semibold">Total Tasks:</span> {tasks.length}</p>
          </motion.div>

          {/* Chart Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-purple-50 p-6 rounded-2xl shadow-lg flex-1"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Task Status Overview</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
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
          </motion.div>
        </div>

        {/* Assign Task */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-green-50 p-6 rounded-2xl shadow-lg mb-10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Assign New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} className="border p-2 rounded" />
            <input type="text" placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} className="border p-2 rounded" />
            <input type="date" value={newTask.deadline} onChange={e => setNewTask({ ...newTask, deadline: e.target.value })} className="border p-2 rounded" />
            <select value={newTask.assigned_to} onChange={e => setNewTask({ ...newTask, assigned_to: e.target.value })} className="border p-2 rounded">
              <option value="">Select Employee</option>
              {employees.map(emp => (<option key={emp.id} value={emp.id}>{emp.name}</option>))}
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTaskSubmit}
            className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Assign Task
          </motion.button>
        </motion.div>

        {/* Employees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-orange-50 p-6 rounded-2xl shadow-lg mb-10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Employees</h2>
          <ul>
            {employees.map(emp => (
              <motion.li
                whileHover={{ scale: 1.01 }}
                key={emp.id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{emp.name}</span>
                <span className={`px-3 py-1 text-sm rounded-full ${emp.active ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                  {emp.active ? "Active" : "Inactive"}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Tasks Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-indigo-50 p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Tasks</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Assigned To</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <motion.tr
                  whileHover={{ backgroundColor: "#F3F4F6" }}
                  key={task.id}
                  className="border-b"
                >
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{task.description}</td>
                  <td className="p-3">{new Date(task.deadline).toLocaleDateString()}</td>
                  <td className="p-3">{employees.find(emp => emp.id === Number(task.assigned_to))?.name || "N/A"}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-sm rounded-full ${statusColors[task.status]}`}>
                      {task.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
