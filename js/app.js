var App = SC.Application.create({
});

App.papers = SC.Object.create({});

App.snippetsController = SC.Object.create({
  pasteOctocat: function() {
    SC.setPath("App.papers.main.path", Paths.Octocat); 
  },
  pasteApple: function() {
    SC.setPath("App.papers.main.path", Paths.Apple); 
  },
  pasteChrome: function() {
    SC.setPath("App.papers.main.path", Paths.Chrome); 
  },
  pasteTwitter: function() {
    SC.setPath("App.papers.main.path", Paths.Twitter); 
  }
});

App.RaphaelPaper = SC.Object.extend({
  width: 320,
  height: 200,
  path: null,
  fill: "#000",
  stroke: "black",
  scale: 1,
  elementId: null,
  paperObject: null,
  init: function() {
    this._super();
    console.log('in init');
    this.set('paperObject', Raphael(this.elementId, this.width, this.height));
    if (!SC.empty(this.path)) {
      this.pathDidChange();
    }
  },
  pathDidChange: function() {
    this.paperObject.clear();
    var p = this.paperObject.path(this.path).attr({fill: this.fill, stroke: this.stroke});
    p.scale(this.scale, this.scale, 0, 0);
  }.observes('path', 'fill', 'stroke', 'scale'),
  sizeDidChange: function() {
    this.paperObject.setSize(this.width, this.height);
  }.observes('width', 'height'),
});


App.RaphaelView = SC.View.extend({
  mouseDown: function() {
    console.log('paper', this.get('paper'));
  },

  didInsertElement: function() {
    SC.bind(this, "paper", 'App.papers.' + this.get('elementId'));
    App.papers.set(this.get('elementId'), App.RaphaelPaper.create({elementId: this.get('elementId'), path: this.get('path')}));
    App.wurst = this;
  }
});
