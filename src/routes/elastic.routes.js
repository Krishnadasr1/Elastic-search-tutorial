import express from 'express';

import {createApi,searchApi,updateApi,deleteApi} from '../controllers/elastic.controller.js';

const router = express.Router();

router.post('/createApi',createApi);
router.get('/search', searchApi);
router.put('/updateApi/:id',updateApi);
router.delete('/deleteApi/:id',deleteApi);

export default router;