var _ = {};

#import 'library/tim.js'
#import 'library/json.js'
#import 'library/db.js'
#import 'library/functional.js'
#import 'library/classes.js'

var noop = function () {};

_.logMethods = function (obj, methodName) {
  var mocha = obj.mocha ? obj.mocha() : obj.class().mocha();
  log(mocha.name() + ' ' + methodName);

  var methods = _.map(mocha[methodName](), function (method) {
    if (method.selector) {
      return method.selector();
    } else {
      return method.name();
    }
  }).sort();
  log(methods);
};

var console = {
  dir: function (obj) {
    if (!obj.mocha && !obj.class) return log(obj);

    _.logMethods(obj, 'classMethods');
    _.logMethods(obj, 'instanceMethods');
    _.logMethods(obj, 'properties');
  },
  log: function (msg) {
    log(msg);
  }
};

var ui = {
  alert: function (msg, title) {
    title = title || '';
    var app = [NSApplication sharedApplication];
    [app displayDialog:msg withTitle:title];
  },
  createMenu: function (message, items, selectedItemIndex) {
    selectedItemIndex = selectedItemIndex || 0;

    var accessory = [[NSComboBox alloc] initWithFrame:NSMakeRect(0,0,200,25)];
    [accessory addItemsWithObjectValues:items];
    [accessory selectItemAtIndex:selectedItemIndex];

    var alert = [[NSAlert alloc] init];
    [alert setMessageText:message];
    [alert addButtonWithTitle:'OK'];
    [alert addButtonWithTitle:'Cancel'];
    [alert setAccessoryView:accessory];

    var responseCode = [alert runModal];
    var sel = [accessory indexOfSelectedItem];

    return [responseCode, sel];
  }
};

var loadSettings = function () {
  var settings = _.db.get(Document.hashCode + '-settings');
  return settings ? _.json.parse(settings) : { transitions: {} };
};

var writeSettings = function (settings) {
  _.db.set(Document.hashCode + '-settings', _.json.stringify(settings));
};

var getString = function (key, defaultValue) {
  var settings = loadSettings();
  if (settings[key]) {
    return '' + settings[key].toString();
  } else {
    return defaultValue;
  }
};

var writeString = function (key, value) {
  var settings = loadSettings();
  settings[key] = value.toString();
  writeSettings(settings);
};
