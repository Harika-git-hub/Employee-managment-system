const storageService = require('../js/storageService');
const authService = require('../js/authService');

beforeEach(() => {
  storageService.__setAdmins([{ username: 'admin', password: 'admin123' }]);
  authService.__resetSession();
});

test('login succeeds for valid credentials', () => {
  const result = authService.login('admin', 'admin123');
  expect(result.success).toBe(true);
  expect(authService.isLoggedIn()).toBe(true);
});

test('login fails for invalid credentials', () => {
  const result = authService.login('admin', 'wrong');
  expect(result.success).toBe(false);
  expect(authService.isLoggedIn()).toBe(false);
});

test('signup rejects duplicate username', () => {
  const result = authService.signup('admin', 'newpass');
  expect(result.success).toBe(false);
});

test('signup rejects short password', () => {
  const result = authService.signup('freshadmin', '123');
  expect(result.success).toBe(false);
  expect(result.message).toMatch(/at least 6/);
});

test('signup succeeds for valid data', () => {
  const result = authService.signup('newadmin', 'strongpass');

  expect(result.success).toBe(true);
});

test('logout clears session', () => {
  authService.login('admin', 'admin123');
  authService.logout();
  expect(authService.getCurrentUser()).toBeNull();
  expect(authService.isLoggedIn()).toBe(false);
});
test('login is case insensitive', () => {
  const result = authService.login('ADMIN', 'admin123');

  expect(result.success).toBe(true);
});

test('signup adds new user', () => {
  authService.signup('newuser', 'password123');

  const admins = storageService.getAdmins();
  expect(admins.some(a => a.username === 'newuser')).toBe(true);
});