//DOM selectors
showNotes();
let addbtn = document.getElementById("addBtn");
let done = document.getElementById("editBtn");
let addtext = document.getElementById("addTxt");
let searchTxt = document.getElementById("searchTxt");
let heading = document.getElementById("heading");
let volumeButton = document.getElementById("mute-button");
let styledMessageContainer = document.getElementById("styled-message-container");
let styledTitle = document.getElementById("styled-title");
done.style.visibility = "hidden";
//Event listeners
addbtn.addEventListener("click", addaNote);
searchTxt.addEventListener("input", searchtext);

//Functions
// let notesArray=[]
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  let html = "";
  notesArray.forEach(function (element, index) {
    console.log;
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element[0]}</h5>
                        <p class="card-text"> ${element[1]}</p>
                        <button id="${index}" onclick="editNote(this.id)" class="btn btn-primary">Edit</button>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesArray.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section to add notes.`;
  }
  notesElm.style.color = "rgb(115, 115, 115)";
  notesElm.style.fontSize = "20px";
}

function addaNote() {
  const audio = document.querySelector(".sound");

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  let useDefaultTitle = document.getElementById("useDefaultTitle").checked;
  if (addtext.value !== "") {
    if (heading.value === "" && useDefaultTitle){
      let title = getDefaultTitle(addtext.value);
      notesArray.push([title, addtext.value]);
      localStorage.setItem("notes", JSON.stringify(notesArray));
      addtext.value = "";
      heading.value = "";
      $(".toast").toast("show");
    if (volumeButton.classList.contains('fa-volume-up')) {
      audio.play();
    }
     }
     else if(heading.value === "" && !useDefaultTitle){
      styledTitle.innerHTML =
        '<div class="alert alert-warning" role="alert" style="background: #b5f2fb;">Title cannot be empty! Please enter a title or check the below box for default title</div>';
      setTimeout(() => {
        styledTitle.innerHTML = "";
      }
      , 4000);
     }
     else {
       let title = heading.value;
       notesArray.push([title, addtext.value]);
       localStorage.setItem("notes", JSON.stringify(notesArray));
       addtext.value = "";
       heading.value = "";
       $(".toast").toast("show");
    if (volumeButton.classList.contains('fa-volume-up')) {
      audio.play();
    }
     } 
    
  } else {
      styledMessageContainer.innerHTML =
        '<div class="alert alert-warning" role="alert">Notes cannot be empty!</div>';
      setTimeout(() => {
        styledMessageContainer.innerHTML = "";
      }
      , 2000);
     
  }
  showNotes();
}
// Function to get default title from the first two words of text
function getDefaultTitle(text) {
  let words = text.split(" ");
  return words.length >= 2 ? `${words[0]} ${words[1]}` : text;
}

function editNote(index) {
  addbtn.style.visibility = "collapse";
  done.style.visibility = "visible";
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  heading.value = notesObj[index][0].replace(/ \(Edited\) .*/, '');
  addtext.value = notesObj[index][1];
  let d = new Date();
  let n = d.toLocaleTimeString();

  done.onclick = () => {

    const update = [heading.value + " (Edited) " + " " + n, addtext.value];
    console.log(update);

    
    if (update.length > 0) {
      notesObj.splice(index, 1, update);

      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
      heading.value = "";
      addtext.value = "";

      addbtn.style.visibility = "visible";
      done.style.visibility = "hidden";
    } else {
      window.alert("Can not be empty,Your item will get delted.");
      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
    }
  };
}

function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
function searchtext() {
  let inputVal = searchTxt.value;
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}

// theme change function

// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}

// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
    document.getElementById("slider").checked = false;
  } else {
    setTheme("theme-light");
    document.getElementById("slider").checked = true;
  }
})();

function toggleMute() {
  if (volumeButton.classList.contains("fa-volume-mute")) {
    volumeButton.classList.remove("fa-volume-mute");
    volumeButton.classList.add("fa-volume-up");
  } else {
    volumeButton.classList.remove("fa-volume-up");
    volumeButton.classList.add("fa-volume-mute");
  }
}
