// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'src/utils/dbConnect';
import EventModel from 'src/models/event';

dbConnect();

async function EventsHandler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const events = await EventModel.find({});

				res.status(200).json({ success: true, data: events })
			} catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
		case 'POST':
				try {
					const note = await EventModel.create(req.body);
	
					res.status(201).json({ success: true, data: note })
				} catch (error) {
					res.status(400).json({ success: false, error });
				}
				break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}

export default EventsHandler;
