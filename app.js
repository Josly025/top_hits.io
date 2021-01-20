fetch("https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=daft_punk")
  .then((response) => response.json())
  .then((data) => console.log(data.album));
