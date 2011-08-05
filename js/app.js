var App = SC.Application.create({});

// A class that represents an wraps an instance of a Raphael paper
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
    // create and init the actual Raphael "paper" object
    this.set('paperObject', Raphael(this.elementId, this.width, this.height));
    // draw a path if one was given
    if (!SC.empty(this.path)) {
      this.pathDidChange();
    }
  },
  pathDidChange: function() {
    // clear the canvas
    this.paperObject.clear();
    // draw the path
    var p = this.paperObject.path(this.path).attr({fill: this.fill, stroke: this.stroke});
    // apply the scale
    p.scale(this.scale, this.scale, 0, 0);
  }.observes('path', 'fill', 'stroke', 'scale'),
  sizeDidChange: function() {
    // adjust the size of the Raphael canvas
    this.paperObject.setSize(this.width, this.height);
  }.observes('width', 'height'),
});

// our custom RaphaelView
App.RaphaelView = SC.View.extend({
  // This is called when the view element was inserted into the DOM
  didInsertElement: function() {
    // we'll bind the view's "paper" property to App.papers.<name-of-dom-element>
    SC.bind(this, "paper", 'App.papers.' + this.get('elementId'));
    // create an instance of App.RaphaelPaper, which in turn will create and init the Raphael object
    App.papers.set(this.get('elementId'), App.RaphaelPaper.create({elementId: this.get('elementId'), path: this.get('path')}));
  }
});

// an object that will hold all the App.RaphaelPaper objects
// of our application, index by the DOM element name
App.papers = SC.Object.create({});

// A controller for "pasting" pre-fab SVG paths
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
