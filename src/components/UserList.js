// src/components/UserList.js
import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul className='user-list'>
        {users.map((user) => (
          <li key={user.id} className='user-row'>
            <span className="user-id">{user.id}</span>
            <span className="user-info">{user.name} — {user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
