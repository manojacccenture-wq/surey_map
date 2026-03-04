import { useSelector, useDispatch } from 'react-redux';
import {
  selectUsers,
  selectLoading,
  selectError,
  selectSuccessMessage,
  selectPagination,
} from '../userSlice';

/**
 * Custom hook to get all users from Redux state
 * @returns {Array} Array of user objects
 */
export const useUsers = () => {
  return useSelector(selectUsers);
};

/**
 * Custom hook to get loading state from Redux
 * @returns {Boolean} Loading state
 */
export const useUserLoading = () => {
  return useSelector(selectLoading);
};

/**
 * Custom hook to get error message from Redux
 * @returns {String|null} Error message or null
 */
export const useUserError = () => {
  return useSelector(selectError);
};

/**
 * Custom hook to get success message from Redux
 * @returns {String|null} Success message or null
 */
export const useUserSuccess = () => {
  return useSelector(selectSuccessMessage);
};

/**
 * Custom hook to get pagination info from Redux
 * @returns {Object} Pagination object with page, pageSize, total, totalPages
 */
export const useUserPagination = () => {
  return useSelector(selectPagination);
};

/**
 * Custom hook to get dispatch function
 * @returns {Function} Redux dispatch function
 */
export const useUserDispatch = () => {
  return useDispatch();
};
