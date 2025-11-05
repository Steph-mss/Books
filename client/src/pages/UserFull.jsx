import React, { useState } from 'react';
import API from '../api';

function UserFull() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserFull = async () => {
    try {
      const response = await API.get(`/user-full/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching full user data:", error);
      setUserData(null);
    }
  };

  return (
    <div>
      <h1 className="page-title">Full User Information</h1>
      <div className="card">
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={fetchUserFull} className="btn btn-primary">Fetch Full User</button>
        </div>
      </div>

      {userData && (
        <div className="card">
          <h2>User Details (SQL)</h2>
          <p>ID: {userData.user.id}</p>
          <p>Name: {userData.user.name}</p>
          <p>Email: {userData.user.email}</p>

          <h2>Profile Details (NoSQL)</h2>
          {userData.profile ? (
            <>
              <p>Bio: {userData.profile.bio}</p>
              <p>Reading History: {JSON.stringify(userData.profile.readingHistory)}</p>
            </>
          ) : (
            <p>No profile found for this user.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserFull;
