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
  this.layers = [artboard layers]
}

Artboard.create = function(artboards){
  return _.map(artboards, function(artboard){
    return new Artboard(artboard)
  })
}

Artboard.prototype = {
  groups: function(){
    return _.filter(this.layers, _.isGroup)
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
