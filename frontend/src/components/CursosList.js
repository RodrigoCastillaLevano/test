import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CursosList.css";

// Misma lógica que en AuthContext para detectar la API URL
const getApiUrl = () => {
  // En producción, usar el dominio del backend
  if (window.location.hostname === "frontend.r-c.lat") {
    return "https://backend.r-c.lat";
  }

  // Para desarrollo local, usar la variable de entorno o localhost
  return process.env.REACT_APP_API_URL || "http://localhost:3001";
};

const API_URL = getApiUrl();

const CursosList = ({ onEdit, refreshTrigger }) => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCursos();
  }, [refreshTrigger]);

  const fetchCursos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/cursos`);

      if (response.data.success) {
        setCursos(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cursos:", error);
      setError("Error al cargar los cursos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, codigo) => {
    if (window.confirm(`¿Estás seguro de eliminar el curso ${codigo}?`)) {
      try {
        const response = await axios.delete(`${API_URL}/api/cursos/${id}`);

        if (response.data.success) {
          setCursos(cursos.filter((curso) => curso.id !== id));
        }
      } catch (error) {
        console.error("Error deleting curso:", error);
        alert("Error al eliminar el curso");
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };

  if (loading) {
    return <div className="loading">Cargando cursos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="cursos-list">
      <div className="list-header">
        <h2>Lista de Cursos</h2>
        <p>Total: {cursos.length} cursos</p>
      </div>

      {cursos.length === 0 ? (
        <div className="empty-state">
          <p>No hay cursos registrados</p>
        </div>
      ) : (
        <div className="cursos-grid">
          {cursos.map((curso) => (
            <div key={curso.id} className="curso-card">
              <div className="curso-header">
                <h3>{curso.codigo}</h3>
                <span className="curso-creditos">
                  {curso.creditos} créditos
                </span>
              </div>

              <div className="curso-body">
                <h4>{curso.nombre}</h4>
                <p className="curso-descripcion">{curso.descripcion}</p>

                <div className="curso-details">
                  <div className="detail-item">
                    <strong>Costo:</strong> {formatCurrency(curso.costo)}
                  </div>
                  <div className="detail-item">
                    <strong>Semestre:</strong> {curso.semestre}
                  </div>
                  <div className="detail-item">
                    <strong>Docente:</strong> {curso.docente}
                  </div>
                  <div className="detail-item">
                    <strong>Modalidad:</strong> {curso.modalidad}
                  </div>
                  <div className="detail-item">
                    <strong>Cupos:</strong> {curso.cupos_disponibles}
                  </div>
                </div>
              </div>

              <div className="curso-actions">
                <button onClick={() => onEdit(curso)} className="btn-edit">
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(curso.id, curso.codigo)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CursosList;
