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

  let input = document.querySelector(".input");
  let clearButton=document.querySelector("#clear");
  let currentFrendsList;
  let searchFriends=[];

  clearButton.addEventListener("click", (event)=>{
    event.preventDefault();
    input.value="";
    searchFriends=[];

  });

  input.addEventListener("input",(event)=>{
    searchFriends = currentFrendsList.filter((element) => {
        let strName=`${element.name.first}${element.name.last}`.toLowerCase();
        console.log(strName,input.value);
        return strName.indexOf(input.value)>=0;
      });
    renderCard(searchFriends);
    //currentFrendsList=searchFriends;
  });




  formParameters.addEventListener("click", (event) => {
    let sex = document.querySelector('[name="sex"]:checked').value;
    let name = document.querySelector('[name="name"]:checked').value;
    let filterFriendsList=searchFriends.length==0 ? friendsList:searchFriends;

    if (sex === "all") {
      currentFrendsList = filterFriendsList;
    } else {
      currentFrendsList = filterFriendsList.filter((element) => {
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
