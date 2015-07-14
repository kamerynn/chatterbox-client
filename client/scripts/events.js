$('#submit').on('click', function(e){
  console.log("clicked!");
  var message = {
    username: "kamlex",
    text: $('#input').val()
  }

  app.send(message);

});

