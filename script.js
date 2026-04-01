let items = JSON.parse(localStorage.getItem("items")) || [];

function addItem() {
  let name = document.getElementById("item").value;
  let type = document.getElementById("type").value;
  let date = document.getElementById("date").value;
  let imageInput = document.getElementById("image");

  if (name && date) {
    let reader = new FileReader();

    reader.onload = function () {
      let image = reader.result;

      items.push({ name, type, date, image });
      localStorage.setItem("items", JSON.stringify(items));
      displayItems(items);
    };

    if (imageInput.files[0]) {
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      items.push({ name, type, date, image: "" });
      localStorage.setItem("items", JSON.stringify(items));
      displayItems(items);
    }
  }
}

function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  displayItems(items);
}

function filterItems(type) {
  if (type === "All") {
    displayItems(items);
  } else {
    let filtered = items.filter(i => i.type === type);
    displayItems(filtered);
  }
}

function searchItems() {
  let text = document.getElementById("search").value.toLowerCase();
  let filtered = items.filter(i => i.name.toLowerCase().includes(text));
  displayItems(filtered);
}

function displayItems(data) {
  let container = document.getElementById("items");
  container.innerHTML = "";

  data.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = `card ${item.type === 'Lost' ? 'lost' : 'found'}`;

    div.innerHTML = `
      ${item.image ? `<img src="${item.image}">` : ""}
      <h3>${item.name}</h3>
      <p>${item.type}</p>
      <p>${item.date}</p>
      <button class="delete" onclick="deleteItem(${index})">Delete</button>
    `;

    container.appendChild(div);
  });
}

displayItems(items);