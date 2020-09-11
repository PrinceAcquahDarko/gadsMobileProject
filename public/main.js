let searchedName = document.querySelector('input');

let displayName = document.querySelector('h2');

let form = document.querySelector('.searchedForm');

let temperature = document.querySelector('.temperature');

let high = document.querySelector('.high');

let low = document.querySelector('.low');

let humidity = document.querySelector('.humidity');

let main = document.querySelector('.main');



const key ="cef64ad3d375988b8ba6ebea37a43691";

let url = "https://api.openweathermap.org/data/2.5/weather?q=Accra&appid=cef64ad3d375988b8ba6ebea37a43691"; 



let convertCelcius = (kelvin) =>{
   celcius =  Math.round(kelvin - 273.15)

   return celcius;
}


form.addEventListener('submit', (e) =>{
    e.preventDefault();

    // console.log(searchedName.value)


     fetchFunc(searchedName.value)
            .then(data => {



                main.innerHTML = `
                <h2>${data.sys.country}</h2>
                <small>country</small>
                
                <h3 class="temperature">${convertCelcius(data.main.temp)}&deg;C</h3>
                <div class="content">
                    <div>
                        <p class="high">${convertCelcius(data.main.temp_max)}&deg;C</p>
                        <small>max_temp</small>
                    </div>
                    <div>
                        <p class="low">${convertCelcius(data.main.temp_min)}&deg;C</p>
                        <small>min_temp</small>
                    </div>
                    <div>
                        <p class="humidity">${data.main.humidity}</p>
                        <small>humidity</small>
                    </div>
                    
                    
                    
                </div>
                
        
                `


                localStorage.setItem('comment', main.innerHTML)
               
                

            })

            .catch(err => {
                main.innerHTML = ` 
                <div class="center">
                    <h2> Oops! an error occurred </h2>
                    <p>this maybe due to:</p>
                    <ul>
                        <li>No internet Connection</li>
                        <li>No such city</li>
                    </ul>
                </div>`

                let center = document.querySelector('.main .center');

                setTimeout(clearMsg, 5000, center)
               
            })
        



})


let clearMsg = flow => {
    flow.classList.add('hidden')
}



let fetchFunc = async(city) => {
        let mainUrl = "http://api.openweathermap.org/data/2.5/weather"; 

        let searchedUrl =  `?q=${city}&appid=${key}`;


        let searchedInfo = await fetch(mainUrl + searchedUrl);

        let finalData = searchedInfo.json(); 
        return finalData;

        
}


(function localItem(){
    saved = localStorage.getItem('comment');

    if(saved){
        main.innerHTML = saved;
    }
})()

/*  */





