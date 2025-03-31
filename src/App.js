import axios from 'axios';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchUser = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (err) {
      setError('Nenhum Perfil foi encontrado com esse nome de usuário. Tente novamente');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        <FaGithub className="github-icon" />
        Perfil Github
      </h1>
      
      <form onSubmit={searchUser} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite um usuário do Github"
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : '🔍'}
        </button>
      </form>
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      {userData && (
        <div className="profile-card">
          <div className="profile-header">
            <img 
              src={userData.avatar_url} 
              alt={userData.name || userData.login} 
              className="profile-avatar"
            />
            <h2 className="profile-name">
              {userData.name || userData.login}
            </h2>
            {userData.login && (
              <a 
                href={`https://github.com/${userData.login}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-username"
              >
                @{userData.login}
              </a>
            )}
          </div>
          
          {userData.bio && (
            <div className="profile-bio">
              <p>{userData.bio}</p>
            </div>
          )}
          
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">{userData.public_repos || 0}</span>
              <span className="stat-label">Repositórios</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userData.followers || 0}</span>
              <span className="stat-label">Seguidores</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userData.following || 0}</span>
              <span className="stat-label">Seguindo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;