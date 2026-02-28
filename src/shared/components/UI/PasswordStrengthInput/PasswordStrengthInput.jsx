import React, { useState, useMemo, useRef, forwardRef } from 'react';
import Input from '../Input/Input';

const DEFAULT_REQUIREMENTS = [
  {
    label: 'Uppercase and lowercase letter',
    test: (pwd) => /(?=.*[a-z])(?=.*[A-Z])/.test(pwd),
  },
  {
    label: 'Special characters',
    test: (pwd) => /(?=.*[^A-Za-z\d])/.test(pwd),
  },
  {
    label: 'Must have at least 12-16 characters',
    test: (pwd) => pwd.length >= 12,
  },
];

const DEFAULT_STRENGTH_LABELS = {
  weak: 'Weak',
  medium: 'Fair',
  good: 'Good',
  strong: 'Strong',
  veryStrong: 'Very Strong',
};

const DEFAULT_STRENGTH_COLORS = {
  weak: '#F44444',
  medium: '#FFA500',
  good: '#2ECC71',
  strong: '#2ECC71',
  veryStrong: '#00BFA6',
};

const defaultEvaluator = (password, requirements) => {
  if (!password) return null;

  const metRequirements = requirements.filter((req) => req.test(password)).length;
  const length = password.length;
  const percentageByRequirements = (metRequirements / requirements.length) * 100;

  let level = 'weak';
  let score = 0;

  if (metRequirements === 3 && length >= 16) {
    level = 'veryStrong';
    score = 100;
  } else if (metRequirements === 3) {
    level = 'strong';
    score = 75;
  } else if (metRequirements === 2 || length >= 12) {
    level = 'good';
    score = 50;
  } else if (metRequirements === 1 || length >= 8) {
    level = 'medium';
    score = 25;
  } else {
    level = 'weak';
    score = 0;
  }

  return {
    score,
    level,
    percentage: percentageByRequirements,
    metCount: metRequirements,
    totalCount: requirements.length,
  };
};

const PasswordStrengthInput = forwardRef(
  (
    {
      value: controlledValue,
      onChange,
      onFocus,
      onBlur,
      showStrength = true,
      evaluator = null,
      rules = DEFAULT_REQUIREMENTS,
      strengthLabels = DEFAULT_STRENGTH_LABELS,
      strengthColors = DEFAULT_STRENGTH_COLORS,
      overlayClassName = '',
      hideOnBlur = false,
      error = false,
      helperText = '',
      disabled = false,
      label = '',
      placeholder = '',
      className = '',
      containerClass = '',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(controlledValue || '');
    const isControlled = controlledValue !== undefined;
    const password = isControlled ? controlledValue : internalValue;
    const containerRef = useRef(null);

    const strengthData = useMemo(() => {
      if (!password) return null;

      const result = evaluator
        ? evaluator(password)
        : defaultEvaluator(password, rules);

      if (!result) return null;

      const colorKey = result.level;
      const labelKey = result.level;

      return {
        ...result,
        label: strengthLabels[labelKey] || strengthLabels.weak,
        color: strengthColors[colorKey] || strengthColors.weak,
        requirements: rules.map((req) => ({
          ...req,
          met: req.test(password),
        })),
      };
    }, [password, evaluator, rules, strengthLabels, strengthColors]);

    const handleInputChange = (e) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const handleFocus = (e) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e);
      }
    };

    const showOverlay = showStrength && isFocused && password && strengthData;

    return (
      <div
        ref={containerRef}
        className={`relative w-full ${containerClass}`}
      >
        <Input
          ref={ref}
          type="password"
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          disabled={disabled}
          className={className}
          value={password}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {showOverlay && (
          <div
            className={`absolute top-full left-0 mt-[8px] z-50 w-auto pointer-events-auto ${overlayClassName}`}
            role="status"
            aria-live="polite"
            aria-label={`Password strength: ${strengthData.label}`}
          >
            <div className="relative">
              <div className="absolute -top-[8px] left-[20px] w-[16px] h-[8px]">
                <svg
                  viewBox="0 0 16 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path d="M8 0L16 8H0L8 0Z" fill="white" />
                </svg>
              </div>

              <div
                className="bg-white rounded-[8px] shadow-[0px_4px_12px_0px_rgba(63,70,86,0.1)] p-[16px] w-[376px]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-[12px]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="font-['Outfit',sans-serif] font-normal text-[16px] leading-[20px] text-[#333333]">
                      <p>{strengthData.label}</p>
                    </div>
                    <div className="h-[6px] overflow-hidden relative rounded-[50px] w-[340px] bg-[#f3f5f9]">
                      <div
                        className="h-full rounded-[50px] transition-all duration-300 ease-out"
                        style={{
                          width: `${strengthData.percentage}%`,
                          backgroundColor: strengthData.color,
                        }}
                      />
                    </div>
                  </div>

                  <div className="font-['Outfit',sans-serif] font-normal text-[16px] leading-[20px] text-[#595d62]">
                    <p>Password must contain:</p>
                  </div>

                  <div className="flex flex-col gap-[12px]">
                    {strengthData.requirements.map((req, idx) => (
                      <div key={idx} className="flex gap-[8px] items-center">
                        <div
                          className={`relative shrink-0 size-[16px] rounded-[4px] border border-solid transition-all duration-200 ${
                            req.met
                              ? 'bg-[#00bfa6] border-[#00bfa6]'
                              : 'border-[#cbced6] bg-white'
                          }`}
                        >
                          {req.met && (
                            <svg
                              className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 size-[14px] text-white"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 11-1.06-1.06l7.25-7.25a.75.75 0 011.06 0z" />
                            </svg>
                          )}
                        </div>
                        <div className="font-['Outfit',sans-serif] font-normal text-[16px] leading-[20px] text-[#595d62]">
                          <p>{req.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordStrengthInput.displayName = 'PasswordStrengthInput';

export default PasswordStrengthInput;
