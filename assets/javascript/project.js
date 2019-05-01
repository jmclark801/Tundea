
// Declare Variables and call initial functions needed on page load
var redirectUri = window.location.href;
var authorizationToken = ""
var queryURL = ""
displayButton()
getAuthorizationToken()

// This function toggles classes to hide/display buttons that make it clear to the user what steps they need to take
function displayButton(){
  // We need someone to get the CSS hide class to work so that only one button shows
  // This is likely being overridden in semantic.css somewhere
  if (authorizationToken === ""){
    $('#login-button').removeClass('hide')
    $('#search-button').addClass('hide')
  } else {
    $('#login-button').addClass('hide')
    $('#search-button').removeClass('hide')
  }
}

// This function looks for and stores the authorization token
function getAuthorizationToken(){
  // This function needs to be called every time the page is loaded so that when users
  // are returned to the app after authenticating in Spotify, the access token is captured
  var returnedAuthorizationToken = location.hash.substr(1)
  authorizationToken = "Bearer " + returnedAuthorizationToken.substring(returnedAuthorizationToken.indexOf("=")+1, returnedAuthorizationToken.indexOf("&"));
  console.log(authorizationToken)
}

function buildQueryURL() {
  // add code here to build out the searchURL
  // the searchType can later be modifed to call the function with different searches
  // ie 'search' or 'seed'
  queryURL = "https://api.spotify.com/v1/search?q=" + $('#searchTerm').val().trim() + "&type=artist";

}

var redirectUri = window.location.href;
redirectUri = redirectUri.substring(0, redirectUri.length -1); // Used to truncate a trailing / (slash) so the login click handler works correctly
$('#login-button').on('click', function(){
  window.location.href = 'https://accounts.spotify.com/authorize?client_id=6ba0c775865d4f34a62198bacaebc943&response_type=token&redirect_uri=' + redirectUri;
})
console.log(redirectUri);


$("#search-button").on("click", function() {
    buildQueryURL()
    $.ajax({
      method: "GET",
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", authorizationToken)
      },
      url: queryURL,
    }).then(function(response) {
      // console.log('response: ', response);

      // This code is for the direct response table, not for the recommendations table
      // Variable Definition and Troubleshooting
      // Name
      var resultArtist = response.artists.items["0"].name;
      // console.log('name: ', resultArtist);
      // Image
      var resultImg = response.artists.items["0"].images[0].url;
      // console.log('image: ', resultImg);
      // Artist ID:
      var resultId = response.artists.items["0"].id;
      console.log('artist id: ', resultId);
      // Popularity Rating: 
      var resultPopularity = response.artists.items["0"].popularity;
      // console.log('popularity: ', resultPopularity);
      // Genres: 
      var resultGenre = response.artists.items["0"].genres;
      // console.log('genres: ', resultGenre);

      // Create variables for pushing to HTML
      // New Row Variable
      var newRow = $('<tr>');
      // New Artist Variable
      var newArtist = $('<td>');
      // Add Class to newArtist
      newArtist.addClass('artist');
      // Create <td> for img
      var newImgTag = $('<td>');
      // Add Class to newImgTag
      newImgTag.addClass('image');
      // New Image Variable
      var newImg = $('<img>');
      // Add Class to Image
      newImg.addClass('artistImg');
      // Store Image in Variable
      newImg.attr('src', resultImg);
      // Append newImg to newImgTag
      newImgTag.append(newImg);
      // Store Artist Name in variable
      newArtist.append(resultArtist);
      // New Genre Variable
      var newGenre = $('<td class="genre">');
      newGenre.append(resultGenre);
      // New Popularity Variable
      var newPopularity = $('<td class="popularity">');
      newPopularity.append(resultPopularity);

      // Append to newRow
      newRow.append(newImg);
      newRow.append(newArtist);
      newRow.append(newGenre);
      newRow.append(newPopularity);

      // Prepend to HTML
      $('#newTrackRow').prepend(newRow);

      // This code is for appending the RECOMMENDED songs to the appropriate table
      // Variable Declaration/Troubleshooting/Locations
      // Path for Image
      var recResultImage
      // Path for Song Name
      var recResultTitle
      // Path for Artist
      var recResultArtist
      // Path for Album
      var recResultAlbum
      // Path for Duration
      var recResultDuration
      
      // Create Variable for Recommendation Row
      var recRow = $('<tr>');
      // Create Play Button
      var recPlay = $('<td>');
      recPlay.addClass('recPlay');
      // Create Recommended Image Tag
      var recImageTag = ('<td>');
      recImageTag.addClass('image');
      var recImage = ('<img>');
      recImage.addClass('recImage');
      // recImage.attr('src', ############);
      // Create Variable for Title <td>
      var recTitle = $('<td>');
      recTitle.addClass('recTitle');
      // Create Variable for Artist Tag
      var recArtist = $('<td>');
      recArtist.addClass('recArtist');
      // Create Variable for Album Tag
      var recAlbum = $('<td>');
      recAlbum.addClass('recAlbum');
      // Create Variable for Duration
      var recDuration = $('<td>');
      recDuration.addClass('recDuration');
      // Create Variable for Add to Playlist
      var recAdd = $('<td>');
      recAdd.addClass('recAdd');
    

      // Function when the user clicks on a row
      $('tr').on('click', function() {
        console.log('clicked a row');
      });
    });
});



