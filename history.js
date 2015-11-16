
var msgHistory = [];
var maxHistoryLength = 5;

var history = {
  
    push : function(msg){
      msgHistory.push(msg);
      if(msgHistory.length > maxHistoryLength){
        msgHistory.splice(0, 1);
      }
    },
    getHisto: function(){
      return msgHistory;
    }
}

module.exports = history;
