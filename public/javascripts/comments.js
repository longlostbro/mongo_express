$(document).ready(function(){
    $("#sendMessage").click(function(e){
      e.preventDefault();
      sendMessage();
    });
    $("#clearMessages").click(function(e){
      e.preventDefault();
      clearMessages();
    });
    var firstTime = true;
    function sendMessage()
    {
      var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val(),Date:new Date().toLocaleString()};
      jobj = JSON.stringify(myobj);
      var url = "comment";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          getComments();
          $("#Comment").val("");
          $('#messageBox').scrollTop($('#messageBox')[0].scrollHeight);
        }
      });
    }
    function clearMessages()
    {
      var url = "comment/clear";
      $.ajax({
        url:url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          getComments();
        }
      });
    }
    function getComments(){
      $.getJSON('comments', function(data) {
        var everything = "<ul class='messages'>";
        for(var comment in data) {
          com = data[comment];
          everything += "<li class='message'>" + com.Name + ": " + com.Comment + " <br><tab><i>" + com.Date + "</i></tab></li>";
        }
        everything += "</ul>";
        $("#messageBox").html(everything);
        var d = $('#messageBox');
        var bottom = d.scrollTop() >= d.prop("scrollHeight") - $('body').height();
        if (bottom) {
            d.scrollTop(d.prop("scrollHeight"));
        }
        if(firstTime)
        {
          firstTime = false;
          $('#messageBox').scrollTop($('#messageBox')[0].scrollHeight);
        }
      });
    };
    window.setInterval(getComments, 2000);
  });