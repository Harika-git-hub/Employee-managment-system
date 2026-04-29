Employee Management System


Name: KOPPUSETTI HARIKA
Batch: Batch2  
Project: Employee Management System


Project Description:

This project is a browser-based Employee Management System developed using HTML, CSS, Bootstrap, JavaScript (ES6), and jQuery.
It allows an admin to manage employee records with full CRUD operations.

All data is stored in-memory using JavaScript arrays (data.js).
The project follows a modular architecture using multiple service files.

Features:

1. Admin Authentication
   
   - Signup with validation
   - Login with username and password
   - Logout functionality

2. Dashboard
   
   - Total Employees
   - Active Employees
   - Inactive Employees
   - Employee Distribution
   - Lastest Additions

3. Employee Management
   
   - Add Employee
   - View Employee
   - Edit Employee
   - Delete Employee

4. Search & Filters
   
   - Search by name/email
   - Filter by department
   - Filter by status

5. Sorting
   
   - Sort by Name
   - Sort by Salary
   - Sort by Join Date

Technologies Used:

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- jQuery
- Jest (for testing)


Project Structure:

index.html
css/styles.css

js/
data.js
storageService.js
authService.js
employeeService.js
validationService.js
dashboardService.js
uiService.js
app.js

tests/
employeeService.test.js
authService.test.js
dashboardService.test.js
validationService.test.js

package.json
jest.config.js


How to Run the Project:

1. Extract the ZIP file
2. Open the project folder
3. Double-click index.html
   OR
   Open with Live Server in Visual Studio Code


How to Run Tests:

1. Open terminal in project folder
2. Run: npm install
3. Run: npm test

Important Notes:

- No backend or database is used
- All data is stored in data.js
- No page reloads (SPA behavior using jQuery)
- Modular architecture followed

End of File