import React, { useState } from 'react';
import axios from 'axios';

// Misma lógica que en AuthContext
const getApiUrl = () => {
  if (window.location.hostname === 'frontend.r-c.lat') {
    return 'https://backend.r-c.lat';
  }
  return process.env.REACT_APP_API_URL || 'http://localhost:3001';
};

const API_URL = getApiUrl();

const DiagnosticPanel = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      console.log('Testing connection to:', API_URL);
      const response = await axios.get(`${API_URL}/api/health`);
      setTestResult({
        success: true,
        data: response.data,
        status: response.status
      });
    } catch (error) {
      console.error('Connection test failed:', error);
      setTestResult({
        success: false,
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: 'admin@demo.com',
        password: 'admin123'
      });
      
      setTestResult({
        success: true,
        type: 'login',
        data: response.data,
        status: response.status
      });
    } catch (error) {
      console.error('Login test failed:', error);
      setTestResult({
        success: false,
        type: 'login',
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      border: '2px solid #ccc', 
      padding: '15px', 
      borderRadius: '8px',
      zIndex: 9999,
      maxWidth: '400px',
      fontSize: '12px'
    }}>
      <h4>🔧 Panel de Diagnóstico</h4>
      <p><strong>API URL Configurada:</strong> {API_URL}</p>
      <p><strong>Hostname actual:</strong> {window.location.hostname}</p>
      <p><strong>Env Variable:</strong> {process.env.REACT_APP_API_URL || 'No definida'}</p>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={testConnection} disabled={loading}>
          {loading ? 'Probando...' : 'Test Conexión'}
        </button>
        <button onClick={testLogin} disabled={loading} style={{ marginLeft: '10px' }}>
          {loading ? 'Probando...' : 'Test Login'}
        </button>
      </div>

      {testResult && (
        <div style={{ 
          background: testResult.success ? '#d4edda' : '#f8d7da', 
          padding: '10px', 
          borderRadius: '4px',
          marginTop: '10px'
        }}>
          <strong>Resultado:</strong>
          <pre style={{ fontSize: '10px', overflow: 'auto', maxHeight: '200px' }}>
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DiagnosticPanel;
