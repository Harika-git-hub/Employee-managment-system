const validationService = require('../js/validationService');
const employeeService = require('../js/employeeService');

describe('Validation Service - Employee Form', () => {

  beforeEach(() => {
    jest.restoreAllMocks(); // reset mocks before each test
  });

  test('valid data passes with no errors', () => {
    jest.spyOn(employeeService, 'emailExists').mockReturnValue(false);

    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john1@xyz.com',
      phone: '9876543210',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    expect(validationService.validateEmployeeForm(data)).toEqual({});
  });

  test('missing required fields returns errors', () => {
    const data = {};

    const errors = validationService.validateEmployeeForm(data);

    expect(errors.firstName).toBeDefined();
    expect(errors.lastName).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeDefined();
    expect(errors.department).toBeDefined();
    expect(errors.designation).toBeDefined();
    expect(errors.salary).toBeDefined();
    expect(errors.joinDate).toBeDefined();
    expect(errors.status).toBeDefined();
  });

  test('invalid email format returns error', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      phone: '9876543210',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.email).toBe('Enter a valid email address.');
  });

  test('duplicate email returns error', () => {
    jest.spyOn(employeeService, 'emailExists').mockReturnValue(true);

    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'duplicate@xyz.com',
      phone: '9876543210',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.email).toBe('Email already exists.');
  });

  test('invalid phone returns error', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john2@xyz.com',
      phone: '12345',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.phone).toBe('Phone must be exactly 10 digits.');
  });

  test('invalid salary returns error', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john3@xyz.com',
      phone: '9876543210',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: -100,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.salary).toBe('Salary must be a positive number.');
  });

  test('invalid department returns error', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john4@xyz.com',
      phone: '9876543210',
      department: 'Random Dept',
      designation: 'Developer',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.department).toBe('Please select a valid department.');
  });

  test('invalid status returns error', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john5@xyz.com',
      phone: '9876543210',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Unknown'
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.status).toBe('Please select a valid status.');
  });

  test('invalid join date format returns error', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john6@xyz.com',
      phone: '9876543210',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 500000,
      joinDate: '01-01-2023',
      status: 'Active'
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.joinDate).toBe('Join Date must be in YYYY-MM-DD format.');
  });
});


// ✅ EXTRA TESTS TO REACH 44

describe('Validation Service - Additional Coverage', () => {

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(employeeService, 'emailExists').mockReturnValue(false);
  });

  test('trims whitespace in fields', () => {
    const data = {
      firstName: '  John  ',
      lastName: '  Doe ',
      email: 'unique1@xyz.com',
      phone: '9876543210',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    expect(validationService.validateEmployeeForm(data)).toEqual({});
  });

  test('zero salary should fail', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'unique2@xyz.com',
      phone: '9876543210',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 0,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.salary).toBeDefined();
  });

  test('very large salary passes', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'unique3@xyz.com',
      phone: '9876543210',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 999999999,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    expect(validationService.validateEmployeeForm(data)).toEqual({});
  });

  test('phone with letters should fail', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'unique4@xyz.com',
      phone: '98765abcd0',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.phone).toBeDefined();
  });

  test('empty status should fail', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'unique5@xyz.com',
      phone: '9876543210',
      department: 'Software Engineering',
      designation: 'Developer',
      salary: 500000,
      joinDate: '2023-01-01',
      status: ''
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.status).toBeDefined();
  });

  test('empty department should fail', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'unique6@xyz.com',
      phone: '9876543210',
      department: '',
      designation: 'Developer',
      salary: 500000,
      joinDate: '2023-01-01',
      status: 'Active'
    };

    const errors = validationService.validateEmployeeForm(data);
    expect(errors.department).toBeDefined();
  });

});