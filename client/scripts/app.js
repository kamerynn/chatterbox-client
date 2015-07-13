// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function() {

  },
  send: function() {

  },
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      //data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        // Loop over results array
        _.each(data.results, function(message) {
          // Create a node for each object
          var container = $("<div class='message'></div>");
          var user = $("<span></span>").text(message.username);
          var text = $("<p></p>").text(message.text);

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