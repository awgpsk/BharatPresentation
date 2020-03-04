function BharatPlayer(base)
{
    this.base = base;
    this.contentView = new UIObject("div",this.base);
	this.contentView.player = this;
    this.contentView.style({"height":"100%","width":"100%"});
    this.onComplite = null;
    this.showRandom = false;
    this.interval = 2000;
    this.autoPlay = false;
    this.showControl = true;
	this.showDots = true;
    this.controlPosition = "bottom";
    this.controlType = "point";
    this.slideClick=true;
    this.loop = true;
    this.loadDocument=function(json)
    {
        if(typeof json == "string")
        {
            var json = JSON.parse(json);
        }
        

        this.document = new BharatDocument(this);
        this.document.setJson(json);
        
    }
    this.controlRender=function()
    {
        for(var i=0;i<this.control.btn.length;i++)
		{
			if(i==this.document.currentPageIndex)
			{
				this.control.btn[i].style({"backgroundColor":"rgba(255,255,255,.7)"});
			}
			else
			{	
				this.control.btn[i].style({"backgroundColor":"rgba(255,255,255,.3)"});
			}
		}
    }
    this.showNext=function()
    {
        if(this.showRandom==true)
        {
            var r = parseInt(Math.random()*this.document.pages.length);
            this.document.currentPageIndex=r;
        }
        else
        {
            this.document.nextPage(this.onComplite);
            
        }
        this.updateContentView();
    }   
    this.updateContentView=function()
    {
        this.document.render(this.contentView);
        this.controlRender();
    } 
    this.showPrevious=function()
    {
        this.document.previousPage();
        this.updateContentView();
        
    }
    this.runAutoPaly=function()
    {
        if(player.autoPlay==true)
        {
            setTimeout(player.runAutoPaly,player.interval);
            player.showNext();
        }    
    }
    this.run=function()
    {
        if(this.autoPlay==true)
        {
            this.document.render(this.contentView);
            this.runAutoPaly();
        }
        else
        {
            this.document.render(this.contentView);
        }

        if(this.loop==true)
        {
            this.onComplite = function(player)
            {
                player.document.currentPageIndex=0;
                player.updateContentView();
            }
        }
    
		this.control = new UIObject("div",this.base);
		this.control.style({"position":"relative","bottom":"25px"});
		
		this.control.btn = [];
		if(this.showControl==true)
		{
			this.control.previousBtn = new UIObject("div",this.control);
			this.control.previousBtn.style({"backgroundColor":"rgba(0,0,0,.2)","height":"20px","width":"20px","float":"left","borderRadius":"25px","position":"relative","bottom":"20px","left":"5px","color":"rgba(255,255,255,.4)","fontSize":"16px","padding":"10px","cursor":"pointer"});
			this.control.previousBtn.player = this;
			this.control.previousBtn.innerHTML("<");
			this.control.previousBtn.onclick(function()
			{
				this.handler.player.showPrevious();
			});
			
			this.control.nextBtn = new UIObject("div",this.control);
			this.control.nextBtn.innerHTML(">");
			this.control.nextBtn.style({"backgroundColor":"rgba(0,0,0,.2)","height":"20px","width":"20px","float":"right","borderRadius":"25px","position":"relative","bottom":"20px","right":"5px","color":"rgba(255,255,255,.4)","fontSize":"16px","padding":"10px","cursor":"pointer"});
			this.control.nextBtn.player = this;
			this.control.nextBtn.onclick(function()
			{
				this.handler.player.showNext();
			});
		}
		
		if(this.showDots==true)
		{
			this.controlView = new UIObject("div",this.control);
			this.controlView.style({"position":"relative","zIndex":"1000","height":"25px","textAlign":"center","display":"table","margin":"0 auto"});        
			
			for(var i=0;i<this.document.pages.length;i++)
			{
				var obj = new UIObject("div",this.controlView);
				obj.style({"backgroundColor":"rgba(255,255,255,.3)","height":"5px","width":"5px","float":"left","margin":"5px"});
				this.control.btn[this.control.btn.length] = obj;
				//var o = new UIObject("div",obj);
				//o.style({"width":"5px","height":"5px",});

			}
		}
		if(this.slideClick==true)
		{
			
			this.contentView.onclick(function()
			{
				this.handler.player.showNext();
			});
		}
		this.controlRender();
    }
    this.none=function( )
    {

    }
    this.loadFile=function(filename)
    {
        ajax(filename,"",function(resp)
        {
            player.loadDocument(resp);
            player.run();
        });
    }
}