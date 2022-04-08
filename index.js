function removeItems() {
  const containerEl = document.querySelector(".results-container");
  while (containerEl.lastElementChild) {
    containerEl.removeChild(containerEl.lastElementChild);
  }
}

function showResults(results) {
  const container = document.querySelector(".results");
  const template = document.querySelector("#template-result");

  for (const r of results) {
    const titleEl = template.content.querySelector(".result-item-title");
    titleEl.textContent = r.title;

    const priceEl = template.content.querySelector(".result-item-price");
    priceEl.textContent = `$ ${r.price}`;

    const conditionEl = template.content.querySelector(".result-item-state");
    conditionEl.textContent = r.condition;

    const soldNumber = template.content.querySelector(
      ".result-item-counter-number"
    );
    soldNumber.textContent = "Vendidos: " + r.sold_quantity;

    template.content
      .querySelector(".result-item-img")
      .setAttribute("src", r.thumbnail);

    const clone = document.importNode(template.content, true);
    container.appendChild(clone);
  }
}

function main() {
  const searchForm = document.querySelector(".search-form");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchResult = e.target.buscar.value;

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + searchResult)
      .then((response) => response.json())
      .then((data) => showResults(data.results));
  });
}

main();
