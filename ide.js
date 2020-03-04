function UIIDE(baseId)
{
    this.base = new UIObject(baseId);
    this.base.style({"width":"100%","height":"100%","backgroundColor":"#555"})
    this.menuView = new UIObject("div",this.base);
    this.menuView.style({"width":"100%","height":"30px","borderBottom":"1px solid #222","backgroundColor":"#454545"})
    this.toolsView = new UIObject("div",this.base);
    this.toolsView.style({"float":"left","width":"70px","height":"calc(100% - 52px)","backgroundColor":"#454545","borderRight":"1px solid #222","padding":"3px"});

    this.contentView = new UIObject("div",this.base);
    this.contentView.style({"float":"left","margin":"10px","width":"calc(100% - 645px","height":"calc(100% - 80px)","backgroundColor":"#FFF"});


    this.propertyView = new UIObject("div",this.base);
    this.propertyView.style({"float":"right","width":"270px","height":"calc(100% - 52px)","backgroundColor":"#454545","borderLeft":"1px solid #222"});
    this.propertyView.editor = this;
    
    this.propertyTab = new UITab(this.propertyView);
    this.propertyTab.addTab("Style",function()
    {
        var style  = {};
        if(this.handler.base.docType=="document")
        {
            style = this.handler.base.editor.document.style;
        }
        else if(this.handler.base.docType=="page")
        {
            style = this.handler.base.editor.document.getActivePage().style;
        }
        else if(this.handler.base.docType=="widget")
        {
            style = this.handler.base.editor.document.getActivePage().getActiveWidget().style
        }
        var p = new UIStyleEditor(this.handler.base.editor,this.handler.tabView,style,this.handler.base);
        p.show();
    });
    this.propertyTab.addTab("Property",function()
    {
        var property  = {};
        if(this.handler.base.docType=="document")
        {
            property = this.handler.base.editor.document.property;
        }
        else if(this.handler.base.docType=="page")
        {
            property = this.handler.base.editor.document.getActivePage().property;
        }
        else if(this.handler.base.docType=="widget")
        {
            property = this.handler.base.editor.document.getActivePage().getActiveWidget().property
        }
        var p = new UIPropertyEditor(this.handler.base.editor,this.handler.tabView,property,this.handler.base);
        p.show();
    });
    this.propertyTab.addTab("Event",function()
    {
        //this.handler.tabView.innerHTML("");
        
        var event  = {};
        if(this.handler.base.docType=="document")
        {
            event = this.handler.base.editor.document.event;
        }
        else if(this.handler.base.docType=="page")
        {
            event = this.handler.base.editor.document.getActivePage().event;
        }
        else if(this.handler.base.docType=="widget")
        {
            event = this.handler.base.editor.document.getActivePage().getActiveWidget().event
        }
        var p = new UIEventEditor(this.handler.base.editor,this.handler.tabView,event,this.handler.base);
        p.show();
    });

    this.objectView = new UIObject("div",this.base);
    this.objectView.style({"float":"right","width":"170px","height":"calc(100% - 52px)","backgroundColor":"#454545","borderLeft":"1px solid #222"});
    this.objectView.editor = this;
    this.objectTab = new UITab(this.objectView);
    this.objectTab.addTab("Pages",function()
    {
        this.handler.base.editor.showDocumentSlide(this.handler.tabView);
    })
    this.objectTab.addTab("Widget",function()
    {
        this.handler.base.editor.showPageWidgetList(this.handler.tabView);
    })



    this.statusBar = new UIObject("div",this.base);
    this.statusBar.style({"position":"fixed","width":"100%","height":"25px","bottom":"0px","backgroundColor":"#454545","borderTop":"1px solid #222"})
    
    this.showPageWidgetList = function(base)
    {
        base.innerHTML("");
        var page = this.document.getActivePage();
        for(var i = 0;i<page.widget.length;i++)
        {
            var icon = new UIObject("div",base);
            icon.index = i;
            icon.style({"height":"30px","backgroundColor":"#555","border":"1px solid #222","margin":"10px","padding":"10px","color":"#999"});
            icon.editor = this;
            icon.widget = page.widget[i];
            icon.page = page;
            icon.innerHTML(page.widget[i].preset.name);
            icon.className("");
            if(page.currentWidgetIndex==i)
            {
                icon.className("selectedSlide");
            }
            icon.onclick(function()
            {
                this.handler.editor.propertyView.docType = "widget";
                this.handler.editor.propertyView.docItem = this.handler.widget.widgetView;
                this.handler.page.currentWidgetIndex = this.handler.index;
                this.handler.editor.propertyTab.tabList[0].tab.object.click();
                this.handler.editor.showPageWidgetList(this.handler.editor.objectTab.tabView);
            });

        }
        var tool = new UIObject("div",base);
        
        var add = new UIObject("button",base);
        add.innerHTML("Move Up");
        add.style({"position":"fixed","bottom":"28px","padding":"4px","backgroundColor":"#333","color":"#999","borderColor":"#444"});
        add.editor = this;
        add.onclick(function()
        {
            //this.handler.editor.document.addPage();
            //this.handler.editor.updateContentView();
            //this.handler.editor.showDocumentSlide(this.handler.editor.objectTab.tabView);
        });
        var add1 = new UIObject("button",base);
        add1.innerHTML("Move Down");
        add1.style({"position":"fixed","bottom":"28px","padding":"4px","backgroundColor":"#333","color":"#999","borderColor":"#444"});
        add1.editor = this;
        add1.onclick(function()
        {
            //this.handler.editor.document.addPage();
            //this.handler.editor.updateContentView();
            //this.handler.editor.showDocumentSlide(this.handler.editor.objectTab.tabView);
        })
    }
    this.showDocumentSlide=function(base)
    {
        base.innerHTML("");
        for(var i=0;i<this.document.pages.length;i++)
        {
            var icon = new UIObject("div",base);
            icon.index = i;
            icon.style({"height":"100px","backgroundColor":"#555","border":"1px solid #222","margin":"10px"});
            icon.editor = this;
            icon.onclick(function()
            {
                this.handler.editor.document.currentPageIndex = this.handler.index;
                this.handler.editor.updateContentView();
                this.handler.editor.propertyView.docType = "page";
                this.handler.editor.propertyView.docItem = this.handler.editor.document.getActivePage().pageDiv;
                this.handler.editor.document.currentPageIndex = this.handler.index;
                this.handler.editor.propertyTab.tabList[0].tab.object.click();
                this.handler.editor.showDocumentSlide(this.handler.editor.objectTab.tabView);
            });
            icon.className("");
            if(this.document.currentPageIndex==i)
            {
                icon.className("selectedSlide");
            }
        }
        var add = new UIObject("button",base);
        add.innerHTML("ADD");
        add.style({"position":"fixed","bottom":"28px","padding":"4px","backgroundColor":"#333","color":"#999","borderColor":"#444"});
        add.editor = this;
        add.onclick(function()
        {
            this.handler.editor.document.addPage();
            this.handler.editor.updateContentView();
            this.handler.editor.showDocumentSlide(this.handler.editor.objectTab.tabView);
        })
    }
    this.addMenu=function(title,callback)
    {
        var m = new UIObject("button",this.menuView);
        m.innerHTML(title);
        m.style({"padding":"7px","color":"#999","border":"1px solid #444","backgroundColor":"#333","margin":"2px"})
        m.onclick(callback);
    }

    this.newDocument = function()
    {
        this.document = new BharatDocument(this);
        
        this.initEditor();
    }
    this.initEditor=function()
    {
        this.updateContentView();
        this.addWidgetTool("simpleText","Text");
        this.addWidgetTool("rank","Rank");
        this.addWidgetTool("image","Image");
        this.addWidgetTool("input","Input");
        this.addWidgetTool("button","Button");
        this.addMenu("Preview",function()
        {
            editor.preview();
        });
        this.addMenu("Download",function()
        {
            editor.download();
        });
        //this.addWidgetTool("simpleText","ST");
        this.objectTab.openTab(0);
        
    }
    this.updateContentView= function()
    {
        this.contentView.innerHTML("");
        this.document.render(this.contentView);
    }

    this.updateObjectView=function()
    {

    }
    this.addWidgetTool=function(tag,text)
    {
        //this.document.addWidget(tag)
        var tool = new UIObject("button",this.toolsView);
        tool.innerHTML(text);
        tool.tag = tag;
        tool.editor = this;
        tool.document = this.document;
        tool.style({"padding":"8px","color":"#999","border":"1px solid #444","backgroundColor":"#333","margin":"2px","width":"100%"})
        tool.onclick(function()
        {
            this.handler.document.addWidget(this.handler.tag);
            this.handler.editor.updateContentView();
        })
    }
    this.getJson=function()
    {
        var json = this.document.getJson();
        return JSON.stringify(json);
    }
    this.download=function()
    {
        var json = this.getJson();
        var fileBlob = new Blob([json], {type: "application/octet-binary"});
		var link = document.createElement("a");
		link.setAttribute("href", URL.createObjectURL(fileBlob));
		link.setAttribute("download", "aa"+this.document.name+".json");
		link.click();
    }
    this.setJson=function(json)
    {
        var json = JSON.parse(json);
        this.document.setJson(json);
    }
    this.upload=function()
    {
        var b = new UIObject("body");
		var file = new UIObject("input");

		file.type("file");
		file.object.click();
		file.onchange(function()
		{
			var f = this.files[0]; 
		    if (f) 
		    {
                var r = new FileReader();
                var vo = editor;
		    	r.onload = function(e) 
		    	{ 
			    	var contents = e.target.result;
                    //alert(contents);
                    
                    editor.document = new BharatDocument(vo);
                    editor.setJson(contents);
                    editor.initEditor();
                    
		    	}
		    	r.readAsText(f);
		    } 
		    else 
		    { 
		    	alert("Failed to load file");
		    }
		});
    }
    this.preview=function()
    {
        window.open("player.html","");
        
    }
}


function UIStyleEditor(editor,base,style,doc)
{
    this.base = base;
    this.editor = editor;
    this.style = style;
    this.doc = doc;

    this.presetConfig = {};
    
    this.presetConfig["layout"] = {"name":"Layout",
                            "fields":[
                                {"id":"float","name":"Float","type":"ComboBox","options":["Left","Right","None","Unset"]},
                                {"id":"clear","name":"Float Clear","type":"ComboBox","options":["Left","Rigth","Both","Unset"]},
                                {"id":"position","name":"Position","type":"ComboBox","options":["Absolute","Relative","Fixed","None","Unset"]},
                                {"id":"left","name":"Left","type":"TextBox"},
                                {"id":"right","name":"Right","type":"TextBox"},
                                {"id":"top","name":"Top","type":"TextBox"},
                                {"id":"bottom","name":"Bottom","type":"TextBox"},
                                {"id":"height","name":"Height","type":"TextBox"},
                                {"id":"width","name":"Width","type":"TextBox"},
                            ]};
    this.presetConfig["font"] = {"name":"Fonts",
                                "fields":[{"id":"fontFamily","name":"Font Family","type":"ComboBox","options":["Alegreya Sans","Verdana"]},
                                    {"id":"fontSize","name":"Font Size","type":"TextBox"},
                                    {"id":"fontWeight","name":"Font Weight","type":"ComboBox","options":["Bold","100","200","300","400","500"]},
                                    {"id":"color","name":"Color","type":"TextBox"},
                                    {"id":"textAlign","name":"Text Align","type":"ComboBox","options":["left","center","right"]},
                                ]};
                                    
    this.presetConfig["background"] = {"name":"Background",
                                "fields":[{"id":"backgroundImage","name":"Background Image","type":"TextBox"},
                                    {"id":"backgroundColor","name":"Background Color","type":"TextBox"},
                                    ]};
    this.presetConfig["border"] = {"name":"Border",
                                "fields":[{"id":"borderStyle","name":"Border Style","type":"ComboBox","options":["solid","dotted"]},
                                    {"id":"borderColor","name":"Border Color","type":"TextBox"},
                                    {"id":"borderLeftWidth","name":"Left Width","type":"TextBox"},
                                    {"id":"borderRightWidth","name":"Right Width","type":"TextBox"},
                                    {"id":"borderTopWidth","name":"Top Width","type":"TextBox"},
                                    {"id":"borderBottomWidth","name":"Bottom Width","type":"TextBox"},
                                    ]};
    this.presetConfig["margin"] =  {"name":"Margin",
                                    "fields":[{"id":"marginLeft","name":"Margin Left","type":"TextBox"},
                                        {"id":"marginRight","name":"Margin Right","type":"TextBox"},
                                        {"id":"marginTop","name":"Margin Top","type":"TextBox"},
                                        {"id":"marginBottom","name":"Margin Bottom","type":"TextBox"},
                                        ]};
    this.presetConfig["padding"] = {"name":"Padding",
                                    "fields":[{"id":"paddingLeft","name":"padding Left","type":"TextBox"},
                                        {"id":"paddingRight","name":"padding Right","type":"TextBox"},
                                        {"id":"paddingTop","name":"padding Top","type":"TextBox"},
                                        {"id":"paddingBottom","name":"padding Bottom","type":"TextBox"},
                                        ]};
    this.colorProperty = ["color","backgroundColor","borderColor"];
    this.sizeProperty = ["height","width","left","top","right","bottom","fontSize","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"]
    this.layoutProperty = ["marginTop","marginRight","marginBottom","marginLeft","paddingTop","paddingRight","paddingBottom","paddingLeft"]
    this.show=function()
    {
        //console.info(this.style);
        this.base.innerHTML("");
        this.base.style({"padding":"10px"});

        if(this.doc.docType=="widget")
        {
            var title = new UIObject("div",this.base);
            title.innerHTML("Presets");
            title.style({"color":"#AAA","padding":"5px","fontWeight":"bold"});

            var table = new UIObject("table",this.base);
            table.style({"marginBottom":"30px","padding":"2px"})
            var tr = table.createRow();
            var c1 = tr.createCell();
            
            c1.style({"color":"#999","width":"40%"});
            c1.innerHTML("Widget");

            
            var c2 = tr.createCell();
            
            
            var p = new UIObject("select",c2);
            p.style({"backgroundColor":"#333","color":"#AAA","border":"1px solid #444","padding":"3px"});
            /*
            p.addOption("Title Text","titleText");
            p.addOption("Simple Text","simpleText");
            p.addOption("Question","question");
            p.addOption("Option","option");
            */
            p.loadOptionFromJson(UIWidgetList[this.doc.docItem.widget.tag].presets);
            p.value(this.doc.docItem.widget.presetName);
            p.widget = this.doc.docItem.widget;
            p.onchange(function()
            {
                this.handler.widget.changePreset(this.handler.value());
            })
        }
        for(var k in this.presetConfig)
        {
            var title = new UIObject("div",this.base);
            title.innerHTML(this.presetConfig[k]["name"]);
            title.style({"color":"#AAA","padding":"5px","fontWeight":"bold"});

            var table = new UIObject("table",this.base);
            table.style({"marginBottom":"30px","padding":"2px"})
            for(var g in this.presetConfig[k]["fields"])
            {
                var css = this.presetConfig[k]["fields"][g];
                var tr = table.createRow();
                var cl = UIClassList[css.type];
                if(this.colorProperty.indexOf(css.id)>-1)
                {
                    var c1 = tr.createCell();
                    c1.addAttribute("colspan","2");
                    c1.style({"color":"#999","width":"40%"});
                    c1.innerHTML(css.name);

                    var tr = table.createRow();
                    var c2 = tr.createCell();
                    c2.addAttribute("colspan","2");
                    
                    var p = new UIObject(cl.tag,c2);
                }
                else
                {
                    var c1 = tr.createCell();
                    c1.style({"color":"#999","width":"40%"})
                    var c2 = tr.createCell();
                    c1.innerHTML(css.name);
                    var p = new UIObject(cl.tag,c2);
                }
                
                p.style({"backgroundColor":"#333","color":"#AAA","border":"1px solid #444","padding":"3px"});
                p.styleData = this.style;
                p.editor = this.editor;
                p.id("css"+css.id);
                p.css = css;
                if(cl.tag=="select")
                {
                    if(typeof css.options != "undefined")
                    {
                        p.loadOptionFromJson(css.options);
                    }
                }
                p.doc = this.doc;
                p.onchange(function()
                {
                    var value = this.handler.value();
                    if(this.handler.css.id=="backgroundImage")
                    {
                        value  = "url("+value+")";
                    }
                    if(this.handler.doc.docType=="widget")
                    {
                        this.handler.editor.document.getActivePage().getActiveWidget().style[this.handler.css.id] = value;
                        this.handler.doc.docItem.style(this.handler.editor.document.getActivePage().getActiveWidget().style);
                    }
                    else if(this.handler.doc.docType=="page")
                    {
                        this.handler.editor.document.getActivePage().style[this.handler.css.id] = value;
                        this.handler.doc.docItem.style(this.handler.editor.document.getActivePage().style);
                    }
                    //this.handler.editor.updateContentView();
                })
                if(this.sizeProperty.indexOf(css.id)>-1)
                {
                    p.style({"width":"70px"});

                    var unit = new UIObject("select",c2);
                    unit.style({"backgroundColor":"#333","color":"#AAA","border":"1px solid #444","padding":"3px"});
                    unit.addOption("px","px");
                    unit.addOption("pt","pt");
                    unit.addOption("%","%");
                    unit.addOption("","");
                    if(typeof this.style[css.id] != "undefined")
                    {
                        var u = "";
                        var v = this.style[css.id];
                        v = v.replace("url(","").replace(")","");
                        
                        if(this.style[css.id].indexOf("px")>-1)
                        {
                            u = "px";
                            v = this.style[css.id].replace("px","");
                            
                        }
                        
                        p.value(v);
                        unit.value(u);
                    }
                }
                else if(this.layoutProperty.indexOf(css.id)>-1)
                {
                    p.style({"width":"70px"});

                    var unit = new UIObject("select",c2);
                    unit.style({"backgroundColor":"#333","color":"#AAA","border":"1px solid #444","padding":"3px"});
                    unit.addOption("auto","auto");
                    unit.addOption("px","px");
                    unit.addOption("pt","pt");
                    unit.addOption("%","%");
                    unit.addOption("","");
                    if(typeof this.style[css.id] != "undefined")
                    {
                        var u = "";
                        var v = this.style[css.id];
                        
                        if(this.style[css.id].indexOf("px")>-1)
                        {
                            u = "px";
                            v = this.style[css.id].replace("px","");
                            
                        }
                        
                        p.value(v);
                        unit.value(u);
                    }
                }
                else if(this.colorProperty.indexOf(css.id)>-1)
                {
                    if(typeof this.style[css.id] != "undefined")
                    {
                        p.value(this.style[css.id]);
                    }
                    var v = $("#css"+css.id);
					v.minicolors(
					{
						control: 'hue',
						defaultValue: '',
						format: 'rgb',
						keywords:  '',
						inline: 'false',
						letterCase: 'lowercase',
						opacity: '.4',
						position: 'bottom',
						swatches: [],
						change: function(hex, opacity) 
						{
                            /*
							var log;
							try 
							{
								log = hex ? hex : 'transparent';
								//if( opacity ) log += ', ' + opacity;
								
								//this.value=log;
								//this.onchange();
								//console.log(log);
								log = log.replace("rgba(","");
								log = log.replace(")","");
								//log += ', ' + opacity;
								//console.log(log);
								//aaa = this;
								this.value="rgba("+log+")";
								//this.onchange();
								var b = {};
				                var k = this.handler.parm.key;
				                var v = "rgba("+log+")";
				                b[k] = v;
								this.handler.parm.base.style(b);
								this.handler.parm.masterStyle[k] = v;
							} 
							catch(e) 
							{

                            }
                            */
						},
						theme: 'default'
					});
	            
                }
                else
                {
                    if(typeof this.style[css.id] != "undefined")
                    {
                        var v = this.style[css.id];
                        v = v.replace("url(","").replace(")","");
                        p.value(v);
                    }
                }
            }            
        }
    }
}



function UIPropertyEditor(editor,base,property,doc)
{
    this.base = base;
    this.editor = editor;
    this.property = property;
    this.doc = doc;
    this.presetConfig = {};
    this.presetConfig["animation"] = {"name":"Animation",
                            "fields":[
                                {"id":"animationClass","name":"Animation Class","type":"ComboBox","options":[{"code":"moveUpFadeIn","name":"Move Up Fade In"},{"code":"zoomFadeIn","name":"Zoom In Fade In"},{"code":"","name":"None"}]},
                                
                            ]};

    this.presetConfig["source"] = {"name":"Source",
                            "fields":[
                                {"id":"src","name":"Source URL","type":"TextBox"},
                                
                            ]};
    
    this.colorProperty = ["color","backgroundColor","borderColor"];
    this.sizeProperty = ["height","width","left","top","right","bottom","fontSize","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"]
    this.layoutProperty = ["marginTop","marginRight","marginBottom","marginLeft","paddingTop","paddingRight","paddingBottom","paddingLeft"]
    this.show=function()
    {
        //console.info(this.style);
        this.base.innerHTML("");
        this.base.style({"padding":"10px"});
        for(var k in this.presetConfig)
        {
            var title = new UIObject("div",this.base);
            title.innerHTML(this.presetConfig[k]["name"]);
            title.style({"color":"#AAA","padding":"5px","fontWeight":"bold"});

            var table = new UIObject("table",this.base);
            table.style({"marginBottom":"30px","padding":"2px"})
            for(var g in this.presetConfig[k]["fields"])
            {
                var css = this.presetConfig[k]["fields"][g];
                var tr = table.createRow();
                var cl = UIClassList[css.type];
                
                    var c1 = tr.createCell();
                    c1.style({"color":"#999","width":"40%"})
                    var c2 = tr.createCell();
                    c1.innerHTML(css.name);
                    var p = new UIObject(cl.tag,c2);
                
                
                p.style({"backgroundColor":"#333","color":"#AAA","border":"1px solid #444","padding":"3px"});
                p.styleData = this.style;
                p.editor = this.editor;
                p.id("css"+css.id);
                p.css = css;
                if(cl.tag=="select")
                {
                    if(typeof css.options != "undefined")
                    {
                        p.loadOptionFromJson(css.options);
                    }
                }
                p.doc = this.doc;
                p.onchange(function()
                {
                    var value = this.handler.value();
                    if(this.handler.css.id=="backgroundImage")
                    {
                        value  = "url("+value+")";
                    }
                    if(this.handler.doc.docType=="widget")
                    {
                        this.handler.editor.document.getActivePage().getActiveWidget().property[this.handler.css.id] = value;
                        //this.handler.doc.docItem.style(this.handler.editor.document.getActivePage().getActiveWidget().style);
                    }
                    else if(this.handler.doc.docType=="page")
                    {
                        this.handler.editor.document.getActivePage().property[this.handler.css.id] = value;
                        //this.handler.doc.docItem.style(this.handler.editor.document.getActivePage().style);
                    }
                    this.handler.editor.updateContentView();
                })
                
                    if(typeof this.property[css.id] != "undefined")
                    {
                        var v = this.property[css.id];
                        v = v.replace("url(","").replace(")","");
                        p.value(v);
                    }
                
            }            
        }
    }
}



function UIEventEditor(editor,base,event,doc)
{
    this.base = base;
    this.editor = editor;
    this.event = event;
    this.doc = doc;
    this.presetConfig = {};
    this.presetConfig["action"] = {"name":"Action",
                            "fields":[
                                {"id":"onclick","name":"Click","type":"ComboBox","options":[{"code":"player.none","name":"None"},{"code":"player.showNext","name":"Next Page"}]},
                                
                            ]};
    
    this.show=function()
    {
        //console.info(this.style);
        this.base.innerHTML("");
        this.base.style({"padding":"10px"});
        for(var k in this.presetConfig)
        {
            var title = new UIObject("div",this.base);
            title.innerHTML(this.presetConfig[k]["name"]);
            title.style({"color":"#AAA","padding":"5px","fontWeight":"bold"});

            var table = new UIObject("table",this.base);
            table.style({"marginBottom":"30px","padding":"2px"})
            for(var g in this.presetConfig[k]["fields"])
            {
                var css = this.presetConfig[k]["fields"][g];
                var tr = table.createRow();
                var cl = UIClassList[css.type];
                
                    var c1 = tr.createCell();
                    c1.style({"color":"#999","width":"40%"})
                    var c2 = tr.createCell();
                    c1.innerHTML(css.name);
                    var p = new UIObject(cl.tag,c2);
                
                
                p.style({"backgroundColor":"#333","color":"#AAA","border":"1px solid #444","padding":"3px"});
                p.styleData = this.style;
                p.editor = this.editor;
                p.id("css"+css.id);
                p.css = css;
                if(cl.tag=="select")
                {
                    if(typeof css.options != "undefined")
                    {
                        p.loadOptionFromJson(css.options);
                    }
                }
                p.doc = this.doc;
                p.onchange(function()
                {
                    var value = this.handler.value();
                    if(this.handler.css.id=="backgroundImage")
                    {
                        value  = "url("+value+")";
                    }
                    if(this.handler.doc.docType=="widget")
                    {
                        this.handler.editor.document.getActivePage().getActiveWidget().event[this.handler.css.id] = value;
                        //this.handler.doc.docItem.style(this.handler.editor.document.getActivePage().getActiveWidget().style);
                    }
                    else if(this.handler.doc.docType=="page")
                    {
                        this.handler.editor.document.getActivePage().event[this.handler.css.id] = value;
                        //this.handler.doc.docItem.style(this.handler.editor.document.getActivePage().style);
                    }
                    //this.handler.editor.updateContentView();
                })
                
                if(typeof this.event[css.id] != "undefined")
                {
                    var v = this.event[css.id];
                    //v = v.replace("url(","").replace(")","");
                    p.value(v);
                }
                
            }            
        }
    }
}

