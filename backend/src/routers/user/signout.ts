import express from 'express';

const router = express.Router();

router.get('/api/users/signout', (req, res) => {
    console.log(req.session?._ctx.headers.cookie);
    req.session = null;

    res.send({});
});

export { router as signoutRouter };