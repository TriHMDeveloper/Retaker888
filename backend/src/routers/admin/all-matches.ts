import { Match } from '../../models/match';
import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { BadRequestError } from '../../errors/bad-request-error';

const router = express.Router();
router.get('/api/admin/matches', async (req, res) => {

    // let userRole = req.currentUser?.role as string[];
    // if (!userRole.includes('admin')) {
    //     throw new BadRequestError('Only accept admin');
    // }

    const matchs = await Match.find().sort({ datetime: -1 });

    res.send({ matchs });

});

export { router as allMatchesRouter };