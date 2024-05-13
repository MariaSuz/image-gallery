const grid = document.querySelector('.container');
const input = document.getElementById('input');
const submitBtn = document.getElementById('submit');


//Изображения при открытии страницы (машинки розовые) - один раз.
window.onload = function() {
    const key = 'fdRZYbUpGiA3LlrWaGkUJBEE6KsOuXS72XcFHxhWdnQ'
    const url = 'https://api.unsplash.com/search/photos?query=pink car&per_page=9&client_id='+key;
    fetch(url)
    .then(response => {
        if(response.ok)
            return response.json();
        else
            alert(response.status);
    })
    .then(data => {
        const imageNodes = [];
        for (let i = 0; i < data.results.length; i++) {
            imageNodes[i] = document.createElement('div');
            imageNodes[i].className = 'images';
            imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')';
            grid.appendChild(imageNodes[i]);
        }
    })
}



//const key = 'fdRZYbUpGiA3LlrWaGkUJBEE6KsOuXS72XcFHxhWdnQ'

input.addEventListener('keydown', function (event){
    if(event.key === 'Enter')
        loadImg();
})

function loadImg(){
   removeImage();
    //подключаем ссылку
    const url = 'https://api.unsplash.com/search/photos?query='+input.value+'&per_page=9&client_id=fdRZYbUpGiA3LlrWaGkUJBEE6KsOuXS72XcFHxhWdnQ';
    
    fetch(url)
    //не обязательно, проверяем чтоб запрос был удачным или нет (будет причина)
    .then(response => {
        if(response.ok)
            return response.json();
        else
            alert(response.status);
    })

    //возвращаем данные, самое важное! Создаем дивы!
    .then(data => {
        const imageNodes = [];
        for (let i = 0; i < data.results.length; i++) {
            imageNodes[i] = document.createElement('div');
            imageNodes[i].className = 'images';
            imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')';
            //двойной клик- изображение открывается и грузится на пк . Обработчик вешаем - не получилось
            //imageNodes[i].addEventListener('dbclick', function () {
            //    window.open(data.results[i].links.download, '_blank');
           // })
            grid.appendChild(imageNodes[i]);
        }
    })
}
          

//очистим картинки
function removeImage() {
    grid.innerHTML = '';
}

//Чтоб курсор был в инпут
input.focus();

//Крик по кресту удаляет запросы
submitBtn.addEventListener('click', clearSearch)

function clearSearch () {
    input.value = '';
    input.placeholder = 'Search Images';
  
}