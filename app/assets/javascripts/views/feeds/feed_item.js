NewsReader.Views.FeedItem = Backbone.View.extend({
  template: JST["feeds/feed_item"],
  tagName: "li",
  events: {
    "click .delete": "deleteFeed"
  },

  render: function () {
    var content = this.template({feed: this.model});
    this.$el.data("id", this.model.id);
    this.$el.html(content);

    return this;
  },

  deleteFeed: function (event) {
    event.preventDefault();
    var feedId = $(event.delegateTarget).data("id");
    var feed = NewsReader.Collections.feeds.get(feedId);
    feed.destroy({wait: true});
  }
})
