import express, { Request, Response } from 'express';
import { Notification } from '../../models/notification';
import { BadRequestError } from '../../errors/bad-request-error';
import { Account } from '../../models/account';
import { currentUser } from '../../middlewares/current-user';

const router = express.Router();
router.get('/api/users/notifications', currentUser, async (req, res) => {

    const id = req.currentUser?.id;
    const account = await Account.findOne({ _id: id })
        .populate({ path: 'list_notice', options: { sort: { datetime: -1 } } })
        .then(data => res.status(200).send({ 'list_notice': data?.list_notice }))
        .catch(err => { throw new BadRequestError(err + "") })

});

router.put('/api/users/notifications', currentUser, async (req, res) => {
    const id = req.currentUser?.id;
    const account = await Account.findOne({ _id: id })

    let listNotice = account?.list_notice as Array<string>
    listNotice.forEach(async element => {
        await Notification.updateOne({
            _id: element
        }, {
            is_read: true
        })
    });
    res.status(200).send({})

});

router.put('/api/users/notifications', currentUser, async (req, res) => {
    const id = req.currentUser?.id;
    const account = await Account.findOne({ _id: id })

    let listNotice = account?.list_notice as Array<string>
    listNotice.forEach( async element => {
        await Notification.updateOne({
            _id: element
        }, {
            is_read: true
        })
    });
    res.status(200).send({})
    
});

export { router as notificationRouter };