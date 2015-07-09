NewsReader.Views.Show = Backbone.CompositeView.extend({
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

    this.model.entries().each(function (entry) {
      var entryView = new NewsReader.Views.ShowEntry({model: entry});
      this.addSubview("ul", entryView);
    }.bind(this));

    return this;
  },

  refresh: function () {
    this.model.fetch();
  }
})
