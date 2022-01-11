function newPhoto() {
    let date = new Date()
    let hours = date.getHours()
    let photo = document.querySelector('#container')
    let text = document.querySelector('.textone')

    if (hours <= 12) {
        photo.style.backgroundImage = "url('manhã.jpg')"
        text.innerHTML = '<h1>Olá,<br> Bom Dia!</h1>'    
    }
    else if (hours <= 18) {
        photo.style.backgroundImage = "url('tarde.png')"
        text.innerHTML = '<h1>Olá,<br> Boa Tarde!</h1>'
    }
    else {
        photo.style.backgroundImage = "url('noite.png')"
        text.innerHTML = '<h1>Olá,<br> Boa Noite!</h1>'
    }
}
newPhoto()
//--------------------
document.querySelector('.busca').addEventListener('submit', async (Event)=>{
    Event.preventDefault()

    let input = document.querySelector('#searchInput').value

    if(input !== ''){
        clearInfo()
        showWarning('carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=1670882c82df8e0804b142e49b4b88e4&units=metric&lang=pt_br`;

        let results = await fetch(url)
        let json = await results.json()
    
        if(json.cod === 200){
            showInfo ({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não encontramos esta localização...')
        }
    } else {
        clearInfo()
    }
})

function showInfo(json){
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}, <span>km/h</span>`

    document.querySelector('.temp img').getAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = 'block'
}
function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg 
}