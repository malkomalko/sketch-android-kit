#import 'library/tim.js'
#import 'library/functional.js'
#import 'library/classes.js'

var console = {
  log: function(msg){
    var d = +new Date()
    log('\nSketchBOL-' + d + '\n' + msg + '\nSketchEOL-' + d)
  }
}

var ui = {
  alert: function(msg, title){
    title = title || ''
    var app = [NSApplication sharedApplication]
    [app displayDialog:msg withTitle:title]
  },
  createMenu: function(message, items){
    var accessory = [[NSComboBox alloc] initWithFrame:NSMakeRect(0,0,200,25)]
    [accessory addItemsWithObjectValues:items]
    [accessory selectItemAtIndex:0]

    var alert = [[NSAlert alloc] init]
    [alert setMessageText:message]
    [alert addButtonWithTitle:'OK']
    [alert addButtonWithTitle:'Cancel']
    [alert setAccessoryView:accessory]

    var responseCode = [alert runModal]
    var sel = [accessory indexOfSelectedItem]

    return [responseCode, sel]
  }
}

var loadSettings = function(){
  var settings = [NSString stringWithContentsOfFile:SETTINGS_FILE
                                           encoding:NSUTF8StringEncoding
                                              error:nil]

  settings = JSON.parse(settings) || {}
  return settings
}

var noop = function(){}
