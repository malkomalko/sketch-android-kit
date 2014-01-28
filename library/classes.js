var Document = {}

Document.artboards = function(){
  return _.map([doc artboards], function(artboard){
    return new Artboard(artboard)
  })
}

Document.pages = function(){
  return _.map([doc pages], function(page){
    return new Page(page)
  })
}

var Artboard = function(artboard){
  this.orig = artboard

  this.name = [artboard name]
}

var Page = function(page){
  this.orig = page

  this.name = [page name]
}
