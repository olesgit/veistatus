import cookies from 'react-cookie';


const bymcookie = "bymtoken";

export function loadBYMCookie()
{
	return cookies.load(bymcookie);
}

export function saveBYMCookie(cookie, expireDate)
{
	cookies.save(bymcookie, cookie.access_token, { path: '/', expires: expireDate });
}

export function removeBYMCookie()
{
	cookies.remove(bymcookie);
}

export function getAuthToken()
{
	const tokenFromCookie = loadBYMCookie();
	const authorization = "Bearer " + tokenFromCookie;
	return authorization;
}