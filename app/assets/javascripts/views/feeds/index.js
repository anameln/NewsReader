NewsReader.Views.Index = Backbone.View.extend({
  template: JST["feeds/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    var $ul = this.$("ul");

    this.collection.each(function (feed) {
      var feedItemView = new NewsReader.Views.FeedItem({model: feed});
      $ul.append(feedItemView.render().$el);
    });

    return this;
  }
})
