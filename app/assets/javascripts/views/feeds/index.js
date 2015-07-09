NewsReader.Views.Index = Backbone.View.extend({
  template: JST["feeds/index"],
  events: {
    "click .delete": "deleteFeed"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  render: function () {
    var content = this.template({feeds: this.collection});
    this.$el.html(content);

    return this;
  },

  deleteFeed: function (event) {
    event.preventDefault();
    var feedId = $(event.currentTarget).data("id");
    var feed = this.collection.get(feedId);
    feed.destroy({wait: true});
  }
})
