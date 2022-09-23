const content = document.querySelector(".content");
const url =
  "https://randomuser.me/api/?results=30&nat=us,gb&inc=gender,name,email,dob,phone,picture";
//let data;

const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

getResource(url).then((data) => {
  console.log(data.results);
  const friendsList = data.results;
  const formParameters = document.querySelector(".form-parameters");
  //const checkGender = document.getElementsByName("sex");

  function renderCard(listCard) {
    content.innerHTML = "";
    listCard.forEach((friend) => {
      console.log(friend);
      content.innerHTML += `
                <div class="friend-wrap">

                    <header class="friend-header">
                        <h3>${friend.name.first} ${friend.name.last}</h3>
                    </header>
                    <img class="friend-img" src="${friend.picture.large}" alt="">

                    <p>I have <span>${friend.dob.age}</span> years old</p>
                    <a href="#" class="friend-email">${friend.email}</a>
                    <a href="#" class="friend-tel">${friend.phone}</a>
                    <footer class="friend-gender">
                        <h4>${friend.gender}</h4>
                    </footer>

                </div>
            `;
    });
  }

  renderCard(friendsList);

  formParameters.addEventListener("click", (event) => {
    let sex = document.querySelector('[name="sex"]:checked').value;
    let name = document.querySelector('[name="name"]:checked').value;
    let currentFrendsList;

    if (sex === "all") {
      currentFrendsList = friendsList;
    } else {
      currentFrendsList = friendsList.filter((element) => {
        return element.gender === sex;
      });
    }
console.log(currentFrendsList);
    switch (name) {
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