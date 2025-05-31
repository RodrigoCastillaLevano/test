#!/usr/bin/env node

const axios = require('axios');

const BACKEND_URL = 'https://backend.r-c.lat';
const API_URL = `${BACKEND_URL}/api`;

console.log('🔍 DIAGNÓSTICO DE CONECTIVIDAD FRONTEND-BACKEND');
console.log('=' .repeat(60));

async function testConnection() {
  console.log('\n1. Probando conexión básica al backend...');
  try {
    const response = await axios.get(BACKEND_URL, { timeout: 10000 });
    console.log('✅ Backend responde:', response.status);
  } catch (error) {
    console.log('❌ Error conectando al backend:', error.message);
    return false;
  }

  console.log('\n2. Probando endpoint de salud...');
  try {
    const response = await axios.get(`${API_URL}/health`, { timeout: 10000 });
    console.log('✅ Health check exitoso:', response.status);
    console.log('📊 Info:', response.data);
  } catch (error) {
    console.log('❌ Error en health check:', error.message);
  }

  console.log('\n3. Probando endpoint de diagnóstico de auth...');
  try {
    const response = await axios.get(`${API_URL}/auth/test`, { timeout: 10000 });
    console.log('✅ Test de auth exitoso:', response.status);
    console.log('📊 Info:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ Error en test de auth:', error.message);
    if (error.response) {
      console.log('📊 Response:', error.response.status, error.response.data);
    }
  }

  console.log('\n4. Probando login con credenciales por defecto...');
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@demo.com',
      password: 'admin123'
    }, { 
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://frontend.r-c.lat'
      }
    });
    console.log('✅ Login exitoso:', response.status);
    console.log('🔑 Token recibido:', response.data.success ? 'SÍ' : 'NO');
  } catch (error) {
    console.log('❌ Error en login:', error.message);
    if (error.response) {
      console.log('📊 Response:', error.response.status, error.response.data);
    }
  }

  console.log('\n5. Verificando CORS...');
  try {
    const response = await axios.options(`${API_URL}/auth/login`, {
      headers: {
        'Origin': 'https://frontend.r-c.lat',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    console.log('✅ CORS preflight exitoso:', response.status);
  } catch (error) {
    console.log('❌ Error en CORS preflight:', error.message);
  }

  console.log('\n' + '=' .repeat(60));
  console.log('🏁 DIAGNÓSTICO COMPLETADO');
}

testConnection().catch(console.error);
