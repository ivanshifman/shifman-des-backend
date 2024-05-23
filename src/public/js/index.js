const socket = io();

const form = document.querySelector("#form");
const inputTitle = document.querySelector("#title");
const inputDescription = document.querySelector("#description");
const inputCategory = document.querySelector("#category");
const inputCode = document.querySelector("#code");
const InputPrice = document.querySelector("#price");
const inputStock = document.querySelector("#stock");
const errorForm = document.querySelector(".error-container");
const productsContent = document.querySelector("#productsContent");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !inputTitle.value ||
    !inputDescription.value ||
    !inputCategory.value ||
    !inputCode.value ||
    !InputPrice.value ||
    !inputStock.value
  ) {
    errorForm.innerHTML = `<p class="text-error">todos productos necesarios</p>`;
    return;
  }
  errorForm.innerHTML = "";

  const product = {
    title: inputTitle.value,
    description: inputDescription.value,
    category: inputCategory.value,
    code: inputCode.value,
    price: parseFloat(InputPrice.value),
    stock: parseInt(inputStock.value),
  };

  socket.emit("newProduct", product);

  form.reset();
});

socket.emit("requestProducts");

socket.on("productsAll", (products) => {
  productsContent.innerHTML = "";
  products.forEach((prod) => {
    const article = document.createElement("article");
    article.classList.add("product");
    article.innerHTML = `<div class="product-text">
                            <h3>${prod.title}</h3>
                            <p>Category: ${prod.category}</p>
                            <p class="price">$${prod.price}</p>
                            <button class="btn-delete" id=${prod.id}>Delete</button>
                        </div>`;
    productsContent.appendChild(article);
  });
});
