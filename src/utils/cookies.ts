// @ts-ignore
import { serialize, parse, CookieSerializeOptions } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next';

export function uniqueID() {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
	res: NextApiResponse,
	name: string,
	value: unknown,
	options: CookieSerializeOptions = {}
) => {
  	const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  	if ('maxAge' in options) {
		options.expires = new Date(Date.now() + options.maxAge)
		options.maxAge /= 1000
  	}

  	res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}

export const cookieHandler = (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {

	const cookies = parse(req.headers.cookie || '');
	const userId = cookies.userId;

	if (!userId) {
		setCookie(res, 'userId', uniqueID());
	}
  
	return handler(req, res)
}
