import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE Clients (
    id INTEGER PRIMARY KEY,
    nome_cliente TEXT,
    telefone TEXT,
    contactId TEXT
  )`);

  db.run(`CREATE TABLE Products (
    id INTEGER PRIMARY KEY,
    nome_produto TEXT NOT NULL,
    quantidade INTEGER,
    peso REAL,
    clientId INTEGER,
    FOREIGN KEY (clientId) REFERENCES Clients(id)
  )`);
});

export default db;
