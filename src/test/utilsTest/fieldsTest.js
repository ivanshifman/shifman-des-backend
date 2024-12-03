export const adminUser = {
  first_name: "Admin",
  last_name: "Test",
  email: "admintestNew@gmail.com",
  password: "password123",
  age: 25,
  phone: "+541112345678",
  countryCode: "AR",
  role: "admin",
};

export const regularUser = {
  first_name: "User",
  last_name: "Test",
  email: "usertestNew@gmail.com",
  password: "password123",
  age: 25,
  phone: "+541112345679",
  countryCode: "AR",
  role: "user",
};

export const newProduct = {
  title: "Test Product",
  description: "A test product",
  code: "TEST123",
  price: 100,
  stock: 50,
  category: "kitchen",
};

export const invalidProduct = {
  title: "",
  price: -5,
};

export const updateData = {
  title: "Updated Product",
  price: 120,
};

export const invalidUpdate = {
  price: -10,
};

export const updateDataCart = (productId) => ({
  products: [
    {
      product: productId,
      quantity: 2,
    },
  ],
});

export const updateDataQuantityPositive = { quantity: 3 };

export const updateDataQuantityNegative = { quantity: -1 };
