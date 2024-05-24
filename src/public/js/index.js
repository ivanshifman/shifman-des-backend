const socket = io();

const form = document.querySelector("#form");
const inputTitle = document.querySelector("#title");
const inputDescription = document.querySelector("#description");
const inputCategory = document.querySelector("#category");
const inputCode = document.querySelector("#code");
const inputPrice = document.querySelector("#price");
const inputStock = document.querySelector("#stock");
const errorForm = document.querySelector(".error-container");
const productsNoFind = document.querySelector(".products-no-find");
const productsContent = document.querySelector("#productsContent");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !inputTitle.value ||
    !inputDescription.value ||
    !inputCategory.value ||
    !inputCode.value ||
    !inputPrice.value ||
    !inputStock.value
  ) {
    errorForm.innerHTML = `<p class="text-error">All fields are required</p>`;
    return;
  }
  errorForm.innerHTML = "";

  const product = {
    title: inputTitle.value,
    description: inputDescription.value,
    category: inputCategory.value,
    code: inputCode.value,
    price: parseFloat(inputPrice.value),
    stock: parseInt(inputStock.value),
  };

  socket.emit("newProduct", product);

  form.reset();

  Toastify({
    text: "Product added successfully",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(37,176,34,1) 57%)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".8rem",
      color: "#ccc",
      fontWeight: "600"
    },
    offset: {
      x: "1.5rem",
      y: "1.5rem"
    },
    stopOnFocus: true,
  }).showToast();
});

socket.emit("requestProducts");

socket.on("productsAll", (products) => {
  productsContent.innerHTML = "";
  if (products.length === 0) {
    productsNoFind.innerHTML = `<p class="text-products-without">There are no products</p>`;
    return;
  } else {
    productsNoFind.innerHTML = "";
  }

  products.forEach((prod) => {
    const article = document.createElement("article");
    article.classList.add("product");
    article.innerHTML = `
      <div class="product-text">
        <h3>${prod.title}</h3>
        <p>Category: ${prod.category}</p>
        <p class="price">$${prod.price}</p>
        <button class="btn-delete" id="${prod.id}">Delete</button>
      </div>`;
    productsContent.appendChild(article);
  });

  const btnDelete = document.querySelectorAll(".btn-delete");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const btnId = e.currentTarget.id;
      socket.emit("deleteProduct", btnId);

      Toastify({
        text: "Product deleted successfully",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(176,34,70,1) 57%)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".8rem",
          color: "#ccc",
          fontWeight: "600"
        },
        offset: {
          x: "1.5rem",
          y: "1.5rem"
        },
        stopOnFocus: true,
      }).showToast();
    });
  });
});
