NewsReader.Routers.FeedsRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "feeds/new": "new",
    "feeds/:id": "show"
  },

  initialize: function () {
    this.feeds = NewsReader.Collections.feeds;
  },

  index: function () {
    this.feeds.fetch();
    var index = new NewsReader.Views.Index({collection: this.feeds});
    $("#content").html(index.render().$el);
  },

  show: function (id) {
    var feed = this.feeds.getOrFetch(id);
    feed.fetch();
    var show = new NewsReader.Views.Show({model: feed});
    $("#content").html(show.render().$el);
  },

  new: function () {
    var newView = new NewsReader.Views.NewFeed();
    $("#content").html(newView.render().$el);
  }
});
