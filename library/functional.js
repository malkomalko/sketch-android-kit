var nativeTrim = String.prototype.trim;

var defaultToWhiteSpace = function (characters) {
  if (!characters) {
    return '\\s';
  } else if (characters.source) {
    return characters.source;
  } else {
    return '[' + _.str.escapeRegExp(characters) + ']';
  }
};

_.A = function (array) {
  if (typeof array.length === 'number') return array;

  var len = array.count();
  var res = [];

  while (len--) {
    res.push(array[len]);
  }

  return res;
};

_.each = function (array, callback) {
  _.A(array).forEach(callback);
};

_.filter = function (array, callback) {
  return _.A(array).filter(callback);
};

_.first = function (array) {
  return _.A(array)[0];
};

_.isGroup = function (layer) {
  var klass = layer.class();
  return klass === MSLayerGroup || klass === MSArtboardGroup;
};

_.map = function (array, callback) {
  return _.A(array).map(callback);
};

_.pluck = function (array, selector) {
  return _.A(array).map(prop(selector));
};

_.str = {
  camelize: function (str) {
    return _.str.trim(str).replace(/[-_\s]+(.)?/g, function (match, c) {
      return c ? c.toUpperCase() : '';
    });
  },
  capitalize : function (str) {
    str = !str ? '' : String(str);
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  classify: function (str) {
    return _.str.titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
  },
  clean: function (str) {
    return _.str.trim(str).replace(/\s+/g, ' ');
  },
  endsWith: function (str, ends) {
    if (ends === '') return true;
    if (!str || !ends) return false;
    str = String(str);
    ends = String(ends);
    return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
  },
  escapeRegExp: function (str) {
    if (!str) return '';
    return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  },
  include: function (str, needle) {
    if (needle === '') return true;
    if (!str) return false;
    return String(str).indexOf(needle) !== -1;
  },
  isBlank: function (str) {
    if (!str) str = '';
    return (/^\s*$/).test(str);
  },
  javaId: function (str) {
    if (!str) str = '';
    str = str.toLowerCase();
    str = _.str.clean(str);
    str = str.replace(/ /g, '_');
    return str.replace(/[^a-z0-9_]/g, '');
  },
  split: function (str, modifier) {
    if (!str) str = '';
    str = str.split(new RegExp('\\s*' + modifier + '\\s*'))[1];
    return _.str.clean(str);
  },
  startsWith: function (str, starts) {
    if (starts === '') return true;
    if (!str || !starts) return false;
    str = String(str);
    starts = String(starts);
    return str.length >= starts.length && str.slice(0, starts.length) === starts;
  },
  titleize: function (str) {
    if (!str) return '';
    str = String(str).toLowerCase();
    return str.replace(/(?:^|\s|-)\S/g, function(c){ return c.toUpperCase(); });
  },
  trim: function (str, characters) {
    if (!str) return '';
    if (!characters && nativeTrim) return nativeTrim.call(str);
    characters = defaultToWhiteSpace(characters);
    return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
  }
};

function prop(selector) {
  return function (e) {
    return e[selector];
  };
}
