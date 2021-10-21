/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // Make an ajax request to the searchShows api.
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);

   //array of objects to store shows found
  const shows = [];

  //get the length of the array of shows returned by the request
  const listLength = res.data.length;

  //add the new show object to the object array shows that lists all the show found
  for (let i = 0; i<listLength; i++){
      let newShow={
        id: res.data[i].show.id,
        name: res.data[i].show.name,
        summary: res.data[i].show.summary,
      };

      //add image/no image to the new show
      try{
        newShow['image'] = res.data[i].show.image.original;
      } catch(e){
        newShow['image'] = 'https://tinyurl.com/tv-missing';
      };

      //add show to the array of shows
      shows.push(newShow);
    }

  return shows;

}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <img class="card-img-top" src='${show.image}'>
           </div>
          <button id="episode-button">List of Episodes</button>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);


});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // get episodes from tvmaze
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);

  //Array of episode object
  const episodes = [];

  //get the length of the array of shows returned by the request
  const numEpisodes = res.data.length;

  //add the new episode object to the object array episodes that lists all the episodes found
  for (let i = 0; i<numEpisodes; i++){
      let newEpisode={
        id: res.data[i].id,
        name: res.data[i].name,
        season: res.data[i].season,
        number: res.data[i].number,
      };
    //add episode to the array of episodes
    episodes.push(newEpisode);
    }

  return episodes;
}

/** Populate episodes list:
 *     - given list of episodes, add episodes to DOM
 */

function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();

  for (let episode of episodes) {
    let $list = $(`<li>ID: ${episode.id} / Name: ${episode.name} / Season: ${episode.season} / Number: ${episode.number}</li>`);

    $episodesList.append($list);
  }
}

/** Handle showing episode list:
 *    - show episodes area
 *    - get list of epsiodes
 */

// add event listener to episode button inside the comtainer (delegation)
$(".container").on("click","#episode-button", async function (e) {
  //the ID of the show is an attribute of the parent node of the episode button
  const showID = $(e.target.parentNode).attr('data-show-id');

  // get the array of episodes for the show ID retrieved
  let episodes = await getEpisodes(showID);

  //show the episode area
  $("#episodes-area").show();

  //show the list of episodes
  populateEpisodes(episodes);
  
});

console.log(searchShows('pin'));
 

