$('#submit').on('click', function(e){
  
  var username = window.location.search.match(/(=)\w+/)[0].split("");
  username.shift();
  username = username.join("");


  var message = {
    username: username,
    text: $('#input').val()
  }

  app.send(message);

});

 