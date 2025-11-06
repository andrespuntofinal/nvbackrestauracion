// src/infrastructure/repositories/memberRepositoryMongo.ts
import { MemberModel } from '../../models/member.model';
import { IMemberRepository } from '../../domain/ports/memberRepository';
import { Member } from '../../domain/entities/member';

export class MemberRepositoryMongo implements IMemberRepository {

  async create(member: Member): Promise<Member> {
    const newMember = new MemberModel(member);
    const saved = await newMember.save();
    return saved.toObject() as Member;
  }

  async findById(numeroId: string): Promise<Member | null> {
    const member = await MemberModel.findOne({ numeroId }).lean();
    return member as Member | null;
  }

  async findAll(
    filter: any = {},
    options?: { skip?: number; limit?: number; sort?: any }
  ): Promise<{ results: Member[]; total: number }> {
    const query = MemberModel.find(filter)
      .skip(options?.skip ?? 0)
      .limit(options?.limit ?? 0)
      .sort(options?.sort ?? { createdAt: -1 }) // orden por defecto: más recientes primero
      .lean();

    const [results, total] = await Promise.all([
      query.exec(),
      MemberModel.countDocuments(filter)
    ]);

    return { results: results as Member[], total };
  }

  async update(numeroId: string, data: Partial<Member>): Promise<Member | null> {
    const updated = await MemberModel.findOneAndUpdate({ numeroId }, data, { new: true }).lean();
    return updated as Member | null;
  }

  async delete(numeroId: string): Promise<boolean> {
    const result = await MemberModel.findOneAndDelete({ numeroId });
    return !!result;
  }
}
