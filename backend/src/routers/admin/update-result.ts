import express, { Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { Match } from '../../models/match';
import { Bet } from '../../models/bets';
import { Account } from '../../models/account';
import { addNotification } from '../../services/notification';
import { currentUser } from '../../middlewares/current-user';

const router = express.Router();

router.put('/api/admin/matches/:match_id',
    async (req: Request, res: Response) => {
        
        const { result } = req.body;

        // let userRole =  req.currentUser?.role as string[];
        // if (!userRole.includes('admin')) {
        //     throw new BadRequestError('Only accept admin');
        // }

        let matchID = req.params.match_id;
        await Match.updateOne({
            _id: matchID
        }, {
            result: result,
            status: "Done"
        })
        
        var listBet = await Bet.find({ matchID: matchID});
        console.log(listBet);
        listBet.forEach( async (element) => {
            // let bet = await Bet.findOne({_id : element.id})
            let accountId =  element.accountID;
            let account = await Account.findOne({_id : accountId});
            let money = account?.money as number;
            let moneyWin, status,title,decription,type = "bet";

            if (element.teamBet===result) {
                moneyWin =  element.moneyBet as number *1.9;
                status = "Win";
                title = "Win Bet";
                decription = "You Win " + moneyWin + "$ on " + element.teamBet;
            } else {
                moneyWin = 0;
                status = "Lose";
                title = "Lose Bet";
                decription = "You Lose " + element.moneyBet + "$ on " + element.teamBet;
            }

            await Bet.updateOne({
                _id : element.id
            },{
                status : status
            });

            await Account.updateOne({
                _id : accountId
            },{
                money : money + moneyWin
            })

            addNotification.add(title, decription, type, accountId);

        });

        const matchUpdated = await Match.findOne({ _id: matchID });
        res.status(200).send(matchUpdated);
    }
);

export { router as updateResultRouter };


