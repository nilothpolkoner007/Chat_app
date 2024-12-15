import React, { useState } from 'react';
import { FormInput } from './FormInput';
import { Card } from '../Card';
import { ChatRoom } from '../Chat/ChatRoom';
import { UserFormData, FormErrors } from '@/types/user';
import { registerUser } from '@/services/api';

const initialFormData: UserFormData = {
  name: '',
  age: 0,
  nickname: '',
  instaId: '',
  fbId: '',
  email: '',
  choice: '',
  hobby: '',
};

export function UserForm() {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userId, setUserId] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const userData = await registerUser(formData);
        setUserId(userData._id);
        setIsSubmitted(true);
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          submit: error.message || 'Registration failed'
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value
    }));
  };

  if (isSubmitted && userId) {
    return <ChatRoom currentUser={{ ...formData, id: userId }} />;
  }

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Join Our Community! 👋</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          placeholder="Enter your full name"
        />
        <FormInput
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          error={errors.age}
          required
          placeholder="Enter your age"
        />
        <FormInput
          label="Nickname"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          error={errors.nickname}
          required
          placeholder="What should we call you?"
        />
        <FormInput
          label="Instagram ID"
          name="instaId"
          value={formData.instaId}
          onChange={handleChange}
          placeholder="@yourusername (optional)"
        />
        <FormInput
          label="Facebook ID"
          name="fbId"
          value={formData.fbId}
          onChange={handleChange}
          placeholder="Your Facebook username (optional)"
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          placeholder="your.email@example.com"
        />
        <FormInput
          label="Your Choice"
          name="choice"
          value={formData.choice}
          onChange={handleChange}
          error={errors.choice}
          required
          placeholder="What brings you here?"
        />
        <FormInput
          label="Hobby"
          name="hobby"
          value={formData.hobby}
          onChange={handleChange}
          error={errors.hobby}
          required
          placeholder="What do you love doing?"
        />
        {errors.submit && (
          <p className="text-red-500 text-sm">{errors.submit}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Join Now
        </button>
      </form>
    </Card>
  );
}