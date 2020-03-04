function BharatDocument(editor)
{
    this.version = 1;
    this.name = "";
    this.pages = [];
    this.currentPageIndex = 0;
    this.editor = editor;
    this.property = {};
    this.valuePresets = ["input","rank","option","question","labelText"];
    this.nextPage=function(callback)
    {
        if(this.currentPageIndex<this.pages.length-1)
        {
            this.currentPageIndex++;
        }
        else
        {
            if(typeof callback == "function")
            {
                callback(this.editor);
            }
            
        }
    }
    this.previousPage=function()
    {
        if(this.currentPageIndex>0)
        {
            this.currentPageIndex--;
        }
    }
    this.addPage = function()
    {
        var p = new BharatDocumentPage(this);
        this.pages[this.pages.length] =p;
        this.currentPageIndex = this.pages.length - 1;
        return p;
    }
    this.addPage();
    this.render = function(base)
    {
        base.innerHTML("");
        var page = this.pages[this.currentPageIndex];
        page.render(base);
        
    }
    this.addWidget=function(tag)
    {
        this.pages[this.currentPageIndex].addWidget(tag)
    }
    this.getActivePage=function()
    {
        return this.pages[this.currentPageIndex];
    }
    this.getJson=function()
    {
        var obj = {};
        obj.version = this.version;
        obj.name = this.name;
        obj.property = this.property;
        obj.pages = []
        for(var i=0;i<this.pages.length;i++)
        {
            obj.pages[obj.pages.length] = this.pages[i].getJson();
        }
        return obj;
        //
    }
    this.setJson=function(json)
    {
        this.version = json.version;
        this.name = json.name;
        this.property = json.property;
        this.pages = [];
        for(var i =0;i<json.pages.length;i++)
        {
            this.pages[i] = new BharatDocumentPage(this);
            this.pages[i].setJson(json.pages[i]);
        }
    }
    this.value=function()
    {
        var p = [];
        for(var i=0;i<this.pages.length;i++)
        {
            var pp = []
            for(var j=0;j<this.pages[i].widget.length;j++)
            {
                
                //var key = this.pages[i].widget[j].widgetView.innerHTML();
                
                    var value = this.pages[i].widget[j].value;
                    if(value=="Description Text")
                    {
                        value="";
                    }
                    var o = {"value":value,"key":this.pages[i].widget[j].presetName};
                    pp[pp.length] = o;
                
            }
            p[p.length] = pp
        }
        return p;
    }
}
function BharatDocumentPage(document)
{
    this.document = document;
    this.widget = [];
    this.property = {"type":""};
    this.style = {};
    this.currentWidgetIndex = 0;
    this.addWidget = function(tag)
    {
        var w = new BharatDocumentWidget(tag,this);
        this.widget[this.widget.length] = w;
        return w;
    }
    this.render=function(base)
    {
        this.pageDiv = new UIObject("div",base);
        this.pageDiv.page = this.document;
        this.pageDiv.style({"width":"100%","height":"100%","display":"table"});
        this.pageDiv.style(this.style);
        //this.pageDiv.className("zoomFadeIn")
        for(var i=0;i<this.widget.length;i++)
        {
            var widget = this.widget[i];
            widget.render(this.pageDiv,i);
        }

        var classNameProperty = ["animationClass"];
        for( var i in this.property)
        {
            if(classNameProperty.indexOf(i)>-1)
            {
                var cl = this.pageDiv.className() + " " + this.property[i];
                this.pageDiv.className(cl);
            }
            else
            {
                this.pageDiv[i](this.property[i]);
                
            }
            
        }
        
    }
    this.getActiveWidget=function()
    {
        return this.widget[this.currentWidgetIndex];
    }
    this.getJson=function()
    {
        var obj = {};
        obj.property = this.property;
        obj.style = this.style;
        obj.widget = [];
        for(var i=0;i<this.widget.length;i++)
        {
            obj.widget[obj.widget.length] = this.widget[i].getJson();
        }
        return obj;
    }
    this.setJson=function(json)
    {
        this.property = json.property;
        this.style = json.style;
        this.widget = [];
        for(var i=0;i<json.widget.length;i++)
        {

            this.widget[i] = new BharatDocumentWidget(json.widget[i].presetName,this);
            this.widget[i].setJson(json.widget[i]);
        }
    }
}

function BharatDocumentWidget(presetName,page)
{
    this.page = page;
    this.presetName = presetName;
    this.preset = JSON.parse(JSON.stringify(preset.getPreset(this.presetName)));
    this.tag = this.preset.tag;
    this.property = this.preset.property;
    this.attribute = this.preset.attribute;
    this.style = this.preset.style;
    this.content = null;
    this.value = null;
    this.event = this.preset.event;
    this.changePreset=function(presetName)
    {
        this.presetName = presetName;
        this.preset = JSON.parse(JSON.stringify(preset.getPreset(this.presetName)));
        this.property = this.preset.property;
        this.attribute = this.preset.attribute;
        this.style = this.preset.style;
        this.event = this.preset.event;
        this.page.document.editor.updateContentView();
    }
    this.render=function(base,index)
    {
        this.widgetController = new UIWidget(this.tag,this);
        this.widgetView = this.widgetController.render(base);//new UIObject(this.tag,base);
        //this.widgetView.className("moveUpFadeIn")
        this.widgetView.widget = this;
        var classNameProperty = ["animationClass"];
        for( var i in this.property)
        {
            if(classNameProperty.indexOf(i)>-1)
            {
                var cl = this.widgetView.className() + " " + this.property[i];
                this.widgetView.className(cl);
            }
            else
            {
                if(i=="innerHTML")
                {
                    if(this.tag=="div" || this.page.document.editor.constructor.name=="UIIDE")
                    {
                        //this.widgetView[i](this.property[i]);
                    }   
                }
                else
                {
                    this.widgetView[i](this.property[i]);
                }

            }
            
        }
        if(this.content!=null)
        {
            this.widgetController.setJson(this.content);
        }

        //if(this.page.document.editor.constructor.name=="UIIDE")
        {
            for( var i in this.attribute)
            {
                if(this.page.document.editor.constructor.name=="UIIDE")
                {
                    this.widgetView.addAttribute(i,this.attribute[i]);
                }
                else
                {
                    if(i!="contenteditable")
                    {
                        this.widgetView.addAttribute(i,this.attribute[i]);
                    }
                }
                
            }
        }
        this.widgetView.index = index;
        this.widgetView.style(this.style);
        this.widgetController.style(this.style);
        
        this.widgetView.object.onblur=function()
        {
            //this.handler.widget.property.innerHTML = this.innerHTML;
            this.handler.widget.content = this.handler.widget.widgetController.getJson();
        }
        if(typeof this.event.onclick != "undefined")
        {
            this.widgetView.style({"cursor":"pointer"});
        }
        
        this.widgetView.onclick(function()
        {
            if(this.handler.widget.page.document.editor.constructor.name=="UIIDE")
            {
                this.handler.widget.page.document.editor.propertyView.docType = "widget";
                this.handler.widget.page.document.editor.propertyView.docItem = this.handler.widget.widgetView;
                this.handler.widget.page.currentWidgetIndex = this.handler.index;
                this.handler.widget.page.document.editor.propertyTab.tabList[0].tab.object.click();
                this.handler.widget.page.document.editor.showPageWidgetList(this.handler.widget.page.document.editor.objectTab.tabView);
            }
            else
            {
                if(typeof this.handler.widget.event.onclick != "undefined" && this.handler.widget.event.onclick!="")
                {
                    eval(""+this.handler.widget.event.onclick+"()");
                }
            }
            return true;
        });
        
        this.widgetView.onchange(function()
        {

        })
        
    }
    this.getJson=function()
    {
        var obj = {};
        obj.tag = this.tag;
        obj.presetName = this.presetName;
        obj.property = this.property;
        obj.attribute = this.attribute;
        obj.style = this.style;
        obj.event = this.event;
        obj.value = this.value;
        obj.content = this.widgetController.getJson();
        return obj;
    }
    this.setJson=function(json)
    {
        this.tag = json.tag;
        this.presetName = json.presetName;
        this.property = json.property;
        this.attribute = json.attribute;
        this.style = json.style;
        this.event = json.event;
        this.value = json.value;
        this.content = json.content;
    }
    
}