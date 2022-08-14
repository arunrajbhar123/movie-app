//style
let id;
let appendhere = document.querySelector('.append');
const EXCTRA_IMG__LINK = 'https://image.tmdb.org/t/p/w500/';
document.querySelector('#search').addEventListener('click', appliedcss);
let div = document.querySelector('.smallresult');
let input = document.querySelector('#search');

function appliedcss() {
    let icon = document.querySelector('.fa-solid');
    input.style.width = '350px';
    input.style.borderBottom = '1px solid #1D73C9';
    icon.style.left = '17.2em';
}

function resetcss() {
    let icon = document.querySelector('.fa-solid');
    setTimeout(function() {
        div.style.display = 'none';
        input.style.width = '300px';
        input.style.borderBottom = ' 1px solid #8B8E95';
        icon.style.left = ' 14.5em';
        input.value = null;
    }, 500)

}
// https://api.themoviedb.org/3/search/movie?api_key=763aad1b51ae4ed320afd3680c31c2fe&query=avengers
var query;
async function moviesSearch() {
    try {
        query = document.querySelector('#search').value;
        let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=763aad1b51ae4ed320afd3680c31c2fe&query=${query}`);
        let data = await res.json();
        const movie = data.results;
        return movie
    } catch (err) {
        console.log(err)
    }
}
var btnmore;

function appendmovie(data) {
    console.log(data)
    appendhere.innerHTML = null;
    var show = document.querySelector('.btn-more');
    show.style.display = 'block';

    data.map(function(el, i) {

        let box = document.createElement('div');


        let img = document.createElement('img');
        img.src = EXCTRA_IMG__LINK + el.backdrop_path;
        // backdrop_path poster_path

        let namedetails = document.createElement('div');
        let name = document.createElement('h1');
        name.innerHTML = el.title;
        let slogn = document.createElement('p');
        slogn.innerHTML = el.release_date;
        namedetails.append(name, slogn)
        box.append(img, namedetails)
        appendhere.append(box);
        box.addEventListener('click', function() {
            window.location.href = 'movieinfo.html';
            localStorage.setItem('movieinfo', JSON.stringify(el));
        })

    })
    document.querySelector('.btn-more').addEventListener('click', function() {
        window.location.href = 'page.html'
        localStorage.setItem('Result', JSON.stringify(data));
        localStorage.setItem('query', JSON.stringify(query));
    });

}
async function main() {
    let data = await moviesSearch();
    if (data === undefined) {
        return false;
    }
    appendmovie(data)
}

function debounce(func, delay) {
    div.style.display = 'block';
    if (id) {
        clearTimeout(id)
    }
    id = setTimeout(function() {
        func();
    }, delay)

}



const appendmoviehomer = document.querySelector('.appendmovie')
async function Fetchmovie() {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=763aad1b51ae4ed320afd3680c31c2fe&language=en-US&page=1`);
        const data = await res.json();
        append(data.results)
    } catch (err) {
        console.log(err)
    }
}
Fetchmovie()

function append(info) {
    info.forEach(el => {

        let box = document.createElement('div');
        let img = document.createElement('img');
        img.src = EXCTRA_IMG__LINK + el.backdrop_path;
        let name = document.createElement('h3');
        name.innerHTML = el.title;



        box.append(img, name)
        appendmoviehomer.append(box);

        box.onclick = function() {
            window.location.href = 'movieinfo.html';
            localStorage.setItem('movieinfo', JSON.stringify(el));
        }
    });

}