export const userManagementConfig = {
  columns: [
    {
      key: 'username',
      label: 'Username',
      render: (value) => value
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => value
    },
    {
      key: 'vendor',
      label: 'Vendor',
      render: (value) => value
    }
  ],

  filters: [
    { id: 'all', label: 'All' },
    { id: 'superadmin', label: 'Super Admin' },
    { id: 'admin', label: 'Admin' },
    { id: 'user', label: 'User' }
  ],

  summaryCards: [
    {
      id: 'totalUser',
      label: 'Total User',
      valueColor: '#6100FF',
      iconBg: '#6100FF'
    },
    {
      id: 'totalStaffs',
      label: 'Total Staffs',
      valueColor: '#6100FF',
      iconBg: '#6100FF'
    },
    {
      id: 'supervisors',
      label: 'Supervisors',
      valueColor: '#2ECC71',
      iconBg: '#2ECC71'
    },
    {
      id: 'cleaners',
      label: 'Cleaners',
      valueColor: '#FFA800',
      iconBg: '#FFA800'
    }
  ]
};

export const tableConfig = {
  showActions: true,
  actionsConfig: {
    view: true,
    edit: true,
    delete: true
  }
};
