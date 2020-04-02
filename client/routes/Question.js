import { Router } from 'express';
const router = Router();

import Functions from '../functions/Question';

router.post('/add', Functions.add);
router.get('/room/:room/:skip', Functions.viewRoom);
router.get('/delete/:id', Functions.delete);
router.get('/recent/:skip', Functions.viewRecent);

module.exports = router;
