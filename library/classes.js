/******************************************************************************/

var Document = {}

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

  this.name = [artboard name]
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
  layers: function(){
    var artboard = this.orig
    return Layer.create([artboard layers])
  }
}

/******************************************************************************/

var Layer = function(layer){
  this.orig = layer

  this.name = [layer name]
  this.frame = [layer frame]
  this.coords = {
    x: [[layer frame] left],
    y: [[layer frame] top],
    width: [[layer frame] width],
    height: [[layer frame] height]
  }
}

Layer.create = function(layers){
  return _.map(layers, function(layer){
    return new Layer(layer)
  })
}

Layer.prototype = {
  isGroup: function(){
    return _.isGroup(this.orig)
  }
}

/******************************************************************************/

var Page = function(page){
  this.orig = page

  this.name = [page name]
}

Page.prototype = {
  artboards: function(){
    var page = this.orig
    return Artboard.create([page artboards])
  }
}

/******************************************************************************/
