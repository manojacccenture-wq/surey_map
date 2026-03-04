import React, { useState } from 'react';
import Input from '../../../../../shared/components/UI/Input/Input';
import Button from '../../../../../shared/components/UI/Button/Button';

const PersonalDetailsForm = ({
  register, errors,
}) => {


  return (
    <div className="flex flex-col gap-3 w-full">
      <Input
        {...register("userId")}
        type="text"
        placeholder="User ID"
        error={!!errors.userId}
        helperText={errors.userId?.message}

      />
      <Input
        type="text"
        {...register("userName")}
        placeholder="User Name"
        error={!!errors.userName}
        helperText={errors.userName?.message}
      />
      <Input
        type="email"
        {...register("email")}
        placeholder="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Input
        type="tel"
        {...register("phone")}
        placeholder="Phone"
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <Input
        type="text"
        {...register("aadharCardNumber")}
        placeholder="Aadhar card number"
        error={!!errors.aadharCardNumber}
        helperText={errors.aadharCardNumber?.message}
      />
      <Input
        type="text"
        {...register("pancardNumber")}
        placeholder="Pancard number"
        error={!!errors.pancardNumber}
        helperText={errors.pancardNumber?.message}
      />
      <textarea
        {...register("address")}

        placeholder="Address"
        error={!!errors.address}
        className="border-[1.5px] border-solid border-[var(--color-neutral-30)] bg-white rounded-[8px] px-[20px] py-[12px] w-full h-[120px] font-['Outfit',sans-serif] text-[16px] font-normal leading-[20px] text-[var(--color-neutral-40)] placeholder-[var(--color-neutral-40)] focus:outline-none focus:border-[var(--color-secondary)] resize-none"
      />
      {errors.address && (
        <p className="text-red-500 text-sm">{errors.address.message}</p>
      )}


   
    </div>
  );
};

export default PersonalDetailsForm;
