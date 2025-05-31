import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import CursosList from "./CursosList";
import CursoForm from "./CursoForm";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("list");
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEdit = (curso) => {
    setSelectedCurso(curso);
    setActiveTab("form");
  };

  const handleCreate = () => {
    setSelectedCurso(null);
    setActiveTab("form");
  };

  const handleSave = () => {
    setSelectedCurso(null);
    setActiveTab("list");
    setRefreshTrigger((prev) => prev + 1); // Trigger refresh
  };

  const handleCancel = () => {
    setSelectedCurso(null);
    setActiveTab("list");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Sistema de Gestión Académica</h1>
          <div className="user-info">
            <span>Bienvenido: {user?.email}</span>
            <button onClick={logout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-nav">
          <button
            className={`nav-btn ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            Lista de Cursos
          </button>
          <button className="nav-btn create-btn" onClick={handleCreate}>
            + Nuevo Curso
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === "list" && (
            <CursosList onEdit={handleEdit} refreshTrigger={refreshTrigger} />
          )}
          {activeTab === "form" && (
            <CursoForm
              curso={selectedCurso}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
