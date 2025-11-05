import React, { useState, useEffect } from 'react';
import API from '../api';
import FormUser from '../components/FormUser';
import DataList from '../components/DataList';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await API.get('/users');
    setUsers(response.data);
  };

  const addUser = async (userData) => {
    await API.post('/users', userData);
    fetchUsers();
  };

  return (
    <div>
      <h1 className="page-title">Users</h1>
      <div className="card">
        <FormUser onSubmit={addUser} />
      </div>
      <div className="card">
        <DataList data={users} />
      </div>
    </div>
  );
}

export default Users;
