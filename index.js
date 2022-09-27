const content = document.querySelector(".content");
const url =
  "https://randomuser.me/api/?results=30&nat=us,gb&inc=gender,name,email,dob,phone,picture";

const getResource = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};

function renderCard(listCard) {
  content.innerHTML = "";
  listCard.forEach((friend) => {
    content.innerHTML += `
      <div class="friend-wrap">
          <header class="friend-header">
              <h3>${friend.name.first} ${friend.name.last}</h3>
          </header>
          <img class="friend-img ${friend.gender}" src="${friend.picture.large}" alt="">
          <p>I am <span>${friend.dob.age}</span> years old</p>
          <a href="#" class="friend-email">${friend.email}</a>
          <a href="#" class="friend-tel">${friend.phone}</a>
          <footer class="friend-gender">
              <h4>${friend.gender}</h4>
          </footer>
      </div>
    `;
  });
}

getResource(url).then((data) => {
  const friendsList = data.results,
    formParameters = document.querySelector(".form-parameters"),
    input = document.querySelector(".input"),
    clearButton = document.querySelector("#clear");

  let currentFrendsList;
  let searchFriends = [];

  renderCard(friendsList);

  clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    input.value = "";
    searchFriends = [];
  });

  window.addEventListener('resize', (e) => {
    let koeff=window.innerWidth/window.innerHeight;
    console.log(koeff);
    if (koeff > 2.71){
      formParameters.classList.remove("back-img600");
      formParameters.classList.add("back-img");
    }else {
      formParameters.classList.remove("back-img");
      formParameters.classList.add("back-img600");
    }
  });

  input.addEventListener("input", (event) => {
    searchFriends = currentFrendsList.filter((element) => {
      let strName = `${element.name.first} ${element.name.last}`.toLowerCase();
      return strName.indexOf(input.value.toLowerCase()) >= 0;
    });
    renderCard(searchFriends);
    //currentFrendsList=searchFriends;
  });

  formParameters.addEventListener("click", (event) => {
    let sex = document.querySelector('[name="sex"]:checked').value;
    let sortNameAge = document.querySelector('[name="name"]:checked').value;
    let filterFriendsList =
      searchFriends.length == 0 ? friendsList : searchFriends;
    if (sex === "all") {
      currentFrendsList = filterFriendsList;
    } else {
      currentFrendsList = filterFriendsList.filter((element) => {
        return element.gender === sex;
      });
    }
    switch (sortNameAge) {
      case "name up":
        sortNameUp();
        break;
      case "name down":
        sortNameDown();
        break;
      case "age up":
        sortAgeUp();
        break;
      case "age down":
        sortAgeDown();
        break;
      case "unsorted":
        break;
    }

    function sortNameUp() {
      currentFrendsList.sort(function (a, b) {
        if (a.name.first > b.name.first) {
          return 1;
        }
        if (a.name.first < b.name.first) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
    }
    function sortNameDown() {
      currentFrendsList.sort(function (a, b) {
        if (a.name.first < b.name.first) {
          return 1;
        }
        if (a.name.first > b.name.first) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
    }
    function sortAgeUp() {
      currentFrendsList.sort(function (a, b) {
        if (a.dob.age > b.dob.age) {
          return 1;
        }
        if (a.dob.age < b.dob.age) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
    }
    function sortAgeDown() {
      currentFrendsList.sort(function (a, b) {
        if (a.dob.age < b.dob.age) {
          return 1;
        }
        if (a.dob.age > b.dob.age) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
    }

    renderCard(currentFrendsList);
  });
});
