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
    if(json.media_type=="image"){
      var newImg = document.createElement("img");
      newImg.id = "mainImg";
      document.querySelector("#hero").appendChild(newImg);
      newImg.classList.add("mainImage")
      document.querySelector('#mainImg').src = json.url;
      document.querySelector('#mainImg').alt = json.title;
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
      document.querySelector('#copyright').innerText = "\251 " + json.copyright;
    }
   isEnd();
   isBeginning();
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

// sets min and max date values for today on first run
function setDatePicker(date){
  var pickDate = document.querySelector('#pickDate');
  pickDate.max = date;
  pickDate.min = "1995-06-20";
  pickDate.value = date;
}

// checks if today is the input date and disables the next day button
function isEnd(){
  if(document.querySelector('#pickDate').value==document.querySelector('#pickDate').max){
    document.querySelector('#nextBtn').disabled = true;
  }
  else {
    document.querySelector('#nextBtn').disabled = false;
  }
}

// checks if the date is 1995-06-20 and disables the previous day button
function isBeginning(){
  if(document.querySelector('#pickDate').value=="1995-06-20"){
    document.querySelector('#prevBtn').disabled = true;
  }
  else {
    document.querySelector('#prevBtn').disabled = false;
  }
}

// adds a clickable submit button
document.querySelector('#submit').addEventListener("click", function(){
  clear();
  getAPOD(document.querySelector("#pickDate").value);
})

// adds a clickable previous day button
document.querySelector('#prevBtn').addEventListener("click", function(){
  clear();
  document.querySelector("#pickDate").stepDown()
  getAPOD(document.querySelector("#pickDate").value);
})


// adds a clickable next day button
document.querySelector('#nextBtn').addEventListener("click", function(){
  clear();
  document.querySelector("#pickDate").stepUp()
  getAPOD(document.querySelector("#pickDate").value);
})

// adds a clickable random day button
document.querySelector('#randBtn').addEventListener("click", function(){
  clear();
  var start = new Date(1995, 05, 20);
  var today = new Date(document.querySelector('#pickDate').max);
  var rand = new Date(start.getTime() + Math.random() * (today.getTime() - start.getTime()));
  rand = rand.getFullYear() + "-" + (rand.getMonth() + 1) + "-" + rand.getDate();
  rand = formatDate(rand);
  document.querySelector("#pickDate").value = rand;
  getAPOD(rand);
})

// formats the random date to be in YYYY-MM-DD format
function formatDate(date){
  date = date.split('-');
  date = date.map(function(val){
    if(parseInt(val)<10){
      val = "0"+val;
    }
    return val;
  })
  return date.join('-')
}

var today = new Date();
today = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
today = formatDate(today);
getAPOD(today);
setDatePicker(today);
