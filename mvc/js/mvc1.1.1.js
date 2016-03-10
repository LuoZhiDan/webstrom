/**
 *
 * Created by Administrator on 2016/1/19 0019.
 */
!function(){
    var toString = Object.prototype.toString;

    var controller = window.Combox= function(config){
        this.element = document.querySelector(config.element);
        this.model.heart = this;
        this.view.heart = this;
        this.start();
    }

    Fw.apply(controller.prototype, new Fw.Event(),{
        start : function(){
            var me = this;
            this.view.start(this.element);
            this.createEvent(['change:pageIndex','refresh','render','show', 'hide']);
            this.on('show', this.showList);
            this.on('hide', this.hideList);
            this.once('render', this.render);
            this.on('change:pageIndex', this.update);

            this.view.nodes['input'].addEventListener('focus',function(){
                me.fireEvent('render');
                me.fireEvent('show');
            });
            this.view.nodes['caret'].addEventListener('click',function(){
                me.fireEvent('hide');
            });
            this.view.nodes['page-input'].addEventListener('keyup',function(event){
                //me.model.set('pageIndex', this.value);
             });
        },
        update : function(){
            this.view.update(this.model.getPageData());
        },
        render: function(){
            this.view.render(this.model.get('store'), this.model.get('pageSize'))
        },
        showList : function(){
            this.view.nodes['list-wrap'].classList.remove('hide');
        },
        hideList : function(){
            this.view.nodes['list-wrap'].classList.add('hide');
        },
        model : {
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
            pageIndex : 1,
            total : 10,
            pageSize : 5,
            getStore : function(){
                return this.store();
            },
            getPageData : function(){
                console.log(this.pageIndex-1,this.pageSize*this.pageIndex);
                console.log(this.store.slice(this.pageIndex-1,this.pageSize*this.pageIndex));
                return this.store.slice(this.pageSize*(this.pageIndex-1),this.pageSize*this.pageIndex);
            },
            set : function(key, value, reset){
                if(this[key]){
                    if(Fw.isArray(value)) {
                        if(reset){
                            this[key] = value;
                            this.heart.fireEvent('refresh');
                        } else {
                            this[key].concat(value);
                        }
                    } else {
                        this[key] = value;
                        console.log(value);
                        this.heart.fireEvent('change:'+ key);
                    }
                }
            },
            get : function(key){
                return this[key];
            }
        },
        view : {
            template : '<div class="combox" data-role="combox">' +
            '<input class="combox-input" data-role="input">' +
            '<span class="combox-caret" data-role="caret"><i class="caret"></i></span>' +
            '<div class="hide" data-role="list-wrap">' +
            '<ul class="combox-list" data-role="list">' +
            '<li class="combox-item" data-role="list-item"></li></ul>' +
            '<div class="combox-page" data-role="page-wrap">' +
            '<span class="combox-page-pre" data-role="page-pre"><<</span>' +
            '<input class="combox-page-input" maxlength="6" data-role="page-input" value="1">' +
            '<span class="combox-page-next" data-role="page-next">>></span></div></div></div>',

            nodes : {},
            listItem : [],

            start : function(selector){
                var div = document.createElement('div');
                div.innerHTML = this.template;//创建元素
                this.scan(div.children[0]);
                if(typeof selector == 'string'){
                    this.parent = document.querySelector(selector);
                } else {
                    this.parent = selector;
                }
                this.parent.appendChild(this.nodes['combox']);
            },
            render : function(data, number){
                var node = this.nodes['list-item'];
                node.remove();//先冲树上移除
                var frag = document.createDocumentFragment();
                for(var i = 0; i<number;i++){
                    var li = node.cloneNode();
                    Object.defineProperty(li,'showHtml',{
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
                    li.showHtml = data[i];
                    this.listItem.push(li);
                    frag.appendChild(li);
                }
                this.nodes['list'].appendChild(frag);
                this.heart.fireEvent('afterRender');
            },
            update : function(data){
                for(var i=0;i<this.listItem.length;i++){
                    this.listItem[i].showHtml = data[i];
                }
                this.heart.fireEvent('afterUpdate');
            },
            scan : function(els){
                var role, nodes;
                if(els){
                    if(role = els.dataset['role']){
                        this.nodes[role] = els;
                    }
                    if(nodes = els.children){
                        for(var i = nodes.length;i--;){
                            this.scan(nodes[i]);
                        }
                    }
                }
            },
            getNodes : function(){
                return this.nodes;
            }
        }
    });
}();