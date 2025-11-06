import { Router } from 'express';
import { MemberController } from '../controllers/memberController';
import { MemberService } from '../../../application/services/memberService';
import { MemberRepositoryMongo } from '../../../infrastructure/repositories/memberRepositoryMongo';
import { verifyFirebaseToken } from '../../../middlewares/authFirebase';
import { checkAdminRole } from '../../../middlewares/checkAdminRole';


const router = Router();

// Inyección manual de dependencias
const memberRepository = new MemberRepositoryMongo();
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberService);

// Rutas públicas
router.get('/', (req, res) => memberController.getAllMembers(req, res));
router.get('/:numeroId', (req, res) => memberController.getMemberById(req, res));

// Rutas protegidas
router.post('/', verifyFirebaseToken, checkAdminRole, (req, res) => memberController.createMember(req, res));
router.put('/:numeroId', verifyFirebaseToken, checkAdminRole,  (req, res) => memberController.updateMember(req, res));
router.delete('/:numeroId', verifyFirebaseToken, checkAdminRole,  (req, res) => memberController.deleteMember(req, res));

export default router;
