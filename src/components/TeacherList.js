import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8090/api/teachers';

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: '', subject: '', level: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teachers
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch teachers');
      const data = await res.json();
      setTeachers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to save teacher');

      setForm({ name: '', subject: '', level: '' });
      setEditingId(null);
      fetchTeachers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (teacher) => {
    setForm({
      name: teacher.name,
      subject: teacher.subject,
      level: teacher.level,
    });
    setEditingId(teacher.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete teacher');
      fetchTeachers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Teacher Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="level"
            value={form.level}
            onChange={handleChange}
            placeholder="Level (e.g., Junior, Senior)"
            required
            className="px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3"
        >
          {editingId ? 'Update' : 'Add'} Teacher
        </button>
      </form>

      {/* Loading/Error */}
      {loading && <p className="text-gray-500">Loading teachers...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Level</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="text-center">
                <td className="px-4 py-2 border">{teacher.id}</td>
                <td className="px-4 py-2 border">{teacher.name}</td>
                <td className="px-4 py-2 border">{teacher.subject}</td>
                <td className="px-4 py-2 border">{teacher.level}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
