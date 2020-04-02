import { Router } from 'express';
const router = Router();

import Functions from '../functions/Room';

router.post('/add', Functions.add);
router.get('/all/:size', Functions.viewAll);
router.get('/suggest', Functions.suggest);
router.get('/join/:id', Functions.join);
router.get('/mine', Functions.mine);
router.get('/delete/:room', Functions.delete);

module.exports = router;
