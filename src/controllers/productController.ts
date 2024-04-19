import { Request, Response } from 'express';
import db from '../database';
import { Product } from '../models';

interface ClientRow {
  id: number;
}

const createProductForClient = (req: Request, res: Response) => {
  const { contactId } = req.params;
  const { nome_produto, quantidade, peso } = req.body as Product;

  // Verificar se o cliente com o contactId existe
  db.get<ClientRow>('SELECT id FROM Clients WHERE contactId = ?', [contactId], (err, client) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar cliente' });
    }

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const clientId = client.id;

    // Inserir o produto associado ao cliente no banco de dados
    db.run(
      'INSERT INTO Products (nome_produto, quantidade, peso, clientId) VALUES (?, ?, ?, ?)',
      [nome_produto, quantidade, peso, clientId],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro ao cadastrar produto para o cliente' });
        }
        res.status(201).json({ id: this.lastID });
      }
    );
  });
};

const listProductsForClient = (req: Request, res: Response) => {
  const { contactId } = req.params;

  // Buscar o ID do cliente com base no contactId
  db.get<ClientRow>('SELECT id FROM Clients WHERE contactId = ?', [contactId], (err, client) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar cliente' });
    }

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const clientId = client.id;

    // Buscar os produtos associados ao cliente
    db.all<Product>('SELECT nome_produto, quantidade, peso FROM Products WHERE clientId = ?', [clientId], (err, products) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao listar produtos do cliente' });
      }
      res.json(products);
    });
  });
};

const deleteProductForClient = (req: Request, res: Response) => {
  const { contactId, productId } = req.params;

  // Verificar se o cliente com o contactId existe
  db.get<ClientRow>('SELECT id FROM Clients WHERE contactId = ?', [contactId], (err, client) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar cliente' });
    }

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const clientId = client.id;

    // Deletar o produto associado ao cliente
    db.run('DELETE FROM Products WHERE id = ? AND clientId = ?', [productId, clientId], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao deletar produto do cliente' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Produto não encontrado para o cliente' });
      }

      res.status(204).send();
    });
  });
};

export default { createProductForClient, listProductsForClient, deleteProductForClient };
