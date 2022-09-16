const Genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

//*Url for home page.
const apiKey = "api_key=d7cfdb51804908a83049f752b7e84d73";

const trendWeekMovieUrl = `https://api.themoviedb.org/3/trending/movie/week?${apiKey}`;

const trendWeekTvUrl = `https://api.themoviedb.org/3/trending/tv/week?${apiKey}`;

//*Image and search url.
const baseImgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = `https://api.themoviedb.org/3/search/movie?${apiKey}`;

//*Url for movie pages.
const latestMoviesUrl = `https://api.themoviedb.org/3/movie/latest?${apiKey}`;
const nowPlayingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?${apiKey}`;
const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?${apiKey}`;
const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?${apiKey}`;

//*Url for series page.
const latesSeriesUrl = `https://api.themoviedb.org/3/tv/latest?${apiKey}`;
const seriesOnAir = `https://api.themoviedb.org/3/tv/on_the_air?${apiKey}`;
const popularSeriesUrl = `https://api.themoviedb.org/3/tv/popular?${apiKey}`;
const topRatedSeriesUrl = `https://api.themoviedb.org/3/tv/top_rated?${apiKey}`;

//*Discover url for the genres
const discoverUrl = `https://api.themoviedb.org/3/discover/movie?${apiKey}&with_genres=`;

//?DOM variable for the movie page
const setGenre = [];
const generes = document.querySelector("#generes");

//? DOM variables for home page.
const main = document.querySelector("main");
const form = document.querySelector("form");
const input = document.querySelector("input");
const container = document.querySelector(".container");
const container1 = document.querySelector("#container1");
const container2 = document.querySelector("#container2");

//*Making the api get request.
const apiCall = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (url.includes("tv")) {
        if (url.includes("week")) {
          getTrendingSeries(data.results, url);
        } else {
          showSeries(data.results, url);
        }
      } else if (url.includes("movie")) {
        if (url.includes("search")) {
          showSearch(data.results);
        } else {
          if (url.includes("week")) {
            getTrendingMovies(data.results, url);
          } else {
            showMovies(data.results, url);
          }
        }
      }
    });
};

//Calling the api by providing different url for home page
const loadHomePage = () => {
  apiCall(trendWeekMovieUrl);
  apiCall(trendWeekTvUrl);
};

//Calling the api by providing different url for movie page
const loadMoviePage = () => {
  apiCall(nowPlayingMoviesUrl);
  apiCall(popularMoviesUrl);
  apiCall(topRatedMoviesUrl);
};

const loadSeriesPage = () => {
  apiCall(seriesOnAir);
  apiCall(popularSeriesUrl);
  apiCall(topRatedSeriesUrl);
};

//Load the genre section for the movie page
const loadGenreSection = () => {
  Genres.forEach((e) => {
    const genere = document.createElement("div");
    genere.classList.add("genere");
    genere.id = e.id;
    genere.textContent = e.name;
    generes.appendChild(genere);
    genere.onclick = () => {
      genere.classList.toggle("selected");
      if (genere.classList.contains("selected")) {
        setGenre.push(genere.id);
      } else {
        for (let i = 0; i < setGenre.length; i++) {
          if (setGenre[i] == genere.id) {
            setGenre.splice(i, 1);
          }
        }
      }
      if (setGenre.length > 0) {
        apiCall(discoverUrl + encodeURI(setGenre.join(",")));
      } else {
        resetGenres();
      }
    };
  });
};

//!NOTE: Getting trending movies for home page.
const getTrendingMovies = (data, url) => {
  data.forEach((movie) => {
    //? for movies the title variable in the json is 'title' but for tv it's 'name'
    const { vote_average, title, id, poster_path } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
    movieCard.id = id;
    movieCard.setAttribute("onclick", "getId(this.id)");
    movieCard.innerHTML = `<img src="${
      //?joining the image path here.
      baseImgUrl + poster_path
    }" alt="poster" />
        <div class="movie-info">
        <h3>${addDots(title)}</h3>
        <span class="rating" onload="">${vote_average.toFixed(1)}⭐</span>
        </div>`;
    //*Putting every newly created movie-card into the container.
    container1.appendChild(movieCard);
  });
};

//!NOTE: Getting trending series for home page.
const getTrendingSeries = (data, url) => {
  data.forEach((tv) => {
    //? for movies the title variable in the json is 'title' but for tv it's 'name'
    const { vote_average, name, id, poster_path } = tv;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
    movieCard.id = id;
    movieCard.setAttribute("onclick", "getId(this.id)");
    movieCard.innerHTML = `<img src="${
      baseImgUrl + poster_path
    }" alt="poster" />
        <div class="movie-info">
          <h3>${addDots(name)}</h3>
          <span class="rating">${vote_average.toFixed(1)}⭐</span>
        </div>`;
    //*Putting every newly created movie-card into the container.
    container2.appendChild(movieCard);
  });
};

//?shows movies on the movie page.
const showMovies = (data, url) => {
  if (url.includes("now_playing")) {
    main.innerHTML += "<h2>Now Playing📽️</h2>";
  } else if (url.includes("popular")) {
    main.innerHTML += "<h2>Popular❤️‍🔥</h2>";
  } else if (url.includes("top_rated")) {
    main.innerHTML += "<h2>Top Rated🌟</h2>";
  } else if (url.includes("discover")) {
    main.innerHTML = "<h2>Results</h2>";
  }

  //*Creating a new container for the movie-cards.
  const container = document.createElement("div");
  container.className = "container";
  data.forEach((movie) => {
    const { vote_average, title, id, poster_path } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
    movieCard.id = id;
    movieCard.setAttribute("onclick", "getId(this.id)");
    movieCard.innerHTML = `<img src="${
      baseImgUrl + poster_path
    }" alt="poster" />
        <div class="movie-info">
          <h3>${addDots(title)}</h3>
          <span class="rating">${vote_average.toFixed(1)}⭐</span>
        </div>`;
    container.appendChild(movieCard);
  });

  main.appendChild(container);
};

const showSeries = (data, url) => {
  if (url.includes("on_the_air")) {
    main.innerHTML += "<h2>Now Playing📽️</h2>";
  } else if (url.includes("now_playing")) {
    main.innerHTML += "<h2></h2>";
  } else if (url.includes("popular")) {
    main.innerHTML += "<h2>Popular❤️‍🔥</h2>";
  } else if (url.includes("top_rated")) {
    main.innerHTML += "<h2>Top Rated🌟</h2>";
  }

  //*Creating a new container for the movie-cards.
  const container = document.createElement("div");
  container.className = "container";
  data.forEach((movie) => {
    const { vote_average, name, id, poster_path } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
    movieCard.id = id;
    movieCard.setAttribute("onclick", "getId(this.id)");
    movieCard.innerHTML = `<img src="${
      baseImgUrl + poster_path
    }" alt="poster" />
          <div class="movie-info">
            <h3>${addDots(name)}</h3>
            <span class="rating">${vote_average.toFixed(1)}⭐</span>
          </div>`;
    container.appendChild(movieCard);
  });

  main.appendChild(container);
};

const showSearch = (data) => {
  //? Reseting the main tag innerHTML for the search results.
  main.innerHTML =" ";
  //? Adding the 'search-results' class only for css to work for search results
  main.classList.add("container");
  data.forEach((movie) => {
    const { vote_average, title, id, poster_path } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
    movieCard.id = id;
    movieCard.setAttribute("onclick", "getId(this.id)");
    movieCard.innerHTML = `<img src="${
      baseImgUrl + poster_path
    }" alt="poster" onerror="this.src='imgnotFound.png';" />
        <div class="movie-info">
          <h3>${addDots(title)}</h3>
          <span class="rating">${vote_average.toFixed(1)}⭐</span>
        </div>`;
    main.appendChild(movieCard);
  });
};

//?Getting the search value and calling the function to get the search results

form.onsubmit = (e) => {
  e.preventDefault();

  const searchTerm = input.value.toString();

  if (searchTerm) {
    apiCall(searchUrl + "&query=" + searchTerm);
  } else {
    window.location = "/index.html";
    main.innerHTML = " ";
    loadHomePage();
  }
};

//?Adding dots In the TItle if its too long to fit in the movieCard

const addDots = (title) => {
  if (title.length > 25) {
    title = title.slice(0, 20) + "...";
  }
  return title;
};

const resetGenres = () => {
  if (setGenre.length == 0) {
    main.innerHTML = "<h2>Please Choose a Genre</h2>";
  }
};

const getId = (id) => {
  showDetails(id);
};

const showDetails = (id) => {};
