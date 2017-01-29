/**
 * Created by pasiutavitaliy on 29.01.17.
 */

function convertToObject(str) {
  // console.log("convertToObjec str = " + str)
  var answer = {};
  var e_param = "";
  str = str.split('&');
  str.forEach(function(e){
    e = e.split('=');

    try{
      e_param = e[1][0];
    }catch(e) {
      e_param = "";
      // console.log(e);
    }

    if(e_param == '['){
      var data = e[1].substring(1, e[1].length - 1);
      answer[e[0]] = convertToObject(decodeURIComponent(data));
    } else answer[e[0]] = decodeURIComponent(e[1]);

  });
  // console.log("convertToObjec answer = " + answer +"  "+JSON.stringify(answer))
  return answer;
}

module.exports = {
  convertToObject: convertToObject
};
