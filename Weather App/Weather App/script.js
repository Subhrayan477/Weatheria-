async function getWeather() {

  const city = document.getElementById("city").value;
  const apiKey = "3cab4e91c0ab42ee87ca538362ae0899"; 

  if (city === "") {
    alert("Enter a city name");
    return;
  }

  try {
    // API CALL
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found ");
      return;
    }

    //  SHOW RESULT SECTION
    const result = document.getElementById("weatherResult");
    result.classList.add("active");
    result.style.display = "flex";

    // SET DATA
    document.getElementById("temp").innerText =
      data.main.temp + "°C";

    document.getElementById("title").innerText =
      data.weather[0].main;

    document.getElementById("desc").innerText =
      data.weather[0].description;

    document.getElementById("feelsLike").innerText =
      data.main.feels_like + "°C";

    document.getElementById("wind").innerText =
      data.wind.speed + " km/h";

    document.getElementById("humidity").innerText =
      data.main.humidity + "%";

    document.getElementById("condition").innerText =
      data.weather[0].main;

    //  TIME FORMAT
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes < 10) minutes = "0" + minutes;

    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    if (hours < 10) hours = "0" + hours;

    document.getElementById("time").innerText =
      hours + ":" + minutes + " " + ampm;

    //  BACKGROUND CHANGE
    const condition = data.weather[0].main;

    // reset classes
    result.classList.remove("sunny","rainy","cloudy","thunderstorm","snow","haze");

    if (condition === "Clear") {
      result.classList.add("sunny");
    }
    else if (condition === "Rain"|| condition === "Drizzle") {
      result.classList.add("rainy");
    }
    else if (condition === "Clouds") {
      result.classList.add("cloudy");
    }
    else if (condition === "Thunderstorm") {
    result.classList.add("thunderstorm");
    }
    else if (condition === "Snow") {
    result.classList.add("snow");
    }
    else if (
    condition === "Mist" ||
    condition === "Haze" ||
    condition === "Fog" ||
    condition === "Smoke"
    ) {
    result.classList.add("haze");
    }
    else {
      result.style.background = "#333"; // fallback
    }

    //  ICON
    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    //PLAYLIST
    const playlist = document.getElementById("playlistLink");

    if (condition === "Clear") {
      playlist.href = "https://music.youtube.com/playlist?list=RDCLAK5uy_ktU_MiPyxsoBpl68TuShAvg-ZCArB772M&playnext=1&si=bbcaKKEiRqP7BkHV";
    }
    else if (condition=="Cloudy"|| condition === "Rain" || condition === "Drizzle"||condition === "Thunderstorm") {
      playlist.href = "https://music.youtube.com/playlist?list=OLAK5uy_nrsol77KIGNjXoQrCTMw0tU1E2FjTeZ4I&si=-2NoykjNSWtnfX0v";
    }
    else if (condition === "Snow") {
      playlist.href = "https://music.youtube.com/playlist?list=RDCLAK5uy_mItjo5v7FEAngOlR08hW5s5TtIwfrexxY&playnext=1&si=JoYifxRygGdiiYjb";
    }
    else {
      playlist.href = "https://music.youtube.com/playlist?list=PLZfle604-S4UeJDldWX7Amo-3pT9zqkVj&si=n-yLwVXb266djbZc";
    }  

  } catch (error) {
    console.log(error);
    alert("Error fetching weather ");
  }
  
}
document.querySelector(".search-icon").addEventListener("click", getWeather);