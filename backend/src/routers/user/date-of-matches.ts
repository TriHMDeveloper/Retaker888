import { Match } from '../../models/match';
import { requireAuth } from '../../middlewares/require-auth';
import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';

const router = express.Router();

router.get('/api/matches/date', currentUser, async (req, res) => {
    const timezone_HCM = "Asia/Ho_Chi_Minh";
    const days = await Match.aggregate([
        {
            "$project": {
                "year": { "$year": { date: "$datetime", timezone: timezone_HCM } },
                "month": { "$dateToString": { format: "%m", date: "$datetime", timezone: timezone_HCM } },
                "day": { "$dateToString": { format: "%d", date: "$datetime", timezone: timezone_HCM } }
            }
        },
        {
            "$group": {
                "_id": null,
                "distinctDate": { "$addToSet": { "year": "$year", "month": "$month", "day": "$day" } }
            }
        }
    ]);

    res.send(days[0].distinctDate
        .sort(function (a: any, b: any) {
            return ((b.year as number) - (a.year as number)) || ((b.month as number) - (a.month as number))
                || ((b.day as number) - (a.day as number));
        })
        .map(function (val: any, index: any) {
            return { date: `${val.year}-${val.month}-${val.day}` };
        }));
});

export { router as daysMatchRouter };