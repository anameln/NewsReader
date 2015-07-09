NewsReader.Routers.FeedsRouter = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  index: function () {
    var feeds = new NewsReader.Collections.Feeds();
    feeds.fetch();
    var index = new NewsReader.Views.Index({collection: feeds});
    $("body").html(index.render().$el);
  }
});
