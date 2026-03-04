import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../../../../shared/components/Modal/Modal';
import PersonalDetailsForm from './common/PersonalDetailsForm';

import { showToast } from '../../../../shared/components/Toast/api/toastSlice';
import { editUserSchema } from './validation/userSchemas';
import Button from '../../../../shared/components/UI/Button/Button';
import { updateUser } from './usersThunks';

const EditUserModal = ({
  isOpen = false,
  onClose = () => { },
  userData = {},
  onSave = () => { },
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.loading);



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      userId: userData.userId || '',
      userName: userData.userName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      aadharCardNumber: userData.aadharCardNumber || '',
      pancardNumber: userData.pancardNumber || '',
      address: userData.address || '',
    },
  });

  useEffect(() => {
    reset({
      userId: userData.userId || '',
      userName: userData.userName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      aadharCardNumber: userData.aadharCardNumber || '',
      pancardNumber: userData.pancardNumber || '',
      address: userData.address || '',
    });
  }, [userData, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateUser({ id: userData.id, userData: data })).unwrap();

      dispatch(showToast({
        message: 'User updated successfully',
        type: 'success'
      }));

      onSave(data);
      reset();
      onClose();
    } catch (error) {
      dispatch(showToast({
        message: error?.message || 'Failed to update user',
        type: 'error'
      }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="700px"
      closeOnEsc
      closeOnOverlayClick
      header="Edit User"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <PersonalDetailsForm
          mode="edit"
          register={register}
          errors={errors}
          onClose={onClose}

        />

        <div className="flex gap-3 justify-end pt-6">
          <Button type="button" onClick={onClose} variant="danger">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;