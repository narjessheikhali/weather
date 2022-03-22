const getLoc = async () => {

    const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone';

    const response = await fetch(url);
    return response.json();
}

const getWeather = async (lat, lon) => {
    api = 'f0894defae7c5584798f8812232a40c2';
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`
    const response = await fetch(url);
    const data = await response.json();
    return data
}

function getDayOrNight() {
    let DayOrNight;
    let d = new Date();
    if (d.getHours() >= 6 && d.getHours() <= 19) {
        DayOrNight = 'Day'
    } else {
        DayOrNight = 'Night'
    }
}

function getIcon(weMain) {
    let icon;
    switch (weMain) {
        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break;
        case 'Clear':
            const DayOrNight = getDayOrNight();
            icon = `${weMain}-${DayOrNight}.svg`;
            break;
        case 'Clouds':
            icon = `${weMain}.svg`
            break;
        case 'Atmosphere':
            icon = `${weMain}.png`;
            break;
    }
    return icon;
}

function getTemp(weTemp) {
    const k = weTemp;
    const f = (k - 237.15) * 9 / 5 + 32;
    const c = k - 273.15;
    return Temp = {
        kel : Math.floor(k),
        cel: Math.floor(c),
        far: Math.floor(f)
    }
}
const locationTimeZone = document.querySelector('.timezone');
const icon = document.querySelector('.icon');
const degreeSection = document.querySelector('.degree-section');
const degree = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');
const temperatureDescription = document.querySelector('.temperature-description');

getLoc()
    .then(locData => {
    const timeZone = locData.timezone;
        console.log(timeZone)
    locationTimeZone.textContent = timeZone;
return getWeather(locData.lat,locData.lon)})
    .then(weData =>{
        const weTemp = weData.main.temp;
            const weMain = weData.weather[0].main;
                const weDescription = weData.weather[0].description;
        console.log(weTemp, weMain, weDescription)

        const iconName = getIcon(weMain)
        icon.innerHTML = `<img src='icon/${iconName}' alt="weather-icon"/>`;
        degree.textContent = Math.floor(weTemp)
        unit.textContent = 'k';
        degreeSection.addEventListener('click', function (e){
            if (unit.textContent === 'k'){
                degree.textContent = getTemp(weTemp).far;
                unit.textContent = 'F';
            }
            else if (unit.textContent === 'F') {
                degree.textContent = getTemp(weTemp).cel;
                unit.textContent = 'C';
            }
            else{
                degree.textContent = getTemp(weTemp).kel;
                unit.textContent = 'K'
            }



        })
        temperatureDescription.textContent = weDescription;
    })

