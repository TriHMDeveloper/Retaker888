import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../../middlewares/validate-request';
import { Account } from '../../models/account';
import { BadRequestError } from '../../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        var money=1000;
        var list_bet = new Array(), list_notice= new Array();
        var role = ['user'];

        const existingUser = await Account.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email is use');
        }

        const account = Account.build({ email, password, money, role, list_bet, list_notice});
        await account.save();

        const userJwt = jwt.sign({
            id: account.id,
            email: account.email
        },
        "retake888"
        );

        req.session = {
            jwt: userJwt
        };

        res.status(201).send(account);
    }
);

export { router as signupRouter };