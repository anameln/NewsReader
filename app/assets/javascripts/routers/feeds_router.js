NewsReader.Routers.FeedsRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "feeds/new": "new",
    "feeds/:id": "show"
  },

  initialize: function () {
    this.feeds = NewsReader.Collections.feeds;
    this.$rootEl = $("#content");
  },

  index: function () {
    this.feeds.fetch();
    var index = new NewsReader.Views.Index({collection: this.feeds});
    this._swapView(index);
  },

  show: function (id) {
    var feed = this.feeds.getOrFetch(id);
    feed.fetch();
    var show = new NewsReader.Views.Show({model: feed});
    this._swapView(show);
  },

  new: function () {
    var newView = new NewsReader.Views.NewFeed();
    this._swapView(newView);
  },

  _swapView: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }
});
