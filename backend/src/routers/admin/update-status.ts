import express, { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { Match } from '../../models/match';
import { Bet } from '../../models/bets';
import { addNotification } from '../../services/notification';
import { currentUser } from '../../middlewares/current-user';
import mongoose from 'mongoose';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.put('/api/admin/matches/update/:match_id',
    async (req: Request, res: Response) => {

        // let userRole =  req.currentUser?.role as string[];
        // if (!userRole.includes('admin')) {
        //     throw new BadRequestError('Only accept admin');
        // }
        
        let matchID = req.params.match_id;
        let oldMatch = await Match.findOne({ _id: matchID})

        let oldStatus = oldMatch?.status as string; 
        if (oldStatus == 'Close') {
            throw new BadRequestError('Match are already closed!');
        }

        await Match.updateOne({
            _id: matchID
        }, {
            status: "Close"
        })

        var listBet = await Bet.find({ matchID: matchID});
        let matchUpdated = await Match.aggregate([
            {
                $match: { _id: new ObjectId(matchID) }
            },
            {
                $addFields: {
                    "time": {
                        "$dateToString": { format: "%H:%M", date: "$datetime", timezone: 'Asia/Ho_Chi_Minh' }
                    },
                    "day": { "$dayOfMonth": { date: "$datetime", timezone: 'Asia/Ho_Chi_Minh' } },
                    "month": { "$dateToString": { format: "%m", date: "$datetime", timezone: 'Asia/Ho_Chi_Minh' } },
                    "year": { "$year": { date: "$datetime", timezone: 'Asia/Ho_Chi_Minh' } }
                }
            }
        ]);

        listBet.forEach( async (element) => {
            let decription = "The match " + matchUpdated[0].shortname1 + " vs " + matchUpdated[0].shortname2 
                            +  " is closed. This match will start at " 
                            + matchUpdated[0].time + " " + matchUpdated[0].day+"/"+matchUpdated[0].month+"/"+matchUpdated[0].year;
            addNotification.add("Match is closed", decription, 'message', element.accountID);
        });

       
        res.status(200).send(matchUpdated);
    }
);

export { router as updateStatusRouter };


