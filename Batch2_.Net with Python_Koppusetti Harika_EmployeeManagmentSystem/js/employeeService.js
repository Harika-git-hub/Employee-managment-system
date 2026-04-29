(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./storageService'));
  } else {
    root.employeeService = factory(root.storageService);
  }
})(typeof window !== 'undefined' ? window : globalThis, function (storageService) {
  /**
   * Returns all employees.
   * @returns {Array<Object>} Employee collection.
   */
  function getAll() {
    return storageService.getAll();
  }

  /**
   * Returns one employee by id.
   * @param {number|string} id Employee id.
   * @returns {Object|null} Employee record or null.
   */
  function getById(id) {
    return storageService.getById(id);
  }

  /**
   * Adds a new employee with the next id.
   * @param {Object} data Employee payload.
   * @returns {Object} Saved employee.
   */
  function add(data) {
    const employee = { ...data, id: storageService.nextId(), salary: Number(data.salary) };
    return storageService.add(employee);
  }

  /**
   * Updates an existing employee.
   * @param {number|string} id Employee id.
   * @param {Object} data Updated employee payload.
   * @returns {Object|null} Updated employee or null.
   */
  function update(id, data) {
    return storageService.update(id, { ...data, salary: Number(data.salary) });
  }

  /**
   * Deletes an employee.
   * @param {number|string} id Employee id.
   * @returns {boolean} True when removed.
   */
  function remove(id) {
    return storageService.remove(id);
  }

  /**
   * Searches by full name or email.
   * @param {string} query Search text.
   * @param {Array<Object>} [list] Optional source list.
   * @returns {Array<Object>} Filtered employees.
   */
  function search(query, list) {
    const source = list || getAll();
    const term = String(query || '').trim().toLowerCase();
    if (!term) return source;

    return source.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return fullName.includes(term) || employee.email.toLowerCase().includes(term);
    });
  }

  /**
   * Filters employees by department.
   * @param {string} dept Department filter.
   * @param {Array<Object>} [list] Optional source list.
   * @returns {Array<Object>} Filtered employees.
   */
  function filterByDepartment(dept, list) {
    const source = list || getAll();
    if (!dept || dept === 'All') return source;
    return source.filter((employee) => employee.department === dept);
  }

  /**
   * Filters employees by status.
   * @param {string} status Status filter.
   * @param {Array<Object>} [list] Optional source list.
   * @returns {Array<Object>} Filtered employees.
   */
  function filterByStatus(status, list) {
    const source = list || getAll();
    if (!status || status === 'All') return source;
    return source.filter((employee) => employee.status === status);
  }

  /**
   * Applies search, department, and status filters with AND logic.
   * @param {string} searchQuery Search text.
   * @param {string} dept Department filter.
   * @param {string} status Status filter.
   * @returns {Array<Object>} Filtered employees.
   */
  function applyFilters(searchQuery, dept, status) {
    let result = getAll();
    result = search(searchQuery, result);
    result = filterByDepartment(dept, result);
    result = filterByStatus(status, result);
    return result;
  }

  /**
   * Sorts employees by field and direction.
   * @param {'name'|'salary'|'joinDate'} field Sort field.
   * @param {'asc'|'desc'} direction Sort direction.
   * @param {Array<Object>} [list] Optional source list.
   * @returns {Array<Object>} Sorted employees.
   */
  function sortBy(field, direction, list) {
    const source = [...(list || getAll())];
    const multiplier = direction === 'desc' ? -1 : 1;

    source.sort((a, b) => {
      if (field === 'name') {
        return a.lastName.localeCompare(b.lastName) * multiplier;
      }
      if (field === 'salary') {
        return (a.salary - b.salary) * multiplier;
      }
      if (field === 'joinDate') {
        return (new Date(a.joinDate) - new Date(b.joinDate)) * multiplier;
      }
      return 0;
    });

    return source;
  }

  /**
   * Returns unique sorted department names.
   * @returns {string[]} Department list.
   */
  function getDepartments() {
    return [...new Set(getAll().map((employee) => employee.department))].sort();
  }

  /**
   * Checks whether an email already exists.
   * @param {string} email Employee email.
   * @param {number|string} [excludeId] Employee id to exclude during edit.
   * @returns {boolean} True when duplicate exists.
   */
  function emailExists(email, excludeId) {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    return getAll().some((employee) => employee.email.toLowerCase() === normalizedEmail && employee.id !== Number(excludeId));
  }

  return {
    getAll,
    getById,
    add,
    update,
    remove,
    search,
    filterByDepartment,
    filterByStatus,
    applyFilters,
    sortBy,
    getDepartments,
    emailExists
  };
});