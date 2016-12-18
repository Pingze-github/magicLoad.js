# magicLoad.js

A dynamic loading .js. Load your elements when they are really can be seen.

一个用于图片动态加载的.js。使特定图片在**确实可见**时被加载。

Need JQuery2+.

需要JQuery2以上的支持。

## Usage
Example:
```
<script language="JavaScript" src="js/magicLoad.js"></script>
<script language="JavaScript" >
    magicLoad($("#main"),{
        rule_list:[5]
    });
</script>
```
Register function:
```
magicLoad(content_ele,option_dict)
```
```content_ele``` means the element which contains all imgs that need to be registered.
```option_dict``` is a dict contains options.

#### Rules
1. display:none/visibility:hidden ?
2. opacity:0 ?
3. width:0/height:0 ? 
4. overflow from its parent ?
5. is in the screen ?
6. is in region which is proportional to the screen ?
7. is totally covered by opaque element ? (not support now)

#### Options
+ . rule_list  :Necessary. A list contains the Rules (above) you need. Use it like ```rule_list:[1,2,3,5]```.
+ . scroll_ele  :Optional. Means the element that scroll, default as ```$(document)```.(Sometimes just part of your page can scroll).
+ . display_ele  :Optional. 
+ . opacity_ele  :Optional.
+ . size_ele  :Optional.
+ . overflow_ele  :Optional(effective with Rule4). Means the element that the imgs overflow from. Default as ```img_ele.parent()```
+ . load_screen  :Optional(effective with Rule6). A 2-length list means the ratio to default screen region. Default as ```load_screen:[0,1]```. e.g. ```[0,2]``` means img will load when it goes into the screen you see and the screen next. You can use this to preload imgs before it can be seen.
