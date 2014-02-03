#import 'library/tim.js'
#import 'library/functional.js'
#import 'library/classes.js'

var SETTINGS_FILE = Document.dir + '.sketch-android-kit'

var noop = function(){}

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
  createMenu: function(message, items, selectedItemIndex){
    selectedItemIndex = selectedItemIndex || 0

    var accessory = [[NSComboBox alloc] initWithFrame:NSMakeRect(0,0,200,25)]
    [accessory addItemsWithObjectValues:items]
    [accessory selectItemAtIndex:selectedItemIndex]

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

  settings = JSON.parse(settings) || {transitions:{}}
  return settings
}

var writeSettings = function(settings){
  settings = JSON.stringify(settings)
  var output = [NSString stringWithString:settings]
  [output writeToFile:SETTINGS_FILE atomically:NO]
}

var getString = function(key, defaultValue){
  var settings = loadSettings()
  if (settings[key]) {
    return settings[key].toString()
  } else {
    return defaultValue
  }
}

var writeString = function(key, value){
  var settings = loadSettings()
  settings[key] = value.toString()
  writeSettings(settings)
}
