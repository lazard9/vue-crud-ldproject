export function isLoggedIn() {
    return document.cookie.split('; ').some(cookie => cookie.startsWith('session=1'));
}

export function logout() {
    document.cookie = "session=; Max-Age=0; Path=/";
}
