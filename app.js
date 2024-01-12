const loadData = (buttonName) => {
  document.getElementById("card-container").innerHTML = " ";
  document.getElementById("opps-container").innerHTML = " ";
  fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    .then((res) => res.json())
    .then((data) => {
      dataLoad(data, buttonName);
    });
};
const dataLoad = (data, buttonName) => {
  for (var i = 0; i < data.data.length; i++) {
    if (data.data[i].category == buttonName) {
      fetch(`https://openapi.programming-hero.com/api/videos/category/${data.data[i].category_id}`)
        .then((res) => res.json())
        .then((data) => {
          data.status ? displayData(data.data) : opps();
        });
    }
  }
};
const displayData = (data) => {
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
        <p>${item?.authors[0].profile_name} ${item.authors[0].varified ? '<i class="fa-solid fa-certificate"></i>' : " "}</p>
        <p class = "author-name views" id = "views-sort">${item.others.views}</p>
        </div>
        `;
    cardContainer.appendChild(card);
  });
};
const opps = () => {
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

const sorting = (data) => {
  
};
loadData("All");



// const arr = [];
// data.forEach((item) => {
//   arr.push(item);
// });
// const sortedArray = arr.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
// displayData(sortedArray)