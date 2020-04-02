import { Router } from 'express';
const router = Router();

import Functions from '../functions/Search';

router.post('/add/:skip', Functions.add);
router.get('/suggest/:query', Functions.suggest);

module.exports = router;
