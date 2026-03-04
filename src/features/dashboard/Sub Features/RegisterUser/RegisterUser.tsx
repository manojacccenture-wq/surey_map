import SummaryCards from "@/features/dashboard/Sub Features/RegisterUser/components/SummaryCards"

const Users = () => {
  return (
    <>

      <div className="w-full">
        <SummaryCards /* cards={summaryCardsData}  *//>
      </div>


    <div>
      Users
    </div>

    </>
  )
}

export default Users




// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import SummaryHeader from './components/SummaryHeader';
// import SummaryCards from './components/SummaryCards';
// import UserListHeader from './components/UserListHeader';
// import UserListFilters from './components/UserListFilters';
// import UserListTable from './components/UserListTable';
// import Pagination from './components/Pagination';
// import AddUserModal from './AddUserModal';
// import EditUserModal from './EditUserModal';
// import ResetPasswordModal from './ResetPasswordModal';
// import ConfirmModal from '../../../../shared/components/ConfirmModal/ConfirmModal';
// import total_user from "../../../../assets/Images/Page_Image/Dashboard/User/Total_User.png"

// import { useListView } from './hooks/useListView';
// import { useUserLoading, useUsers } from './hooks/useUserHooks';

// import { showToast } from '../../../../shared/components/Toast/api/toastSlice';

// import { userManagementConfig } from './config/config';
// import { fetchUsers,deleteUser } from './usersThunks';

// const Users = () => {
//   const dispatch = useDispatch();
//   const reduxUsers = useUsers();
//   const isLoading = useUserLoading();

//   const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [userToResetPassword, setUserToResetPassword] = useState(null);

//   // Fetch users on component mount
//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);
//   const userData = reduxUsers;
  
//   const listView = useListView(userData);
  
//   if (isLoading) {
//     return <div>Loading users...</div>;
//   }


//   const summaryCardsData = [
//     {
//       label: 'Total User',
//       value: userData?.length?.toString(),
//       valueColor: '#6100FF',
//       iconBg: '#6100FF',
//       icon: total_user
//     },

//     {
//       label: 'Super Admin',
//       value: userData
//         ?.filter((u) => {
//           return u.role === 'superadmin';
//         })
//         ?.length
//         ?.toString(),
//       valueColor: '#2ECC71',
//       iconBg: '#2ECC71',
//       icon: total_user
//     },

//     {
//       label: 'Admin',
//       value: userData?.filter(u => u.role === 'admin').length?.toString(),
//       valueColor: '#FFA800',
//       iconBg: '#FFA800',
//       icon: total_user
//     },
//     {
//       label: 'Users',
//       value: userData?.filter(u => u.role !== 'Supervisor')?.length?.toString(),
//       valueColor: '#0099ff',
//       iconBg: '#0099ff',
//       icon: total_user
//     },
//   ];

//   const handleTabChange = (tabId) => {
//     listView.setActiveFilter(tabId);
//     listView.setCurrentPage(1);
//   };

//   const handleSearchChange = (value) => {
//     listView.setSearchTerm(value);
//     listView.setCurrentPage(1);
//   };

//   const handleViewClick = (user) => {
//   };

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setIsEditModalOpen(true);
//   };

//   const handleDeleteClick = (user) => {
//     setUserToDelete(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (userToDelete) {
//       try {
//         await dispatch(deleteUser(userToDelete.id)).unwrap();
//         dispatch(showToast({ message: 'User deleted successfully', type: 'success' }));
//       } catch (error) {
//         dispatch(showToast({ message: error?.message || 'Failed to delete user', type: 'error' }));
//       }
//     }
//     setIsDeleteModalOpen(false);
//     setUserToDelete(null);
//   };

//   const handlePasswordClick = (user) => {
//     setUserToResetPassword(user);
//     setIsResetPasswordModalOpen(true);
//   };

//   const handleResetPasswordSave = (formData) => {
//     // Toast is handled in ResetPasswordModal component
//     setIsResetPasswordModalOpen(false);
//     setUserToResetPassword(null);
//   };

//   const handleFilterClick = () => {
//   };

//   const handleAddClick = () => {
//     setIsAddUserModalOpen(true);
//   };

//   const handleEditSave = (formData) => {

//     setIsEditModalOpen(false);
//     setSelectedUser(null);
//   };

//   const handlePageChange = (page) => {
//     listView.setCurrentPage(page);
//   };


//   return (
//     <div className="grid gap-8 p-2 md:p-2">

//       <div className="w-full">
//         <SummaryHeader handleAddClick={handleAddClick} />
//       </div>

//       {/* ================= SUMMARY CARDS ================= */}
//       <div className="w-full">
//         <SummaryCards cards={summaryCardsData} />
//       </div>

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="grid gap-6">

//         {/* ================= FILTERS ================= */}
//         <UserListFilters
//           tabs={userManagementConfig.filters}
//           activeTab={listView.activeFilter}
//           onTabChange={handleTabChange}
//           searchValue={listView.searchTerm}
//           onSearchChange={handleSearchChange}
//           onFilterClick={handleFilterClick}
//           totalCount={userData.length}
//         />

//         {/* ================= HEADER + ADD BUTTON ================= */}
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

//           <UserListHeader title="" subtitle="" />


//         </div>

//         {/* ================= TABLE ================= */}
//         <div className="w-full overflow-x-auto">
//           <UserListTable
//             columns={userManagementConfig.columns}
//             data={listView.paginatedData()}
//             onViewClick={handleViewClick}
//             onEditClick={handleEditClick}
//             onDeleteClick={handleDeleteClick}
//             onPasswordClick={handlePasswordClick}
//             showActions={true}
//           />
//         </div>

//         {/* ================= PAGINATION ================= */}
//         <div >
//           <Pagination
//             currentPage={listView.currentPage}
//             totalPages={listView.totalPages}
//             onPageChange={handlePageChange}
//             itemsPerPage={listView.itemsPerPage}
//             totalCount={listView.totalCount}
//           />
//         </div>

//       </div>

//       <AddUserModal
//         isOpen={isAddUserModalOpen}
//         onClose={() => setIsAddUserModalOpen(false)}
//       />

//       <EditUserModal
//         isOpen={isEditModalOpen}
//         onClose={() => {
//           setIsEditModalOpen(false);
//           setSelectedUser(null);
//         }}
//         userData={selectedUser || {}}
//         onSave={handleEditSave}
//       />

//       <ConfirmModal
//         isOpen={isDeleteModalOpen}
//         title="Are you sure want to delete?"
//         description={`This will permanently delete ${userToDelete?.username || 'this user'}'s account. This action cannot be undone.`}
//         confirmText="Yes"
//         cancelText="Cancel"
//         variant="danger"
//         onConfirm={handleDeleteConfirm}
//         onCancel={() => {
//           setIsDeleteModalOpen(false);
//           setUserToDelete(null);
//         }}
//       />

//       <ResetPasswordModal
//         isOpen={isResetPasswordModalOpen}
//         onClose={() => {
//           setIsResetPasswordModalOpen(false);
//           setUserToResetPassword(null);
//         }}
//         userData={userToResetPassword || {}}
//         onSave={handleResetPasswordSave}
//       />
//     </div>
//   );

// };

// export default Users;



