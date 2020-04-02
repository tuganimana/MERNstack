import { Router } from 'express';
const router = Router();

import Functions from '../functions/Page';
import Upload from '../functions/Upload';

router.post('/add', Upload.upload.single('photo'),Functions.add);
router.get('/unverified/:skip', Functions.unverified);
router.get('/view/:id', Functions.viewById);
router.get('/recomend/:skip', Functions.recomend);
router.get('/all/:type/:skip', Functions.all);
router.post('/verify', Functions.verify);
router.get('/delete/:id', Functions.delete);
router.post('/unverify', Functions.unverify);

module.exports = router;
