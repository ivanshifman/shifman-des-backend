// Función auxiliar para validar el correo electrónico
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email);
};

export const validateRegister = (req, res, next) => {
  const { first_name, last_name, email, password, age } = req.body;

  if (typeof first_name !== 'string' || first_name.trim() === '') {
    return res.sendUserError(400, { message: 'First name is required and must be a string.' });
  }

  if (typeof last_name !== 'string' || last_name.trim() === '') {
    return res.sendUserError(400, { message: 'Last name is required and must be a string.' });
  }

  if (!validateEmail(email)) {
    return res.sendUserError(400, { message: 'Valid email is required.' });
  }

  if (typeof password !== 'string' || password.trim() === '') {
    return res.sendUserError(400, { message: 'Password is required and must be a string.' });
  }

  if (typeof age !== 'number' || age < 0) {
    return res.sendUserError(400, { message: 'Age is required and must be a non-negative number.' });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email } = req.body;

  if (!validateEmail(email)) {
    return res.sendUserError(400, { message: 'Valid email is required.' });
  }

  next();
};
