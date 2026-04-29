(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./employeeService'));
  } else {
    root.dashboardService = factory(root.employeeService);
  }
})(typeof window !== 'undefined' ? window : globalThis, function (employeeService) {
  /**
   * Computes dashboard summary counts.
   * @returns {{total:number, active:number, inactive:number, departments:number}} Summary object.
   */
  function getSummary() {
    const employees = employeeService.getAll();
    return {
      total: employees.length,
      active: employees.filter((employee) => employee.status === 'Active').length,
      inactive: employees.filter((employee) => employee.status === 'Inactive').length,
      departments: new Set(employees.map((employee) => employee.department)).size
    };
  }

  /**
   * Computes department-wise employee counts.
   * @returns {Object<string, number>} Department totals.
   */
  function getDepartmentBreakdown() {
    return employeeService.getAll().reduce((accumulator, employee) => {
      accumulator[employee.department] = (accumulator[employee.department] || 0) + 1;
      return accumulator;
    }, {});
  }

  /**
   * Returns the latest n employees by highest id.
   * @param {number} n Number of records to return.
   * @returns {Array<Object>} Recent employees.
   */
  function getRecentEmployees(n) {
    return employeeService
      .getAll()
      .sort((a, b) => b.id - a.id)
      .slice(0, n);
  }

  return { getSummary, getDepartmentBreakdown, getRecentEmployees };
});