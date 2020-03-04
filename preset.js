function BharatPreset()
{
    this.list = [];
    this.addPreset=function(name,tag,property,attribute,style,event)
    {
        var p = {};
        p.name = name;
        p.tag = tag;
        p.property = property;
        p.style = style;
        p.attribute = attribute
        p.event = event
        this.list[this.list.length] = p;
    }
    this.getPreset=function(name)
    {
        for(var i=0;i<this.list.length;i++)
        {
            if(this.list[i].name  == name)
            {
                return this.list[i];
            }
        }
        return null;
    }
}
var preset = new BharatPreset();
preset.addPreset("titleText","div",
    {"innerHTML":"Title Text","className":"","animationClass":"moveUpFadeIn"},
    {"contenteditable":"true","rel":"none"},
    {"fontFamily":"Alegreya Sans","fontWeight":"100","fontSize":"52px","color":"rgba(255, 111, 0,1)","borderStyle":"solid","borderColor":"rgba(255, 111, 0,1)","borderBottomWidth":"1px","borderTopWidth":"0px","borderLeftWidth":"0px","borderRightWidth":"0px","paddingTop":"20px","paddingBottom":"20px","paddingLeft":"20px","paddingRight":"20px","textAlign":"center","marginTop":"0px","marginBottom":"0px","marginLeft":"0px","marginRight":"0px"},
    {}
);
preset.addPreset("simpleText","div",
    {"innerHTML":"Description text","className":"","animationClass":"moveUpFadeIn"},
    {"contenteditable":"true","rel":"none"},
    {"fontFamily":"Alegreya Sans","fontWeight":"100","fontSize":"24px","color":"rgba(80, 80, 80,1)","paddingTop":"20px","paddingBottom":"20px","paddingLeft":"20px","paddingRight":"20px","textAlign":"left","borderBottomWidth":"0px","borderTopWidth":"0px","borderLeftWidth":"0px","borderRightWidth":"0px","marginTop":"0px","marginBottom":"0px","marginLeft":"0px","marginRight":"0px"},
    {}
);

preset.addPreset("labelText","div",
    {"innerHTML":"Label Text","className":"","animationClass":"moveUpFadeIn"},
    {"contenteditable":"true","rel":"none"},
    {"fontFamily":"Alegreya Sans","fontWeight":"100","fontSize":"24px","color":"rgba(80, 80, 80,1)","paddingTop":"10px","paddingBottom":"10px","paddingLeft":"10px","paddingRight":"10px","textAlign":"left","borderBottomWidth":"0px","borderTopWidth":"0px","borderLeftWidth":"0px","borderRightWidth":"0px","marginTop":"10px","marginBottom":"-10px","marginLeft":"auto","marginRight":"auto","width":"60%"},
    {}
);
preset.addPreset("question","div",
    {"innerHTML":"Question text","className":"","animationClass":"moveUpFadeIn"},
    {"contenteditable":"true","rel":"none"},
    {"fontFamily":"Alegreya Sans","fontWeight":"300","fontSize":"42px","color":"rgba(255, 111, 0,1)","paddingTop":"20px","paddingBottom":"20px","paddingLeft":"20px","paddingRight":"20px","textAlign":"center","borderBottomWidth":"0px","borderTopWidth":"0px","borderLeftWidth":"0px","borderRightWidth":"0px","marginTop":"50px","marginBottom":"10px","marginLeft":"30px","marginRight":"30px","backgroundColor":"rgba(0,0,0,.2)"},
    {}
);
preset.addPreset("option","div",
    {"innerHTML":"Option text","className":"","animationClass":"zoomFadeIn"},
    {"contenteditable":"true","rel":"yes"},
    {"fontFamily":"Alegreya Sans","fontWeight":"300","fontSize":"26px","color":"rgba(255, 255, 255,1)","paddingTop":"10px","paddingBottom":"10px","paddingLeft":"10px","paddingRight":"10px","textAlign":"center","borderBottomWidth":"0px","borderTopWidth":"0px","borderLeftWidth":"0px","borderRightWidth":"0px","marginTop":"10px","marginBottom":"10px","marginLeft":"30px","marginRight":"30px","backgroundColor":"rgba(0,0,0,.2)"},
    {"onclick":"player.showNext"}
);

preset.addPreset("rank","rank",
    {"className":"","animationClass":"zoomFadeIn"},
    {"contenteditable":"true","rel":"yes"},
    {"fontFamily":"Alegreya Sans","fontWeight":"100","fontSize":"26px","color":"rgba(255, 255, 255,1)","paddingTop":"20px","paddingBottom":"20px","paddingLeft":"20px","paddingRight":"20px","textAlign":"left","borderBottomWidth":"0px","borderTopWidth":"0px","borderLeftWidth":"0px","borderRightWidth":"0px","marginTop":"10px","marginBottom":"10px","marginLeft":"auto","marginRight":"auto","display":"table"},
    {"onclick":"player.showNext"}
);

preset.addPreset("image","img",
    {"className":"","animationClass":"zoomFadeIn","src":""},
    {"rel":"none"},
    {"paddingTop":"0px","paddingBottom":"0px","paddingLeft":"0px","paddingRight":"0px","borderBottomWidth":"0px","borderTopWidth":"0px","borderLeftWidth":"0px","borderRightWidth":"0px","marginTop":"10px","marginBottom":"10px","marginLeft":"auto","marginRight":"auto","display":"table","backgroundColor":"rgba(0,0,0,.3)","width":"60%"},
    {}
);

preset.addPreset("input","input",
    {"innerHTML":"Description text","className":"","animationClass":"moveUpFadeIn"},
    {"rel":"yes"},
    {"fontFamily":"Alegreya Sans","fontWeight":"100","fontSize":"24px","color":"rgba(255, 255, 255,1)","paddingTop":"10px","paddingBottom":"10px","paddingLeft":"10px","paddingRight":"10px","textAlign":"left","borderBottomWidth":"0px","borderTopWidth":"0px","borderLeftWidth":"0px","borderRightWidth":"0px","marginTop":"10px","marginBottom":"10px","marginLeft":"auto","marginRight":"auto","backgroundColor":"rgba(0,0,0,.25)","width":"60%"},
    {}
);

preset.addPreset("button","button",
    {"innerHTML":"Button text","className":"","animationClass":"moveUpFadeIn"},
    {"contenteditable":"true","rel":"none"},
    {"fontFamily":"Alegreya Sans","fontWeight":"100","fontSize":"24px","color":"rgba(255, 255, 255,1)","paddingTop":"0px","paddingBottom":"0px","paddingLeft":"0px","paddingRight":"0px","textAlign":"left","borderBottomWidth":"0px","borderTopWidth":"0px","borderLeftWidth":"0px","borderRightWidth":"0px","marginTop":"10px","marginBottom":"10px","marginLeft":"auto","marginRight":"auto","backgroundColor":"rgba(0,0,0,.25)","display":"table"},
    {"onclick":"player.showNext"}
);
