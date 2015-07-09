NewsReader.Views.Show = Backbone.View.extend({
  template: JST["feeds/show"],
  events: {
    "click .refresh": "refresh"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    var $ul = $("<ul>");
    this.$el.append($ul);

    this.model.entries().each(function (entry) {
      var entryView = new NewsReader.Views.ShowEntry({model: entry});
      $ul.append(entryView.render().$el);
    });

    return this;
  },

  refresh: function () {
    this.model.fetch();
  }
})
