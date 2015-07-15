// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  friends: [],
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
        app.getRoom(message.roomname);
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
          app.addMessage(message);
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
    this.clearMessages();
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
  },
  clearMessages: function() {
    $('#chats').html("");
  },
  addMessage: function(message) {
    // Create a node for each object
    var container = $("<div class='chat'></div>");
    // If username is in our friends list
      // bold the text
    var user = $("<span class='username'></span>").text(message.username);
    var text = $("<p class='text'></p>").text(message.text);

    $(user).click(function(e) {
      // Adds the targer username to the friends property of app (it can be an array)
      var username = $(this)[0].innerHTML;
      app.friends.push(username);
      app.fetch("where=" + JSON.stringify({username:username}));
    });

    container.append(user);
    container.append(text);

    // Append the node to the #main element
    $("#chats").append(container);

    if(_.indexOf(app.friends, message.username) !== -1){
      // element.css("font-weight", "bold")
      text.css("font-weight", "bold");
    }
  },
  addRoom: function(room) {

  }
}

app.init();