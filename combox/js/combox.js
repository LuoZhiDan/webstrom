/**
 * Created by Administrator on 2016/1/15 0015.
 */
/*
* 说明：
*   data-role：标示元素在组件中的角色
*
*
*
* */

!function(){
    var template = '<div class="combox">' +
        '<input class="combox-input" data-role="input">' +
        '<span class="combox-caret" data-role="caret"><i class="caret"></i></span>' +
        '<div class="hide" data-role="list-wrap">' +
        '<ul class="combox-list" data-role="list">' +
        '<li class="combox-item" data-role="list-item">name</li></ul>' +
        '<div class="combox-page" data-role="page-wrap">' +
        '<span class="combox-page-pre" data-role="page-pre"><<</span>' +
        '<input class="combox-page-input" maxlength="6" data-role="page-input">' +
        '<span class="combox-page-next" data-role="page-next">>></span></div></div></div>';

    var div = document.createElement('div');//空元素用来创建元素
    var apply = function(tar, su, de){//对象赋值方法
        if(de){
            apply(tar, de);
        } else {
            for(var p in su){
                tar[p] = su[p];
            }
        }
    }
    var trigger = function(type){
        var event = this.listeners;
        var params = Array.prototype.slice.call(arguments);
        if(event && event[type]){
            if(params.length > 1){
                event[type](this,params.slice(1,params.length));
            } else {
                event[type](this);
            }
        }
    }
    var scan = function(wrap, node){
        var role = node.dataset.role,
            child = node.children;
        if(role){
            wrap[role] = node;
        }
        if(child.length > 0){
            for(var i = child.length; i--;){
                scan(wrap,child[i]);
            }
        }
    }

    var combox = function(config){
        apply(this,config);
        this.store = [];
        this.create();
        this.ready();
    }

    combox.prototype = {
        constructor : combox,
        /**
         * 名称：创建函数
         * 描述：加载所需html元素（展示元素）
         */
        create : function(){
            var nodes, parent,nodes,me = this;
            me.elements = {};
            trigger.call(this,'beforeCreate');//触发创建之前事件
            div.innerHTML = template;
            nodes = me.comboxElement = div.children[0];
            scan(me.elements, nodes);
            if(me.renderId){
                parent = me.comboxParent = document.getElementById(me.renderId);
                me.comboxParent.appendChild(nodes);
            }
            var elements = [];
            me.elements['list-item'].remove();
            for(var i = 0;i< 7 ;i++){
                var li = me.elements['list-item'].cloneNode();
                Object.defineProperty(li, 'html',{
                    set : function(obj){
                        if( obj.filed &&  obj.value){
                            this.innerText = obj.filed;
                            this.dataset.val = obj.value;
                        } else {
                            this.remove();
                        }
                    },
                    get : function(){
                        return {file:this.innerText, value:this.dataset.val};
                    }
                });
                elements.push(li);
                me.elements['list'].appendChild(li);
            }
            this.model = {
                store : [],
                elements : elements
            };
            Object.defineProperty(this.model,'change',{
                set:function(arr){
                    this.store = arr;
                    for(var i = 0;i<this.elements.length;i++){
                        this.elements[i].html = arr[i] || {file:'',value:''};
                    }
                }
            });
            trigger.call(this,'afterCreate');//触发创建之后事件
            return me.comboxElement;
        },
        render : function(data){
            data = [{filed:'name',value:'name'},
                {filed:'name1',value:'name1'},
                {filed:'name2',value:'name2'},
                {filed:'name3',value:'name3'},
                {filed:'name4',value:'name4'}];
            trigger.call(this,'beforeRender');//触发创建之前事件
            this.model.change = data;
            trigger.call(this,'afterRender');//触发创建之后事件
        },
        ready : function(){
            var me = this, els = me.elements;
            trigger.call(this,'beforeReady');//触发创建之前事件
            els['input'].addEventListener('focus',function(){
                els['list-wrap'].className = '';
                me.render();
                trigger.call('focus');
            });
            trigger.call(this,'afterReady');//触发创建之后事件
        },
        update : function(data){
            trigger.call(this,'beforeUpdate');//触发创建之前事件

            trigger.call(this,'afterUpdate');//触发创建之后事件
        },
        destrory : function(){
            trigger.call(this,'beforeDestrory');//触发创建之前事件

            trigger.call(this,'afterDestrory');//触发创建之后事件
        }
    }

    window.combox = combox;
}();