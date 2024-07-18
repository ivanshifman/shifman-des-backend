export const validateRegister = (req, res, next) => {
    const { first_name, last_name, email, password, age } = req.body;
  
    if (typeof first_name !== 'string' || first_name.trim() === '') {
      return res.status(400).send({ message: 'First name is required and must be a string.' });
    }
    
    if (typeof last_name !== 'string' || last_name.trim() === '') {
      return res.status(400).send({ message: 'Last name is required and must be a string.' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
      return res.status(400).send({ message: 'Valid email is required.' });
    }
    
    if (typeof password !== 'string' || password.trim() === '') {
      return res.status(400).send({ message: 'Password is required and must be a string.' });
    }
    
    if (typeof age !== 'number' || age < 0) {
      return res.status(400).send({ message: 'Age is required and must be a non-negative number.' });
    }
  
    next();
  };
  