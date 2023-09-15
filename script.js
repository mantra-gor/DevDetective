// Theme Change Code
const theme_btn = document.querySelector('.theme-section')
const root = document.documentElement.style;
const modetext = document.querySelector('.modetext')
const modeicon = document.querySelector('.modeicon')

// const get = (param) => {document.querySelector(`${param}`)}

const url = `https://api.github.com/users/`

// Fetch Doc Elements
const search_bar = document.querySelector(".search-bar");
const search_btn = document.querySelector(".search-btn");
const avatar = document.querySelector('#avatar')
const usrName = document.querySelector('.name')
const profile_joined_date = document.querySelector('.profile-joined-date')
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const profile_link = document.querySelector('.profile-link')
const profile_desc = document.querySelector('.profile-desc')
const repos = document.querySelector('#repos')
const followers = document.querySelector('#followers')
const followings = document.querySelector('#followings')
const city = document.querySelector('.city')
const portfolio_link = document.querySelector('.portfolio-link')
const twitter_link = document.querySelector('.twitter-link')
const company_name = document.querySelector('.company-name')
const error_card = document.querySelector('.error-card')
const data_card = document.querySelector('.data-card')
// let darkMode

let joined_date


init()
function init(){
    let darkMode = false
    
    storingModeStage(darkMode)

    // by default profile
    getUserData(url + `mantra-gor`)
}

function storingModeStage(darkMode){
    let value = localStorage.getItem("dark-mode")
    // console.log(value)

    if(value === null){
        localStorage.setItem("dark-mode", darkMode)
        activateLightMode()
    }
    else if(value == "true"){
        activateDarkMode()
    }
    else if(value == "false"){
        activateLightMode()
    }
}

search_btn.addEventListener("click", () => {
    if(search_bar.value !== "") {
        getUserData(url + search_bar.value)
    }
})

theme_btn.addEventListener("click", () => {
    if(darkMode == false){
        activateDarkMode()
    }
    else{
        activateLightMode()
    }
}, false)

search_bar.addEventListener("input", () => {
    // Hide Error Message
    data_card.classList.remove("deactive")
    error_card.classList.add('deactive')
})

search_bar.addEventListener("keydown", function(e){
    // Search when Enter Button is Hit
    if(e.key == "Enter"){
        if(search_bar.value !== ""){
            getUserData(url + search_bar.value)
        }
    }
})

// API Call Function
// function getUserData(gitUrl){
//     fetch(gitUrl)
//     .then((response) => response.json())
//     .then((data) => {
//         // console.log(data)
//         updateProfile(data)
//     })
//     .catch((error) => {
//         throw error
//     })
// }

async function getUserData(gitUrl){
        let response = await fetch(gitUrl)
        let data = await response.json()
        updateProfile(data)

}
// Render Function
function updateProfile(data){
    if(data.message !== "Not Found"){
        // no need of hide error message

        function checkNull(param1, param2){
            if(param1 == "" || param1 == null){
                param2.style.opacity = 0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false
            }
            else{
                param2.style.opacity = 1
                param2.previousElementSibling.style.opacity = 1
                return true
            }
        }

        // Updating the page
        avatar.src = `${data.avatar_url}`
        usrName.innerText = `${data.name}`
        joined_date = data.created_at.split("T").shift().split("-")
        profile_joined_date.innerText = `Joined ${joined_date[2]} ${months[joined_date[1] - 1]} ${joined_date[0]}`
        profile_link.innerText = `@${data.login}`
        profile_link.href = `${data.html_url}`
        profile_desc.innerText = data.bio == null ? "This Profile has no Bio" : `${data.bio}`
        repos.innerText = `${data.public_repos}`
        followers.innerText = `${data.followers}`
        followings.innerText = `${data.following}`
        city.innerText = checkNull(data.location,city) ? data.location : "Not Available"
        portfolio_link.innerText = checkNull(data.blog,portfolio_link) ? data.blog : "Not Available"
        portfolio_link.href = checkNull(data.blog,portfolio_link) ? data.blog : "#"
        twitter_link.innerText = checkNull(data.twitter_username,twitter_link) ?  data.twitter_username : "Not Available"
        twitter_link.href = checkNull(data.twitter_username,twitter_link) ? `https://twitter.com/${data.twitter_username}` : "#"
        company_name.innerText = checkNull(data.company,company_name) ? data.company : "Not Available"

    }
    else{
        // Error message show karna hai
        data_card.classList.add("deactive")
        error_card.classList.remove('deactive')
    }
}

// Activate Dark Mode Function
function activateDarkMode(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true)
}

// Activate Light Mode Function
function activateLightMode(){
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false)
}