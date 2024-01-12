const loadData = () => {
  fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    .then((res) => res.json())
    .then((data) => {
      dataLoad(data.data);
    });
};
const dataLoad = (data) => {
  const allButton = document.getElementById("buttons");
  data.forEach((item) => {
    const button = document.createElement("div");
    button.innerHTML = `<button onclick = dataTriggerd(${item.category_id}) class="btn btn-secondary btn-lg">${item.category}</button>`;
    allButton.appendChild(button);
  });
};
const dataTriggerd = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => (data.status ? displayData(data.data, id) : opps()));
};
const displayData = (data, id) => {
  const sortData = document.getElementById("sort-data");
  sortData.onclick = function () {
    sorting(id);
  };
  document.getElementById("card-container").innerHTML = " ";
  document.getElementById("opps-container").innerHTML = " ";
  const cardContainer = document.getElementById("card-container");
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card-individual");
    card.innerHTML = `
        <img class="thumbnail-image" src="${item.thumbnail}" alt="">
        <small class = "time">${item.others.posted_date ? formatTimeAgo(parseInt(item.others.posted_date)) : ""}</small>
        <div class="caption" >
        <div><img class="caption-image" src="${item?.authors[0].profile_picture}" alt="profile"></div>
        <div><p class="card-caption">${item.title}</p></div>
        </div>
        <div class = "author-name">
        <div class = "varify">
        <p>${item?.authors[0].profile_name}</p>
        <p class="varify">${item.authors[0].verified ? '<i class="fa-solid fa-certificate"></i>' : ""}</p>
        </div>
        <p class = "author-name views" id = "views-sort">${item.others.views}</p>
        </div>
        `;
    cardContainer.appendChild(card);
  });
};
const opps = () => {
  const sortData = document.getElementById("sort-data");
  sortData.onclick = function () {};
  document.getElementById("card-container").innerHTML = " ";
  document.getElementById("opps-container").innerHTML = " ";
  const oppsContainer = document.getElementById("opps-container");
  const oppsDetails = document.createElement("div");
  oppsDetails.innerHTML = `
  <img src="images/Icon.png" alt="">
  <p class="opps-description">Oops!! Sorry, There is no content here</p>
  `;
  oppsContainer.appendChild(oppsDetails);
};

function formatTimeAgo(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} hours ${remainingMinutes} minutes ago`;
}

const sorting = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => sortDataTriggert(data.data, id));
};

const sortDataTriggert = (data, id) => {
  const arr = [];
  data.forEach((item) => {
    arr.push(item);
  });
  arr.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
  displayData(arr, id);
};
loadData();
dataTriggerd("1000");
