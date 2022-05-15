// DECLEAR BUTTON VARIABLES
const get_location_button = document.querySelector('.location');
const Back_button = document.querySelector('.back_btn');



// DECLEAR VARIABLES OF ELEMENTS THAT WILL BE CHANGED ON THE PAGE
let display_message = document.querySelector('.status_msg');
let weather_image = document.querySelector('.weather_img');
let degree = document.querySelector('.degree span');
let weather_type = document.querySelector('.weather_type');
let country_name = document.querySelector('.country_name');
let feels_like = document.querySelector('.feels_like h4 span');
let humidity = document.querySelector('.humidity h4 span');
let user_input = document.querySelector('input');
const image = weather_image.querySelector('img');




// HOW THE APP SHOULD WORK
// the user should be able to enter his/her country name
// if the user enter a wrong country name, the user should recieve an error message.
// on the click of the get location button, the user should see the generating country progress bar.
// after the user should be redirected to the weather app page that shows the country with its weather informations
// on click of the back button, the user should be redirected back the the input pages.


const query_input_authentication = (input)=>{

    // collect info from the user input
    const input_value = input.value
    // query if there is actually information from the user or if it is null
    if (input_value === "") {
        display_message.textContent = "This feild cannot be empty...."
        display_message.classList.add('err')
        user_input.classList.add('err_msg')
        setTimeout(()=>{
            display_message.classList.remove('err')
        user_input.classList.remove('err_msg')
        },1000)
    }else{
        // get information from the users input and return the output giving by the user so that it can be used for processing
        display_message.textContent = "Getting your city's weather condition......."
            display_message.classList.add('success')
    return input_value;
    }
    
 
}


const get_weather_api = (city) => {
    // get the api that will tell us the weather of the city by parsing the city that we input into the api
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3b53e76cd1185cb1a33cee7e612fc4fb&units=metric`;
    
    
// return the api
fetch(api).then(response => response.json()).then(result => {
    
    // then depending on the result the api gives, we will query if the country or city that has been inputed is correct, by getting the display message
    // if wrong, we will display the message as an error
    if(result.cod == '404'){
        display_message.textContent = `${city.toUpperCase()} is not a valid city name....`
        display_message.classList.replace('success' ,'err')
        setTimeout(()=>{
            display_message.classList.remove('err');
        },1200)
    }else{
        const id = result.weather[0].id

        // thunder storm
        if (id >= 200 || id <= 232) {
            image.src = 'http://openweathermap.org/img/wn/11n.png'
        }
        // clouds
        if (id >= 801 || id <= 804) {
            image.src = 'http://openweathermap.org/img/wn/02n.png'
        }
        //drizzle
        if (id >= 300 || id <= 321) {
            image.src = 'http://openweathermap.org/img/wn/09n.png'
        }
        // rain
        if (id >= 500 || id <= 531) {
            image.src = 'http://openweathermap.org/img/wn/10n.png'
        }
        // snow
        if (id >= 600 || id <= 622) {
            image.src = 'http://openweathermap.org/img/wn/13n.png'
        }
        // atmosphere
        if (id >= 701 || id <= 781) {
            image.src = 'http://openweathermap.org/img/wn/02n.png'
        }
        // clear
        if (id == 800) {
            image.src = 'http://openweathermap.org/img/wn/01n.png'
        }
        // if correct, we will display the city weather api in the proper areas that they need to be displayed in.
        weather_type.textContent = result.weather[0].description;
        feels_like.textContent = Math.floor(result.main.feels_like);
        humidity.textContent = result.main.humidity.toString();
        country_name.textContent = `${result.name}, ${result.sys.country}`
        degree.textContent = Math.floor(result.main.temp);

      
    document.querySelector('.weather_result').classList.add('active');
    Back_button.classList.add('active')
    document.querySelector('.input_section').classList.remove('active');
    display_message.classList.remove('success')

    }
    
})
}




// Button event listeners

get_location_button.addEventListener('click',(e) => {
    // stop default reload on submit
    e.preventDefault()
    const city = query_input_authentication(user_input)
    console.log(get_weather_api(city));
    user_input.value = ""
})

Back_button.addEventListener('click', ()=>{
    Back_button.classList.add('active')
    document.querySelector('.weather_result').classList.remove('active');
    document.querySelector('.input_section').classList.add('active');
})