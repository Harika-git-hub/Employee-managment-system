(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.uiService = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  const selectors = {
    authSection: '#authSection',
    mainNavbar: '#mainNavbar',
    contentViews: '.content-view',
    loginView: '#loginView',
    signupView: '#signupView',
    navLinks: '.nav-link',
    dashboardCards: '#dashboardCards',
    departmentBreakdown: '#departmentBreakdown',
    recentEmployees: '#recentEmployees',
    recentCountBadge: '#recentCountBadge',
    employeeTableBody: '#employeeTableBody',
    recordCount: '#recordCount',
    departmentFilter: '#departmentFilter',
    searchInput: '#searchInput',
    sortSelect: '#sortSelect',
    statusFilter: 'input[name="statusFilter"]',
    appLoader: '#appLoader',
    toastContainer: '#toastContainer',
    employeeForm: '#employeeForm',
    loginForm: '#loginForm',
    signupForm: '#signupForm',
    deleteEmployeeId: '#deleteEmployeeId',
    deleteMessage: '#deleteMessage',
    viewEmployeeBody: '#viewEmployeeBody',
    employeeModalTitle: '#employeeModalTitle',
    employeeSubmitBtn: '#employeeSubmitBtn',
    employeeModal: '#employeeModal',
    viewEmployeeModal: '#viewEmployeeModal',
    deleteModal: '#deleteModal'
  };

  const fieldSelectors = {
    employeeId: '#employeeId',
    firstName: '#firstName',
    lastName: '#lastName',
    email: '#email',
    phone: '#phone',
    department: '#department',
    designation: '#designation',
    salary: '#salary',
    joinDate: '#joinDate',
    status: '#status',
    loginUsername: '#loginUsername',
    loginPassword: '#loginPassword',
    signupUsername: '#signupUsername',
    signupPassword: '#signupPassword',
    confirmPassword: '#confirmPassword'
  };

  /**
   * Formats a number as Indian Rupee currency.
   * @param {number|string} amount Amount to format.
   * @returns {string} Formatted currency.
   */
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Number(amount || 0));
  }

  /**
   * Safely gets a jQuery object for a selector.
   * @param {string} selector CSS selector.
   * @returns {JQuery<HTMLElement>} jQuery collection.
   */
  function get$(selector) {
    return $(selector);
  }

  /**
   * Returns the configured selector map.
   * @returns {Object<string, string>} Selector configuration.
   */
  function getSelectors() {
    return { ...selectors };
  }

  /**
   * Returns a reusable Bootstrap modal instance.
   * @param {string} selector Modal selector.
   * @returns {bootstrap.Modal} Bootstrap modal instance.
   */
  function getModal(selector) {
    return bootstrap.Modal.getOrCreateInstance(document.querySelector(selector));
  }

  /**
   * Shows the requested application view while guarding auth screens.
   * @param {string} viewId Section id to show.
   */
  function showProtectedView(viewId) {
    get$(selectors.authSection).addClass('d-none');
    get$(selectors.mainNavbar).removeClass('d-none');
    get$(selectors.contentViews).addClass('d-none');
    get$(`#${viewId}`).removeClass('d-none');
    setActiveNav(viewId);
  }

  /**
   * Shows the authentication shell.
   */
  function showAuthShell() {
    get$(selectors.mainNavbar).addClass('d-none');
    get$(selectors.authSection).removeClass('d-none');
    get$(selectors.contentViews).addClass('d-none');
  }

  /**
   * Shows a single auth sub-view.
   * @param {'login'|'signup'} view Auth sub-view name.
   */
  function switchAuthView(view) {
    get$(`${selectors.loginView}, ${selectors.signupView}`).addClass('d-none');
    get$(view === 'signup' ? selectors.signupView : selectors.loginView).removeClass('d-none');
  }

  /**
   * Highlights the active navbar link.
   * @param {string} viewId Active section id.
   */
  function setActiveNav(viewId) {
    get$(selectors.navLinks).removeClass('active');
    get$(`${selectors.navLinks}[data-view="${viewId}"]`).addClass('active');
  }

  /**
   * Reads login form values.
   * @returns {{username: string, password: string}} Login payload.
   */
  function getLoginFormData() {
    return {
      username: get$(fieldSelectors.loginUsername).val(),
      password: get$(fieldSelectors.loginPassword).val()
    };
  }

  /**
   * Reads signup form values.
   * @returns {{username: string, password: string, confirmPassword: string}} Signup payload.
   */
  function getSignupFormData() {
    return {
      username: get$(fieldSelectors.signupUsername).val(),
      password: get$(fieldSelectors.signupPassword).val(),
      confirmPassword: get$(fieldSelectors.confirmPassword).val()
    };
  }

  /**
   * Reads add/edit employee form values.
   * @returns {Object} Employee form payload.
   */
  function getEmployeeFormData() {
    return {
      id: get$(fieldSelectors.employeeId).val(),
      firstName: String(get$(fieldSelectors.firstName).val() || '').trim(),
      lastName: String(get$(fieldSelectors.lastName).val() || '').trim(),
      email: String(get$(fieldSelectors.email).val() || '').trim(),
      phone: String(get$(fieldSelectors.phone).val() || '').trim(),
      department: get$(fieldSelectors.department).val(),
      designation: String(get$(fieldSelectors.designation).val() || '').trim(),
      salary: get$(fieldSelectors.salary).val(),
      joinDate: get$(fieldSelectors.joinDate).val(),
      status: get$(fieldSelectors.status).val()
    };
  }

  /**
   * Reads the current text from the employee search input.
   * @returns {string} Search text.
   */
  function getSearchQuery() {
    return String(get$(selectors.searchInput).val() || '');
  }

  /**
   * Reads the selected department filter.
   * @returns {string} Department filter value.
   */
  function getDepartmentFilterValue() {
    return String(get$(selectors.departmentFilter).val() || 'All');
  }

  /**
   * Reads the selected sort option.
   * @returns {string} Sort value.
   */
  function getSortValue() {
    return String(get$(selectors.sortSelect).val() || '');
  }

  /**
   * Reads the selected status filter.
   * @returns {string} Status filter value.
   */
  function getStatusFilterValue() {
    return String(get$(`${selectors.statusFilter}:checked`).val() || 'All');
  }

  /**
   * Updates all filter controls from state.
   * @param {{department: string, search: string, status: string, sortValue?: string}} state UI state.
   */
  function syncFilterControls(state) {
    get$(selectors.searchInput).val(state.search);
    get$(selectors.departmentFilter).val(state.department);
    get$(`${selectors.statusFilter}[value="${state.status}"]`).prop('checked', true);
    if (typeof state.sortValue === 'string') {
      get$(selectors.sortSelect).val(state.sortValue);
    }
  }

  /**
   * Renders the employee table body.
   * @param {Array<Object>} employees Employees to display.
   */
  function renderEmployeeTable(employees) {
    const $tbody = get$(selectors.employeeTableBody);
    $tbody.empty();

    if (!employees.length) {
      $tbody.append(`
        <tr>
          <td colspan="9" class="text-center py-5 text-muted">No employees found.</td>
        </tr>
      `);
      get$(selectors.recordCount).text('0 Records');
      return;
    }

    employees.forEach((employee) => {
      $tbody.append(`
        <tr>
          <td>${employee.id}</td>
          <td>
            <div class="fw-semibold">${employee.firstName} ${employee.lastName}</div>
            <small class="text-muted">${employee.designation}</small>
          </td>
          <td>${employee.email}</td>
          <td><span class="badge department-badge">${employee.department}</span></td>
          <td>${employee.designation}</td>
          <td>${formatCurrency(employee.salary)}</td>
          <td>${employee.joinDate}</td>
          <td><span class="badge status-badge ${employee.status.toLowerCase()}">${employee.status}</span></td>
          <td class="text-center text-nowrap">
            <button class="btn btn-sm btn-outline-info action-view" data-id="${employee.id}" title="View"><i class="bi bi-eye"></i></button>
            <button class="btn btn-sm btn-outline-primary action-edit" data-id="${employee.id}" title="Edit"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger action-delete" data-id="${employee.id}" title="Delete"><i class="bi bi-trash"></i></button>
          </td>
        </tr>
      `);
    });

    get$(selectors.recordCount).text(`${employees.length} Record${employees.length > 1 ? 's' : ''}`);
  }

  /**
   * Renders dashboard KPI cards.
   * @param {{total:number, active:number, inactive:number, departments:number}} summary Dashboard summary.
   */
  function renderDashboardCards(summary) {
    const cards = [
      { label: 'Total Employees', value: summary.total, icon: 'bi-people-fill', tone: 'primary' },
      { label: 'Active Employees', value: summary.active, icon: 'bi-person-check-fill', tone: 'success' },
      { label: 'Inactive Employees', value: summary.inactive, icon: 'bi-person-dash-fill', tone: 'danger' },
      { label: 'Total Departments', value: summary.departments, icon: 'bi-diagram-3-fill', tone: 'warning' }
    ];

    get$(selectors.dashboardCards).html(cards.map((card) => `
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card kpi-card shadow-sm h-100 tone-${card.tone}">
          <div class="card-body d-flex justify-content-between align-items-center p-4">
            <div>
              <p class="text-muted mb-1">${card.label}</p>
              <h3 class="fw-bold mb-0">${card.value}</h3>
            </div>
            <span class="kpi-icon"><i class="bi ${card.icon}"></i></span>
          </div>
        </div>
      </div>
    `).join(''));
  }

  /**
   * Renders the department-wise employee breakdown.
   * @param {Object<string, number>} data Breakdown map.
   */
  function renderDepartmentBreakdown(data) {
    const entries = Object.entries(data);
    const max = Math.max(...entries.map((item) => item[1]), 1);

    get$(selectors.departmentBreakdown).html(entries.map(([dept, count]) => `
      <div class="department-row">
        <div class="fw-semibold">${dept}</div>
        <div class="department-bar-wrap"><div class="department-bar" style="width:${(count / max) * 100}%"></div></div>
        <div class="text-end fw-semibold">${count}</div>
      </div>
    `).join(''));
  }

  /**
   * Renders the recent employee list.
   * @param {Array<Object>} employees Recent employees.
   */
  function renderRecentEmployees(employees) {
    get$(selectors.recentCountBadge).text(employees.length);
    get$(selectors.recentEmployees).html(employees.map((employee) => `
      <div class="recent-item py-3">
        <div class="d-flex justify-content-between gap-2 align-items-start">
          <div>
            <div class="fw-semibold">${employee.firstName} ${employee.lastName}</div>
            <div class="small text-muted">${employee.designation}</div>
          </div>
          <div class="text-end">
            <span class="badge department-badge mb-1">${employee.department}</span><br>
            <span class="badge status-badge ${employee.status.toLowerCase()}">${employee.status}</span>
          </div>
        </div>
      </div>
    `).join('') || '<p class="text-muted mb-0">No employees available.</p>');
  }

  /**
   * Populates the department filter dropdown.
   * @param {string[]} departments Department names.
   */
  function populateDepartmentFilter(departments) {
    const options = ['<option value="All">All Departments</option>']
      .concat(departments.map((dept) => `<option value="${dept}">${dept}</option>`));
    get$(selectors.departmentFilter).html(options.join(''));
  }

  /**
   * Displays a Bootstrap toast.
   * @param {string} message Toast message.
   * @param {'success'|'danger'|'primary'} type Visual tone.
   */
  function showToast(message, type) {
    const id = `toast-${Date.now()}`;
    const bgClass = type === 'success' ? 'text-bg-success' : type === 'danger' ? 'text-bg-danger' : 'text-bg-primary';
    get$(selectors.toastContainer).append(`
      <div id="${id}" class="toast align-items-center border-0 ${bgClass}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    `);

    const toastEl = document.getElementById(id);
    const toast = new bootstrap.Toast(toastEl, { delay: 2200 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  }

  /**
   * Clears all inline error messages and invalid states for a form.
   * @param {string} formSelector Form selector.
   */
  function clearInlineErrors(formSelector) {
    const $form = get$(formSelector);
    $form.find('.error-text').text('');
    $form.find('.form-control, .form-select').removeClass('is-invalid');
  }

  /**
   * Shows field-level validation errors.
   * @param {string} formSelector Form selector.
   * @param {Object<string, string>} errors Error map.
   */
  function showInlineErrors(formSelector, errors) {
    clearInlineErrors(formSelector);

    Object.entries(errors).forEach(([field, message]) => {
      get$(`${formSelector} [data-error-for="${field}"]`).text(message);
      const $field = get$(`${formSelector} [name="${field}"]`);
      if ($field.length) {
        $field.addClass('is-invalid');
      }
    });
  }

  /**
   * Clears a form and its validation state.
   * @param {string} formSelector Form selector.
   */
  function clearForm(formSelector) {
    const $form = get$(formSelector);
    if ($form.length && $form[0]) {
      $form[0].reset();
    }
    clearInlineErrors(formSelector);
    get$(fieldSelectors.employeeId).val('');
  }

  /**
   * Populates the add/edit employee form with existing data.
   * @param {Object} employee Employee object.
   */
  function populateForm(employee) {
    get$(fieldSelectors.employeeId).val(employee.id);
    get$(fieldSelectors.firstName).val(employee.firstName);
    get$(fieldSelectors.lastName).val(employee.lastName);
    get$(fieldSelectors.email).val(employee.email);
    get$(fieldSelectors.phone).val(employee.phone);
    get$(fieldSelectors.department).val(employee.department);
    get$(fieldSelectors.designation).val(employee.designation);
    get$(fieldSelectors.salary).val(employee.salary);
    get$(fieldSelectors.joinDate).val(employee.joinDate);
    get$(fieldSelectors.status).val(employee.status);
  }

  /**
   * Shows the requested Bootstrap modal.
   * @param {'add'|'edit'|'view'|'delete'} type Modal type.
   * @param {Object} [data] Optional employee payload.
   */
  function showModal(type, data) {
    if (type === 'add') {
      get$(selectors.employeeModalTitle).text('Add Employee');
      get$(selectors.employeeSubmitBtn).text('Save Employee');
      getModal(selectors.employeeModal).show();
      return;
    }

    if (type === 'edit') {
      get$(selectors.employeeModalTitle).text('Edit Employee');
      get$(selectors.employeeSubmitBtn).text('Update Employee');
      populateForm(data);
      getModal(selectors.employeeModal).show();
      return;
    }

    if (type === 'view') {
      get$(selectors.viewEmployeeBody).html(`
        <div class="row g-3">
          <div class="col-md-6"><strong>ID:</strong><br>${data.id}</div>
          <div class="col-md-6"><strong>Full Name:</strong><br>${data.firstName} ${data.lastName}</div>
          <div class="col-md-6"><strong>Email:</strong><br>${data.email}</div>
          <div class="col-md-6"><strong>Phone:</strong><br>${data.phone}</div>
          <div class="col-md-6"><strong>Department:</strong><br>${data.department}</div>
          <div class="col-md-6"><strong>Designation:</strong><br>${data.designation}</div>
          <div class="col-md-6"><strong>Salary:</strong><br>${formatCurrency(data.salary)}</div>
          <div class="col-md-6"><strong>Join Date:</strong><br>${data.joinDate}</div>
          <div class="col-md-6"><strong>Status:</strong><br>${data.status}</div>
        </div>
      `);
      getModal(selectors.viewEmployeeModal).show();
      return;
    }

    if (type === 'delete') {
      get$(selectors.deleteEmployeeId).val(data.id);
      get$(selectors.deleteMessage).text(`Are you sure you want to delete ${data.firstName} ${data.lastName}?`);
      getModal(selectors.deleteModal).show();
    }
  }

  /**
   * Hides the employee form modal.
   */
  function hideEmployeeModal() {
    getModal(selectors.employeeModal).hide();
  }

  /**
   * Hides the delete confirmation modal.
   */
  function hideDeleteModal() {
    getModal(selectors.deleteModal).hide();
  }

  /**
   * Gets the pending delete employee id from the hidden field.
   * @returns {number} Employee id.
   */
  function getPendingDeleteId() {
    return Number(get$(selectors.deleteEmployeeId).val());
  }

  /**
   * Shows the loading overlay.
   */
  function showLoader() {
    get$(selectors.appLoader).removeClass('d-none');
  }

  /**
   * Hides the loading overlay.
   */
  function hideLoader() {
    get$(selectors.appLoader).addClass('d-none');
  }

  /**
   * Binds delegated or direct jQuery events.
   * @param {string|Document} target Event target selector or document.
   * @param {string} eventName Event name.
   * @param {string|Function} selector Delegated selector or handler.
   * @param {Function} [handler] Handler for delegated events.
   */
  function bindEvent(target, eventName, selector, handler) {
    if (typeof selector === 'function') {
      get$(target).on(eventName, selector);
      return;
    }

    get$(target).on(eventName, selector, handler);
  }

  /**
   * Clears the validation state for a single field when user edits it.
   * @param {HTMLElement} element Target form field.
   */
  function clearFieldError(element) {
    const $element = $(element);
    $element.removeClass('is-invalid');
    const fieldName = $element.attr('name');
    if (!fieldName) return;
    $element.closest('form').find(`[data-error-for="${fieldName}"]`).text('');
    $element.closest('form').find('[data-error-for="general"]').text('');
  }

  return {
    getSelectors,
    bindEvent,
    showProtectedView,
    showAuthShell,
    switchAuthView,
    setActiveNav,
    getLoginFormData,
    getSignupFormData,
    getEmployeeFormData,
    getSearchQuery,
    getDepartmentFilterValue,
    getSortValue,
    getStatusFilterValue,
    syncFilterControls,
    renderEmployeeTable,
    renderDashboardCards,
    renderDepartmentBreakdown,
    renderRecentEmployees,
    showModal,
    hideEmployeeModal,
    hideDeleteModal,
    getPendingDeleteId,
    showToast,
    showInlineErrors,
    clearInlineErrors,
    clearForm,
    populateForm,
    populateDepartmentFilter,
    showLoader,
    hideLoader,
    clearFieldError
  };
});