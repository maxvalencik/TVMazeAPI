//Testing using Jasmine

describe('The search for shows works properly', function(){

  beforeEach(async function () {
    //test the search with work 'pin' 
    shows=await searchShows('pin');
  }); 

  it('should return an object of shows', function () {
    //test if the returned show object has the good keys
    expect(Object.keys(shows[0])).toEqual(['id', 'name', 'summary', 'image']);
    //check the error handling works if no image
    expect(shows[7].image).toEqual('https://tinyurl.com/tv-missing');
  });
})

describe('The search for episodes works properly', function(){

  beforeEach(async function () {
    //test the search with work 'pin'
    shows=await searchShows('pin');
    episodes=await getEpisodes(shows[0].id);
  });

  it('should return an object of episodes', function () {
    //test if the returned show object has the good keys
    expect(Object.keys(episodes[0])).toEqual(['id', 'name', 'season', 'number']);
  });

  it('should populate episodes for the DOM', function () {
    //test if the returned show object has the good keys
    // $firstEpisode = $("ul li:first");
    // expect($firstEpisode[0].textContent).toEqual('ID: 652996 / Name: Episode 1 / Season: 1 / Number: 1');
  });
})