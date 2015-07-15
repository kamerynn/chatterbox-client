$('#messageSubmit').on('click', function(e){
  
  var username = window.location.search.match(/(=)\w+/)[0].split("");
  username.shift();
  username = username.join("");


  var message = {
    username: username,
    text: $('#input').val(),
    roomname: $('#rooms option:selected').val()
  }

  app.send(message);

});

$('#roomSubmit').on('click', function(e) {
  //Grab value of newroom text
  var newRoom = $('#newRoom').val();
  //Append val to room list select options, make selected
  var newOption = $('<option></option>').text(newRoom);
  newOption.prop('selected', true);
  $('#rooms').append(newOption);

  app.getRoom(newRoom);
});

$('#rooms').change(function(){
  app.getRoom($('#rooms option:selected').val());
});


