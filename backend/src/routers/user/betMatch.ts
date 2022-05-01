import express, { Request, Response } from 'express';
import { addNotification } from '../../services/notification';
import { validateRequest } from '../../middlewares/validate-request';
import { Bet } from '../../models/bets';
import { Account } from '../../models/account';
import { currentUser } from '../../middlewares/current-user';
import { BadRequestError } from '../../errors/bad-request-error';
import { Match } from '../../models/match';
import mongoose from 'mongoose';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.post('/api/matches/bet/:match_id', currentUser,
    async (req: Request, res: Response) => {
        const { moneyBet, teamBet } = req.body;

        if (moneyBet <= 0) {
            throw new BadRequestError('Bet must be greater than 0');
        }

        let matchID = req.params.match_id;
        
        let match = await Match.aggregate([
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

        console.log("Match: "+ match);

        if (!(match[0].status == 'Open')) {
            throw new BadRequestError('Match is closed. Cannot bet');
        }

        const id = req.currentUser?.id;
        let accountID = id as string;
        let status = "Waitting";
        let account = await Account.findOne({ _id: id });
        let money = account?.money as number;
        let decription = "You bet " + moneyBet + "$ on " + teamBet + " at "
            + match[0].shortname1 + " vs " + match[0].shortname2 + " " + match[0].time +  " " +  match[0].day+"/"+match[0].month+"/"+match[0].year;

        if (money < moneyBet) {
            throw new BadRequestError('Not enough money');
        }

        const bet = Bet.build({ matchID, moneyBet, teamBet, status, accountID });
        await bet.save();

        let balance = money - moneyBet;
        await Account.updateOne({
            _id: id
        }, {
            $push: { list_bet: bet.id },
            money: balance
        });

        addNotification.add("Bet successful", decription, "message", accountID);

        bet.populate('matchID')
            .then(data => res.status(201).send(data))
            .catch(err => { throw new BadRequestError(err + "") })
    }
);

router.put('/api/matches/bet/:bet_id', currentUser,
    async (req: Request, res: Response) => {
        const { moneyBet, teamBet } = req.body;

        if (moneyBet <= 0) {
            throw new BadRequestError('Bet must be greater than 0');
        }

        let betID = req.params.bet_id;
        let oldBet = await Bet.findOne({ _id: betID });
        let matchID = oldBet?.matchID;
        let oldMoneyBet = oldBet?.moneyBet as number;

        let match = await Match.aggregate([
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

        console.log(match);

        if (!(match[0].status == 'Open')) {
            throw new BadRequestError('Match is closed. Cannot bet');
        }

        const id = req.currentUser?.id;
        let account = await Account.findOne({ _id: id });
        let money = account?.money as number + oldMoneyBet;

        if (money < moneyBet) {
            throw new BadRequestError('Not enough money');
        }

        let decription = "You update bet " + moneyBet + "$ on " + teamBet + " at "
            + match[0].shortname1 + " vs " + match[0].shortname2 + " " + match[0].time + " " + match[0].day+"/"+match[0].month+"/"+match[0].year;
        let balance = money - moneyBet;
        await Bet.updateOne({
            _id: betID
        }, {
            moneyBet: moneyBet,
            teamBet: teamBet
        });
        await Account.updateOne({
            _id: id
        }, {
            money: balance
        });

        addNotification.add("Update bet successful", decription, "message", id as string);

        await Bet.findOne({ _id: betID })
            .populate('matchID')
            .then(data => res.status(200).send(data))
            .catch(err => { throw new BadRequestError(err + "") })
    }
);

export { router as betRouter };


