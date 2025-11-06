import { IMemberRepository } from '../../domain/ports/memberRepository';
import { Member } from '../../domain/entities/member';

export class MemberService {
  constructor(private readonly memberRepository: IMemberRepository) {}

  async createMember(member: Member): Promise<Member> {
    return await this.memberRepository.create(member);
  }

  async getAllMembers(
    filter: any = {},
    options?: { skip?: number; limit?: number; sort?: any }
  ): Promise<{ results: Member[]; total: number }> {
    return await this.memberRepository.findAll(filter, options);
  }

  async getMemberById(numeroId: string): Promise<Member | null> {
    return await this.memberRepository.findById(numeroId);
  }

  async updateMember(numeroId: string, member: Partial<Member>): Promise<Member | null> {
    return await this.memberRepository.update(numeroId, member);
  }

  async deleteMember(numeroId: string): Promise<boolean> {
    return await this.memberRepository.delete(numeroId);
  }
}
