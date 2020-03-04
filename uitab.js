function UITab(base)
{
    this.base = base;
    this.tabListView = new UIObject("table",this.base);
    this.tabView = new UIObject("div",this.base);
    this.tabView.style({"overflow":"auto","height":"calc( 100% - 30px)"});
    this.tabListView.style({"width":"100%"});
    this.tabTr = this.tabListView.createRow();
    this.tabList= [];
    this.addTab=function(title,callback)
    {
        var obj = {};
        obj.tab = this.tabTr.createCell();
        obj.tab.innerHTML(title);
        obj.tab.style({"width":"33%","padding":"4px","backgroundColor":"#333","color":"#999","borderColor":"#444","textAlign":"center","cursor":"pointer"});
        obj.tab.tabView = this.tabView;
        obj.tab.base = this.base;
        obj.tab.onclick(callback)
        
        //obj.tabView = new UIObject("div",this.tab);
        this.tabList[this.tabList.length] = obj;
    }
    this.openTab=function(index)
    {
        this.tabList[index].tab.object.click();
    }
}