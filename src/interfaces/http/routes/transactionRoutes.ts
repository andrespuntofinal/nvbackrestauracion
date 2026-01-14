import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';
import { TransactionService } from '../../../application/services/transactionService';
import TransactionRepositoryMongo from '../../../infrastructure/repositories/transactionRepositoryMongo';
import { verifyFirebaseToken } from '../../../middlewares/authFirebase';
import { checkAdminRole } from '../../../middlewares/checkAdminRole';


const router = Router();

// Inyección manual de dependencias
const transactionRepository = new TransactionRepositoryMongo();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

// Todas las rutas requieren autenticación y rol admin
router.get('/', verifyFirebaseToken, checkAdminRole, (req, res) => transactionController.getAllTransactions(req, res));
router.get('/:id', verifyFirebaseToken, checkAdminRole, (req, res) => transactionController.getTransactionById(req, res));

router.post('/', verifyFirebaseToken, checkAdminRole, (req, res) => transactionController.createTransaction(req, res));
router.put('/:id', verifyFirebaseToken, checkAdminRole, (req, res) => transactionController.updateTransaction(req, res));
router.delete('/:id', verifyFirebaseToken, checkAdminRole, (req, res) => transactionController.deleteTransaction(req, res));

export default router;
