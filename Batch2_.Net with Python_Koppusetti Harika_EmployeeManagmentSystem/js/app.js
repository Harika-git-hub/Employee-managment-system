(function () {
  let currentState = {
    search: '',
    department: 'All',
    status: 'All',
    sortField: '',
    sortDirection: 'asc',
    sortValue: ''
  };

  /**
   * Guards protected sections and redirects unauthenticated users.
   * @param {string} viewId Section id to show after auth succeeds.
   */
  function navigateToProtectedView(viewId) {
    if (!authService.isLoggedIn()) {
      uiService.showAuthShell();
      uiService.switchAuthView('login');
      uiService.showInlineErrors(uiService.getSelectors().loginForm, {});
      uiService.showInlineErrors(uiService.getSelectors().signupForm, {});
      return;
    }

    uiService.showProtectedView(viewId);
  }

  /**
   * Re-renders dashboard widgets from the latest employee dataset.
   */
  function refreshDashboard() {
    uiService.renderDashboardCards(dashboardService.getSummary());
    uiService.renderDepartmentBreakdown(dashboardService.getDepartmentBreakdown());
    uiService.renderRecentEmployees(dashboardService.getRecentEmployees(5));
  }

  /**
   * Applies all active search, filter, and sort criteria.
   * @returns {Array<Object>} Processed employee collection.
   */
  function getProcessedEmployees() {
    let employees = employeeService.applyFilters(currentState.search, currentState.department, currentState.status);

    if (currentState.sortField) {
      employees = employeeService.sortBy(currentState.sortField, currentState.sortDirection, employees);
    }

    return employees;
  }

  /**
   * Re-renders the employee list view with the current UI state.
   */
  function refreshEmployeeList() {
    uiService.showLoader();

    window.setTimeout(function () {
      uiService.renderEmployeeTable(getProcessedEmployees());
      uiService.populateDepartmentFilter(employeeService.getDepartments());
      uiService.syncFilterControls(currentState);
      uiService.hideLoader();
    }, 120);
  }

  /**
   * Re-renders all dashboard and employee list UI regions.
   */
  function refreshAll() {
    refreshDashboard();
    refreshEmployeeList();
  }

  /**
   * Updates the in-memory filter state from UI controls.
   */
  function syncStateFromControls() {
    currentState.search = uiService.getSearchQuery();
    currentState.department = uiService.getDepartmentFilterValue();
    currentState.status = uiService.getStatusFilterValue();
    currentState.sortValue = uiService.getSortValue();

    if (!currentState.sortValue) {
      currentState.sortField = '';
      currentState.sortDirection = 'asc';
      return;
    }

    const [field, direction] = currentState.sortValue.split('-');
    currentState.sortField = field;
    currentState.sortDirection = direction;
  }

  /**
   * Handles signup submission.
   * @returns {void}
   */
  function handleSignup() {
    const formSelector = uiService.getSelectors().signupForm;
    const formData = uiService.getSignupFormData();
    const errors = validationService.validateAuthForm(formData, 'signup');

    uiService.showInlineErrors(formSelector, errors);
    if (Object.keys(errors).length) return;

    const result = authService.signup(formData.username, formData.password);
    if (!result.success) {
      uiService.showInlineErrors(formSelector, { general: result.message });
      return;
    }

    uiService.showToast('Signup successful. Redirecting to login...', 'success');
    uiService.clearForm(formSelector);
    window.setTimeout(function () {
      uiService.switchAuthView('login');
    }, 850);
  }

  /**
   * Handles login submission.
   * @returns {void}
   */
  function handleLogin() {
    const formSelector = uiService.getSelectors().loginForm;
    const formData = uiService.getLoginFormData();
    const errors = validationService.validateAuthForm(formData, 'login');

    uiService.showInlineErrors(formSelector, errors);
    if (Object.keys(errors).length) return;

    const result = authService.login(formData.username, formData.password);
    if (!result.success) {
      uiService.showInlineErrors(formSelector, { general: result.message });
      return;
    }

    uiService.showToast('Login successful.', 'success');
    uiService.clearForm(formSelector);
    navigateToProtectedView('dashboardSection');
    refreshAll();
  }

  /**
   * Handles create/update employee form submission.
   * @returns {void}
   */
  function handleEmployeeSave() {
    const formSelector = uiService.getSelectors().employeeForm;
    const formData = uiService.getEmployeeFormData();
    const errors = validationService.validateEmployeeForm(formData);

    uiService.showInlineErrors(formSelector, errors);
    if (Object.keys(errors).length) return;

    if (formData.id) {
      employeeService.update(Number(formData.id), formData);
      uiService.showToast('Employee updated successfully.', 'success');
    } else {
      employeeService.add(formData);
      uiService.showToast('Employee added successfully.', 'success');
    }

    uiService.hideEmployeeModal();
    uiService.clearForm(formSelector);
    refreshAll();
    navigateToProtectedView('dashboardSection');
  }

  /**
   * Handles employee deletion confirmation.
   */
  function handleEmployeeDelete() {
    employeeService.remove(uiService.getPendingDeleteId());
    uiService.hideDeleteModal();
    uiService.showToast('Employee deleted successfully.', 'success');
    refreshAll();
  }

  /**
   * Registers all event handlers.
   */
  function bindEvents() {
    const selectors = uiService.getSelectors();

    uiService.bindEvent(selectors.signupForm, 'submit', function (event) {
      event.preventDefault();
      handleSignup();
    });

    uiService.bindEvent(selectors.loginForm, 'submit', function (event) {
      event.preventDefault();
      handleLogin();
    });

    uiService.bindEvent(selectors.employeeForm, 'submit', function (event) {
      event.preventDefault();
      handleEmployeeSave();
    });

    uiService.bindEvent('#showSignup', 'click', function (event) {
      event.preventDefault();
      uiService.switchAuthView('signup');
    });

    uiService.bindEvent('#showLogin', 'click', function (event) {
      event.preventDefault();
      uiService.switchAuthView('login');
    });

    uiService.bindEvent(selectors.navLinks, 'click', function (event) {
      event.preventDefault();
      navigateToProtectedView($(this).data('view'));
    });

    uiService.bindEvent('#logoutBtn', 'click', function () {
      authService.logout();
      uiService.showToast('Logged out successfully.', 'success');
      navigateToProtectedView('dashboardSection');
    });

    uiService.bindEvent('#addEmployeeBtn', 'click', function () {
      uiService.clearForm(selectors.employeeForm);
      uiService.showModal('add');
    });

    uiService.bindEvent(selectors.searchInput, 'input', function () {
      syncStateFromControls();
      refreshEmployeeList();
    });

    uiService.bindEvent(selectors.departmentFilter, 'change', function () {
      syncStateFromControls();
      refreshEmployeeList();
    });

    uiService.bindEvent(selectors.statusFilter, 'change', function () {
      syncStateFromControls();
      refreshEmployeeList();
    });

    uiService.bindEvent(selectors.sortSelect, 'change', function () {
      syncStateFromControls();
      refreshEmployeeList();
    });

    uiService.bindEvent(document, 'click', '.action-view', function () {
      const employee = employeeService.getById($(this).data('id'));
      if (employee) {
        uiService.showModal('view', employee);
      }
    });

    uiService.bindEvent(document, 'click', '.action-edit', function () {
      const employee = employeeService.getById($(this).data('id'));
      if (!employee) return;
      uiService.clearForm(selectors.employeeForm);
      uiService.showModal('edit', employee);
    });

    uiService.bindEvent(document, 'click', '.action-delete', function () {
      const employee = employeeService.getById($(this).data('id'));
      if (employee) {
        uiService.showModal('delete', employee);
      }
    });

    uiService.bindEvent('#confirmDeleteBtn', 'click', function () {
      handleEmployeeDelete();
    });

    uiService.bindEvent(document, 'input', `${selectors.loginForm} .form-control, ${selectors.signupForm} .form-control, ${selectors.employeeForm} .form-control, ${selectors.employeeForm} .form-select`, function () {
      uiService.clearFieldError(this);
    });

    uiService.bindEvent(document, 'change', `${selectors.employeeForm} .form-select`, function () {
      uiService.clearFieldError(this);
    });
  }

  $(function () {
    bindEvents();
    navigateToProtectedView('dashboardSection');
    refreshAll();
  });
})();
