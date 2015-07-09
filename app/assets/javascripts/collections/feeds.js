NewsReader.Collections.Feeds = Backbone.Collection.extend({
  url: "/api/feeds",
  model: NewsReader.Models.Feed,

  getOrFetch: function (id) {
    var feed = this.get(id);

    if (feed) {
      feed.fetch();
    } else {
      feed = new NewsReader.Models.Feed({id: id});
      feed.fetch({
        success: function () {
          this.add(feed);
        }.bind(this)
      })
    }

    return feed;
  }
});

NewsReader.Collections.feeds = new NewsReader.Collections.Feeds();
