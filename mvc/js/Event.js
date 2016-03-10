/**
 *  版本修改 1.1.2
 * 描述：
 *  1 规范Event对象，修改私有变量，_bear(承载元素)赋值放在createEvent方法中
 *  2 回调函数，作为事件对象的属性方便查询
 *  遗留问题：
 *      1 事件只能被监听一次
 *      2 事件不能传递数据
 */
var Fw = Fw || {};
/*
  这种方式主要是利用浏览器的自定义事件触发：
    优点：实现方式比较新颖
    缺点：1 对浏览器有依赖 2 1000次执行效率超过1秒
*/
/*!function(Fw){
    var Event = this.Event = {

        _bear : null,//事件承载元素
        _events : {},//创建事件集合地
        /!**
         * 作用：监听一次事件
         * 原理：监听事件，在回调方法中移除监听
         * 遗留：如果_bear = null或者
         * @param type
         * @param callback
         *!/
        once : function(type, callback){//监听一次事件
            var me = this;
            this.on(type,function(){
                callback.call(me, ev);
                me.removeEvent(type);
            });
        },
        on : function(type, callback){//监听事件
            var me = this, event = this._events[type];

            if(event.callback){
                console.log("此事件已被监听");
                return;
            }
            this._bear.addEventListener(type, function (ev) {

                callback.call(me, ev);
                me._events[type].callback = arguments.callee;
            });
        },
        removeEvent : function (type ,callback){//移除事件监听

            callback = callback || this._events[type].callback;
            delete this._events[type].callback//移除事件将callback删除，方便其他监听
            this._bear.removeEventListener(type, callback);
        },
        fireEvent : function(type, data){//手动触发事件

            var ev;
            if(ev = this._events[type]){
                this._bear.dispatchEvent(ev);
            }
        },
        createEvent : function(type){//创建事件
            if(!this._bear){
                this._bear = document.createElement('div');
            }
            if(typeof type == 'string'){
                var type = [type];
            }
            for(var i = type.length; i--;){
                if(this._events[type[i]]){
                    console.log(type[i]+":事件已存在！");
                    continue;
                }
                var ev = document.createEvent('Events');
                ev.initEvent(type[i], false, false);
                this._events[type[i]] = ev;
            }
            return this._events;
        }
    }
}.call(Fw);*/

!function(){
    this.Event = {
        _events : {},
        once : function (type, callback) {/*监听一次事件*/
            var me = this;

            me.on(type, function () {
                callback.call(me, me._events[type]);
                me.relieve(type);
            });
        },
        on : function(type, callback){/*监听事件*/
            var me = this;

            me._create(type);//创建事件
            me._events[type].callback = callback;
        },
        _create : function (type) {/*创建事件*/
            if(!(type in this._events)){
                this._events[type] = {};
            }
        },
        fire : function (type, data) {/*触发事件*/
            var me = this,
                event = me._events[type];
            if(!event){
                console.log('此事件不存在！')
                return;
            }
            event.data = data;
            if(event.callback){
                event.callback.call(me, event);
            }
        },
        relieve : function(type){/*解除事件监听*/
            var me = this;

            delete me._events[type].callback;
        }
    }

}.call(Fw);
