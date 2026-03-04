import apiClient from "../../../../../services/apiClient";
import { http } from "../../../../../services/httpClient";
import * as usersMock from "../../../../../mocks/users.mock";

const API_ENDPOINTS = {
  USERS: "/users",
  USER_BY_ID: (id) => `/users/${id}`,
  RESET_PASSWORD: (id) => `/users/${id}/reset-password`,
};

const userService = {
  // Get Users
  getUsers: (filters = {}) =>
    http(
      () =>
        apiClient.get(API_ENDPOINTS.USERS, {
          params: filters,
        }),
      () => usersMock.getUsers(filters)
    ),

  // Get Single User
  getUserById: (id) =>
    http(
      () => apiClient.get(API_ENDPOINTS.USER_BY_ID(id)),
      () => usersMock.getUserById(id)
    ),

  // Create User
  createUser: (userData) =>
    http(
      () => apiClient.post(API_ENDPOINTS.USERS, userData),
      () => usersMock.createUser(userData)
    ),

  // Update User
  updateUser: (id, userData) =>
    http(
      () => apiClient.put(API_ENDPOINTS.USER_BY_ID(id), userData),
      () => usersMock.updateUser(id, userData)
    ),

  // Delete User
  deleteUser: (id) =>
    http(
      () => apiClient.delete(API_ENDPOINTS.USER_BY_ID(id)),
      () => usersMock.deleteUser(id)
    ).then(() => id),

  // Reset Password
  resetPassword: (id, password) =>
    http(
      () =>
        apiClient.post(API_ENDPOINTS.RESET_PASSWORD(id), {
          password,
        }),
      () => usersMock.resetPassword(id, password)
    ),
};

export default userService;