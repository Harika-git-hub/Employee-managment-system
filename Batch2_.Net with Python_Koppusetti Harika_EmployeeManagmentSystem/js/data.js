(function (global) {
  const employees = [
  { id: 1, firstName: 'Arjun', lastName: 'Reddy', email: 'arjun.reddy@techcorp.com', phone: '9123456780', department: 'Software Engineering', designation: 'Senior Backend Engineer', salary: 1200000, joinDate: '2020-06-15', status: 'Active' },
  { id: 2, firstName: 'Sneha', lastName: 'Kapoor', email: 'sneha.kapoor@techcorp.com', phone: '9123456781', department: 'Marketing & Branding', designation: 'Digital Marketing Lead', salary: 850000, joinDate: '2021-03-10', status: 'Active' },
  { id: 3, firstName: 'Rahul', lastName: 'Sharma', email: 'rahul.sharma@techcorp.com', phone: '9123456782', department: 'Sales & Business Development', designation: 'Business Development Manager', salary: 950000, joinDate: '2019-11-25', status: 'Active' },
  { id: 4, firstName: 'Priya', lastName: 'Iyer', email: 'priya.iyer@techcorp.com', phone: '9123456783', department: 'Human Resources', designation: 'HR Business Partner', salary: 780000, joinDate: '2022-01-05', status: 'Active' },
  { id: 5, firstName: 'Karthik', lastName: 'Varma', email: 'karthik.varma@techcorp.com', phone: '9123456784', department: 'Product Development', designation: 'Full Stack Developer', salary: 1100000, joinDate: '2023-07-18', status: 'Active' },
  { id: 6, firstName: 'Ananya', lastName: 'Das', email: 'ananya.das@techcorp.com', phone: '9123456785', department: 'UI/UX Design', designation: 'UX Designer', salary: 720000, joinDate: '2021-09-12', status: 'Active' },
  { id: 7, firstName: 'Vikram', lastName: 'Singh', email: 'vikram.singh@techcorp.com', phone: '9123456786', department: 'Cyber Security', designation: 'Security Analyst', salary: 980000, joinDate: '2020-02-20', status: 'Inactive' },
  { id: 8, firstName: 'Meera', lastName: 'Nair', email: 'meera.nair@techcorp.com', phone: '9123456787', department: 'Customer Experience', designation: 'Customer Success Manager', salary: 690000, joinDate: '2022-05-30', status: 'Active' },
  { id: 9, firstName: 'Rohan', lastName: 'Gupta', email: 'rohan.gupta@techcorp.com', phone: '9123456788', department: 'Business Intelligence', designation: 'Data Analyst', salary: 880000, joinDate: '2023-03-14', status: 'Active' },
  { id: 10, firstName: 'Pooja', lastName: 'Choudhary', email: 'pooja.choudhary@techcorp.com', phone: '9123456789', department: 'Quality Assurance', designation: 'QA Engineer', salary: 650000, joinDate: '2021-08-09', status: 'Inactive' },
  { id: 11, firstName: 'Aditya', lastName: 'Mehta', email: 'aditya.mehta@techcorp.com', phone: '9234567890', department: 'Research & Innovation', designation: 'Research Engineer', salary: 1050000, joinDate: '2019-12-01', status: 'Active' },
  { id: 12, firstName: 'Neha', lastName: 'Agarwal', email: 'neha.agarwal@techcorp.com', phone: '9234567891', department: 'Finance & Accounts', designation: 'Financial Analyst', salary: 820000, joinDate: '2020-07-21', status: 'Active' },
  { id: 13, firstName: 'Siddharth', lastName: 'Jain', email: 'siddharth.jain@techcorp.com', phone: '9234567892', department: 'Operations & Logistics', designation: 'Operations Manager', salary: 910000, joinDate: '2018-10-11', status: 'Active' },
  { id: 14, firstName: 'Kavya', lastName: 'Menon', email: 'kavya.menon@techcorp.com', phone: '9234567893', department: 'Learning & Development', designation: 'Training Specialist', salary: 600000, joinDate: '2022-06-25', status: 'Inactive' },
  { id: 15, firstName: 'Manish', lastName: 'Yadav', email: 'manish.yadav@techcorp.com', phone: '9234567894', department: 'Legal & Compliance', designation: 'Legal Advisor', salary: 990000, joinDate: '2021-04-17', status: 'Active' },
  { id: 16, firstName: 'Ishaan', lastName: 'Khanna', email: 'ishaan.khanna@techcorp.com', phone: '9345678901', department: 'Software Engineering', designation: 'Frontend Developer', salary: 900000, joinDate: '2022-02-14', status: 'Active' },
  { id: 17, firstName: 'Divya', lastName: 'Rao', email: 'divya.rao@techcorp.com', phone: '9345678902', department: 'UI/UX Design', designation: 'UI Designer', salary: 700000, joinDate: '2023-01-10', status: 'Active' },
  { id: 18, firstName: 'Amit', lastName: 'Verma', email: 'amit.verma@techcorp.com', phone: '9345678903', department: 'Cyber Security', designation: 'Security Engineer', salary: 1100000, joinDate: '2020-08-22', status: 'Active' },
  { id: 19, firstName: 'Shruti', lastName: 'Pandey', email: 'shruti.pandey@techcorp.com', phone: '9345678904', department: 'Human Resources', designation: 'HR Executive', salary: 650000, joinDate: '2021-05-11', status: 'Active' },
  { id: 20, firstName: 'Nikhil', lastName: 'Patel', email: 'nikhil.patel@techcorp.com', phone: '9345678905', department: 'Sales & Business Development', designation: 'Sales Manager', salary: 980000, joinDate: '2019-07-19', status: 'Inactive' },
  { id: 21, firstName: 'Swathi', lastName: 'Reddy', email: 'swathi.reddy@techcorp.com', phone: '9345678906', department: 'Customer Experience', designation: 'Customer Support Lead', salary: 720000, joinDate: '2022-09-05', status: 'Active' },
  { id: 22, firstName: 'Harish', lastName: 'Kumar', email: 'harish.kumar@techcorp.com', phone: '9345678907', department: 'Operations & Logistics', designation: 'Logistics Coordinator', salary: 600000, joinDate: '2021-12-01', status: 'Active' },
  { id: 23, firstName: 'Pallavi', lastName: 'Joshi', email: 'pallavi.joshi@techcorp.com', phone: '9345678908', department: 'Finance & Accounts', designation: 'Accounts Manager', salary: 880000, joinDate: '2020-04-16', status: 'Active' },
  { id: 24, firstName: 'Deepak', lastName: 'Sinha', email: 'deepak.sinha@techcorp.com', phone: '9345678909', department: 'Business Intelligence', designation: 'BI Developer', salary: 920000, joinDate: '2023-06-20', status: 'Active' },
  { id: 25, firstName: 'Lakshmi', lastName: 'Narayan', email: 'lakshmi.narayan@techcorp.com', phone: '9345678910', department: 'Learning & Development', designation: 'Training Manager', salary: 750000, joinDate: '2022-03-28', status: 'Inactive' },
  { id: 26, firstName: 'Kiran', lastName: 'Shetty', email: 'kiran.shetty@techcorp.com', phone: '9345678911', department: 'Quality Assurance', designation: 'Test Engineer', salary: 680000, joinDate: '2021-10-10', status: 'Active' },
  { id: 27, firstName: 'Anil', lastName: 'Chowdhury', email: 'anil.chowdhury@techcorp.com', phone: '9345678912', department: 'Product Development', designation: 'Product Engineer', salary: 1050000, joinDate: '2020-01-25', status: 'Active' },
  { id: 28, firstName: 'Reshma', lastName: 'Paul', email: 'reshma.paul@techcorp.com', phone: '9345678913', department: 'Marketing & Branding', designation: 'Content Strategist', salary: 730000, joinDate: '2023-04-12', status: 'Active' },
  { id: 29, firstName: 'Sandeep', lastName: 'Kulkarni', email: 'sandeep.kulkarni@techcorp.com', phone: '9345678914', department: 'Research & Innovation', designation: 'Innovation Lead', salary: 1150000, joinDate: '2019-09-09', status: 'Active' },
  { id: 30, firstName: 'Geetha', lastName: 'Krishnan', email: 'geetha.krishnan@techcorp.com', phone: '9345678915', department: 'Legal & Compliance', designation: 'Compliance Officer', salary: 870000, joinDate: '2021-11-30', status: 'Inactive' }
];


  const admins = [
    { username: 'Harika koppusetti', password: '123456' }
  ];

  const DataStore = { employees, admins };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataStore;
  } else {
    global.DataStore = DataStore;
  }
})(typeof window !== 'undefined' ? window : globalThis);