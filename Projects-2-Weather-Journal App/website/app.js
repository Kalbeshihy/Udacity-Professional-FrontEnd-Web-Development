/* Start Global Variables */
const apiKey = "&appid=24919bfc3a85cc97cb883cd110b179af&units=metric"; // Personal API Key - Units Metric To get Celsius Temperature
const serverUrl = "http://localhost:4800/"; // Server URL.
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip="; // Open Weather Map API URL

const dateEntry = document.getElementById("date");
const tempEntry = document.getElementById("temp");
const contentEntry = document.getElementById("content");

const errorAlert = (error) => console.error("Some Error Has Been => ", error); // Error message
/* End Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString(); // Returns date as a string value.

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateData);

/* Function called by event listener */
function generateData() {
  // Start Variables To get Values After Click on Generate Button
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  // End Variables
  let data = {
    zipCode,
    content: feelings,
    date: newDate,
  };

  // Post Data To Api To get Weather Data
  weatherData(zipCode)
    .then((newData) => {
      // Validate data & Show Alert If City Not Found
      if (newData.cod != 200) return alert(newData.message);

      data.temp = Math.round(newData.main.temp); // to Get Integer Number
      postToServer(data); // Post Data To Server
    })
    .catch(errorAlert);
}

/* Function to GET Web API Data*/
async function weatherData(zipCode) {
  return await (await fetch(apiUrl + zipCode + apiKey)).json();
}

/* Function to POST data To Server */
async function postToServer(data) {
  let res = await fetch(`${serverUrl}postData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    if (!res.ok) {
      alert("Process Not Successfuly");
      return;
    }

    res
      .json()
      .then((data) => {
        if (res.ok) updateUI(); // Update UI
        else alert("Process Not Successfuly");
      })
      .catch(errorAlert);
  } catch (error) {
    errorAlert(error);
  }
}

// Update UI
async function updateUI() {
  let res = await fetch(`${serverUrl}getAll`);
  try {
    res
      .json()
      .then((data) => {
        dateEntry.innerHTML = `Date Is: <span>${data.date}</span>`;
        tempEntry.innerHTML = `Temp Is: <span>${data.temp} &degc </span>`;
        contentEntry.innerHTML = `My Feeling Is: <span>${data.content}</span>`;
      })
      .catch(errorAlert);
  } catch (error) {
    errorAlert(error);
  }
}
