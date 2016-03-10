/**
 * Created by Administrator on 2016/1/15 0015.
 */
!function(){
    var define = Object.defineProperty;
    if(!('innerText' in Element.prototype)){//1 使用Element 2
        define(Element.prototype,'innerText',{
            set : function(text) {
                this.textContent = text;
            },
            get : function(){
                return this.textContent.trim();
            }
        })
    }

    if(!Element.prototype.addEventListener){
        Element.prototype.addEventListener = function(type, callback) {
            this.attachEvent('on'+type , callback);
        }
        Element.prototype.removeEventListener = function(type, callback){
            this.detachEvent('on'+type, callback);
        }
    }
}();