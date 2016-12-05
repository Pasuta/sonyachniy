/**
 * url - адрес запроса, на какой url будет сделан запрос, куда будет отправлен запрос
 * params - обьект, который получит для обработки контроллер, если обьект типа formdata, то будет отправлен он, со всеми нужными полями, файлами и тд
 * callback - обьект типа formdata, со всеми нужными полями, файлами и тд
 * */
function ajax(url, params, callback) {
    var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!window.ActiveXObject && !window.XMLHttpRequest) alert('Download new browser, please!');
    req.open('POST', url);

    req.onload = function() {
        if (req.status == 200) {
            // callback(convertToObject(req.response));
            callback(req.response);
        } else {
            //reject(Error(req.statusText)); // TODO make error reporting
        }
    };

    req.onerror = function() {
        //reject(Error("Network error"))
    };

    var send = params instanceof window.FormData ? params : convertToString(params);
    // req.send(convertToString(params));
    req.send(send);
}

function convertToString(arr) {
    var string = "";
    for (var e in arr) {
        if(arr.hasOwnProperty(e)){
            if(typeof arr[e] == 'object'){
                var a = convertToString(arr[e]);
                string += "&" + e + "=[" + encodeURIComponent(a) + "]";
            }else{
                string += "&" + e + "=" + encodeURIComponent(arr[e]);
            }
        }
    }
    return string.substring(1);
}

function toast(x){
    var toast = document.getElementsByClassName('toast')[0];
    toast.style.display = 'block';
    toast.querySelectorAll('span')[0].innerHTML = x;

    Event.add( toast.querySelectorAll('div')[0], 'click', function(x){
        toast.style.opacity = '0';
        setTimeout(function(){ toast.style.display = 'none'},1000);
    });

    setTimeout(function(){ toast.style.opacity = '1'}, 500);
    setTimeout(function(){
        toast.style.opacity = '0';
        setTimeout(function(){ toast.style.display = 'none'},1000)
    }, 4000)
}

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

function jsonMergeRecursive(json1, json2) { // обьединение двух обьектов
    var out = {};
    for(var k1 in json1){
        if (json1.hasOwnProperty(k1)) out[k1] = json1[k1];
    }
    for(var k2 in json2){
        if (json2.hasOwnProperty(k2)) {
            if(!out.hasOwnProperty(k2)) out[k2] = json2[k2];
            else if(
              (typeof out[k2] === 'object') && (out[k2].constructor === Object) &&
              (typeof json2[k2] === 'object') && (json2[k2].constructor === Object)
            ) out[k2] = json_merge_recursive(out[k2], json2[k2]);
        }
    }
    return out;
}

function collectFormData(form){
    var m = {};

    var input = form.querySelectorAll('input');
    for (var i = 0; i < input.length; i++) {
        var obj = input[i];
        var relation = obj.getAttribute('data-relation');
        if(obj.getAttribute('type') == 'radio'){
            if(obj.checked) m[obj.name] = obj.value;
            continue;
        }
        if(!obj.value) continue;
        relation ? m[relation] += '.' + obj.value : m[obj.name] = obj.value;
    }

    var textarea = form.querySelectorAll('textarea');
    for (var j = 0; j < textarea.length; j++) {
        var obj2 = textarea[j];
        if(!obj2.value) continue;
        m[obj2.name] = obj2.value;
    }

    var editableBlock = form.getElementsByClassName('editableBlock');
    for (var z = 0; z < editableBlock.length; z++) {
        var obj3 = editableBlock[z];
        var name = obj3.getAttribute('data-title');
        m[name] = obj3.getElementsByClassName('note-editable')[0].innerHTML;
    }

    return m;
}

function makeRelation(form){
    var m = {};

    var input = form.querySelectorAll('input');
    for (var i = 0; i < input.length; i++) {
        var obj = input[i];
        var parent = obj.getAttribute('data-parent');
        if(!obj.value || !parent) continue;
        var name = obj.name;
        var relation = form.getElementsByClassName('relationTo-'+name)[0];
        m[name] = obj.value + '.' + relation.value;
    }

    return m;
}

function collectTime(form){
    var block = form.getElementsByClassName('timestampAFBlock');
    for (var i = 0; i < block.length; i++) {
        var obj = block[i];
        var input = obj.querySelectorAll('input[type=hidden]')[0];
        var select = obj.querySelectorAll('select');
        var selectedTime = {};
        for (var j = 0; j < select.length; j++) {
            var obj1 = select[j];
            selectedTime[obj1.getAttribute('name')] = obj1.options[obj1.selectedIndex].value;
        }
        input.value = new Date(selectedTime['year'], selectedTime['month'], selectedTime['day'], selectedTime['hours'], selectedTime['minutes'], selectedTime['seconds']).toLocaleString('en-Us');
    }
}

function sortObject(o) {
    var sorted = {};
    var key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function DomPath(element){
    var i = 0;
    var max = 25;
    var ret = [{'tag':element.tagName, 'id':element.id, 'classes':element.className.split(' '), 'element':element}];
    while (element.parentNode && element.parentNode.tagName) {
        i++;
        if (i == max) break;
        element = element.parentNode;
        ret.push({'tag':element.tagName, 'id':element.id, 'classes':element.className.split(' '), 'element':element});
    }

    return ret;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Event = (function () {

    var guid = 0;

    function fixEvent(event) {
        event = event || window.event;

        if (event.isFixed) {
            return event
        }
        event.isFixed = true;

        event.preventDefault = event.preventDefault || function () {
              this.returnValue = false
          };
        event.stopPropagation = event.stopPropagaton || function () {
              this.cancelBubble = true
          };

        if (!event.target) {
            event.target = event.srcElement
        }

        if (!event.relatedTarget && event.fromElement) {
            event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
        }

        if (event.pageX == null && event.clientX != null) {
            var html = document.documentElement, body = document.body;
            event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
            event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
        }

        if (!event.which && event.button) {
            event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
        }

        return event
    }

    /* Вызывается в контексте элемента всегда this = element */
    function commonHandle(event) {
        event = fixEvent(event);

        var handlers = this.events[event.type];

        for (var g in handlers) {
            if(handlers.hasOwnProperty(g)){
                var handler = handlers[g];

                var ret = handler.call(this, event);
                if (ret === false) {
                    event.preventDefault();
                    event.stopPropagation()
                }
            }
        }
    }

    return {
        add:function (elem, type, handler) {
            if (!elem) {
                throw 'No domel provided for Event.add. May be early call before dom loaded';
            }
            if (elem.setInterval && ( elem != window && !elem.frameElement )) {
                elem = window;
            }

            if (!handler.guid) {
                handler.guid = ++guid
            }

            if (!elem.events) {
                elem.events = {};
                elem.handle = function (event) {
                    if (typeof Event !== "undefined") {
                        return commonHandle.call(elem, event)
                    }
                }
            }

            if (!elem.events[type]) {
                elem.events[type] = {};

                if (elem.addEventListener)
                    elem.addEventListener(type, elem.handle, false);
                else if (elem.attachEvent)
                    elem.attachEvent("on" + type, elem.handle)
            }

            elem.events[type][handler.guid] = handler
        },

        remove:function (elem, type, handler) {
            var handlers = elem.events && elem.events[type];

            if (!handlers) return;

            delete handlers[handler.guid];

            for (var any in handlers) return
            if (elem.removeEventListener)
                elem.removeEventListener(type, elem.handle, false);
            else if (elem.detachEvent)
                elem.detachEvent("on" + type, elem.handle);

            delete elem.events[type];


            for (var any in elem.events) return
            try {
                delete elem.handle;
                delete elem.events
            } catch (e) { // IE
                elem.removeAttribute("handle");
                elem.removeAttribute("events")
            }
        }
    }
}());

if (typeof exports == 'object') {
    exports.sortObject = sortObject;
    exports.convertToString = convertToString;
    exports.convertToObject = convertToObject;
    exports.jsonMergeRecursive = jsonMergeRecursive;
    exports.getRandomInt = getRandomInt;
}