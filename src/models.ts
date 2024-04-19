export interface Client {
    id?: number;
    nome_cliente: string;
    telefone: string;
    contactId: string;
  }
  
  export interface Product {
    id?: number;
    nome_produto: string;
    quantidade?: number;
    peso?: number;
    clientId?: number;
  }
  