//DOM selectors
showNotes();
let addbtn = document.getElementById("addBtn");
let done = document.getElementById("editBtn");
let addtext = document.getElementById("addTxt");
let searchTxt = document.getElementById("searchTxt");
let heading = document.getElementById("heading");
let volumeButton = document.getElementById('mute-button');
done.style.visibility="hidden";
//Event listeners
addbtn.addEventListener("click", addaNote);
searchTxt.addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
      searchtext();
  }
});
//Functions
// let notesArray=[]
function showNotes(searchTerm="") {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }

  let filteredNotes = notesArray.filter(function (element) {
    let cardTitle = element[0].toLowerCase();
    let cardTxt = element[1].toLowerCase();
    
    return cardTitle.includes(searchTerm) || cardTxt.includes(searchTerm);
  });
  console.log(filteredNotes);
  console.log(searchTerm);
  let html = "";
  filteredNotes.forEach(function (element, index) {
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
  if (filteredNotes.length !== 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No matching notes found.`;
  }

  notesElm.style.color = "rgb(115, 115, 115)";
  notesElm.style.fontSize = "20px";
}


function addaNote() {
  const audio = document.querySelector(".sound");
  if (volumeButton.classList.contains('fa-volume-up')) {
    audio.play();
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  if (addtext.value !== "") {
    notesArray.push([heading.value,addtext.value]);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    addtext.value = "";
    heading.value="";  
  } else {
    alert("Notes cannot be empty");
  }
  showNotes();

  // displaying toast message
  $(".toast").toast("show");
}

function editNote(index){
            addbtn.style.visibility="collapse";
            done.style.visibility="visible";
            let notes = localStorage.getItem("notes");
            if (notes == null) {
              notesObj = [];
            } else {
              notesObj = JSON.parse(notes);
            }
            heading.value=notesObj[index][0];
            addtext.value=notesObj[index][1];
            done.onclick=()=>{
              const update=[heading.value,addtext.value];
              if(update.length>0){
              notesObj.splice(index,1,update);
              localStorage.setItem("notes", JSON.stringify(notesObj));
              showNotes();
              heading.value="";
              addtext.value="";
              addbtn.style.visibility="visible";
              done.style.visibility="hidden";
              
              
          }
              else{
                   window.alert("Can not be empty,Your item will get delted.");
                   notesObj.splice(index,1);
                   localStorage.setItem("notes", JSON.stringify(notesObj));
                   showNotes();
              }
           }
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
  let inputVal = searchTxt.value.toLowerCase();
  
  const cardy=document.getElementsByClassName("card");
  for (let i = 0; i < cardy.length; i++) {
    cardy[i].style.display = "none";
  }
  let heading = document.querySelector("h1");
  if (heading) {
    heading.style.display = "none";
  }
  showNotes(inputVal);
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
  if (volumeButton.classList.contains('fa-volume-mute')) {
    volumeButton.classList.remove('fa-volume-mute');
    volumeButton.classList.add('fa-volume-up');
  }
  else {
    volumeButton.classList.remove('fa-volume-up');
    volumeButton.classList.add('fa-volume-mute');
  }
}
