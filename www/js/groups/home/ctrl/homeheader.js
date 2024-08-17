define([
    'jquery',
    'text!groups/home/tmpl/header.html'
], function($, headerTmpl) {
    const HomeHeader = function(){

        const Headertmpl = headerTmpl

        this.initview = function(){
            $(App.constHTML.id.HEADER_NAVIGATION).css("display", "none")
            $(App.constHTML.id.HEADER_NAVIGATION).html(Headertmpl)
        }

        this.showview = function(){
            $(App.constHTML.id.HEADER_NAVIGATION).css("display", "flex")
            bind_logo_event();
        }

        const bind_logo_event     = function(){
            $(".logo").on("click", function(){
                $(App.constHTML.id.WRAP_WATCH).html("");
                App.controller.VideoList. initview();
                App.controller.VideoList. showview();
            })
        }
    }

    return HomeHeader
});