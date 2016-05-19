var SequenceMatcher = require('./SequenceMatcher');

var stripLinebreaks = function (str) {
  return str.replace(/^[\n\r]*|[\n\r]*$/g, "");
};

var stringAsLines = function (str) {
  var lfpos = str.indexOf("\n");
  var crpos = str.indexOf("\r");
  var linebreak = ((lfpos > -1 && crpos > -1) || crpos < 0) ? "\n" : "\r";

  var lines = str.split(linebreak);
  for (var i = 0; i < lines.length; i++) {
    lines[i] = stripLinebreaks(lines[i]);
  }

  return lines;
};

var addCellsInline = function (tidx, tidx2, textLines, change) {
  return {
    'oldLineNumber': tidx == null ? "" : (tidx + 1).toString(),
    'newLineNumber': tidx2 == null ? "" : (tidx2 + 1).toString(),
    'action': change,
    'text': textLines[tidx != null ? tidx : tidx2].replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")
  }
};

module.exports = {
  getInlineDiffsArray: function (first, second) {

    first = stringAsLines(first);
    second = stringAsLines(second);

    if (first == null) {
      throw "Cannot build diff view, first text is not defined.";
    }
    if (second == null) {
      throw "Cannot build diff view; newTextLines is not defined.";
    }

    var opcodes = (new SequenceMatcher(first, second)).get_opcodes();

    var rows = [];


    for (var idx = 0; idx < opcodes.length; idx++) {
      var code = opcodes[idx];
      var change = code[0];
      var b = code[1];
      var be = code[2];
      var n = code[3];
      var ne = code[4];
      var rowcnt = Math.max(be - b, ne - n);
      var toprows = [];
      var botrows = [];

      for (var i = 0; i < rowcnt; i++) {

        if (change == "insert") {
          toprows.push(addCellsInline(null, n++, second, change));
        } else if (change == "replace") {
          if (b < be) toprows.push(addCellsInline(b++, null, first, "delete"));
          if (n < ne) botrows.push(addCellsInline(null, n++, second, "insert"));
        } else if (change == "delete") {
          toprows.push(addCellsInline(b++, null, first, change));
        } else {
          // equal
          toprows.push(addCellsInline(b++, n++, first, change));
        }

      }
      for (i = 0; i < toprows.length; i++) rows.push(toprows[i]);
      for (i = 0; i < botrows.length; i++) rows.push(botrows[i]);
    }
    return rows;
  }
};

