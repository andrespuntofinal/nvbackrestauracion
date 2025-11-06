import { Request, Response } from 'express';
import { MemberService } from '../../../application/services/memberService';

export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  async createMember(req: Request, res: Response): Promise<void> {
    try {
      const member = await this.memberService.createMember(req.body);
      res.status(201).json(member);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Error creating member' });
    }
  }

  async getAllMembers(req: Request, res: Response): Promise<void> {
    try {
      const { skip, limit, sort, ...filter } = req.query;

      const options = {
        skip: skip ? parseInt(skip as string) : 0,
        limit: limit ? parseInt(limit as string) : 10,
        sort: sort ? JSON.parse(sort as string) : { nombre: 1 }
      };

      const result = await this.memberService.getAllMembers(filter, options);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Error retrieving members' });
    }
  }

  async getMemberById(req: Request, res: Response): Promise<void> {
    try {
      const { numeroId } = req.params;
      const member = await this.memberService.getMemberById(numeroId);

      if (!member) {
        res.status(404).json({ message: 'Member not found' });
        return;
      }

      res.status(200).json(member);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Error retrieving member' });
    }
  }

  async updateMember(req: Request, res: Response): Promise<void> {
    try {
      const { numeroId } = req.params;
      const updated = await this.memberService.updateMember(numeroId, req.body);

      if (!updated) {
        res.status(404).json({ message: 'Member not found' });
        return;
      }

      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Error updating member' });
    }
  }

  async deleteMember(req: Request, res: Response): Promise<void> {
    try {
      const { numeroId } = req.params;
      const deleted = await this.memberService.deleteMember(numeroId);

      if (!deleted) {
        res.status(404).json({ message: 'Member not found' });
        return;
      }

      res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Error deleting member' });
    }
  }
}
