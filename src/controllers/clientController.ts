import { Request, Response } from 'express';
import db from '../database';
import { Client } from '../models';

const createClient = (req: Request, res: Response) => {
  const { nome_cliente, telefone, contactId } = req.body as Client;

  db.run('INSERT INTO Clients (nome_cliente, telefone, contactId) VALUES (?, ?, ?)', [nome_cliente, telefone, contactId], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar cliente' });
    }
    res.status(201).json({ id: this.lastID });
  });
};

const listClients = (req: Request, res: Response) => {
  db.all('SELECT nome_cliente, telefone, contactId FROM Clients', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar clientes' });
    }
    res.json(rows);
  });
};

export default { createClient, listClients };
