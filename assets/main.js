const apiKey = "5d2829b8ccbd49888ade07b1f128b9e7";

let search = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");

let languageBtn = document.getElementById("languageBtn");
let languageSelect = document.getElementById("language");

function fetchNews() {
    let selectedLanguage = languageSelect.value;
    fetch(`https://newsapi.org/v2/top-headlines?language=${selectedLanguage}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(news => {
            const newsContainer = document.getElementById("newsContainer");

            newsContainer.innerHTML = "";

            for (let i = 0; i < news.articles.length; i++) {
                createArticle(news.articles[i], newsContainer);
                console.log(news.articles[i]);
            }
        });
}

languageBtn.addEventListener("click", fetchNews);

function createArticle(article, container) {
    const titel = document.createElement("h2");
    titel.innerHTML = article.title;

    const time = document.createElement("p");
    time.innerHTML = article.publishedAt.split("T")[0];

    const link = document.createElement("a");
    link.href = article.url;
    link.innerHTML = "READ MORE";

    const articleContainer = document.createElement("article");
    const divContainer = document.createElement("div");

    articleContainer.append(titel, divContainer);
    divContainer.append(time, link);

    container.appendChild(articleContainer);
}

searchBtn.addEventListener("click", () => {
    const keyword = search.value;
    markText(keyword);
  });
  
  function markText(keyword) {
    const markedText = document.querySelectorAll("mark");
    markedText.forEach(element => {
      element.replaceWith(...element.childNodes);
    });
  
    const everyText = document.querySelectorAll("body *");
  
    everyText.forEach(element => {
      const text = element.innerHTML;
      const markedText = text.replace(new RegExp(keyword, "gi"), match => `<mark>${match}</mark>`);
      element.innerHTML = markedText;
    });
}

fetchNews();
