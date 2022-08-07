import { createConnections } from 'typeorm';

console.log('[BANCO DE DADOS 🎲] Tentando conectar.');

async function getConnection() {
  createConnections()
    .then(() => {
      console.log('[BANCO DE DADOS 🎲] Conectado com sucesso!');
    })
    .catch(err => console.log(err));
}

getConnection();
