//get background img

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=Malta"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url(./images/malta.jpg)`;
  });

//get dogecoin info
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
    document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
  })
  .catch((err) => console.error(err));

// time info

function getCurrent() {
  let todayDate = new Date();
  let thisTime = todayDate.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  document.getElementById("time").textContent = thisTime;
}

setInterval(getCurrent, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("weather").innerHTML += `
        <div id="weather-bottom">
          <p>${data.name}</p>
          <span>${data.main.temp}°</span>
        </div>
      `;
      document.getElementById("weather-top").innerHTML += `
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    `;
    })
    .catch((err) => console.log(err));
});

//get weather icon
