var _ = {}

_.A = function(array){
  if (typeof array.length === 'number') return array

  var len = array.length()
    , res = []

  while (len--) {
    res.push(array[len])
  }

  return res
}

_.each = function(array, callback){
  _.A(array).forEach(callback)
}

_.filter = function(array, callback){
  return _.A(array).filter(callback)
}

_.isGroup = function(layer){
  var klass = [layer class]
  return klass === MSLayerGroup || klass === MSArtboardGroup
}

_.map = function(array, callback){
  return _.A(array).map(callback)
}

_.pluck = function(array, selector){
  return _.A(array).map(prop(selector))
}

function prop(selector){
  return function(e){
    return [e performSelector:selector]
  }
}
