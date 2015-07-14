// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() {
    this.fetch({order:"-updatedAt"});
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
  fetch: function(message) {
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
  }
}

app.init();