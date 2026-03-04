import React, { useState } from 'react';
import Input from '../../../../../shared/components/UI/Input/Input';
import Button from '../../../../../shared/components/UI/Button/Button';
import copyIcon from "../../../../../assets/Images/Icons/common/copy.png"
import { generateStrongPassword } from '../../../../../utils/PasswordGenerator/PasswordGenerator';



const PasswordForm = ({
  register,
  errors,
  setValue,
  watch,
  isLoading = false
}) => {
  const password = watch("password");
  const [copied, setCopied] = useState(false);



  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();

    setValue("password", newPassword, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };


  const handleCopyPassword = async () => {
    if (!password) return;

    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };



  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-3 items-start">
        <Input
          type="password"
          placeholder="Password"
          value={password || ""}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="button"
          onClick={handleCopyPassword}
          disabled={isLoading || !password}
          title="Copy password"
          variant="icon"
        >
          <img 
          src={copyIcon}
    

          />
          {/* <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg> */}
        </Button>

      </div>

      <Button

        onClick={handleGeneratePassword}
        disabled={isLoading}
      >
        Generate Strong password
      </Button>


    </div>
  );
};

export default PasswordForm;
