import { Member } from '../entities/member';

export interface IMemberRepository {
  create(member: Member): Promise<Member>;
  findById(id: string): Promise<Member | null>;
  findAll(filter: any, options?: { skip?: number; limit?: number; sort?: any }): Promise<{ results: Member[]; total: number }>;
  update(id: string, data: Partial<Member>): Promise<Member | null>;
  delete(id: string): Promise<boolean>;
}
