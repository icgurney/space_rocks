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
function getAPOD(date){
  fetch('https://api.nasa.gov/planetary/apod?api_key=dKcPX2PjyQHRtfwyggKEL2TzgQGLvt52mA17Jfy6&date=' + date)
  .then(response => response.json())
  .then(function(json){
    if(json.media_type=="image"){
      document.querySelector('#mainImg').src = json.url;
    }
    else if (json.media_type=="video") {
      document.querySelector('#mainImg').dynsrc = json.url; //possibly may need to create a video tag or iframe tag if this doesnt work
    }
    document.querySelector('#title').innerText = json.title;
    document.querySelector('#date').innerText = json.date;
    document.querySelector('#explanation').innerText = json.explanation;
    if(json.copyright){
      document.querySelector('#copyright').innerText = json.copyright;
    }
  })
}

// sets min and max date values for today on first run
function todayAPOD(){
  fetch('https://api.nasa.gov/planetary/apod?api_key=dKcPX2PjyQHRtfwyggKEL2TzgQGLvt52mA17Jfy6')
  .then(response => response.json())
  .then(function(json){
    document.querySelector('#date').max = json.date;
    document.querySelector('#date').min = 1995-06-20;
  })
}

document.querySelector('#submit').addEventListener("click", function(){
  clear();
  getAPOD(document.querySelector("#pickDate").value);
})

document.querySelector('#prevBtn').addEventListener("click", function(){
  clear();
  // need to create if statement to check for minimum date
  getAPOD(document.querySelector("#pickDate").value.stepDown);
})

document.querySelector('#nextBtn').addEventListener("click", function(){
  clear();
  // need to create if statement to check for maximum date
  getAPOD(document.querySelector("#pickDate").value.stepUp);
})

todayAPOD();
