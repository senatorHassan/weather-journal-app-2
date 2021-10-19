/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
// Default Personal API key  
const apiKey = "196ac7bdfd34b7f771e0fdba693bc58a";

//Getting element by id 
const generate = document.getElementById("generate");

// Adding event listener to     
generate.addEventListener("click", async () => {

    try {
        const temp = await weatherTemp() // Fetching data
        await postData(temp) // Posting data to express backend
        await updatehtml() // Updating the HTML

    } catch (error) {
        console.log(error);
    }
})

async function weatherTemp() {
    const zipCode = document.getElementById("zip").value;

    // accessing current weather data by zipcode, appid and untis( it is optional )
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
    const res = await fetch(currentWeatherUrl)
    const data = await res.json()

    const temp = data.main.temp
    return temp
}

async function postData(temp) {
    const feelings = document.getElementById("feelings").value;
    await fetch("/weatherSet", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            Date: newDate,
            Temp: temp,
            Feelings: feelings
        })
    });
}

async function updatehtml() {
    const weather = await fetch("/weatherCondition")
    const weatherData = await weather.json()
    document.getElementById("date").innerHTML = weatherData.Date
    document.getElementById("temp").innerHTML = weatherData.Temp
    document.getElementById("content").innerHTML = weatherData.Feelings
}





