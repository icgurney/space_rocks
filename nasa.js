document.querySelector()

// clears all fields in order to be populated again
function clear(){
  document.querySelector('#mainImg').src = "";
  document.querySelector('#mainImg').dynsrc = "";
  document.querySelector('#title').innerText = "";
  document.querySelector('#date').innerText = "";
  document.querySelector('#explanation').innerText = "";
  document.querySelector('#copyright').innerText = "";
}

// gets APOD and relevant info
function getAPOD(){
  fetch('https://api.nasa.gov/planetary/apod?api_key=dKcPX2PjyQHRtfwyggKEL2TzgQGLvt52mA17Jfy6&date=' + date)
  .then(response => response.json())
  .then(function(json){
    if(json.media_type=="image"){
      document.querySelector('#mainImg').src = json.url;
    }
    else if (json.media_type=="video") {
      document.querySelector('#mainImg').dynsrc = json.url;
    }
    document.querySelector('#title').innerText = json.title;
    document.querySelector('#date').innerText = json.date;
    document.querySelector('#explanation').innerText = json.explanation;
    if(json.copyright){
      document.querySelector('#copyright').innerText = json.copyright;
    }
  })
}
