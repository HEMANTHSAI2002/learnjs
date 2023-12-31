const inputval = document.getElementById("search-box")
const search_button = document.getElementById("submit")
const cityname = document.getElementById("city-name")
const cityregion = document.getElementById("city-region")
const citycountry = document.getElementById("city-country")
const temp = document.getElementById("Temperature")

async function getdata(inputval){
    const promise = await fetch (`http://api.weatherapi.com/v1/current.json?key=d6f7da2f21544ab5a08122406231111&q=${inputval}&aqi=yes`)
    return await promise.json()
}


search_button.addEventListener("click", async()=>{
    try{
    search_button.style.cursor='wait'
    const value = await getdata(inputval.value)
    cityname.innerText=`${value.location.name}`
    cityregion.innerText=`${value.location.region}`
    citycountry.innerText =`${value.location.country}`
    temp.innerText=`Temperature:${value.current.temp_f}`
    }
    catch(error){
        console.log(error)
    }
    finally{
        search_button.style.cursor='default'
    }
})




// Current location weather

const loc = document.getElementById("current-location")

async function getcall(lat,lon){
    const promise = await fetch (`http://api.weatherapi.com/v1/current.json?key=d6f7da2f21544ab5a08122406231111&q=${lat},${lon}&aqi=yes`)
    return await promise.json()
}

async function gotlocation(position){
    try{
    loc.style.cursor = 'wait'
   const value = await getcall(position.coords.latitude,position.coords.longitude)
    cityname.innerText=`${value.location.name}`
    cityregion.innerText=`${value.location.region}`
    citycountry.innerText =`${value.location.country}`
    temp.innerText=`Temperature:${value.current.temp_f}`
    }
    catch(error){
        console.log(error)
    }
    finally{
        loc.style.cursor='default'
    }
}

function failedtoget(){
console.log("User did not allow")
}


loc.addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition(gotlocation,failedtoget)
})