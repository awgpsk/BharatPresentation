function UIWidgeComponanttDiv(widget)
{
    this.widget = widget;
    this.components = [];
    this.selected = null;
    this.value = function()
    {
        return this.widget.value;
    }
    this.style=function(style)
    {
        for(var i=0;i<this.components.length;i++)
        {
            //this.components[i].style(style);
        }
    }
    this.addComponent=function(value)
    {
        var b1 = new UIObject("div",this.base);
        //var style = {"margin":"10px","fontSize":"24px","padding":"10px","backgroundColor":"rgba(0,0,0,.2)","textAlign":"center","display":"inline"};
        //b1.style(style);
        b1.style({"fontFamily":"unset","fontSize":"unset"});
        b1.innerHTML(value);
        b1.widget = this.widget;
        
        
        b1.onclick(function()
        {
            this.handler.widget.widget.value = this.handler.innerHTML();    
        })
        
        this.components[this.components.length] = b1;
        return b1;

    }
    this.render = function(base,controller)
    {
        this.widget = controller;
        this.base = new UIObject("div",base);
        this.addComponent("Description Text");
       
        return this.base;
    }
    this.onclick=function()
    {
        
    }
    this.getJson = function()
    {
        var o = {};
        //o.value = 
        o.list = [];
        for(var i=0;i<this.components.length;i++)
        {
            var op = {};
            op.innerHTML = this.components[i].innerHTML();
            o.list[o.list.length] = op;
        }
        return o;
    }
    this.setJson=function(json)
    {
        this.components = [];
        this.base.innerHTML("");
        for(var i=0;i<json.list.length;i++)
        {
            var b1 = this.addComponent(json.list[i].innerHTML);
        }
    }
}
function UIWidgeComponanttInput(widget)
{
    this.widget = widget;
    this.components = [];
    this.selected = null;
    this.value = function()
    {
        return this.widget.value;
    }
    this.style=function(style)
    {
        for(var i=0;i<this.components.length;i++)
        {
            this.components[i].style(style);
            this.components[i].style({"width":"100%","backgroundColor":"unset","color":"unset","fontSize":"unset","fontWeight":"unset","fontFamily":"unset"});
        }
    }
    this.addComponent=function(value)
    {
        var b1 = new UIObject("input",this.base);
        b1.object.type="text";
        //var style = {"margin":"10px","fontSize":"24px","padding":"10px","backgroundColor":"rgba(0,0,0,.2)","textAlign":"center","display":"inline"};
        //b1.style(style);
        b1.style({"fontFamily":"unset","fontSize":"unset","width":"100%","backgroundColor":"rgba(0,0,0,.1)","border":"0px"});
        b1.innerHTML(value);
        b1.widget = this.widget;
        
        b1.object.onblur=function()
        {
            this.handler.widget.widget.value = this.handler.value();  
        }
        b1.onclick(function()
        {
            this.handler.widget.widget.value = this.handler.value();    
        })
        
        this.components[this.components.length] = b1;
        return b1;

    }
    this.render = function(base,controller)
    {
        this.widget = controller;
        this.base = new UIObject("div",base);
        this.addComponent("Description Text");
       
        return this.base;
    }
    this.onclick=function()
    {
        
    }
    this.getJson = function()
    {
        var o = {};
        //o.value = 
        o.list = [];
        for(var i=0;i<this.components.length;i++)
        {
            var op = {};
            op.innerHTML = this.components[i].innerHTML();
            o.list[o.list.length] = op;
        }
        return o;
    }
    this.setJson=function(json)
    {
        this.components = [];
        this.base.innerHTML("");
        for(var i=0;i<json.list.length;i++)
        {
            var b1 = this.addComponent(json.list[i].innerHTML);
        }
    }
}
function UIWidgeComponanttImage(widget)
{
    this.widget = widget;

    this.render = function(base,controller)
    {
        this.widget = controller;
        this.base = new UIObject("img",base);
        this.base.widget = this.widget;
        this.base.controller = this;
        this.base.onclick(function()
        {
            this.handler.widget.widget.value = this.handler.src();
            
        })
        return this.base;
    }
    this.value = function()
    {
        return this.widget.value;
    }
    this.onclick=function()
    {

    }
    this.getJson=function()
    {
        var o = {};
        o.innerHTML = this.base.src();
        return o;
    }
    this.setJson=function(json)
    {

        this.base.src(json.innerHTML);
        
    }
}
function UIWidgetComponantRank(widget)
{
    this.widget = widget;
    this.components = [];
    this.selected = null;
    this.style=function(style)
    {
        
    }
    this.value = function()
    {
        return this.widget.value;
    }
    this.addComponent=function(value)
    {
        var b1 = new UIObject("div",this.base);
        var style = {"margin":"10px","fontSize":"24px","padding":"10px","backgroundColor":"rgba(0,0,0,.2)","textAlign":"center","display":"inline"};
        b1.style(style);
        b1.innerHTML(value);
        b1.widget = this.widget;
        
        
        b1.onclick(function()
        {
            this.handler.widget.widget.value = this.handler.innerHTML();    
        })
        
        this.components[this.components.length] = b1;
        return b1;

    }
    this.render = function(base,controller)
    {
        this.widget = controller;
        this.base = new UIObject("div",base);
        this.addComponent(1);
        this.addComponent(2);
        this.addComponent(3);
        this.addComponent(4);
        this.addComponent(5);
        return this.base;
    }
    this.onclick=function()
    {
        
    }
    this.getJson = function()
    {
        var o = {};
        //o.value = 
        o.list = [];
        for(var i=0;i<this.components.length;i++)
        {
            var op = {};
            op.innerHTML = this.components[i].innerHTML();
            o.list[o.list.length] = op;
        }
        return o;
    }
    this.setJson=function(json)
    {
        this.components = [];
        this.base.innerHTML("");
        for(var i=0;i<json.list.length;i++)
        {
            var b1 = this.addComponent(json.list[i].innerHTML);
        }
    }
}
function UIWidgeComponanttButton(widget)
{
    this.widget = widget;
    this.components = [];
    this.selected = null;
    this.value = function()
    {
        return this.widget.value;
    }
    this.style=function(style)
    {
        for(var i=0;i<this.components.length;i++)
        {
            //this.components[i].style(style);
            //this.components[i].style({"width":"100%","padding":"10px","backgroundColor":"rgba(0,0,0,.05)"});
        }
    }
    this.addComponent=function(value)
    {
        var b1 = new UIObject("div",this.base);
        
        //var style = {"margin":"10px","fontSize":"24px","padding":"10px","backgroundColor":"rgba(0,0,0,.2)","textAlign":"center","display":"inline"};
        //b1.style(style);
        b1.style({"fontFamily":"unset","fontSize":"unset","backgroundColor":"rgba(0,0,0,.1)","border":"0px","padding":"10px"});
        b1.innerHTML(value);
        b1.widget = this.widget;
        
        
        b1.onclick(function()
        {
            this.handler.widget.widget.value = this.handler.innerHTML();    
        })
        
        this.components[this.components.length] = b1;
        return b1;

    }
    this.render = function(base,controller)
    {
        this.widget = controller;
        this.base = new UIObject("div",base);
        this.addComponent("Description Text");
       
        return this.base;
    }
    this.onclick=function()
    {
        
    }
    this.getJson = function()
    {
        var o = {};
        //o.value = 
        o.list = [];
        for(var i=0;i<this.components.length;i++)
        {
            var op = {};
            op.innerHTML = this.components[i].innerHTML();
            o.list[o.list.length] = op;
        }
        return o;
    }
    this.setJson=function(json)
    {
        this.components = [];
        this.base.innerHTML("");
        for(var i=0;i<json.list.length;i++)
        {
            var b1 = this.addComponent(json.list[i].innerHTML);
        }
    }
}
UIWidgetList = {"div":{
                        "class":UIWidgeComponanttDiv,
                        "presets":[
                            {"code":"titleText","name":"Title Text"},
                            {"code":"simpleText","name":"Simple Text"},
                            {"code":"labelText","name":"Label Text"},
                            {"code":"question","name":"Question"},
                            {"code":"option","name":"Option"}
                        ]
                    },
                "rank":{"class":UIWidgetComponantRank,
                        "presets":[]
                    },
                "img":{"class":UIWidgeComponanttImage,
                        "presets":[]
                    },
                "input":{
                    "class":UIWidgeComponanttInput,
                    "presets":[]
                },
                "button":{
                    "class":UIWidgeComponanttButton,
                    "presets":[]
                }
            }
function UIWidget(name,widget)
{
    this.name = name;
    this.widget = widget;
    this.component= new UIWidgetList[this.name].class(this.widget);
    this.render = function(base)
    {
        this.base = this.component.render(base,this);
        return this.base;
    }
    this.style=function(style)
    {
        this.component.style(style)
    }
    this.className=function(className)
    {
        this.base.className(className);
    }
    this.attribute=function(attribute,value)
    {
        this.base.attribute(attribute,value);
    }
    this.value = function()
    {
        return this.component.value();
    }
    this.onclick=function()
    {
        this.component.onclick();
    }
    this.getJson=function()
    {
        var o = {};
        o.name = this.name;
        o.widgetController = this.component.getJson();
        return o;
    }
    this.setJson=function(json)
    {
        this.name = json.name;
        //this.component= new UIWidgetList[this.name](this.widget);
        this.component.setJson(json.widgetController);
    }
    
}