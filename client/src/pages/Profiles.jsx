import React, { useState, useEffect } from "react";
import API from "../api";
import FormProfile from "../components/FormProfile";

function Profiles() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
  };

  const fetchProfile = async (id) => {
    if (!id) return;
    try {
      const response = await API.get(`/profiles/${id}`);
      setProfile(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement du profil :", error);
      setProfile(null);
    }
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    fetchProfile(userId);
  };

  const createProfile = async (profileData) => {
    try {
      await API.post("/profiles", { ...profileData, userId: selectedUserId });
      alert("Profil créé avec succès !");
      fetchProfile(selectedUserId);
    } catch (error) {
      console.error("Erreur lors de la création du profil :", error);
      alert("Erreur lors de la création du profil.");
    }
  };

  const updateProfile = async (id, profileData) => {
    try {
      await API.put(`/profiles/${id}`, profileData);
      alert("Profil mis à jour avec succès !");
      fetchProfile(id);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      alert("Erreur lors de la mise à jour du profil.");
    }
  };

  return (
    <div>
      <h1 className="page-title">Profiles</h1>

      <div className="card">
        <h2>Sélectionner un utilisateur</h2>
        <div className="form-group">
          <select onChange={handleUserChange} value={selectedUserId}>
            <option value="">-- Choisir un utilisateur --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} (ID: {user.id})
              </option>
            ))}
          </select>
        </div>

        {profile && (
          <div>
            <h3>
              Profil de {users.find((u) => u.id === profile._id)?.name}
            </h3>
            <p>
              <strong>Préférences :</strong> {profile.preferences.join(", ")}
            </p>
            <div>
              <strong>Historique de lecture :</strong>
              <ul>
                {profile.history.map((item) => (
                  <li key={item.book}>
                    {item.book} (lu {item.rating} fois)
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <h3>Mettre à jour le profil</h3>
            <FormProfile
              onSubmit={(data) => updateProfile(selectedUserId, data)}
              initialData={profile}
            />
          </div>
        )}

        {!profile && selectedUserId && (
          <div>
            <p>Aucun profil trouvé pour cet utilisateur.</p>
            <h3>Créer un profil</h3>
            <FormProfile
              onSubmit={createProfile}
              initialData={{ userId: selectedUserId }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profiles;