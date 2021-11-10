// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

// @ts-ignore
import { parse } from 'cookie';
import dbConnect from 'src/utils/dbConnect';
import VoteModel from 'src/models/vote';

dbConnect();

async function VotesHandler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
    const cookies = parse(req.headers.cookie || '');
	const userId = cookies.userId;

	switch (method) {
        case 'GET':
			try {
				const votes = await VoteModel.find({ userId }).exec();

				res.status(200).json({ success: true, data: votes })
			} catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
		case 'POST':
				try {
					const vote = await VoteModel.create({ ...req.body, userId});
	
					res.status(201).json({ success: true, data: vote })
				} catch (error) {
					res.status(400).json({ success: false, error });
				}
				break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}

export default VotesHandler;
