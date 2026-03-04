import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Modal from '../../../../shared/components/Modal/Modal';
import AddUserStepper from './AddUserStepper';
import SelectVendorStep from './steps/SelectVendorStep';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import CreatePasswordStep from './steps/CreatePasswordStep';
import Button from '../../../../shared/components/UI/Button/Button';

import { showToast } from '../../../../shared/components/Toast/api/toastSlice';
import { createUserSchema } from './validation/userSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUser } from './usersThunks';

const AddUserModal = ({ isOpen = false, onClose = () => { } }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createUserSchema),
    mode: "onTouched",
    defaultValues: {
      role: '',
      vendor: '',
      userId: '',
      userName: '',
      email: '',
      phone: '',
      aadharCardNumber: '',
      pancardNumber: '',
      address: '',
      password: '',
    },
  });


  const isLoading = useSelector(state => state.user.loading);
  const [currentStep, setCurrentStep] = useState(0);



  const handleStepClick = async (stepIndex) => {

    // Allow going backwards freely
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
      return;
    }

    // If moving forward → validate current step first
    let fieldsToValidate = [];

    if (currentStep === 0) {
      fieldsToValidate = ['role', 'vendor'];
    }

    if (currentStep === 1) {
      fieldsToValidate = [
        'userId',
        'userName',
        'email',
        'phone',
        'aadharCardNumber',
        'pancardNumber',
        'address'
      ];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep(stepIndex);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };



  const handleNext = async () => {
    let fieldsToValidate = [];

    if (currentStep === 0) {
      fieldsToValidate = ['role', 'vendor'];
    }

    if (currentStep === 1) {
      fieldsToValidate = [
        'userId',
        'userName',
        'email',
        'phone',
        'aadharCardNumber',
        'pancardNumber',
        'address'
      ];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };


  const onSubmit = async (data) => {
    try {
      await dispatch(createUser(data)).unwrap();

      dispatch(showToast({
        message: 'User created successfully',
        type: 'success'
      }));

      reset();
      setCurrentStep(0);
      onClose();
    } catch (error) {
      dispatch(showToast({
        message: error?.message || 'Failed to create user',
        type: 'error'
      }));
    }
  };


  // const handleRoleChange = (role) => {
  //   setFormData(prev => ({ ...prev, role }));
  // };

  // const handleVendorChange = (vendor) => {
  //   setFormData(prev => ({ ...prev, vendor }));
  // };

  // const handlePersonalDetailsChange = (detailsData) => {
  //   setFormData(prev => ({ ...prev, ...detailsData }));
  // };

  // const handlePasswordChange = (passwordData) => {
  //   setFormData(prev => ({ ...prev, ...passwordData }));
  // };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SelectVendorStep
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        );
      case 1:
        return (
          <PersonalDetailsStep
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        );
      case 2:
        return (
          <CreatePasswordStep
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="700px"
      closeOnEsc={true}
      closeOnOverlayClick={true}
    >
      {/* Full modal layout */}
      <div className="flex flex-col h-[60vh] max-h-[20%] ">

        {/* Stepper (Fixed) */}
        <div className="pb-6">
          <AddUserStepper
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Scrollable Step Content */}
        <div className="flex-1 overflow-y-auto p-2">
          {renderStepContent()}
        </div>

        {/* Footer (Fixed) */}
        <div className="flex items-center justify-between pt-4 mt-6 border-t border-[var(--color-neutral-20)]">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0 || isLoading}
          >
            Previous
          </Button>

          <Button
            onClick={currentStep === 2 ? handleSubmit(onSubmit) : handleNext}
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : currentStep === 2
                ? 'Create User'
                : 'Next'}
          </Button>
        </div>

      </div>
    </Modal>
  );
};

export default AddUserModal;
