// const loadData = () => {
//   fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
//     .then((res) => res.json())
//     .then((data) => console.log(data.data));
// };

const loadData = () => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/1001`)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};

const displayData = (data) => {
  const cardContainer = document.getElementById("card-container");
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card-individual");
    card.innerHTML = `
        <img class="thumbnail-image" src="${item.thumbnail}" alt="">
        <div class="caption" >
        <div><img class="caption-image" src="${item?.authors[0].profile_picture}" alt="profile"></div>
        <div><p class="card-caption">${item.title}</p></div>
        </div>
        <div>
        <p>${item?.authors[0].profile_name}</p>
        ${item.authors[0].varified ? '' : '<i class="fa-solid fa-certificate"></i>'}
        </div>
        `;
    cardContainer.appendChild(card);
  });
};

