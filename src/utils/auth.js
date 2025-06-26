export function isLoggedIn() {
    return document.cookie.includes("session=1")
}

export function logout() {
    document.cookie = "session=; Max-Age=0; Path=/";
}
