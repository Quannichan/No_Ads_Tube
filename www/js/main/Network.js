define(['jquery'], 
    function(
    $
    )
    {
    var Network = function(){
        this.send_ajax_get = function(path ,fsuc, ferr){
            $.ajax({
                type: "GET",
                url: AppManage.routes.APP_ROOT_URL+path,
                success: fsuc,
                error  : ferr
            });
        }

        this.send_ajax_params_get = function(path, params, fsuc, ferr){
            $.ajax({
                type: "GET",
                url: AppManage.routes.APP_ROOT_URL+path+`?${params.join("&")}`,
                success: fsuc,
                error  : ferr
            });
        }


        this.send_ajax_post = function(path ,fsuc, ferr){
            $.ajax({
                type: "POST",
                url: AppManage.routes.APP_ROOT_URL+path,
                success: fsuc,
                error  : ferr
            });
        }

        this.send_ajax_get_data = function(path, data ,fsuc, ferr){
            $.ajax({
                type: "GET",
                url: AppManage.routes.APP_ROOT_URL+path,
                dataType : "application/json",
                data : data,
                success: fsuc,
                error  : ferr
            });
        }

        this.send_ajax_post_data = function(path, data ,fsuc, ferr){
            $.ajax({
                type: "POST",
                url: AppManage.routes.APP_ROOT_URL+path,
                dataType : "application/json",
                data : data,
                success: fsuc,
                error  : ferr
            });
        }
    }

    return Network
})