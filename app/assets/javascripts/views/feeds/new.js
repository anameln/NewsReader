NewsReader.Views.NewFeed = Backbone.View.extend({
  template: JST["feeds/new"],
  events: {
    "submit form": "createFeed"
  },

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  createFeed: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON()["feed"];

    var feed = new NewsReader.Models.Feed(formData);
    var view = this;

    feed.on("invalid", function (model, error) {
      alert(error);
    });

    feed.save({}, {
      success: function () {
        NewsReader.Collections.feeds.add(feed);
        Backbone.history.navigate("/feeds/" + feed.id, {trigger: true});
      },
      error: function (model, response) {
        view.$el.prepend(response.responseText);
      }
    });
  }
})
