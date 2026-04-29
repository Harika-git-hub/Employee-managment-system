(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./data'));
  } else {
    root.storageService = factory(root.DataStore);
  }
})(typeof window !== 'undefined' ? window : globalThis, function (DataStore) {
  let employeeStore = JSON.parse(JSON.stringify(DataStore.employees || []));
  let adminStore = JSON.parse(JSON.stringify(DataStore.admins || []));

  /**
   * Returns all employee records from the in-memory store.
   * @returns {Array<Object>} Cloned employee collection.
   */
  function getAll() {
    return employeeStore.map((item) => ({ ...item }));
  }

  /**
   * Returns one employee by id.
   * @param {number|string} id Employee id.
   * @returns {Object|null} Matching employee or null.
   */
  function getById(id) {
    const employee = employeeStore.find((item) => item.id === Number(id));
    return employee ? { ...employee } : null;
  }

  /**
   * Adds a new employee to the in-memory store.
   * @param {Object} employee Employee payload.
   * @returns {Object} Saved employee.
   */
  function add(employee) {
    employeeStore.push({ ...employee });
    return { ...employee };
  }

  /**
   * Updates an existing employee.
   * @param {number|string} id Employee id.
   * @param {Object} data Partial employee payload.
   * @returns {Object|null} Updated employee or null when missing.
   */
  function update(id, data) {
    const index = employeeStore.findIndex((item) => item.id === Number(id));
    if (index === -1) return null;
    employeeStore[index] = { ...employeeStore[index], ...data, id: Number(id) };
    return { ...employeeStore[index] };
  }

  /**
   * Removes an employee by id.
   * @param {number|string} id Employee id.
   * @returns {boolean} True when removed.
   */
  function remove(id) {
    const index = employeeStore.findIndex((item) => item.id === Number(id));
    if (index === -1) return false;
    employeeStore.splice(index, 1);
    return true;
  }

  /**
   * Calculates the next auto-increment id.
   * @returns {number} Next employee id.
   */
  function nextId() {
    if (!employeeStore.length) return 1;
    return Math.max(...employeeStore.map((item) => item.id)) + 1;
  }

  /**
   * Returns all admin credentials from memory.
   * @returns {Array<Object>} Cloned admin collection.
   */
  function getAdmins() {
    return adminStore.map((item) => ({ ...item }));
  }

  /**
   * Adds a new admin credential.
   * @param {Object} admin Admin payload.
   * @returns {Object} Saved admin.
   */
  function addAdmin(admin) {
    adminStore.push({ ...admin });
    return { ...admin };
  }

  /**
   * Test helper to seed employees.
   * @param {Array<Object>} data Employee fixture collection.
   */
  function __setEmployees(data) {
    employeeStore = JSON.parse(JSON.stringify(data));
  }

  /**
   * Test helper to seed admins.
   * @param {Array<Object>} data Admin fixture collection.
   */
  function __setAdmins(data) {
    adminStore = JSON.parse(JSON.stringify(data));
  }

  return {
    getAll,
    getById,
    add,
    update,
    remove,
    nextId,
    getAdmins,
    addAdmin,
    __setEmployees,
    __setAdmins
  };
});