// const loadData = () => {
//   fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// };

const loadData = (idChekar) => {
  document.getElementById("card-container").innerHTML = " ";
  document.getElementById("opps-container").innerHTML = " ";
  fetch(`https://openapi.programming-hero.com/api/videos/category/${idChekar}`)
    .then((res) => res.json())
    .then((data) => {
      displayData(data.data);
      sorting(data.data);
    });
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

loadData("1000");

const sorting = (data) => {
  const arr = [];
  data.forEach((item) => {
    arr.push(item);
  });
  const sortedArray = arr.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
  displayData(sortedArray);
};
