const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search_btn");
const output = document.querySelector("#output");
const outputVideo = document.querySelector("#outputVideo");
//Artist search for loading data on page load
let artist = "Led Zeppelin";

window.onload = artistSearch();

function artistSearch() {
  let initalAlbums = "";

  const apiCall = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/search",
    params: { q: `${artist}` },
    headers: {
      "x-rapidapi-key": "cb5b1f2f44msh3ccf1d2e09978fap1363abjsn0c69cbf92586",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  axios.request(apiCall).then(function (response) {
    console.log(response.data.data);
    let albums = response.data.data;
    let albumStr = "";
    albums.map((album) => {
      albumStr += `
        <div class="card">
        <h1>${album.artist.name}</h1>
        <h2>${album.title}</h2>
        <h3>Song: ${album.title_short}</h3>
        <img src="${album.album.cover_medium}" alt="album">
        </div>
        `;
      output.innerHTML = albumStr;
    });

    const artistId = parseInt(albums[0].idArtist);
    console.log(artistId);
    fetch(`theaudiodb.com/api/v1/json/{APIKEY}/artist.php?i=${artistId}`)
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
        outputVideo.innerHTML = videoStr;
      });
  });
}

//Artist search on input click
searchBtn.addEventListener("click", function artistSearchTwo(e) {
  let artistInput = searchInput.value;
  const searchCall = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/search",
    params: { q: `${artistInput}` },
    headers: {
      "x-rapidapi-key": "cb5b1f2f44msh3ccf1d2e09978fap1363abjsn0c69cbf92586",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  axios.request(searchCall).then(function (response) {
    let newAlbums = response.data.data;

    let renderAlbums = "";
    newAlbums.map((album) => {
      renderAlbums += `
         <div class="card">
        <h1>${album.artist.name}</h1>
        <h2>${album.title}</h2>
        <h3>Song: ${album.title_short}</h3>
        <img src="${album.album.cover_medium}" alt="album">
        </div>
        `;
    });
    output.innerHTML = renderAlbums;
    const artistTwo = parseInt(newAlbums[0].idArtist);
    console.log(artistTwo);
    fetch(`https://theaudiodb.com/api/v1/json/1/mvid.php?i=${artistTwo}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let videoDataTwo = data.mvids;
        console.log(videoDataTwo);
        let videoStrTwo = "";
        ////
        videoDataTwo.map((video) => {
          videoStrTwo += `
        <div class="card-video">
        <h2>${video.strTrack}</h2>
      <a class="anchor" href="${video.strMusicVid}">Music Video</a>
      </div>
        `;
        });
        outputVideo.innerHTML = videoStrTwo;
      });
  });
  e.preventDefault();
  setTimeout(() => {
    clearInput();
  }, 10000);
});

//clear the input after a search
function clearInput() {
  searchInput.value = "";
}
