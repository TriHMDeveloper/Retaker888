import { Account } from "../models/account";
import { Notification } from "../models/notification";

export class addNotification {
    static async add(title: string, decription: string, type: string, accountId: string) {

        // console.log(datetime.asdasdaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));CheckFlowsaljfl
        //main git flow
        //git flow: main
        //git flow: vinhdh
        //git flow: main
        let datetime = new Date();
        let is_read = false;

        const notification = Notification.build({title, decription, datetime, is_read, type});

        await Account.updateOne(
            {_id: accountId},
            {$push: {"list_notice": notification.id}}
            )
        await notification.save();
    }
}