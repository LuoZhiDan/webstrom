/**
 * Created by Administrator on 2016/1/15 0015.
 */

var Fw = {};
!function(fw, global){
    var template = document.getElementById('import_template').contentWindow.document;//模板容器
    var div = document.createElement('div');
    var apply = function(tar, su, de){//对象赋值方法
        if(de){
            apply(tar, de);
        } else {
            for(var p in su){
                tar[p] = su[p];
            }
        }
    }
    apply(fw,{
        apply : apply,
        template : function(id){//通过模板id获得模板
            if(!template.getElementById(id)){
                template = document.getElementById('import_template').contentWindow.document;
            }
            return template.getElementById(id).innerHTML;
        },
        createNode : function(html) {
            div.innerHTML = html;
            return div.children[0];
        }
    });
}(Fw, window);
