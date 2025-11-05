import React, { useState, useEffect } from "react";

function FormProfile({ onSubmit, initialData = {} }) {
  const [userId, setUserId] = useState(initialData.userId || "");
  const [bio, setBio] = useState(initialData.bio || "");
  const [readingHistory, setReadingHistory] = useState(
    initialData.readingHistory || []
  );

  useEffect(() => {
    if (!initialData) return;
    setUserId(initialData.userId || "");
    setBio(initialData.bio || "");
    setReadingHistory(initialData.readingHistory || []);
  }, [
    initialData?.userId,
    initialData?.bio,
    JSON.stringify(initialData?.readingHistory || []),
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ userId: parseInt(userId), bio, readingHistory });
    setUserId("");
    setBio("");
    setReadingHistory([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          disabled={!!initialData.userId}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData.userId ? "Update Profile" : "Create Profile"}
      </button>
    </form>
  );
}

export default FormProfile;
