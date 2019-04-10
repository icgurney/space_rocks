// clears all fields in order to be populated again
function clear(){
  if (document.querySelector('#mainImg')) {
      document.querySelector('#mainImg').remove();
  }
  document.querySelector('#title').innerText = "";
  document.querySelector('#date').innerText = "";
  document.querySelector('#explanation').innerText = "";
  document.querySelector('#copyright').innerText = "";
  if (document.querySelector('#mainVid')) {
    document.querySelector('#mainVid').remove();
  }
}

// gets APOD and relevant info
function getAPOD(date){
  fetch('https://api.nasa.gov/planetary/apod?api_key=dKcPX2PjyQHRtfwyggKEL2TzgQGLvt52mA17Jfy6&date=' + date)
  .then(response => response.json())
  .then(function(json){
    console.log(json);
    if(json.media_type=="image"){
      var newImg = document.createElement("img");
      newImg.id = "mainImg";
      document.querySelector("#hero").appendChild(newImg);
      newImg.classList.add("mainImage")
      document.querySelector('#mainImg').src = json.url;
    }
    else if (json.media_type=="video") {
      var newIframe = document.createElement("iframe");
      newIframe.id = "mainVid";
      document.querySelector("#hero").appendChild(newIframe);
      newIframe.classList.add("mainImage")
      document.querySelector('#mainVid').src = json.url;
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
    document.querySelector('#pickDate').max = json.date;
    document.querySelector('#pickDate').min = 1995-06-20;
    getAPOD(json.date);
  })

}

document.querySelector('#submit').addEventListener("click", function(){
  clear();
  getAPOD(document.querySelector("#pickDate").value);
})

document.querySelector('#prevBtn').addEventListener("click", function(){
  clear();
  // need to create if statement to check for minimum date
  getAPOD(document.querySelector("#pickDate").stepDown(1));
})

document.querySelector('#nextBtn').addEventListener("click", function(){
  clear();
  // need to create if statement to check for maximum date
  getAPOD(document.querySelector("#pickDate").stepUp(1));
})

todayAPOD();
