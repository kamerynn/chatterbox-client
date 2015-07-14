// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() {
    //this.fetch({order:"-updatedAt"});
    this.getRoom("4chan");
    this.pullDown();
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  // If a room is specified, 
  fetch: function(message, room) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        // Loop over results array
        _.each(data.results, function(message) {
          // Create a node for each object
          var container = $("<div class='chat'></div>");
          var user = $("<span class='username'></span>").text(message.username);
          var text = $("<p class='text'></p>").text(message.text);

          container.append(user);
          container.append(text);

          // Append the node to the #main element
          $("#main").append(container);
        })
        console.log(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  getRoom: function(roomname) {
    this.fetch("where=" + JSON.stringify({roomname:roomname}));
  },
  pullDown: function() {

    $.ajax({
      url: this.server,
      type: 'GET',
      data: {keys:"roomname"},
      contentType: 'application/json',
      success: function(data) {
        // Create an object that holds unique roomnames
        var roomObj = {};
        _.each(data.results, function(rooms) {
            roomObj[rooms.roomname] = true;
        });
        //Iterate over object
        _.each(roomObj, function(item, roomname) {
          //Create select nodes with unique roomname
          var option = $("<option></option>").text(roomname);
          $("#rooms").append(option);
        });
      },
      error: function(data) {

      }
    })

    // Create the initial append to options

  },
}

app.init();