import Ember from 'ember';

export default Ember.Component.extend({

    tagName:"img",
    attributeBindings: ['src','style'],
    // classNames: ["cardSize","cardDetails"],

    src: Ember.computed("cardName",function(){

        
     
        return "/assets/images/cards/" + this.get("cardName")+".jpeg";

    }),

    init(){
        this._super(...arguments);
        // console.log("Inside card generator");
        // if(this.get("isClickCard")){
        //     console.log("Card generator");
        //     let cN = new Ember.A(this.get("classNames"));
        //     cN.pushObject("cardHover");
        //  }

    },
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

    isClickCard: Ember.computed("cardName", "allowClick",function(){
       
        return this.get("cardName")!="BACK_CARD" && this.get("allowClick");

    }),
    
    // classNames: ["cardSize","cardDetails"],
    // zIndex: "z-index:"+this.get("index"),
    // left: (5*this.get("index")) + "%",
    // style: "border:5px solid black;"+zIndex+";"+left,
    click(event){



        // if(this.get("cardName")!="BACK_CARD"){
        //     if(this.get("allowClick")){
        //         this.sendAction("playerCard",this.get("card"));
        //     }
        // }
       if(this.get("isClickCard")){
        this.sendAction("playerCard",this.get("card"));
       }

    }
    // mouseEnter(event){
    //     // if(this.get("cardName")!="BACK_CARD"){

    //     //     event.currentTarget.style.border="3px solid yellow";
    //     // }

    //     if(this.get("isClickCard")){
    //         event.currentTarget.style.border="3px solid yellow";
    //     }
    // },
    // mouseLeave(event){
    //     // if(this.get("cardName")!="BACK_CARD"){

    //     //     event.currentTarget.style.border="";
    //     // }

    //     if(this.get("isClickCard")){
    //         event.currentTarget.style.border="";
    //     }
    // }
});
