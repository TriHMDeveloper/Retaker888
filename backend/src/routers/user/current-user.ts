import express from 'express';
import { Account } from '../../models/account';
import { currentUser } from '../../middlewares/current-user';

const router = express.Router();
router.get('/api/users/currentuser', currentUser,async (req, res) => {
    const id = req.currentUser?.id;
    const account = await Account.findOne({ _id: id });
    res.send({account});
});

export { router as currentUserRouter };