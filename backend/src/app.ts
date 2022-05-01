import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';

import { currentUserRouter } from './routers/user/current-user';
import { signinRouter } from './routers/user/signin';
// import { signupRouter } from './routers/user/signup';
import { signoutRouter } from './routers/user/signout';
import { daysMatchRouter } from './routers/user/date-of-matches';
import { addNotificationRouter} from './routers/user/add-notification';
import { notificationRouter } from './routers/user/notification';
import { matchByDateRouter } from './routers/user/matches-by-date';

//Admin
import { allMatchesRouter } from './routers/admin/all-matches';
import { addMatchRouter } from './routers/admin/add-match';
import { updateStatusRouter } from './routers/admin/update-status';
import { updateResultRouter } from './routers/admin/update-result';
import { deleteMatchRouter } from './routers/admin/deleteMatch';
import { signinAdminRouter } from './routers/admin/signin';
//Error
import { signupRouter } from './routers/user/signup';
// import { signoutRouter } from './routes/signout';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { betRouter } from './routers/user/betMatch';

const app = express();
app.use(cors());
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
// app.use(signupRouter);
app.use(signoutRouter);
app.use(daysMatchRouter);
app.use(addNotificationRouter);
app.use(notificationRouter);
//Admin
app.use(allMatchesRouter);
app.use(addMatchRouter)
app.use(signupRouter);
app.use(betRouter);
app.use(updateResultRouter);
app.use(deleteMatchRouter);
app.use(matchByDateRouter);
app.use(updateStatusRouter);
app.use(signinAdminRouter);
// app.use(signoutRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
  });

app.use(errorHandler);

export { app }