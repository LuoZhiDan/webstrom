/**
 * Created by Administrator on 2016/1/20 0020.
 */
var Fw = Fw || {};
!function(Fw){

    var Event = function () {
        this.init();
    }

    Event.prototype = {
        event : {},
        handle : {},
        init : function(){
            this.core = document.createElement('div');
        },
        once : function(type, callback){
            var me = this;
            this.core.addEventListener(type, function(event){
                callback.call(me.core, event);
                delete me.event[type].data;
                me.removeEvent(type, arguments.callee);
            });
        },
        on : function(type, callback){
            var me = this;
            this.core.addEventListener(type, function (ev) {
                callback.call(me.core, event);
                delete me.event[type].data
                me.handle[type] = arguments.callee;
            });
        },
        removeEvent : function (type ,callback){
            var handle = callback || this.handle[type];
            this.core.removeEventListener(type, handle);
        },
        fireEvent : function(type,data){
            var ev = this.event[type];
            if(data){
                ev.data = data;
            }
            this.core.dispatchEvent(ev);
        },
        createEvent : function(type){//创建事件
            if(typeof type == 'string'){
                var type = [type];
            }
            for(var i = type.length; i--;){
                var ev = document.createEvent('Events');
                ev.initEvent(type[i], false, false);
                this.event[type[i]] = ev;
            }
            return this.event;
        }
    }

    Fw.Event = Event;
}(Fw);