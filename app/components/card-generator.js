import Ember from 'ember';

export default Ember.Component.extend({

    tagName:"img",
    attributeBindings: ['src','style'],
    classNames: ["cardSize","cardDetails"],
    src: Ember.computed("cardName",function(){

        
     
        return "/assets/images/cards/" + this.get("cardName")+".jpeg";

    }),
    style: Ember.computed("index",function(){

    
        let zIndex = "z-index:" + this.get("index");
        let left = "left:"+ (5*this.get("index")) + "%";
        let border = "5px solid black";
        let cursor="";
        if(this.get("cardName")!="BACK_CARD"){
            cursor = "cursor:pointer"

        }
        

        return new Ember.String.htmlSafe(zIndex+";"+left+";"+cursor);

    }),
    
    // classNames: ["cardSize","cardDetails"],
    // zIndex: "z-index:"+this.get("index"),
    // left: (5*this.get("index")) + "%",
    // style: "border:5px solid black;"+zIndex+";"+left,
    click(event){



        if(this.get("cardName")!="BACK_CARD"){

            this.sendAction("playerCard",this.get("card"));
        }
       

    }
});
