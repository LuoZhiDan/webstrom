/**
 *
 * 版本修改 1.1.2
 * 描述：
 *  1 规范controller中定义的方法，与事件名一致（on+事件名）
 *  2 规范视图模板，设置data-role,data-event两个属性，
 *  data-role代表在组件中扮演的角色
 *  data-event代表触发什么事件 例：'focus:id click:id select:id' 一个元素可以触发多个事件
 *  多个元素事件一样可以放在一个方法中
 *  MVC模式规则：
 *  M : 只负责与数据相关的操作
 *  V : 只负责数据视图元素，数据渲染
 *  C ：事件系统，调用MV中方法
 */

!function(){

    var controller = Fw.combox = function(config){
        Fw.apply(this, config, {
            pageIndex : 1,
            pageSize : 10,
            id : '',
            appendType : 'node'//渲染方式对象还是字符串
        });
        this.start();
    }

    var fn = Fw.apply(controller.prototype, Fw.Event ,{
        start : function(){
            var me = this, parent;

            me.model.heart = me;
            me.view.heart = me;
            parent = me.parentElement = document.querySelector('#' + me.id);

            if(me.appendType == 'node'){//渲染到页面
                parent.appendChild(me.view.getTemplate('node'));
            } else {
                parent.innerHTML = me.view.getTemplate('node');
            }
            Fw.scan(parent.children[0], me);
            me.elementListener();
            me.listeners();
        },
        listeners : function(){//负责自定义事件监听
            var me = this;
            me.on('change:store', function () {
                me.view.render(me.model.getPageData());
            });
        },
        elementListener : function () {//负责事件监听
            var me = this;
            var events = me.events;
            for(var p in events){//元素事件监听
                var els = events[p], strArr = p.split(' ');
                for(var i = strArr.length; i--;){
                    var eventType = strArr[i].split(':');
                    if(!me[eventType[0]][eventType[1]]){
                        continue;
                    }
                    var callback  = function(){
                        var handle = me[eventType[0]][eventType[1]];
                        return function (ev) {
                            handle.call(me, ev);
                        }
                    }();
                    els.addEventListener(eventType[0], callback);//eventType[0]表示事件类型， 1 表示事件方法标识
                }
            }
        },
        focus : {
            'input' : function(){
                this.roles['list-wrap'].classList.remove('hide');
                this.view.render(this.model.getPageData());
            }
        },
        click : {
            'caret' : function(ev){
                this.roles['list-wrap'].classList.add('hide');
            }

        },
        blur : {
            'input' :  function(ev){
                this.roles['list-wrap'].classList.add('hide');
            }
        }
    });

    fn.model = {//模型数据
            store : [{filed:'name', value:'name1'},
                {filed:'name1', value:'name1'},
                {filed:'name2', value:'name1'},
                {filed:'name3', value:'name1'},
                {filed:'name4', value:'name1'},
                {filed:'name5', value:'name1'},
                {filed:'name6', value:'name1'},
                {filed:'name7', value:'name1'},
                {filed:'name8', value:'name1'},
                {filed:'name9', value:'name1'},
                {filed:'name10', value:'name1'},
                {filed:'name11', value:'name1'},
                {filed:'name12', value:'name1'},
                {filed:'name13', value:'name1'},
                {filed:'name14', value:'name1'},
                {filed:'name15', value:'name1'},
                {filed:'name16', value:'name1'},
                {filed:'name17', value:'name1'},
                {filed:'name18', value:'name1'},
                {filed:'name19', value:'name1'},
                {filed:'name20', value:'name1'},
                {filed:'name21', value:'name1'},
                {filed:'name22', value:'name1'},
                {filed:'name23', value:'name1'},
                {filed:'name24', value:'name1'},
                {filed:'name25', value:'name1'}],

            getStore : function(){
                return this.store;
            },
            getPageData : function(){
                return this.store;
            },
            set : function(key, value, reset){
                var flag = false;
                if(this[key]){
                    if(Fw.isArray(value)) {
                        if(reset){
                            this[key] = value;
                            flag = true;
                        } else {
                            this[key].concat(value);
                            flag = true;
                        }
                    } else {
                        this[key] = value;
                        flag = true;
                    }
                    flag && this.heart.fire('change:'+ key);
                }
            },
            get : function(key){
                return this[key];
            }
        };

        fn.view = {//视图
            template : '<div class="combox" data-role="combox">' +
            '<input class="combox-input" data-role="input" data-event="focus:input">' +
            '<span class="combox-caret" data-role="caret" aria-disabled="true" data-event="click:caret"><i class="caret"></i></span>' +
            '<div class="hide" data-role="list-wrap">' +
            '<ul class="combox-list" data-role="list"></ul>' +
            '<div class="combox-page" data-role="page-wrap">' +
            '<span class="combox-page-pre" data-role="page-pre"><<</span>' +
            '<input class="combox-page-input" maxlength="6" data-role="page-input" value="1">' +
            '<span class="combox-page-next" data-role="pageNext">>></span></div></div></div>',

            listItems :null,

            getTemplate : function(type){
                if(type == 'node'){
                    var div = document.createElement('div');

                    div.innerHTML = this.template;
                    return div.children[0];
                }
            },
            render : function(data){
                var me = this;
                if(!data || data.length == 0){
                    return ;
                }
                if(!me.listItems){
                    /*'<li class="combox-item" data-role="list-item"></li>*/
                    var li = document.createElement('li');
                    li.className = 'combox-item';
                    me.listItems = [];
                    var frag = document.createDocumentFragment();
                    for(var i = 0; i < me.heart.pageSize; i++){//根据每页显示
                        var node = li.cloneNode();
                        Object.defineProperty(node, 'showHtml',{
                            set : function(obj){
                                if(obj){
                                    this.innerText = obj.filed;
                                    this.value = obj.value;
                                    this.classList.remove('hide');
                                } else {
                                    this.classList.add('hide');
                                }
                            },
                            get : function(){
                                if(this.classList.contains('hide')){
                                    return null;
                                } else {
                                    return {filed : this.innerText, value : this.value};
                                }
                            }
                        });
                        node.showHtml = data[i];
                        this.listItems.push(node);
                        frag.appendChild(node);
                    }
                    me.heart.roles['list'].appendChild(frag);
                } else {
                    for(var i = 0; i < me.heart.pageSize; i++) {//根据每页显示
                        var child = this.listItems[i];
                        child.showHtml = data[i];
                    }
                }
            },
            update : function(data){
                for(var i = 0; i < me.heart.pageSize; i++) {//根据每页显示
                    var child = this.listItems[i];
                    child.showHtml = data[i];
                }
            }
        }
}();