import express, { Request, Response } from 'express';
import { Match } from '../../models/match';
import { currentUser } from '../../middlewares/current-user';
import { BadRequestError } from '../../errors/bad-request-error';
const router = express.Router();

router.post('/api/admin/matches',
    async (req: Request, res: Response) => {

        // let userRole =  req.currentUser?.role as string[];
        // if (!userRole.includes('admin')) {
        //     throw new BadRequestError('Only accept admin');
        // }

        const { shortname1, shortname2, datetime, ava1, ava2, name1, name2 } = req.body;
        const status = "Open", result = "";
        const match = Match.build({ shortname1, shortname2, datetime, status, result, ava1, ava2, name1, name2 });
        await match.save();
        let idMatch = match.id;
        console.log(idMatch);
        res.status(201).send({id: idMatch});
    }
);

export { router as addMatchRouter };