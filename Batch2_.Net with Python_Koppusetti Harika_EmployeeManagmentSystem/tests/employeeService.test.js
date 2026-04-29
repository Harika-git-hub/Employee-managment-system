const storageService = require('../js/storageService');
const employeeService = require('../js/employeeService');

beforeEach(() => {
  storageService.__setEmployees([
    {
      id: 1,
      firstName: 'Asha',
      lastName: 'Rao',
      email: 'asha@xyz.com',
      phone: '9876543210',
      department: 'Engineering',
      designation: 'Dev',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Active'
    },
    {
      id: 2,
      firstName: 'Bala',
      lastName: 'Menon',
      email: 'bala@xyz.com',
      phone: '9876543211',
      department: 'HR',
      designation: 'HR',
      salary: 400000,
      joinDate: '2022-01-01',
      status: 'Inactive'
    },
    {
      id: 3,
      firstName: 'Chetan',
      lastName: 'Iyer',
      email: 'chetan@xyz.com',
      phone: '9876543212',
      department: 'Engineering',
      designation: 'QA',
      salary: 600000,
      joinDate: '2024-01-01',
      status: 'Active'
    }
  ]);
});

test('adds employee with next id', () => {
  const result = employeeService.add({
    firstName: 'Deepa',
    lastName: 'K',
    email: 'deepa@xyz.com',
    phone: '9876543213',
    department: 'Finance',
    designation: 'Analyst',
    salary: 700000,
    joinDate: '2024-06-01',
    status: 'Active'
  });

  expect(result.id).toBe(4);
  expect(employeeService.getAll()).toHaveLength(4);
});

test('applyFilters uses AND logic', () => {
  const result = employeeService.applyFilters('asha', 'Engineering', 'Active');

  expect(result).toHaveLength(1);
  expect(result[0].email).toBe('asha@xyz.com');
});

test('sort by salary descending works', () => {
  const result = employeeService.sortBy('salary', 'desc');

  expect(result[0].salary).toBe(600000);
  expect(result[2].salary).toBe(400000);
});

test('sort by join date ascending works', () => {
  const result = employeeService.sortBy('joinDate', 'asc');

  expect(result[0].id).toBe(2);
  expect(result[2].id).toBe(3);
});

test('remove employee deletes record', () => {
  expect(employeeService.remove(2)).toBe(true);
  expect(employeeService.getById(2)).toBeNull();
});

test('emailExists detects duplicate email', () => {
  expect(employeeService.emailExists('asha@xyz.com')).toBe(true);
});

test('emailExists ignores current record during edit', () => {
  expect(employeeService.emailExists('asha@xyz.com', 1)).toBe(false);
});

test('getById returns correct employee', () => {
  const emp = employeeService.getById(1);

  expect(emp.firstName).toBe('Asha');
});

test('getDepartments returns unique departments', () => {
  const departments = employeeService.getDepartments();

  expect(departments).toContain('Engineering');
  expect(departments).toContain('HR');
});
test('update employee works', () => {
  const updated = employeeService.update(1, { firstName: 'Updated' });

  expect(updated.firstName).toBe('Updated');
});

test('update returns null if not found', () => {
  expect(employeeService.update(999, {})).toBeNull();
});

test('remove returns false if id not found', () => {
  expect(employeeService.remove(999)).toBe(false);
});

test('search is case insensitive', () => {
  const result = employeeService.applyFilters('ASHA');

  expect(result.length).toBe(1);
});

test('filter by department only', () => {
  const result = employeeService.applyFilters('', 'Engineering', 'All');

  expect(result.length).toBe(2);
});