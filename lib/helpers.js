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

//Если с английского на русский, то передаём вторым параметром true.
transliterate = (
    function() {
        var
            rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
            eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g)
            ;
        return function(text, engToRus) {
            var x;
            for(x = 0; x < rus.length; x++) {
                text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
                text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
            }
            return text;
        }
    }
)();


module.exports = {
  convertToObject: convertToObject,
  transliterate: transliterate,
};
