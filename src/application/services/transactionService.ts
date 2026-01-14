import Transaction from '../../domain/entities/transaction';
import { TransactionRepository } from '../../domain/ports/transactionRepository';
import { MemberModel } from '../../models/member.model';
import mongoose from 'mongoose';


export class TransactionService {
  constructor(private repository: TransactionRepository) {}

  async create(data: Transaction): Promise<Transaction> {
    // Resolver numeroId: aceptar tanto ObjectId (_id) como el campo `numeroId` del Member
    let memberDoc: any = null;
    const candidate = data.numeroId?.toString?.();

    if (candidate && mongoose.Types.ObjectId.isValid(candidate)) {
      memberDoc = await MemberModel.findById(candidate).lean();
    }

    // Si no se encontró por _id, intentar buscar por el campo numeroId del Member
    if (!memberDoc) {
      memberDoc = await MemberModel.findOne({ numeroId: candidate }).lean();
    }

    if (!memberDoc) {
      throw new Error('Member not found for numeroId provided');
    }

    // Construir payload usando el ObjectId real como referencia
    const payload: any = { ...data, numeroId: memberDoc._id };

    return this.repository.create(payload);
  }

  async getAll(filter: any = {}): Promise<Transaction[]> {
    return this.repository.findAll(filter);
  }

  async getById(id: string): Promise<Transaction | null> {
    return this.repository.findById(id);
  }

  async update(id: string, data: Partial<Transaction>): Promise<Transaction | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}

export default TransactionService;
