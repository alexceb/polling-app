// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'src/utils/dbConnect';


dbConnect();

async function Test(req: NextApiRequest, res: NextApiResponse) {
    res.json({ test: 'test' });
}

export default Test;
