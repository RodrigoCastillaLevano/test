import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CursoForm.css";

const CursoForm = ({ curso, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    creditos: "",
    costo: "",
    semestre: "",
    docente: "",
    modalidad: "Presencial",
    cupos_disponibles: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (curso) {
      setFormData({
        codigo: curso.codigo || "",
        nombre: curso.nombre || "",
        descripcion: curso.descripcion || "",
        creditos: curso.creditos || "",
        costo: curso.costo || "",
        semestre: curso.semestre || "",
        docente: curso.docente || "",
        modalidad: curso.modalidad || "Presencial",
        cupos_disponibles: curso.cupos_disponibles || "",
      });
    }
  }, [curso]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = curso
        ? `${process.env.REACT_APP_API_URL}/cursos/${curso.id}`
        : `${process.env.REACT_APP_API_URL}/cursos`;

      const method = curso ? "put" : "post";

      const response = await axios[method](url, formData);

      if (response.data.success) {
        onSave();
      }
    } catch (error) {
      console.error("Error saving curso:", error);
      setError(error.response?.data?.message || "Error al guardar el curso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="curso-form">
      <div className="form-header">
        <h2>{curso ? "Editar Curso" : "Crear Nuevo Curso"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="codigo">Código *</label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="IS101"
            />
          </div>

          <div className="form-group">
            <label htmlFor="creditos">Créditos *</label>
            <input
              type="number"
              id="creditos"
              name="creditos"
              value={formData.creditos}
              onChange={handleChange}
              required
              min="1"
              max="6"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombre del Curso *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Fundamentos de Programación"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            disabled={loading}
            rows="3"
            placeholder="Descripción del curso..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="costo">Costo (S/) *</label>
            <input
              type="number"
              id="costo"
              name="costo"
              value={formData.costo}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              disabled={loading}
              placeholder="450.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cupos_disponibles">Cupos Disponibles</label>
            <input
              type="number"
              id="cupos_disponibles"
              name="cupos_disponibles"
              value={formData.cupos_disponibles}
              onChange={handleChange}
              min="0"
              disabled={loading}
              placeholder="30"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="semestre">Semestre</label>
            <select
              id="semestre"
              name="semestre"
              value={formData.semestre}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Seleccionar semestre</option>
              <option value="2024-I">2024-I</option>
              <option value="2024-II">2024-II</option>
              <option value="2024-III">2024-III</option>
              <option value="2025-I">2025-I</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="modalidad">Modalidad</label>
            <select
              id="modalidad"
              name="modalidad"
              value={formData.modalidad}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
              <option value="Híbrida">Híbrida</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="docente">Docente</label>
          <input
            type="text"
            id="docente"
            name="docente"
            value={formData.docente}
            onChange={handleChange}
            disabled={loading}
            placeholder="Dr. Juan Pérez"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn-cancel"
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Guardando..." : curso ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CursoForm;
