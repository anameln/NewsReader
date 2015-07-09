NewsReader.Views.Index = Backbone.CompositeView.extend({
  template: JST["feeds/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.collection.each(function (feed) {
      this.addSubview("ul", new NewsReader.Views.FeedItem({model: feed}));
    }.bind(this));

    return this;
  }
})
