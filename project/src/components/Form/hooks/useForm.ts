import { useState } from 'react';
import { UserFormData, FormErrors } from '@/types/user';

export const useForm = (initialData: UserFormData) => {
  const [formData, setFormData] = useState<UserFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.age || formData.age < 13) {
      newErrors.age = 'Age must be 13 or older';
    }
    if (!formData.nickname.trim()) {
      newErrors.nickname = 'Nickname is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.choice.trim()) {
      newErrors.choice = 'Choice is required';
    }
    if (!formData.hobby.trim()) {
      newErrors.hobby = 'Hobby is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value
    }));
  };

  return {
    formData,
    errors,
    validateForm,
    handleChange,
  };
};