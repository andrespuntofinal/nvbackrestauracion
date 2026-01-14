import TransactionModel, { ITransaction } from '../../models/transaction.model';
import Transaction from '../../domain/entities/transaction';
import { TransactionRepository } from '../../domain/ports/transactionRepository';

class TransactionRepositoryMongo implements TransactionRepository {
  private toDomain(doc: ITransaction | null): Transaction | null {
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      numeroId: doc.numeroId,
      tipotrx: doc.tipotrx as 'INGRESO' | 'EGRESO',
      concepto: doc.concepto,
      valor: doc.valor,
      fecha: doc.fecha,
      fechaCreacion: doc.fecha_creacion,
      userId: doc.userId,
    };
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const created = await TransactionModel.create(transaction as any);
    return this.toDomain(created as ITransaction) as Transaction;
  }

  async findAll(filter: any = {}): Promise<Transaction[]> {
    const docs = await TransactionModel.find(filter).lean<ITransaction>();
    return docs.map(d => ({
      id: d._id.toString(),
      numeroId: d.numeroId,
      tipotrx: d.tipotrx as 'INGRESO' | 'EGRESO',
      concepto: d.concepto,
      valor: d.valor,
      fecha: d.fecha,
      fechaCreacion: d.fechaCreacion,
      userId: d.userId,
    }));
  }

  async findById(id: string): Promise<Transaction | null> {
    const doc = await TransactionModel.findById(id);
    return this.toDomain(doc as ITransaction | null);
  }

  async update(id: string, data: Partial<Transaction>): Promise<Transaction | null> {
    const doc = await TransactionModel.findByIdAndUpdate(id, data, { new: true });
    return this.toDomain(doc as ITransaction | null);
  }

  async delete(id: string): Promise<void> {
    await TransactionModel.findByIdAndDelete(id);
  }
}

export default TransactionRepositoryMongo;
