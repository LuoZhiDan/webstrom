/**
 * Created by Administrator on 2016/2/23 0023.
 */

!function(){
    var fchart = window.fchart = {
        apply : function (o, s, d) {
            if(d){
                arguments.callee(o, d);
            }
            for(var p in s){
                o[p] = s[p];
            }

            return o;
        },
        extend : function(){
            var e = Object.prototype.constructor;

            return function(G, O) {
                var J = function() {
                    G.apply(this, arguments);
                }
                var E = function() {
                }, H, D = G.prototype;
                E.prototype = D;
                H = J.prototype = new E();
                H.constructor = J;

                J.superclass = D;

                if (D.constructor == e) {
                    D.constructor = G;
                }
                H.superclass = D;

                this.apply(J.prototype, O);

                return J;
            }
        }()
    }

}.call(window);