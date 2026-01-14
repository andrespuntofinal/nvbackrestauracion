import Transaction from '../entities/transaction';

export interface TransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findAll(filter?: any): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  update(id: string, data: Partial<Transaction>): Promise<Transaction | null>;
  delete(id: string): Promise<void>;
}

export default TransactionRepository;
