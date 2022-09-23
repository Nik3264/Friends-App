const content = document.querySelector(".content");
const url =
  "https://randomuser.me/api/?results=10&nat=us,gb&inc=gender,name,email,dob,phone,picture";
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
  const checkGender = document.getElementsByName("sex");

  friendsList.forEach((friend) => {
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
});
