// Imports

// Seletores
const divContainer = document.getElementById("container");
const inputName = document.getElementById("input-name");
const btnSearch = document.getElementById("btn-search");

// Variaveis
let final = [];

// Funções
const fetchApi = async () => {
  const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
  const req = await fetch(url);
  const res = await req.json();

  return res;
};

// Eventos
window.addEventListener("load", async () => {
  final = await fetchApi();

  final.results.map((e) =>
      (divContainer.innerHTML += `
        <div>
         <img src="${e.thumbnail}" alt="${e.title}"
        </div>
        <p>Nome: ${e.title}</p>
        <p>Valor: ${e.price.toFixed(2)} </p>
    `)
  );
});

btnSearch.addEventListener("click", () => {
  const searchingName = inputName.value;
  const filteredByName = final.results.filter((e) => e.title.includes(searchingName));

  if (filteredByName.length === 0) {
    return (divContainer.innerHTML = `
        <p>Não existe um usuário com esse nome.</p>
    `);
};

divContainer.innerHTML = "";
filteredByName.map((e) =>
    (divContainer.innerHTML += `
        <h4>Nome: ${e.title}</h4>
`)
);
});


