#import 'library/functional.js'
#import 'library/classes.js'

var console = {
  log: function(msg){
    var d = +new Date()
    log('\nSketchBOL-' + d + '\n' + msg + '\nSketchEOL-' + d)
  }
}

var noop = function(){}
