/**
 * Checks whether the user is logged in by verifying the presence of a session cookie.
 * @returns {boolean} - True if the session cookie indicates the user is logged in, false otherwise.
 */
export function isLoggedIn() {
    return document.cookie.split('; ').some(cookie => cookie.startsWith('session=1'));
}

/**
 * Logs out the user by deleting the session cookie.
 * Sets the session cookie with an expired max-age to clear its value.
 * Resets the logged-in state to false.
 */
export function logout() {
    document.cookie = "session=; Max-Age=0; Path=/";
}
