// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../lib/firebase-admin'

export default async (req, res) => {
    try {
        let querySnapshot = await db
            .collection("daily-rosters")
            .orderBy("time", "desc")
            .limit(14)
            .get();

        let dates = await querySnapshot.docs.map((item) => {
            let dataItem = item.data();
            let miliseconds = `${dataItem.time._seconds}000`
            return {
                ...dataItem,
                time: new Date(parseInt(miliseconds)),
            };
        });
        
        res.statusCode = 200;
        res.json(dates);
    } catch (error) {
        res.statusCode = 503;
        res.json({ msg: 'api/dates error' })
    }

};
