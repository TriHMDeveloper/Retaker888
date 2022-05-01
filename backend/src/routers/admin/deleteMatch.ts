import express, { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { Match } from '../../models/match';
import { currentUser } from '../../middlewares/current-user';

const router = express.Router();

router.delete('/api/admin/matches/:match_id',
    async (req: Request, res: Response) => {

        // let userRole =  req.currentUser?.role as string[];
        // if (!userRole.includes('admin')) {
            //day la tri
            //sladjkflskadjf
        //     throw new BadRequestError('Only accept admin');
        // ""
        

        let matchID = req.params.match_id;
        await Match.deleteOne({
            _id: matchID
        })
        res.status(200).send({});
    }
);

export { router as deleteMatchRouter };


