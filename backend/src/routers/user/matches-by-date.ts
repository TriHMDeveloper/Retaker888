import { Match } from '../../models/match';
import { Bet } from '../../models/bets';
import { currentUser } from '../../middlewares/current-user';
import express, { Request, Response } from 'express';

const router = express.Router();
router.get('/api/matches/date/:date', currentUser, async (req, res) => {
    const timezone_HCM = "Asia/Ho_Chi_Minh";
    const id = req.currentUser?.id;
    const date = new Date(req.params.date);
    let matches = await Match.aggregate([
        {
            $match: {
                datetime: {
                    $gte: new Date(date.setHours(0, 0, 0, 0)),
                    $lt: new Date(date.setHours(23, 59, 59, 999))
                }
            }
        },
        {
            $addFields: {
                "time": { "$dateToString": { format: "%H:%M", date: "$datetime", timezone: timezone_HCM } },
                "id":"$_id"
            }
        },
        {
            $project: { 
                _id: 0,
                __v: 0
            }
        }
    ]);

    console.log(matches);

    let data: any[] = [];
    for (const match of matches) {
        let bet = await Bet.findOne({ accountID: id, matchID: match.id });
        let moneyBet = bet?.moneyBet;
        let teamBet = bet?.teamBet;
        let status = bet?.status;
        let idBet = bet?.id;
        data.push(bet ? { match, moneyBet, teamBet, status, idBet } : { match, 'moneyBet': 0, 'teamBet': '', 'status': 'NoBet', 'idBet': '' });
    }

    data.sort((a:any,b:any) => {
        return b.match.datetime - a.match.datetime
    })

    res.status(200).send(data);
});

export { router as matchByDateRouter };