/******************************************************************************/

String.prototype.hashCode = function () {
  return this.split('').reduce(function (a,b) {
    a=((a<<5)-a)+b.charCodeAt(0);
    return a&a;
  }, 0);
};

/******************************************************************************/

var Document = {
  dir: doc.fileURL().path().split(doc.displayName())[0],
  hashCode: doc.fileURL().toString().hashCode().toString(),
  name: doc.displayName(),
  url: doc.fileURL().path()
};

Document.artboards = function () {
  return Artboard.create(doc.artboards());
};

Document.numberOfExportableGroups = function () {
  var number = 0;

  _.each(Document.artboards(), function (artboard) {
    number += artboard.numberOfExportableGroups();
  });

  return number;
};

Document.pages = function () {
  return _.map(doc.pages(), function (page) {
    return new Page(page);
  });
};

/******************************************************************************/

var Artboard = function (artboard) {
  this.orig = artboard;
  this._layers = artboard.layers().array();
  this.hash = artboard.hash();
  this.name = artboard.name();

  this.activityName = _.str.classify(_.str.javaId(this.name)) + 'Activity';
  this.layoutId = 'activity_' + _.str.javaId(this.name);
  this.sanitizedName = _.str.javaId(this.name);
  this.hiddenLayers = [];
};

Artboard.create = function (artboards) {
  return _.map(artboards, function (artboard) {
    return new Artboard(artboard);
  });
};

Artboard.prototype = {
  groups: function () {
    return _.filter(this.layers(), function (layer) {
      return layer.isGroup();
    });
  },
  hideOtherLayers: function (currentLayer) {
    var self = this;

    _.each(this.layers(), function (layer, i, array) {
      if (currentLayer.hash() !== layer.hash) {
        if (layer.isVisible()) layer.orig.isVisible = false;
        self.hiddenLayers.push(layer.orig);
      }
    });
  },
  layers: function () {
    if (this.cache) return this.cache;
    var artboardOrig = this.orig;
    this.cache = Layer.create(artboardOrig.layers(), this);
    return this.cache;
  },
  numberOfExportableGroups: function () {
    var number = 0;
    var artboardOrig = this.orig;

    _.each(this._layers, function (layer) {
      if (Layer.isExportable(layer)) number++;
    });

    return number;
  },
  showHiddenLayers: function () {
    _.each(this.hiddenLayers, function (layer) {
      layer.isVisible = true;
    });
    this.hiddenLayers = [];
  }
};

/******************************************************************************/

var Layer = function (layer, artboard) {
  var artboardOrig = artboard.orig;
  this.orig = layer;
  this.hash = layer.hash();
  this.name = layer.name();
  this.frame = layer.frame();
  this.artboard = artboard;

  var layerNameWithoutDash = _.str.split(this.name, '-');
  this.androidId = _.str.javaId(artboardOrig.name() + '_' +
                                layerNameWithoutDash);
  this.androidSnakeCase = _.str.camelize(_.str.javaId(layerNameWithoutDash));
  this.sanitizedName = _.str.javaId(layerNameWithoutDash);

  var transition = settings[this.androidId];
  this.transition = transition;
  this.hasTransition = !transition != null;

  this.coords = {
    x: this.frame.left() / dpi,
    y: this.frame.top() / dpi,
    width: this.frame.width(),
    height: this.frame.height()
  };

  this.rect = this.orig.absoluteRect();
};

Layer.create = function (layers, artboard) {
  return _.map(layers.array(), function (layer) {
    return new Layer(layer, artboard);
  });
};

Layer.isExportable = function (layer) {
  var klass = layer.class();
  var isGroup = klass === MSLayerGroup;
  var cleanName = _.str.clean(layer.name());
  var isExportable = _.str.startsWith(cleanName, '-');

  return isGroup && isExportable;
};

Layer.prototype = {
  export: function (path, factor) {
    path = path.replace(/\/+$/, '');
    var artboard = this.artboard;
    artboard.hideOtherLayers(this.orig);
    path = path + '/' + this.androidId + '.png';
    factor = factor || 1;
    var slice = this.withFactor(factor);
    doc.saveArtboardOrSlice_toFile(slice, path);
    artboard.showHiddenLayers();
  },
  isGroup: function () {
    return _.isGroup(this.orig);
  },
  isVisible: function () {
    var layerOrig = this.orig;
    return layerOrig.isVisible();
  },
  withFactor: function (factor) {
    var layerOrig = this.orig;
    var copy = layerOrig.duplicate();
    var rect = copy.absoluteDirtyRect();
    var slice = doc.sliceForRect(GKRect.rectWithRect(rect));
    slice.scale = factor;
    copy.removeFromParent();

    return slice;
  }
};

/******************************************************************************/

var Page = function (page) {
  this.orig = page;
  this.hash = page.hash();
  this.name = page.name();
};

Page.prototype = {
  artboards: function () {
    if (this.cache) return this.cache;
    var pageOrig = this.orig;
    this.cache = Artboard.create(pageOrig.artboards());
    return this.cache;
  }
};

/******************************************************************************/
