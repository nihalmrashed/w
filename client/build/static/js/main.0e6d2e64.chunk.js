(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{130:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),l=a(28),s=a.n(l),o=(a(77),a(12)),c=a(13),i=a(14),u=a(15),d=a(27),m=a(23),p=(a(78),a(8)),h=a.n(p),f=a(17),E=a(131),g=a(132),v=a(133),w=a(134),b=a(135),S=a(136),y=a(67),k=a(137),O=a(138),I=a(139),C=a(140),x=a(11),N=a.n(x),j=a(66),Q=a.n(j),D=(a(29),function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).componentDidMount=Object(f.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.a.post("https://sftst.herokuapp.com/api/product/view",{}).then((function(e){r.setState({products:e.data.data}),r.soldout()})).catch((function(e){console.log("error is ",e)}));case 2:case"end":return e.stop()}}),e)}))),r.handleOpenModal=function(){var e=r.state.orderQuantities;for(var t in e)"0"===e[t]&&delete e[t];for(var a in e)if(isNaN(e[a]))return r.clearInputs(),r.handleCloseModal(),void alert("Invalid input! Quantity must be a NUMBER");for(var n in e)if(0!==e[n].length)return r.updateOrderQuantitiesArray(),void r.setState({showModal:!0});alert("Invalid input! You must order something to submit")},r.handleCloseModal=function(){r.clearInputs(),r.setState({orderQuantitiesArray:[]}),r.setState({orderQuantities:{}}),r.setState({subTotal:0}),r.setState({showModal:!1})},r.handleSubmit=Object(f.a)(h.a.mark((function e(){var t,a,n,l,s,o,c,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(l in t=r.state.orderQuantities,r.refs,a=0,n=0,t)""!==t[l]&&"0"!==t[l]||delete t[l];for(s in t)n+=t[s];for(o=0,c=n.split(""),i=0;i<c.length;i++)o+=parseInt(c[i]);return(a=r.state.avgTime/o).toFixed(5),e.next=13,N.a.post("https://sftst.herokuapp.com/api/order/create",{start:Date.now(),products:r.state.orderQuantitiesArray,price:r.state.subTotal,status:"submitted",duration:a,userId:localStorage.getItem("id")}).then((function(e){var t="Your order is submitted! Order #: "+e.data.data._id+"/n Your order time is "+a;alert(t),r.clearInputs(),r.handleCloseModal(),window.location.reload(!0)})).catch((function(e){console.log("error is ",e),alert(e)}));case 13:case"end":return e.stop()}}),e)}))),r.handleQuantityChange=function(){var e=r.state.orderQuantities,t=r.refs;for(var a in t)e[a]=t[a].value;for(var n in e)0===e[n].length&&delete e[n];r.setState({orderQuantities:e})},r.updateOrderQuantitiesArray=Object(f.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.a.post("https://sftst.herokuapp.com/api/product/view",{}).then((function(e){var t=[],a=r.state.orderQuantities,n=0;Object.keys(a).forEach((function(r){for(var l=0;l<e.data.data.length;l++)if(r.toString()===e.data.data[l]._id.toString()){var s=parseFloat(e.data.data[l].price*a[r]).toFixed(2);n+=e.data.data[l].time*a[r];t.push({product:e.data.data[l]._id,name:e.data.data[l].name,quantity:a[r],itemSubTotal:s})}}));for(var l=0,s=0;s<t.length;s++)l+=Number.parseFloat(t[s].itemSubTotal);l.toFixed(2),r.setState({subTotal:l}),r.setState({avgTime:n}),r.setState({orderQuantitiesArray:t})})).catch((function(e){}));case 2:case"end":return e.stop()}}),e)}))),r.clearInputs=function(){r.state.products;for(var e in r.refs)r.refs[e].value=""},r.handleUpArrow=function(e){var t=e.target.name,a=r.state.orderQuantities;for(var n in r.refs)if(n===t)if(0===r.refs[n].value.length||isNaN(r.refs[n].value))r.refs[n].value="1",a[n]="1",r.setState({orderQuantities:a});else if(r.refs[n].value>=0){var l=parseInt(r.refs[n].value);l++,r.refs[n].value=l.toString(),a[n]=l.toString(),r.setState({orderQuantities:a})}},r.handleDownArrow=function(e){var t=e.target.name,a=r.state.orderQuantities;for(var n in r.refs)if(n===t)if(0===r.refs[n].value.length||"0"===r.refs[n].value||isNaN(r.refs[n].value))r.refs[n].value="0",a[n]="0",r.setState({orderQuantities:a});else{var l=parseInt(r.refs[n].value);l--,r.refs[n].value=l.toString(),a[n]=l.toString(),r.setState({orderQuantities:a})}},r.soldout=Object(f.a)(h.a.mark((function e(){var t,a,n,l,s,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=r.state.products,a=[],e.t0=h.a.keys(t);case 3:if((e.t1=e.t0()).done){e.next=18;break}n=e.t1.value,l=void 0,s=!1,o=0;case 8:if(!(o<!s&&t[n].recipe.length)){e.next=15;break}return e.next=11,N.a.post("https://sftst.herokuapp.com/api/ingredient/viewbyID",{ingredientId:t[n].recipe[o].ingredient}).then((function(e){l=e.data.data})).catch((function(e){console.log("error is ",e)}));case 11:t[n].recipe[o].quantity>l.stock&&(s=!0);case 12:o+=1,e.next=8;break;case 15:a[n]={item:t[n],sold_out:s},e.next=3;break;case 18:r.setState({ssproducts:a});case 19:case"end":return e.stop()}}),e)}))),r.state={products:[],ssproducts:[],orderQuantities:{},orderQuantitiesArray:[],showModal:!1,subTotal:0,avgTime:0},r}return Object(c.a)(a,[{key:"render",value:function(){var e=this;if(this.state.ssproducts){var t=this.state.ssproducts.map((function(t){return t.sold_out?t.sold_out?n.a.createElement(E.a,{className:"card"},n.a.createElement(g.a,{className:"img-adjusted",top:!0,width:"100%",src:t.item.image,alt:"Card image cap"}),n.a.createElement(v.a,null,n.a.createElement(w.a,null,t.item.name),n.a.createElement(b.a,null,"$",t.item.price),n.a.createElement(b.a,{className:"sold-out-notification"},"SOLD OUT"))):void 0:n.a.createElement(E.a,{className:"card"},n.a.createElement(g.a,{className:"img-adjusted",top:!0,width:"100%",src:t.item.image,alt:"Card image cap"}),n.a.createElement(v.a,null,n.a.createElement(w.a,null,t.item.name),n.a.createElement(b.a,null,"$",t.item.price)),n.a.createElement("form",{id:t.item._id},n.a.createElement("div",{className:"arrow-buttons"},n.a.createElement(S.a,null,n.a.createElement(y.a,{color:"secondary",className:"up-button",onClick:e.handleUpArrow,name:t.item._id},"+"),n.a.createElement("input",{type:"text",name:t.item._id,ref:t.item._id,onChange:e.handleQuantityChange,className:"form-control"}),n.a.createElement(y.a,{color:"secondary",className:"down-button",onClick:e.handleDownArrow,name:t.item._id},"-")))))}));return n.a.createElement("div",null,n.a.createElement("h2",null,"Menu"),n.a.createElement(k.a,null,n.a.createElement(O.a,null,n.a.createElement(I.a,{className:"card-deck"},t))),n.a.createElement(Q.a,{isOpen:this.state.showModal},n.a.createElement("h1",null,"Confirm your order"),n.a.createElement(C.a,null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Item"),n.a.createElement("th",null,"Quantity"),n.a.createElement("th",null,"Item Subtotal"))),n.a.createElement("tbody",null,this.state.orderQuantitiesArray.map((function(e){return n.a.createElement("tr",null,n.a.createElement("td",null,e.name),n.a.createElement("td",null,e.quantity),n.a.createElement("td",null,"$",e.itemSubTotal))})),n.a.createElement("th",null,"SubTotal: $",this.state.subTotal.toFixed(2)),n.a.createElement("th",null),n.a.createElement("th",null))),n.a.createElement(y.a,{onClick:this.handleCloseModal},"Cancel")," ",n.a.createElement(y.a,{onClick:this.handleSubmit},"Submit!")),n.a.createElement("br",null),n.a.createElement(y.a,{outline:!0,color:"danger",className:"submit-button",onClick:this.handleOpenModal},"Submit Order"))}return n.a.createElement("div",null)}}]),a}(r.Component)),P=a(141),T=a(142),M=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).componentDidMount=function(){N.a.post("https://sftst.herokuapp.com/api/order/view",{}).then((function(e){var t=e.data.data.filter((function(e){return"finished"!==e.status}));r.setState({orders:t}),console.log(r.state.orders)})).catch((function(e){console.log("error is ",e)}))},r.done=function(e){N.a.post("https://sftst.herokuapp.com/api/order/log",{orderId:e.target.id,price:e.price,date:e.date,finish:Date.now(),products:e.products}).then().catch((function(e){console.log("error is ",e),alert(e)})),N.a.post("https://sftst.herokuapp.com/api/order/update",{orderId:e.target.id,finish:Date.now(),status:"finished",cookId:localStorage.getItem("id")}).then((function(e){window.location.reload(!0)})).catch((function(e){console.log("error is ",e),alert(e)}))},r.state={orders:[]},r}return Object(c.a)(a,[{key:"render",value:function(){var e=this,t=this.state.orders.map((function(t){var a=t.products.map((function(e){return e.quantity+"x "+e.name}));return n.a.createElement(P.a,{sm:3,md:4},n.a.createElement(E.a,{className:"card"},n.a.createElement(v.a,null,n.a.createElement(w.a,null,t.start),n.a.createElement(b.a,null,t._id),n.a.createElement(T.a,null,"Products: ",a),n.a.createElement(y.a,{onClick:e.done,id:t._id},"Done!"))))}));return 0!==this.state.orders.length?n.a.createElement(k.a,{className:"gap"},n.a.createElement(O.a,null,n.a.createElement(I.a,{className:"card-deck"},t))):n.a.createElement("div",null,n.a.createElement("h2",null,"No On-going Orders"))}}]),a}(r.Component),_=a(68),A=a(143),F=a(144),L=a(145),R=a(146),$=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).regis=function(){r.setState({reg:!0})},r.login=Object(f.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={email:r.state.email,password:r.state.pass},e.next=3,N.a.post("https://sftst.herokuapp.com/api/user/login",t,"Origin, X-Requested-With, Content-Type, Accept").then((function(e){return e.data})).then((function(e){console.log(e),r.setState({redirect:!0,type:e.data.type}),localStorage.setItem("email",e.data.email),localStorage.setItem("password",e.data.password),localStorage.setItem("type",e.data.type),localStorage.setItem("id",e.data._id),window.location.reload(!0)})).catch((function(e){alert("Wrong password or email")}));case 3:case"end":return e.stop()}}),e)}))),r.handleChange=function(e){return function(t){r.setState(Object(_.a)({},e,t.target.value))}},r.state={email:"",pass:"",type:"",redirect:!1,reg:!1},r}return Object(c.a)(a,[{key:"render",value:function(){return this.state.redirect?"user"===this.state.type?n.a.createElement(m.a,{to:{pathname:"/user",state:{email:this.state.email,password:this.state.pass,type:this.state.type}}}):n.a.createElement(m.a,{to:{pathname:"/cook",state:{email:this.state.email,password:this.state.pass,type:this.state.type}}}):this.state.reg?n.a.createElement(m.a,{to:{pathname:"/"}}):n.a.createElement("div",null,n.a.createElement("h2",{className:"p"},"Login to order!"),n.a.createElement(k.a,{className:"center"},n.a.createElement(A.a,{className:"login-form"},n.a.createElement(P.a,null,n.a.createElement("br",null),n.a.createElement(F.a,null,n.a.createElement(L.a,{for:"exampleEmail"}),n.a.createElement(R.a,{type:"email",name:"email",value:this.state.value,onChange:this.handleChange("email"),id:"exampleEmail",placeholder:"E-mail address"}))),n.a.createElement(P.a,null,n.a.createElement(F.a,null,n.a.createElement(L.a,{for:"examplePassword"}),n.a.createElement(R.a,{type:"password",name:"password",value:this.state.value,onChange:this.handleChange("pass"),id:"examplePassword",placeholder:"Password"}))),n.a.createElement(y.a,{color:"danger",fluid:!0,size:"large",onClick:this.login},"Login")," ",n.a.createElement(y.a,{color:"danger",fluid:!0,size:"large",onClick:this.regis},"Register"))))}}]),a}(r.Component),q=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).handleEmailInput=function(e){r.setState({email:e.target.value})},r.handlePasswordInput1=function(e){r.setState({password1:e.target.value})},r.handlePasswordInput2=function(e){r.setState({password2:e.target.value})},r.showLogin=function(){r.setState({redirectlogin:!0})},r.handleRegister=function(){var e=Object(f.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(r.state.email)||alert("Not valid email format"),r.state.password1!==r.state.password2){e.next=6;break}return e.next=4,N.a.post("https://sftst.herokuapp.com/api/user/register",{email:r.state.email,password:r.state.password1,type:"user"}).then((function(e){localStorage.setItem("email",e.data.email),localStorage.setItem("password",e.data.password),localStorage.setItem("type",e.data.type),r.setState({redirectmenu:!0})})).catch((function(e){alert("User already exists")}));case 4:e.next=7;break;case 6:alert("Passwords don't match");case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.state={email:"",password1:"",password2:"",showRegistration:!1,redirectmenu:!1,redirectlogin:!1},r}return Object(c.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return this.state.redirectmenu?n.a.createElement(m.a,{to:{pathname:"/user",state:{email:this.state.email,password:this.state.pass,type:this.state.type}}}):this.state.redirectlogin?n.a.createElement(m.a,{to:{pathname:"/login"}}):n.a.createElement("div",null,n.a.createElement("h2",{className:"p"},"Register"),n.a.createElement(k.a,{className:"center"},n.a.createElement(A.a,{className:"signin-form"},n.a.createElement(P.a,null,n.a.createElement("br",null),n.a.createElement(F.a,null,n.a.createElement(L.a,{for:"exampleEmail"}," "),n.a.createElement(R.a,{type:"email",name:"email",value:this.state.value,onChange:this.handleEmailInput,id:"exampleEmail",placeholder:"E-mail address"}))),n.a.createElement(P.a,null,n.a.createElement(F.a,null,n.a.createElement(L.a,{for:"password1"}," "),n.a.createElement(R.a,{type:"password",name:"password1",value:this.state.value,onChange:this.handlePasswordInput1,id:"password1",placeholder:"Password"}))),n.a.createElement(P.a,null,n.a.createElement(F.a,null,n.a.createElement(L.a,{for:"password2"}," "),n.a.createElement(R.a,{type:"password",name:"password2",value:this.state.value,onChange:this.handlePasswordInput2,id:"password2",placeholder:"Confirm Password"}))),n.a.createElement(y.a,{color:"danger",fluid:!0,size:"large",onClick:this.handleRegister},"Register"),"  ",n.a.createElement(y.a,{color:"danger",fluid:!0,size:"large",onClick:this.showLogin},"Login"))))}}]),a}(r.Component),z=a(31),U=a(157),B=a(158),W=a(159),Y=a(147),J=a(148),X=a(149),G=a(150),H=a(151),K=a(152),V=a(153),Z=a(154),ee=a(42),te=a.n(ee),ae=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).logout=function(){localStorage.clear(),window.location.reload(!0)},r.toggle=r.toggle.bind(Object(z.a)(r)),r.state={isOpen:!1,location:""},r}return Object(c.a)(a,[{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){console.log(localStorage);var e=null;return"user"===localStorage.getItem("type")?e=n.a.createElement(U.a,{nav:!0,inNavbar:!0},n.a.createElement(B.a,{nav:!0,caret:!0},n.a.createElement(te.a,{className:"super-crazy-colors",name:"edit"})),n.a.createElement(W.a,{right:!0},n.a.createElement(Y.a,{href:"/user"},"Menu"),n.a.createElement(Y.a,{href:"/order"},"Orders"),n.a.createElement(Y.a,{href:"/profile"},"Change Password"),n.a.createElement(Y.a,{divider:!0}),n.a.createElement(Y.a,{href:"/",onClick:this.logout},"Logoff"))):"cook"===localStorage.getItem("type")&&(e=n.a.createElement(U.a,{nav:!0,inNavbar:!0},n.a.createElement(B.a,{nav:!0,caret:!0},n.a.createElement(te.a,{className:"super-crazy-colors",name:"edit"})),n.a.createElement(W.a,{right:!0},n.a.createElement(Y.a,{href:"/cook"},"Orders"),n.a.createElement(Y.a,{href:"/profile"},"Change Password"),n.a.createElement(Y.a,{divider:!0}),n.a.createElement(Y.a,{href:"/",onClick:this.logout},"Log Out")))),n.a.createElement("div",null,n.a.createElement(J.a,{color:"grey",className:"navbar-dark bg-dark",light:!0,expand:"md"},n.a.createElement(X.a,null,"The Noodle Box"),n.a.createElement(G.a,{onClick:this.toggle}),n.a.createElement(H.a,{isOpen:this.state.isOpen,navbar:!0},n.a.createElement(K.a,{className:"ml-auto",navbar:!0},n.a.createElement(V.a,null,n.a.createElement(Z.a,null,localStorage.getItem("email"))),e))))}}]),a}(r.Component),re=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).handlePasswordInput1=function(e){r.setState({password1:e.target.value})},r.handlePasswordInput2=function(e){r.setState({password2:e.target.value})},r.handleSubmit=function(){var e=Object(f.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.state.password1!==r.state.password2){e.next=5;break}return e.next=3,N.a.post("https://sftst.herokuapp.com/api/user/password",{userId:localStorage.getItem("id"),password:localStorage.getItem("password"),newPassword:r.state.password1}).then((function(e){localStorage.setItem("password",r.state.password1),r.setState({done:!0})})).catch((function(e){console.log("error! ",e)}));case 3:e.next=6;break;case 5:alert("Passwords don't match");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.state={done:!1,password1:"",password2:""},r}return Object(c.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return this.state.done?n.a.createElement(m.a,{to:{pathname:"/user"}}):n.a.createElement("div",null,n.a.createElement("h2",{className:"p"},"Change Password"),n.a.createElement(k.a,{className:"center"},n.a.createElement(A.a,{className:"login-form"},n.a.createElement(P.a,null,n.a.createElement("br",null),n.a.createElement(F.a,null,n.a.createElement(L.a,{for:"password1"}),n.a.createElement(R.a,{type:"password",name:"password1",value:this.state.value,onChange:this.handlePasswordInput1,id:"password1",placeholder:"Password"}))),n.a.createElement(P.a,null,n.a.createElement(F.a,null,n.a.createElement(L.a,{for:"password2"}),n.a.createElement(R.a,{type:"password",name:"password2",value:this.state.value,onChange:this.handlePasswordInput2,id:"password2",placeholder:"Confirm Password"}))),n.a.createElement(y.a,{color:"danger",fluid:"true",size:"large",onClick:this.handleSubmit},"Update"))))}}]),a}(r.Component),ne=a(155),le=a(156),se=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).componentDidMount=Object(f.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.a.post("https://sftst.herokuapp.com/api/order/view",{}).then((function(e){console.log(e.data.data);var t=e.data.data.filter((function(e){return e.userId===localStorage.getItem("id")})).reverse();r.setState({orders:t})}));case 2:return e.next=4,N.a.post("https://sftst.herokuapp.com/api/order/diff",{orders:r.state.orders}).then((function(e){for(var t=r.state.orders,a=0;a<e.data.data.length;a++)for(var n=0;n<t.length;n++)parseInt(e.data.data[a]._id)===parseInt(t[n]._id)&&(t[n].timeDiff=e.data.data[a].timeDiff,0===e.data.data[a].timeDiff?t[n].timeStatus="time-up":2===e.data.data[a].timeDiff||1===e.data.data[a].timeDiff?t[n].timeStatus="two-minute-warning":t[n].timeStatus="pending");r.setState({orders:t})}));case 4:console.log(r.state.orders),setInterval((function(){return r.tick()}),6e4);case 6:case"end":return e.stop()}}),e)}))),r.tick=function(){for(var e=r.state.orders,t=0;t<e.length;t++)0!==e[t].timeDiff&&(e[t].timeDiff--,0===e[t].timeDiff?e[t].timeStatus="time-up":2===e[t].timeDiff&&(e[t].timeStatus="two-minute-warning"));r.setState({orders:e})},r.state={orders:[]},r}return Object(c.a)(a,[{key:"render",value:function(){if(!localStorage.getItem("id"))return n.a.createElement(m.a,{to:"/login"});console.log(this.state.orders);var e=this.state.orders.map((function(e){return"finished"!==e.status?n.a.createElement(P.a,{sm:2,md:4},n.a.createElement(E.a,{className:"card"},n.a.createElement(ne.a,{tag:"h3"},"Order # ",e._id),n.a.createElement(v.a,null,n.a.createElement(T.a,null,"Expected Finish Time: ",e.finish),n.a.createElement(T.a,null,n.a.createElement("span",{className:e.timeStatus},"Time left: ",e.timeDiff," minutes")),n.a.createElement(C.a,null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Item"),n.a.createElement("th",null,"Quantity"),n.a.createElement("th",null,"Item total price"))),n.a.createElement("tbody",null,e.products.map((function(e){return n.a.createElement("tr",null,n.a.createElement("td",null,e.name),n.a.createElement("td",null,e.quantity),n.a.createElement("td",null,e.itemSubTotal))}))))),n.a.createElement(le.a,null,"Total order price: $",e.price))):n.a.createElement(E.a,{className:"card"},n.a.createElement(ne.a,{tag:"h3"},"Order # ",e._id),n.a.createElement(v.a,null,n.a.createElement(T.a,null,"Finish time: ",e.finish),n.a.createElement(T.a,null,n.a.createElement("span",{className:"finished"},"Order finished")),n.a.createElement(C.a,null,n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Item"),n.a.createElement("th",null,"Quantity"),n.a.createElement("th",null,"Item total price"))),n.a.createElement("tbody",null,e.products.map((function(e){return n.a.createElement("tr",null,n.a.createElement("td",null,e.name),n.a.createElement("td",null,e.quantity),n.a.createElement("td",null,e.itemSubTotal))}))))),n.a.createElement(le.a,null,"Total order price: $",e.price))}));return 0!==this.state.orders.length?n.a.createElement("div",null,n.a.createElement("h2",null,"Your Orders!"),n.a.createElement(k.a,null,n.a.createElement(O.a,null,n.a.createElement(I.a,{className:"card-deck"},e)))):n.a.createElement("div",null,n.a.createElement("h2",null,"No Past Orders"))}}]),a}(r.Component),oe=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement(ae,null),n.a.createElement("div",{className:"main"},n.a.createElement(d.a,null,n.a.createElement(m.d,null,n.a.createElement(m.b,{exact:!0,path:"/",render:function(e){return n.a.createElement(q,e)}}),n.a.createElement(m.b,{exact:!0,path:"/profile",render:function(e){return n.a.createElement(re,e)}}),n.a.createElement(m.b,{exact:!0,path:"/order",render:function(e){return n.a.createElement(se,e)}}),n.a.createElement(m.b,{exact:!0,path:"/user",render:function(e){return n.a.createElement(D,e)}}),n.a.createElement(m.b,{exact:!0,path:"/cook",render:function(e){return n.a.createElement(M,e)}}),n.a.createElement(m.b,{exact:!0,path:"/login",render:function(e){return n.a.createElement($,e)}})))))}}]),a}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(129);s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(oe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},29:function(e,t,a){},72:function(e,t,a){e.exports=a(130)},77:function(e,t,a){},78:function(e,t,a){}},[[72,1,2]]]);
//# sourceMappingURL=main.0e6d2e64.chunk.js.map