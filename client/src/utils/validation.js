// Validation utilities for form inputs

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateUsername = (username) => {
  return username && username.length >= 3 && username.length <= 20;
};

export const validateSignUpForm = (formData) => {
  const errors = {};

  if (!formData.username?.trim()) {
    errors.username = "Username is required";
  } else if (!validateUsername(formData.username)) {
    errors.username = "Username must be 3-20 characters";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password?.trim()) {
    errors.password = "Password is required";
  } else if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateSignInForm = (formData) => {
  const errors = {};

  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password?.trim()) {
    errors.password = "Password is required";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateTaskForm = (formData) => {
  const errors = {};

  if (!formData.title?.trim()) {
    errors.title = "Task title is required";
  } else if (formData.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }

  if (formData.description && formData.description.length > 500) {
    errors.description = "Description must be less than 500 characters";
  }

  if (formData.dueDate) {
    const dueDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dueDate < today) {
      errors.dueDate = "Due date cannot be in the past";
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};
