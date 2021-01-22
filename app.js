const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search_btn");
const output = document.querySelector("#output");
const outputVideo = document.querySelector("#outputVideo");
//Artist search for loading data on page load
let artist = "Led Zeppelin";

window.onload = artistSearch();

function artistSearch() {
  let initalAlbums = "";
  fetch(`https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${artist}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let albums = data.album;
      console.log(albums);

      let albumStr = "";
      albums.map((album) => {
        albumStr += `
        <div class="card">
        <h1>${album.strArtist}</h1>
        <h2>${album.strAlbum}</h2>
        <h3>Year released: ${album.intYearReleased}</h3>
        <img src="${album.strAlbumThumb}" alt="album">
        </div>
        `;
        output.innerHTML = albumStr;
      });

      const artistId = parseInt(albums[0].idArtist);
      console.log(artistId);
      fetch(`https://theaudiodb.com/api/v1/json/1/mvid.php?i=${artistId}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let videoData = data.mvids;
          console.log(videoData);
          let videoStr = "";
          ////
          videoData.map((video) => {
            videoStr += `
        <div class="card-video">
        <h2>${video.strTrack}</h2>
       
      <a class="anchor" href="${video.strMusicVid}">Music Video</a>
       
      </div>
        `;
          });
          output.innerHTML = videoStr;
        });
    });
}

//Artist search on input click
searchBtn.addEventListener("click", function artistSearchTwo(e) {
  e.preventDefault();
  let artistInput = searchInput.value;
  fetch(
    `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${artistInput}`
  )
    .then((response) => {
      return response.json();
      console.log(response.json() + "this is response");
    })
    .then((data) => {
      let newAlbums = data.album;
      /// rendering and mapping through newAlbums
      let renderAlbums = "";
      newAlbums.map((album) => {
        renderAlbums += `
        <div class="card">
        <h1>${album.strArtist}</h1>
        <h2>${album.strAlbum}</h2>
        <h3>Year released: ${album.intYearReleased}</h3>
        <img src="${album.strAlbumThumb}" alt="album">

        </div>
        `;
      });
      output.innerHTML = renderAlbums;
    });

  setTimeout(() => {
    clearInput();
  }, 10000);
});

//clear the input after a search
function clearInput() {
  searchInput.value = "";
}
