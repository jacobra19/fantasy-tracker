// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from '../../lib/firebase-admin'

export default async (req, res) => {
    try {
        let customToken = await auth.createCustomToken(process.env.PROJECT_ID)
        res.status(200).json({token:customToken})
    } catch (error) {
        res.status(503).json({ msg: error.message })
    }

};
