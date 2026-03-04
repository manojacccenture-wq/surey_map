import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../shared/components/Modal/Modal';
import PasswordForm from './common/PasswordForm';
import { showToast } from '../../../../shared/components/Toast/api/toastSlice';
import { resetPasswordSchema } from './validation/userSchemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../../../shared/components/UI/Button/Button';
import { resetPassword } from './usersThunks';

const ResetPasswordModal = ({
  isOpen = false,
  onClose = () => { },
  userData = {},
  onSave = () => { }
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.loading);


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: ''
    }
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      reset({ password: '' });
    }
  }, [isOpen, reset]);




  const onSubmit = async (data) => {
    try {
      await dispatch(
        resetPassword({
          id: userData.id,
          password: data.password
        })
      ).unwrap();

      dispatch(showToast({
        message: 'Password reset successfully',
        type: 'success'
      }));

      onSave(data);
      reset();
      onClose();

    } catch (error) {
      dispatch(showToast({
        message: error?.message || 'Failed to reset password',
        type: 'error'
      }));
    }
  };

  const userName = userData.username || userData.userName || 'User';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="628px"
      closeOnEsc={true}
      closeOnOverlayClick={true}
      header={
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium   leading-[22px]">
            Password change
          </p>
          <p className="text-base font-normal   leading-[20px]">
            Set a new password for {userName}
          </p>
        </div>
      }
      showCloseButton={true}
    >

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">

        <PasswordForm
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          isLoading={isLoading}
        />

        <div className="flex justify-end gap-3 pt-6">
          <Button type="button" onClick={onClose} variant="danger">
            Cancel
          </Button>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </div>

      </form>
    </Modal>
  );
};

export default ResetPasswordModal;
