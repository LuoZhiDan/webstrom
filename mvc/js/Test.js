/**
 * Created by Administrator on 2016/1/24 0024.
 */
/*
*
* 主要为了测试编写的方法的性能
*
*
* */
var Fw = Fw || {};

!function(){
    var me = this;
    me.test = {
        runtime : function(fn, times){
            times = times || 1000;
            var begin  = new Date().getTime();
            for( var i = 0; i < times; i++){
                fn();
            }
            return new Date().getTime() - begin;
        }
    }

}.call(Fw);