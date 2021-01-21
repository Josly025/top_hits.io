const search = document.querySelector("#search");
const searchBtn = document.querySelector("#search_btn");
const output = document.querySelector("#output");

//Artist search for loading data on page load
let artist = "Led Zeppelin";

window.onload = artistSearch();

function artistSearch() {
  fetch(`https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${artist}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let albums = data.album;
      console.log(albums);
      let output = "";
      albums.map((album) => {
        output += `
        
        
        
        
        
        
        `;
      });
    });
}

//Artist search on input click
let artistInput = search.value;
searchBtn.addEventListener("click", artistSearchTwo);

function artistSearchTwo() {
  fetch(
    `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${artistInput}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let albums = data.album;
      console.log(albums);
      let outputTwo = "";
      albums.map((album) => {
        output += `
        ${album.strAlbum}
        Year released: ${album.intYearReleased}
        ${album.strAlbum}
        ${album.strAlbum3DFace}
        ${album.strDescriptionEN}
        
        `;
      });
      output.innerHTML = outputTwo;
      clearInput();
    });
}

funtion clearInput(){
  
}