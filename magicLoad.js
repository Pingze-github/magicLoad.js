/** magicLoad.js **/

window.magicLoad_func_id = 0; //全局变化id

function magicLoad(ele,option={}){
    window.magicLoad_func_id++;
    var func_id = window.magicLoad_func_id; 
    var func = "ml"+func_id.toString(); //唯一函数
    var func_name = func;
    var rule_list = false; 
    var display_ele = false;
    var opacity_ele = false;
    var size_ele = false;
    var overflow_ele = false;
    var scroll_ele = false;
    var load_screen = false;
    var imgs = ele.find("img");
    var img_total = imgs.length;
    var finish=false;
    function option_set(ele,option){
        //the ele that binded with scroll event: scroll_ele
        if (option.scroll_ele){
            scroll_ele = option.scroll_ele;
        }else{
            scroll_ele = $(document);
        }
        //option list
        if (option.rule_list){
            rule_list = option.rule_list;
        }else{
            rule_list = [5]; //default option
        }
        //rule1: display_ele 
        if (option.display_ele){
            display_ele = option.display_ele;
        }else{
            display_ele = ele;
        }
        //rule2: opacity_ele
        if (option.opacity_ele){
            opacity_ele = option.opacity_ele;
        }else{
            opacity_ele = ele;
        }
        //rule3: size_ele
        if (option.size_ele){
            size_ele = option.size_ele;
        }else{
            size_ele = ele;
        }
        //rule4: overflow_ele
        if (option.overflow_ele){
            overflow_ele = option.overflow_ele;
        }else{
            overflow_ele = ele.parent();
        }
        //rule6: load_screen 
        if (option.load_screen){
            load_screen = option.load_screen;
        }else{
            load_screen = [1,1];
        }
    }
    function visible_check(ele){
        /*RULES:
            1. display:none/visibility:hidden ?
            2. opacity:0 ?
            3. width:0/height:0 ? 
            4. overflow from its parent ?
            5. is in the screen ?
            6. is in region which is proportional to the screen ?
            7. is totally covered by opaque element ? (not support now)
        */
        /*规则:
            1. 是否 display:none / visibility:hidden
            2. 是否完全透明
            3. 是否 height:0 / width:0
            4. 是否超出父元素显示区域，而父元素 overflow:hidden 而被隐藏
            5. 是否处于屏幕中可见区域（仅考虑高度）
            6. 是否处于一定比例于屏幕的区域中（仅考虑高度）  
            7. 是否被不透明层完全遮盖（暂不支持）
        */
        var visible = true;
        var set_top = window.pageYOffset;
        var set_bottom=window.pageYOffset+window.innerHeight;
        $.each(rule_list,function(index,val){
            switch(val){
                case 1:
                    if (display_ele.css("display")=="none" || display_ele.css("visibility")=="hidden")
                        visible=false;
                    break;
                case 2:
                    if (opacity_ele.css("opacity")=="0")
                        visible=false;
                    break;
                case 3:
                    if (size_ele.height()==0 || size_ele.width()==0)
                        visible=false;
                    break;
                case 4:
                    if(ele_overflow.offset().top+ele_overflow.height() < ele.offset().top)
                        visible=false;
                    break;
                case 5:
                    var ele_height = ele.parent().height(); //img元素本身初始高度1px,取父元素高度
                    var ele_top = ele.offset().top;
                    var ele_bottom=ele.offset().top+ele_height;
                    var win_top = window.pageYOffset;
                    var win_bottom=window.pageYOffset+window.innerHeight;
                    if (ele_bottom<win_top || ele_top>win_bottom)
                        visible=false;
                    break;
                case 6:
                    var ele_height = ele.parent().height(); //img元素本身初始高度1px,取父元素高度
                    var ele_top = ele.offset().top;
                    var ele_bottom=ele.offset().top+ele_height;
                    var load_area = [window.pageYOffset-load_screen[1]*window.innerHeight, window.pageYOffset+load_screen[1]*window.innerHeight];
                    if (ele_bottom<load_area[0] || ele_top>load_area[1])
                        visible=false;
                    break;
                case 7:break; //暂不支持
            }
            if (!visible){
                return;
            }
        });
        return visible;
    }
    //设定
    option_set(ele,option);
    //检查函数
    function check(){
        imgs.each(function(){
            var img_num = 0;
            if ($(this).length){
                if($(this).attr("src")!=$(this).attr("xsrc")){
                    if(visible_check($(this))==true){ 
                        $(this).attr("src",$(this).attr("xsrc"));
                        img_num++;
                    }
                }else{//already loaded
                    img_num++;
                }
            }else{//already deleted
                img_num++;
            }
            if (img_num>=img_total){finish=true};
        });
    }
    //check first
    check();
    //define scroll event func
    eval("function "+func+"(){if (finish==true) {scroll_ele.off('scroll',"+func+");return;}check();}");
    //bind scroll event
    eval("scroll_ele.on('scroll',"+func+")");
}

