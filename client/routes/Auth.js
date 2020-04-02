import { Router } from 'express';
const router = Router();

import Functions from '../functions/User';

router.post('/login', Functions.login);
router.get('/logout', Functions.logout);
router.post('/signup', Functions.signup);
router.get('/checkUsername/:username', Functions.checkUsername);
router.post('/password/reset', Functions.reset);
router.post('/password/resetTo', Functions.resetPost);
router.post('/account/sendVerification', Functions.sendVerification);
router.post('/account/verify', Functions.verify);

module.exports = router;
