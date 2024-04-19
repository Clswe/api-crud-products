import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import clientController from './controllers/clientController';
import productController from './controllers/productController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Rotas para clientes
app.post('/api/clients', clientController.createClient);
app.get('/api/clients', clientController.listClients);

// Rotas para produtos dos clientes
app.post('/api/clients/:contactId/products', productController.createProductForClient);
app.get('/api/clients/:contactId/products', productController.listProductsForClient);
app.delete('/api/clients/:contactId/products/:productId', productController.deleteProductForClient);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
