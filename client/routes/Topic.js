import { Router } from 'express';
const router = Router();

import Functions from '../functions/Topic';

router.post('/add', Functions.add);
router.get('/all', Functions.all);
router.get('/suggest', Functions.suggest);
router.get('/interest/:topic', Functions.interest);
router.get('/posts', Functions.posts);
router.post('/remove', Functions.remove);

module.exports = router;
