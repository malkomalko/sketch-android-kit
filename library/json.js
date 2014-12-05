_.json = {};

_.json.parse = function (jsonStr) {
  var data = jsonStr.dataUsingEncoding(NSUTF8StringEncoding);
  var opts = NSJSONReadingMutableContainers | NSJSONReadingMutableLeaves | NSJSONReadingAllowFragments;
  return NSJSONSerialization.JSONObjectWithData_options_error(data, opts, null);
};

_.json.stringify = function (obj) {
  var data = NSJSONSerialization.dataWithJSONObject_options_error(obj, 0, null);
  return NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding);
};
