/******************************************************************************/

var Document = {
  dir: [[doc fileURL] path].split([doc displayName])[0],
  name: [doc displayName],
  url: [[doc fileURL] path]
}

Document.artboards = function(){
  return Artboard.create([doc artboards])
}

Document.pages = function(){
  return _.map([doc pages], function(page){
    return new Page(page)
  })
}

/******************************************************************************/

var Artboard = function(artboard){
  this.orig = artboard
  this.id = [artboard hash]

  this.name = [artboard name]
  this.hiddenLayers = []
}

Artboard.create = function(artboards){
  return _.map(artboards, function(artboard){
    return new Artboard(artboard)
  })
}

Artboard.prototype = {
  groups: function(){
    return _.filter(this.layers(), function(layer){
      return layer.isGroup()
    })
  },
  hideOtherLayers: function(currentLayer){
    var self = this
    _.each(this.layers(), function(layer, i, array){
      if ([currentLayer hash] !== layer.id) {
        if (layer.isVisible()) layer.orig.isVisible = false
        self.hiddenLayers.push(layer.orig)
      }
    })
  },
  layers: function(){
    if (this.cache) return this.cache
    var artboardOrig = this.orig
    this.cache = Layer.create([artboardOrig layers], this)
    return this.cache
  },
  showHiddenLayers: function(){
    _.each(this.hiddenLayers, function(layer){
      layer.isVisible = true
    })
    this.hiddenLayers = []
  }
}

/******************************************************************************/

var Layer = function(layer, artboard){
  this.orig = layer
  this.id = [layer hash]
  this.artboard = artboard

  this.name = [layer name]
  this.frame = [layer frame]
  this.coords = {
    x: [[layer frame] left],
    y: [[layer frame] top],
    width: [[layer frame] width],
    height: [[layer frame] height]
  }
  this.rect = [[layer frame] GKRect]
}

Layer.create = function(layers, artboard){
  return _.map(layers, function(layer){
    return new Layer(layer, artboard)
  })
}

Layer.prototype = {
  export: function(path, factor){
    path = path.replace(/\/+$/, '')
    var artboard = this.artboard
      , artboardOrig = artboard.orig
    artboard.hideOtherLayers(this.orig)
    var fileName = _.str.javaId([artboardOrig name] + '_' + _.str.split(this.name, '-'))
    path = path + '/' + fileName + '.png'
    factor = factor || 1
    var slice = this.withFactor(factor)
    [doc saveArtboardOrSlice:slice toFile:path]
    artboard.showHiddenLayers()
  },
  isGroup: function(){
    return _.isGroup(this.orig)
  },
  isVisible: function(){
    var layerOrig = this.orig
    return [layerOrig isVisible]
  },
  withFactor: function(factor){
    var layerOrig = this.orig
      , copy = [layerOrig duplicate]
      , frame = [copy frame]
      , rect = [copy rectByAccountingForStyleSize:[[copy absoluteRect] rect]]
      , slice = [MSSlice sliceWithRect:rect scale:factor]

    [copy removeFromParent]

    return slice
  }
}

/******************************************************************************/

var Page = function(page){
  this.orig = page
  this.id = [page hash]

  this.name = [page name]
}

Page.prototype = {
  artboards: function(){
    if (this.cache) return this.cache
    var pageOrig = this.orig
    this.cache = Artboard.create([pageOrig artboards])
    return this.cache
  }
}

/******************************************************************************/
