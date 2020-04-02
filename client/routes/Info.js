import { Router } from 'express';
const router = Router();

import Functions from '../functions/Info';

router.get('/all', Functions.all);

module.exports = router;
