import { Request, Response } from 'express';
import { TransactionService } from '../../../application/services/transactionService';

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const transaction = await this.transactionService.create(req.body);
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Error creating transaction' });
    }
  }

  async getAllTransactions(req: Request, res: Response): Promise<void> {
    try {
      const { skip, limit, sort, ...filter } = req.query;

      const options = {
        skip: skip ? parseInt(skip as string) : 0,
        limit: limit ? parseInt(limit as string) : 10,
        sort: sort ? JSON.parse(sort as string) : { fecha: -1 }
      };

      const result = await this.transactionService.getAll(filter);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Error retrieving transactions' });
    }
  }

  async getTransactionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const transaction = await this.transactionService.getById(id);

      if (!transaction) {
        res.status(404).json({ message: 'Transaction not found' });
        return;
      }

      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Error retrieving transaction' });
    }
  }

  async updateTransaction(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updated = await this.transactionService.update(id, req.body);

      if (!updated) {
        res.status(404).json({ message: 'Transaction not found' });
        return;
      }

      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Error updating transaction' });
    }
  }

  async deleteTransaction(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.transactionService.delete(id);
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Error deleting transaction' });
    }
  }
}
