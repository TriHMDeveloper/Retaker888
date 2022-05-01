import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { addNotification } from '../../services/notification';
const router = express.Router();

router.post('/api/notifications/add', currentUser, async (req: Request, res: Response) => {

    const { title, decription, type } = req.body;
    const id = req.currentUser?.id;
    
    await addNotification.add(title, decription, type, id as string);

    res.status(201).send();
    }
    );

export { router as addNotificationRouter };