const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const createQuoteBtn = document.getElementById("createQuoteBtn");
const updateNameBtn = document.getElementById("updateNameBtn");

const quotesContainer = document.getElementById("quotes-container");

const quoteBaseURL = "http://localhost:4004/api/quotes";

const quotesCallback = ({ data: userQuotes }) => displayQuotes(userQuotes);
const errCallback = (err) => console.log(err);

const createQuote = (body) =>
  axios.post(quoteBaseURL, body).then(quotesCallback).catch(errCallback);
const deleteQuote = (id) =>
  axios.delete(`${quoteBaseURL}/${id}`).then(quotesCallback).catch(errCallback);
const updateQuote = (body) =>
  axios.put(quoteBaseURL, body).then(quotesCallback).catch(errCallback);

function createQuoteHandler(e) {
  e.preventDefault();
  let category = document.querySelector("#category");
  let bodyObj = {
    category: category.value,
  };
  createQuote(bodyObj);

  category.selectedIndex = 0;
}

function updateNameHandler(e) {
  e.preventDefault();
  let name = document.querySelector("#name");
  let bodyObj = {
    name: name.value,
  };
  updateQuote(bodyObj);
  name.value = "";
}

function displayQuotes(arr) {
  quotesContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let quoteItem = document.createElement("h3");
    quoteItem.textContent = arr[i].quoteContent;
    quoteItem.setAttribute("onclick", `deleteQuote(${arr[i].id})`);
    quotesContainer.appendChild(quoteItem);
  }
}

const getCompliment = () => {
  axios.get("http://localhost:4004/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getFortune = () => {
  axios.get("http://localhost:4004/api/fortune").then((res) => {
    const data = res.data;
    alert(data);
  });
};

complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
createQuoteBtn.addEventListener("click", createQuoteHandler);
updateNameBtn.addEventListener("click", updateNameHandler);
