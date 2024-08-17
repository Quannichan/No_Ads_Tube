var APPNAME         = "YOUTUBE_CRAWLER"
var AUTHOR          = "TRAN MINH QUAN"
var ROOT_UI_URL     = "www/"
var BE_MAIN_PATH    = "/NoAdsTube/api"

var APPVER          = localStorage.getItem("AppVersion_YTBCRWL")

if(!APPVER)APPVER = "0.0.1"

const reqJS = {
    baseUrl : ROOT_UI_URL+'js',
    paths   : {
        jquery  : [
            "//ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min",
            "./vendor/jquery-2.2.3.min",
        ],
        handlebars: [
            "//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.4.3/handlebars.min",
            "./vendor/handlebars",
        ],

        'text'       : "lib/text",
        Network      : "main/Network",
        CommonRoute  : "main/common/CommonRoute"

    }
}

var AppManage = {
    appversion  : APPVER,

    function    : {},

    routes      : {
        DEV_ROOT_URL    : "http://localhost:3000" + BE_MAIN_PATH,
        // DEV_ROOT_URL    : "http://192.168.43.77:3000" + BE_MAIN_PATH,
        APP_ROOT_URL    : "https://noadstubeapi-quannichans-projects.vercel.app" + BE_MAIN_PATH,

        BE_HOME         : "/video",
        BE_SEARCH       : "/search",
        BE_GET          : "/watch"
    },

    const       : {
        USER_ID     : "user_id",
        USER_NAME   : "user_name",
        USER_TOK    : "user_token"
    },

    constHTML   : {
        id      : {
            LOADING               : "#loading",
            HEADER_NAVIGATION     : "#header_nav",
            VIDEOS_WRAP           : "#items_video",
            WRAP_WATCH            : "#cont_blur",
            WRAP_WATCH_CONTENT    : "#vid_wrap",
            BTN_CLOSE_WATCHING    : "#btn_back",

            HOME_VIEW             : "#home_view"
        }
    }
}

var binding = function(){
    document.getElementById("btn_back").addEventListener("click",function(){
        document.getElementById("vid_wrap").innerHTML = ""
        document.getElementById("cont_blur").style.display = "none"
    })
}

var initLoading = function(ishow){
    if(ishow){
        $(App.constHTML.id.LOADING).css("display", "flex")
    }else{
        $(App.constHTML.id.LOADING).css("display", "none")
    }
}


var InitApp     = function(
    Network,
    CommonRoute
){
    App = $.extend(true , {}, AppManage, App)

    App.network                 = new Network()

    App.controller.commonRoute  = new CommonRoute()

    App.function.loading       = initLoading

}

var showApp = function(){
    App.function.loading(true)
    App.controller.commonRoute.iniview(VIEW)
    App.controller.commonRoute.showview();
}