const storageService = require('../js/storageService');
const dashboardService = require('../js/dashboardService');

beforeEach(() => {
  storageService.__setEmployees([
    {
      id: 1,
      firstName: 'A',
      lastName: 'A',
      email: 'a@xyz.com',
      phone: '9876543210',
      department: 'Engineering',
      designation: 'Dev',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Active'
    },
    {
      id: 2,
      firstName: 'B',
      lastName: 'B',
      email: 'b@xyz.com',
      phone: '9876543211',
      department: 'HR',
      designation: 'HR',
      salary: 400000,
      joinDate: '2022-01-01',
      status: 'Inactive'
    },
    {
      id: 3,
      firstName: 'C',
      lastName: 'C',
      email: 'c@xyz.com',
      phone: '9876543212',
      department: 'Engineering',
      designation: 'QA',
      salary: 600000,
      joinDate: '2024-01-01',
      status: 'Active'
    }
  ]);
});

test('getSummary returns correct counts', () => {
  expect(dashboardService.getSummary()).toEqual({
    total: 3,
    active: 2,
    inactive: 1,
    departments: 2
  });
});

test('getDepartmentBreakdown returns correct department totals', () => {
  expect(dashboardService.getDepartmentBreakdown()).toEqual({
    Engineering: 2,
    HR: 1
  });
});

test('getRecentEmployees returns last n by highest id', () => {
  const result = dashboardService.getRecentEmployees(2);

  expect(result[0].id).toBe(3);
  expect(result[1].id).toBe(2);
});

test('getRecentEmployees respects requested limit', () => {
  expect(dashboardService.getRecentEmployees(1)).toHaveLength(1);
});
test('empty employees returns zero summary', () => {
  storageService.__setEmployees([]);

  expect(dashboardService.getSummary()).toEqual({
    total: 0,
    active: 0,
    inactive: 0,
    departments: 0
  });
});

test('department breakdown empty', () => {
  storageService.__setEmployees([]);

  expect(dashboardService.getDepartmentBreakdown()).toEqual({});
});

test('recent employees empty', () => {
  storageService.__setEmployees([]);

  expect(dashboardService.getRecentEmployees(5)).toEqual([]);
});