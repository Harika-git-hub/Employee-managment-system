(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./storageService'));
  } else {
    root.authService = factory(root.storageService);
  }
})(typeof window !== 'undefined' ? window : globalThis, function (storageService) {
  let currentUser = null;

  /**
   * Registers a new admin in memory.
   * @param {string} username Admin username.
   * @param {string} password Admin password.
   * @returns {{success:boolean, message:string}} Signup result.
   */
  function signup(username, password) {
    const normalizedUsername = String(username || '').trim();
    const normalizedPassword = String(password || '');
    const admins = storageService.getAdmins();
    const exists = admins.some((admin) => admin.username.toLowerCase() === normalizedUsername.toLowerCase());

    if (exists) {
      return { success: false, message: 'Username already exists.' };
    }

    if (normalizedPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    storageService.addAdmin({ username: normalizedUsername, password: normalizedPassword });
    return { success: true, message: 'Signup successful.' };
  }

  /**
   * Authenticates an admin user.
   * @param {string} username Admin username.
   * @param {string} password Admin password.
   * @returns {{success:boolean, message?:string, user?:Object}} Login result.
   */
  function login(username, password) {
    const normalizedUsername = String(username || '').trim();
    const normalizedPassword = String(password || '');
    const admins = storageService.getAdmins();
    const found = admins.find((admin) => admin.username.toLowerCase() === normalizedUsername.toLowerCase() && admin.password === normalizedPassword);

    if (!found) {
      return { success: false, message: 'Invalid username or password.' };
    }

    currentUser = { username: found.username };
    return { success: true, user: { ...currentUser } };
  }

  /**
   * Clears the current in-memory session.
   */
  function logout() {
    currentUser = null;
  }

  /**
   * Checks whether an admin session is active.
   * @returns {boolean} True when logged in.
   */
  function isLoggedIn() {
    return !!currentUser;
  }

  /**
   * Gets the current authenticated user.
   * @returns {Object|null} Current user object or null.
   */
  function getCurrentUser() {
    return currentUser ? { ...currentUser } : null;
  }

  /**
   * Test helper to clear session state.
   */
  function __resetSession() {
    currentUser = null;
  }

  return { signup, login, logout, isLoggedIn, getCurrentUser, __resetSession };
});