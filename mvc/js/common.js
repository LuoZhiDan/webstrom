/**
 * 版本修改：
 *  1 增加scan方法
 */

var Fw = Fw || {} ;
!function(fw, global){
    var toString = Object.prototype.toString;

    var apply = function(object, config, defaults) {
        if (defaults) {
            apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }
        }

        return object;
    };

    apply(fw,{
        apply : apply,
        isArray : function(arr){
            return toString.call(arr) == '[object Array]';
        },
        scan : function(els, me){
            var role, even, child;
            me = me || this;
            if(!me.roles){
                me.roles = {};
            }
            if(!me.events){
                me.events = {};
            }
            if(role = els.dataset['role']){
                me.roles[role] = els;
            }
            if(even = els.dataset['event']){
                me.events[even] = els;
            }
            if(child = els.children){
                for(var i = child.length; i--;){
                    arguments.callee(child[i], me);
                }
            }
        }
    });
}(Fw, window);
