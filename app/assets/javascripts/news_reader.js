window.NewsReader = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new NewsReader.Routers.FeedsRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  NewsReader.initialize();
});
