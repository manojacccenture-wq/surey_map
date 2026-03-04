import React from 'react';
import Select from '../../../../../shared/components/UI/Select/Select';

const SelectVendorStep = ({ watch, setValue, errors }) => {

  const selectedRole = watch("role");
  const selectedVendor = watch("vendor");

  const roles = [
    "superadmin",
    "admin",
    "user"
  ];

  const vendors = [
    "Vendor1",
    "Vendor2",
    "Vendor3",
    "Vendor4",
    "Vendor5",
    "Vendor6"
  ];

  return (
    <div className="flex flex-col gap-8 w-full">

      {/* ===== ROLE DROPDOWN ===== */}
      <div className="flex flex-col gap-2">
  
        <Select
          label="Select Role"
          value={selectedRole}
          onChange={(e) =>
            setValue("role", e.target.value, {
              shouldValidate: true,
              shouldDirty: true
            })
          }
          options={roles}
          error={errors.role}
          helperText={errors.role?.message}
        />

    
      </div>

      {/* ===== VENDOR DROPDOWN ===== */}
      <div className="flex flex-col gap-2">


        <Select
          label="Select Vendor"
          value={selectedVendor}
          onChange={(e) =>
            setValue("vendor", e.target.value, {
              shouldValidate: true,
              shouldDirty: true
            })
          }
          options={vendors}
          error={errors.vendor}
          helperText={errors.vendor?.message}
        />

    
      </div>

    </div>
  );
};

export default SelectVendorStep;