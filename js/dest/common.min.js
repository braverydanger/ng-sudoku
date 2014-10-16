(function($) {
    $(document).ready(function() {

        $("form[name='trackOrderForm']").submit(function() {
            var orderNumber = $("#orderNumber").val();
            if (orderNumber && orderNumber.length > 0) {
                return;
            }
            $("#content_account").prepend("<h6 class=\"notice\">Order number is a required field.</h6>");
            $("#orderNumber").css("background-color", "yellow");
            return false;
        });
    });
})(jQuery);
// -->
//
/*
 *
 * Common: Shared Page Functionality
 *
 */
(function($) {
    $.fn.getPageType = function() {
		var type = $('main').attr('id');
		return type;
	};

    $(window).load(function(){
			$("img.single-product-thumbnail").each(function(){
				if ((typeof this.complete !== "undefined" && this.complete === true && typeof this.naturalWidth !== "undefined" && this.naturalWidth < 1) || (typeof this.fileSize !== "undefined" && this.fileSize < 1)) {
					$(this).closest("a").remove();
				} else {
					$(this).show();
				};
			});

		}).bind("scroll resize", placegrid);



		placegrid();
    //Fix for scrolling the fixed position header
		var throwaway;
		function placegrid() {
			if(throwaway) { clearTimeout(throwaway); }

			var main_width = $("#content").length > 0 ? $("#content").outerWidth() + 10 : "990";

			throwaway = setTimeout(function(){
				var $h = $("#header");
				if ($(window).width() < 960) {
					var mainL = $(window).scrollLeft();
					$h.css({ left: -(mainL) +"px", width: main_width + "px"});
				} else {
					$h.css({ left: 0, width: "100%"});
				}
				return false;
			}, 5)
		}

    $(document).ready(function() {

	    //FINALLY removing empty product thumbs...
			$("img.single-product-thumbnail").error(function(){
	      $(this).closest("a").remove();
	    });

      /* tealium finagle to add to gateways*/
      var pageName = getURLParameter("id", location.href);
      if(pageName == "WOMENS" || pageName == "MENS" || pageName == "APARTMENT"
         || pageName == "GENERAL_CATEGORY" || pageName == "SALE" || pageName == "BRANDS"
         || pageName == "APT_PRINTSHOP" || pageName == "APT_BIKESHOP" ||
         pageName == "WOMENS-EU" || pageName == "MENS-EU" || pageName == "APARTMENT-EU"
         || pageName == "GENERAL_CATEGORY-EU" || pageName == "SALE-EU" || pageName == "BRANDS-EU"
         || pageName == "APT_PRINTSHOP-EU" || pageName == "APT_BIKESHOP-EU") {

         // check environment

         var env = "dev";
         if(location.href.indexOf("staging.urbanoutfitters.com") != -1) {
          env = "qa";
         } else if (location.href.indexOf("urbanoutfitters.com") != -1) {
          env = "prod";
         }
          $("div.footer").append("<script type=\"text/javascript\">(function(a,b,c,d){ a='//tags.tiqcdn.com/utag/urbanoutfitters/uo-us/" + env + "/utag.js'; b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true; a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);})();</script>");

      }



      // enable datepickers on egiftcard and shopping cart pages
      $(".giftCardDatepicker").datepicker({
        minDate: 0,
        maxDate: 90,
        onSelect: function( selectedDate ) {

          // create variable to check selection against;  if it is today's date, convert it to 'Now'
          var currentTime = new Date();

          var currentMonth = currentTime.getMonth() + 1;
          var currentDay = currentTime.getDate();
          var currentYear = currentTime.getFullYear();
          var currentDate;

          if(LOCALE != "urban") {
            $( ".giftCardDatepicker" ).datepicker( "option", "dateFormat", "dd/mm/yy" );
            currentDate = currentDay + "/" + currentMonth + "/" + currentYear;
          } else {
            currentDate = currentMonth + "/" + currentDay + "/" + currentYear;
          }

          if ( currentDate == selectedDate ) {
            $(".giftCardDatepicker").val("Now");
          }
        }
      });

      // end datepicker
      // begin email address checker for egift card page
      $('#giftRecipientEmail').on('blur', function() {
        $(this).mailcheck({
          // domains: domains,                       // optional
          // topLevelDomains: topLevelDomains,       // optional
          // distanceFunction: superStringDistance,  // optional
          suggested: function(element, suggestion) {

            $("#email-suggestion").append("<p style='color: blue;'><img src='/images/2007_holiday/error_alert.png'> Email suggestion - Did you mean " + suggestion.full + "?</p>");
            $("#email-suggestion").slideDown();
            // callback code
          },
          empty: function(element) {
            $("#email-suggestion").slideUp().empty();
          }
        });
      });
      // end email address checker

      // limit chars in egiftcard textarea
      $('#egiftCardMessage').keypress(function(e) {
        var tval = $('#egiftCardMessage').val(),
            tlength = tval.length,
            set = 100,
            remain = parseInt(set - tlength);

        if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
            $('#egiftCardMessage').val((tval).substring(0, tlength - 1))
        }
    });
    // end limit chars in egiftcard textarea

    // add in placeholder copy for email signup in footer
    switch (LOCALE) {
	    case "fr": $( '#footer-email-query' ).attr( 'placeholder', ' adresse email' );
	    break;
	    case "de": $( '#footer-email-query' ).attr( 'placeholder', ' e-mail-adresse' );
	    break;
	    default: $( '#footer-email-query' ).attr( 'placeholder', ' email address' );
    }

        $.fn.placeholders();
    });

    $.support.placeholder = (function() {
        var input = document.createElement("input");
        return "placeholder" in input;
    })();

    $.fn.placeholders = function() {
        if (! $.support.placeholder) {

            // Browser doesn't support placeholder attribute; simulate placeholders.
            var placeholderElements = $("input, textarea");
            placeholderElements.focus(function() {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val("");
                }
            }).blur(function() {
                if ($(this).val() == "" && $(this).attr("placeholder") != "") {
                    $(this).val($(this).attr("placeholder"));
                }
            }).blur();

            // Remove simulated placeholders before submitting forms.
            $("form").submit(function() {
                placeholderElements.focus();
            });
        }
    };

// search eyes
  $(function() {
  var searchEyeBg = "1px -163px";
  var searchSubmit = $("div#header-search input#header-search-submit");

    function searchEyes(){
        searchSubmit.css( 'background-position', '1px 1px');
        searchSubmit.delay(100).animate({zoom:1},0,function(){$(this).css( 'background-position', searchEyeBg);})
      }
    (function eyeLoop() {
        var rand = Math.round(Math.random() * (15000 - 5000)) + 500;
        setTimeout(function() {
                searchEyes();
                eyeLoop();
        }, rand);
    }());

    $("input#header-search-query").focus( function()
        {
            searchEyeBg = "1px -163px";
            searchSubmit.css( 'background-position', searchEyeBg);
        },
        function(){
          searchEyeBg = "1px -81px";
          searchSubmit.css( 'background-position', searchEyeBg);
        } );
   });


  // end search eyes


    // utility nav dropdown

     $(function(){

         $("#dd").hover(function(){

              $('#dd li').css('display', 'inline-block');

              $(this).addClass("active");


         }, function(){

              $('#dd li').css('display', 'none');

             $(this).removeClass("active");


         });

     });

    // end utility nav dropdown

    $(document).keydown( function (e) {

      // use charcode if available;  if not, use keyCode
      if (e.charCode) {
         var charCode = e.charCode;
      }
      else {
         var charCode = e.keyCode;
      }

      // verify enter is being pressed && that footer-findAStore-query has a value && it's not equal to its placeholder (IE bug)
      if ( charCode == 13 && jQuery("#footer-findAStore-query").val().length > 0 && jQuery("#footer-findAStore-query").val() != jQuery("#footer-findAStore-query").attr("placeholder") ) {

        e.preventDefault();
        e.stopPropagation();

        footerStoreLocatorFormSubmit();
      }

    });

    $(function(){

      // catch clicks on the footer submit button
      $('#footer-findAStore-submit').on('click', function () {
        footerStoreLocatorFormSubmit();
        return false;
      });

    });
})(jQuery);

// footer store locator form submits
function footerStoreLocatorFormSubmit() {
  if (!window.location.origin) {
  	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
  }
  var newLocation = window.location.origin + "/" + LOCALE + "/help/store_locator.jsp#!/search/" + jQuery("#footer-findAStore-query").val();

  window.location = newLocation;

  return false;

}

function imgClicked(imgId, imgElem){
 unselectAll(imgId);
 imgElem.name="selected";
 imgElem.className = "selected";
}

 function changeColorandLink(id, pColorCode, prodImg,skuId, pColorName, isLeaderProduct,itemdescription,itemCount,sortProperties,navAction,parentid,navCount ){

  var uniqueId = id;


  if(isLeaderProduct!=null & isLeaderProduct=="true"){
  uniqueId = "l"+uniqueId;
 }
 if(skuId!=null && skuId!="")
 {
  getElement(uniqueId+"catalogRefIds").value = skuId;
     getElement(uniqueId+"qty").name = skuId;
 }

 if(document["frm"+uniqueId]!=null && isLeaderProduct=="true")
 {
 document["frm"+uniqueId].color.value=pColorCode;
 document["frm"+uniqueId].colorName.value=pColorName;
 }

 if(getElement(uniqueId+"altviews")!=null && pColorCode!=null && id!=null){

getElement(uniqueId+"altviews").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_views.jsp?productid="+id+"&color="+pColorCode+"');";
 }
if(getElement(uniqueId+"selectedColor")!=null && pColorName!=null)
 {
 getElement(uniqueId+"selectedColor").innerHTML=pColorName.toUpperCase();
 }

 if(getElement(uniqueId+"popup_avail")!=null && pColorCode!=null && id!=null)
 {
  getElement(uniqueId+"popup_avail").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_avail.jsp?productid="+id+"&color="+pColorCode+"');";
 }

 if(getElement(uniqueId+"popup_sizechart")!=null && pColorCode!=null && id!=null)
 {
  getElement(uniqueId+"popup_sizechart").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_sizechart.jsp?productid="+id+"&color="+pColorCode+"');";
 }

 if(getElement(uniqueId+"requestswatches")!=null && pColorCode!=null && id!=null)
 {
  getElement(uniqueId+"requestswatches").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_requestswatches.jsp?productid="+id+"&color="+pColorCode+"');";
 }

 if(getElement(uniqueId+"viewmorephotos")!=null && pColorCode!=null && id!=null)
 {
  getElement(uniqueId+"viewmorephotos").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_views.jsp?productid="+id+"&color="+pColorCode+"');";
 }



 if(isLeaderProduct!=null & isLeaderProduct=="true"){
  if(getElement("tellafriend")!=null && pColorCode!=null && uniqueId!=null)
  {
   getElement("tellafriend").href=encodeURI(contextPath+'/user/login_check.jsp?productId='+id+'&cCode='+pColorCode);
  }
 }
 changeImageandLink(uniqueId,prodImg,pColorCode,itemdescription,itemCount,sortProperties,navAction,parentid,navCount,id );

}

function changeImageandLink(uniqueId,prodImg,pColorCode,itemdescription,itemCount,sortProperties,navAction,parentid,navCount,id){
 var imageHandle = "img"+uniqueId;
 var linkHandle = "link"+uniqueId;
 var deslinkHandle = "deslink"+uniqueId;
 var dislinkHandle = "dislink"+uniqueId;
    var viewAllinkHandle = "viewAllink"+uniqueId;
 if(prodImg != null && document[imageHandle]!=null){
  document[imageHandle].src = prodImg;

 }

 var jsessionid = getElement("jsessionid").value;
  if(getElement(linkHandle) != null){

  getElement(linkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp;jsessionid='+jsessionid+'?itemdescription='+itemdescription+'&itemCount='+itemCount+'&id='+id+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode);
  }


 if(getElement(deslinkHandle) != null){

 getElement(deslinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp;jsessionid='+jsessionid+'?itemdescription='+itemdescription+'&itemCount='+itemCount+'&id='+id+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode);
 }

 if(getElement(dislinkHandle) != null){

 getElement(dislinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp;jsessionid='+jsessionid+'?itemdescription='+itemdescription+'&itemCount='+itemCount+'&id='+id+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode);
 }

 if(getElement(viewAllinkHandle) != null){

 getElement(viewAllinkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp;jsessionid='+jsessionid+'?itemdescription='+itemdescription+'&itemCount='+itemCount+'&id='+id+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode);
 }
}



function changeColor(id, pColorCode, prodImg,skuId, pColorName, isLeaderProduct, pSizeName,itemdescription,itemCount,sortProperties,navAction,parentid,navCount){
  var uniqueId = id;
  if(pSizeName!=null){
    uniqueId = pSizeName;
  }

  if(isLeaderProduct!=null & isLeaderProduct=="true"){
    uniqueId = "l"+uniqueId;
  }
  if(skuId!=null && skuId!="")
  {
    getElement(uniqueId+"catalogRefIds").value = skuId;
      getElement(uniqueId+"qty").name = skuId;
  }

  if(document["frm"+uniqueId]!=null && isLeaderProduct=="true")
  {
  document["frm"+uniqueId].color.value=pColorCode;
  }

  if(getElement(uniqueId+"altviews")!=null && pColorCode!=null && id!=null){

getElement(uniqueId+"altviews").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_views.jsp?productid="+id+"&color="+pColorCode+"');";
  }
if(getElement(uniqueId+"selectedColor")!=null && pColorName!=null)
  {
  getElement(uniqueId+"selectedColor").innerHTML=pColorName.toUpperCase();
  }

  if(getElement(uniqueId+"popup_avail")!=null && pColorCode!=null && id!=null)
  {
    getElement(uniqueId+"popup_avail").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_avail.jsp?productid="+id+"&color="+pColorCode+"');";
  }

  if(getElement(uniqueId+"popup_sizechart")!=null && pColorCode!=null && id!=null)
  {
    getElement(uniqueId+"popup_sizechart").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_sizechart.jsp?productid="+id+"&color="+pColorCode+"');";
  }

  if(getElement(uniqueId+"requestswatches")!=null && pColorCode!=null && id!=null)
  {
    getElement(uniqueId+"requestswatches").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_requestswatches.jsp?productid="+id+"&color="+pColorCode+"');";
  }

  if(getElement(uniqueId+"viewmorephotos")!=null && pColorCode!=null && id!=null)
  {
    getElement(uniqueId+"viewmorephotos").href="javascript:openProductPopupWindow('"+contextPath+"/popups/popup_views.jsp?productid="+id+"&color="+pColorCode+"');";
  }



  if(isLeaderProduct!=null & isLeaderProduct=="true"){
    var formObj = document.sendMessage;
    if (formObj) {
        var productIdsElement = formObj["/uo/commerce/SendEmailFriendFormHandler.colorCode"];
        if(productIdsElement!=null && pColorCode!=null && uniqueId!=null){
          productIdsElement.value = pColorCode;
      }
          if(getElement("emailColorCode")!=null && pColorCode!=null && uniqueId!=null){
            getElement("emailColorCode").value = pColorCode;
        }
    }
  }
   changeImage(uniqueId,prodImg,pColorCode,itemdescription,itemCount,sortProperties,navAction,parentid,navCount,id);
    }

    function changeImage(uniqueId,prodImg,pColorCode,itemdescription,itemCount,sortProperties,navAction,parentid,navCount,id){
     var imageHandle = "img"+uniqueId;
     var linkHandle = "link"+uniqueId;

     if(prodImg != null && document[imageHandle]!=null){
      document[imageHandle].src = prodImg;

     }
     if(getElement(linkHandle) != null){
      getElement(linkHandle).href=encodeURI(contextPath+'/catalog/productdetail.jsp?itemdescription='+itemdescription+'&itemCount='+itemCount+'&id='+id+'&parentid='+parentid+'&sortProperties='+sortProperties+'&navCount='+navCount+'&navAction='+navAction+'&color='+pColorCode);
  }
}

function imgMouseOver(imgElem, color){
  imgElem.className = "mouseOver";
}

function imgMouseOut(imgElem, color){
 if(imgElem.name == "selected"){
  imgElem.className="selected";
 } else {
  imgElem.className="unselected";
 }
}

function unselectAll(elementId){
 if(document.all){
  var length = document.all(elementId).length;
  for(var i=0;i<length;i++){
   var elem = document.all(elementId, i);
   if(elem.name == "selected"){
    elem.name = "";
    elem.className="unselected";
   }
  }
 } else {
  var length = document.getElementById(elementId).length;
  for(var i=0;i<length;i++){
   var elem = document.getElementById(elementId, i);
   if(elem.name = "selected"){
     elem.name = "";
        elem.className="unselected";
   }
  }
 }
}

var scriptfunctionsarray = new Array();

function addScriptFunction(pProductId, pSizeName, pProductColor, pProdImg,pSkuId, pColorName){
  scriptfunctionsarray.push(new scriptfunction(pProductId, pSizeName, pProductColor, pProdImg,pSkuId, pColorName));
}

function callscriptfunctions(){
  for(var i=0;i<scriptfunctionsarray.length;i++){
    changeColor(scriptfunctionsarray[i].productId,scriptfunctionsarray[i].productColor,scriptfunctionsarray[i].prodImg,scriptfunctionsarray[i].skuId, scriptfunctionsarray[i].colorName, '', scriptfunctionsarray[i].sizeName);
  }
}

function scriptfunction(productId, pSizeName, pProductColor, pProdImg, pSkuId, pColorName){
  this.productId = productId;
  this.sizeName = pSizeName;
  this.productColor = pProductColor;
  this.prodImg = pProdImg;
  this.skuId = pSkuId;
  this.colorName = pColorName;
}

function getProductDetailAddToBagValues(frmName) {
  // get values to store as JSON

  // if is main product
  var prodTitle = "";
  var titleTags = $$('form[name="' + frmName + '"] h2.prodTitle');
  if (titleTags) {
    titleTags.each(function(t) {
      prodTitle = t.innerHTML;
    });
  }

  var prodPrice = "";
  var pPriceTags = $$('form[name="' + frmName + '"] p.price');
  if (pPriceTags) {
    pPriceTags.each(function(pTag) {
      if (prodPrice == "") {
        prodPrice = pTag.innerHTML;
      }
    });
  }

  var salePrices = $$('form[name="' + frmName + '"] p.salePrice');
  var isSalePrice = false;
  if (salePrices) {
    salePrices.each(function(spTag) {
      if (!isSalePrice) {
        prodPrice = spTag.innerHTML;
        isSalePrice = true;
      }
    });
  }

  var prodColor = "";
  var swatches = $$('form[name="' + frmName + '"] #detailSwatches a');
  if (swatches) {
    swatches.each(function(s) {
      if (s.hasClassName("selected")) {
        if (prodColor == "") {
          var tmp = s.id.replace("swatchLink_","");
          tmp = tmp.substr(0, tmp.indexOf("_"));
          prodColor = tmp;
        }
      }
    });
  }

  var prodQty = "";
  var qtyMenu = $$('form[name="' + frmName + '"] #qtyOption select');
  if (qtyMenu) {
    qtyMenu.each(function(qMenu){
      if (prodQty == "") {
        prodQty = qMenu.value;
      }
    });
  }

  // if family product
  if(prodTitle.length == 0) {
    titleTags = $$('form[name="' + frmName + '"] h5 p');
    if(titleTags) {
      prodTitle = titleTags[0].innerHTML;
    }
  }

  if(prodPrice.length == 0) {
    pPriceTags = $$('form[name="' + frmName + '"] span.price');
    if (pPriceTags) {
      pPriceTags.each(function(pTag) {
        prodPrice = pTag.innerHTML;
      });
    }
  }

  if(salePrices.length == 0) {
    salePrices = $$('form[name="' + frmName + '"] span.salePrice');
    isSalePrice = false;
    if (salePrices) {
      salePrices.each(function(spTag) {
        if (!isSalePrice) {
          prodPrice = spTag.innerHTML;
          isSalePrice = true;
        }
      });
    }
  }

  if(prodColor.length == 0) {
    swatches = $$('form[name="' + frmName + '"] .swatches a');
    if (swatches) {
      swatches.each(function(s) {
        if (s.hasClassName("selected")) {
          if (prodColor == "") {
            var tmp = s.id.replace("swatchLink_","");
            tmp = tmp.substr(0, tmp.indexOf("_"));
            prodColor = tmp;
          }
        }
      });
    }
  }


  if(prodQty.length == 0) {
    var qtyMenu = $$('form[name="' + frmName + '"] .multi_swatches select');
    if (qtyMenu) {
      qtyMenu.each(function(qMenu){
        prodQty = qMenu.value;
      });
    }
  }

  var prodSku = "";
  var pSkuTags = $$('form[name="' + frmName + '"] .sku');
  if (pSkuTags.length != 0) {
    pSkuTags.each(function(pTag) {
      if (prodSku == "") {
        prodSku = pTag.innerHTML.replace("SKU #","");
      }
    });
  } else {
    prodSku = $$('form[name="' + frmName + '"] input[name="id"]')[0].getValue();
  }


  var jsonStr = '{"title":"' + prodTitle.trim() + '","price":"' + prodPrice.trim() + '","isSalePrice":"' + isSalePrice + '","sku":"' + prodSku.trim() + '","color":"' + prodColor.trim() + '","quantity":"' + prodQty + '"}';
  return jsonStr;
}

function centerModalWindow(modalWinId, modalWinWrapperId) {
  var modalWinObj = $(modalWinId);
  var modalWinObjWrapper = $(modalWinWrapperId);
  //get the user's screen dimensions and calculate center point
  var screenWidth = getBrowserWidth();
  var screenHeight = getBrowserHeight();
  // get dimensions
  var w = parseInt(modalWinObj.style.width);
  var h = parseInt(modalWinObj.style.height);
  // scrolling offset
  var scrollY = getOffsetY();
  // set coordinates
  var x = Math.floor(screenWidth/2) - Math.floor(w/2) + "px";
  var y = Math.floor(screenHeight/2) - Math.floor(h/2) + scrollY + "px";
  if ((modalWinObj) && (modalWinObjWrapper)) {
    // make visible
    modalWinObj.style.top = y;
    modalWinObj.style.left = x;
    if (modalWinObjWrapper) {
      if( window.innerHeight && window.scrollMaxY ) // Firefox
      {
        pageWidth = window.innerWidth + window.scrollMaxX;
        pageHeight = window.innerHeight + window.scrollMaxY;
      }
      else if( document.body.scrollHeight > document.body.offsetHeight ) // all but Explorer Mac
      {
        pageWidth = document.body.scrollWidth;
        pageHeight = document.body.scrollHeight;
      }
      else // works in Explorer 6 Strict, Mozilla (not FF) and Safari
      {
        pageWidth = document.body.offsetWidth + document.body.offsetLeft;

        pageHeight = document.body.offsetHeight + document.body.offsetTop;

      }
      modalWinObjWrapper.style.height = pageHeight + "px";
      if (ie) {
        modalWinObjWrapper.style.width = screenWidth + "px";
      }
    }
    // display
    modalWinObjWrapper.style.display = "block";
    modalWinObj.style.display = "block";
  }
}

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g,"");
}

function addItemToBag(frmName){

  var jsonStr = getProductDetailAddToBagValues(frmName);

  //code to test if user is private safari user

  try { // Try and catch quota exceeded errors
    if (typeof(sessionStorage) != "undefined" && !sessionStorage.itemsAdded) {
    // use HTML session storage to display added to bag modal window
    sessionStorage.itemsAdded = jsonStr;
    }
  } catch (error) {
    if (error.code === DOMException.QUOTA_EXCEEDED_ERR && sessionStorage.length === 0) {
      //alert('Hello, private browser.');
    } else {throw error; }
  }

  // end code to test if user is private safari user

  // submit form
  document[frmName].action.value = "addToBag";
  document[frmName].submit();
}

/* Trac 3247 */

  function addItemToWishlist(frmName){
    document[frmName].itemsadded.value='';
    document[frmName].action.value = "addToWishlist";
    document[frmName].submit();
  }
function getElement(elementId){
  return document.all ? document.all[elementId] : document.getElementById(elementId);
}

function View(pViewName, pViewURL){
  this.viewName = pViewName;
  this.viewURL = pViewURL;
}

function Color(pColorCode, pColorName, pProductImageURL){
  this.colorCode = pColorCode;
  this.colorName = pColorName;
  this.productImageURL = pProductImageURL;
  this.viewList = new Array();

  this.addView = function(pViewName, pViewURL){
    this.viewList.push(new View(pViewName, pViewURL));
  }
}

function openWindow(pURL, pName, pWidth, pHeight){
    var features = ["width=", pWidth, ",height=", pHeight, ",status=no,toolbar=no,menubar=no,location=no,scrollbars=yes,titlebar=no,resizable=yes"];
    window.open(encodeURI(pURL), pName, features.join(''));
}

function openProductPopupWindow(pURL){
  openWindow(pURL, 'productpopup', 452, 599);
}

function openInformationalPopupWindow(pURL)
{
    openWindow(encodeURI(pURL), "dayphoneinfopopup", 635, 200);
}
//Functions for AddresBook
function getElement(elementId){
    return document.all ? document.all[elementId] : document.getElementById(elementId);
  }
  function deleteAddress(){
    var formObj = document.savedAddressFrm;
    formObj["/atg/userprofiling/ProfileFormHandler.removeAddress"].value = getSelectedAddress(formObj);

    formObj["/atg/userprofiling/ProfileFormHandler.editAddress"].name='';
    formObj["/atg/userprofiling/ProfileFormHandler.editAddress"].value='';
    formObj.newAddress.value="true";
    formObj.submit();
  }
  function editAddress(){
    var formObj = document.savedAddressFrm;
    formObj.newAddress.value="";
     formObj["/atg/userprofiling/ProfileFormHandler.editAddress"].value = getSelectedAddress(formObj);

    formObj["/atg/userprofiling/ProfileFormHandler.removeAddress"].name='';
    formObj["/atg/userprofiling/ProfileFormHandler.removeAddress"].value='';

    formObj.submit();
  }

  function getSelectedAddress(formObj){
    var radioObj= formObj.edit;

    if(!radioObj)
        return "";
      var radioLength = radioObj.length;
      if(radioLength == undefined)
       if(radioObj.checked)
        return radioObj.value;
       else
        return null;
      for(var i = 0; i < radioLength; i++) {
       if(radioObj[i].checked) {
        return radioObj[i].value;
       }
      }
      return null;
    }

  function disableDelete(){
    getElement("deletebutton").style.display = 'none';
    getElement("key1").value="billing";
  }
  function enableDelete(){
    getElement("deletebutton").style.display = 'inline';
    getElement("key1").value="true";
  }
//Functions end here for AddressBook
var blanks = []
function blank(input) {
    var id = input.form.name + '.' + input.name
    for (var i = 0, l = blanks.length; i < l; i++) {
        if (blanks[i] === id)
            return;
    }
    blanks.push(id)
    input.value = "";
}

//Functions added for Phone numbers in Account menu page are not displaying properly .
function formatPhoneNumber(phone){
  // Code modified for Trac 1598.
  var phoneNumberLength = phone.length;
  if(!phoneNumberLength < 11){
    phone = ReplaceAll (phone, " " ,"");
    phone = ReplaceAll (phone, "-" ,"");
    phoneNumberLength = phone.length;
    if(phoneNumberLength == 11){
      var isOne = phone.substring(0,1);
      if(isOne == 1){
        phone= phone.replace("1","");
      }
    }
  }
  // End of code modified for Trac 1598.
  var sAreaCode = phone.substring(0,3);
  var s3dig = phone.substring(3,6);
  var s4dig = phone.substring(6,10);
  var newPhone = "("+sAreaCode+")"+s3dig+"-"+s4dig;
  return newPhone;
}
//End of Functions added for Phone numbers in Account menu page are not displaying properly .

//Function added for Trac 1535.
function displayOrderNumber(pSubject){

      if(getElement("subject").value == ""){
        document.getElementById( "orderNumber" ).style.display = "none";
        document.getElementById( "orderLabel" ).style.display = "none";
        document.getElementById( "orderNumber" ).value = "";
      }
      else{
        if (LOCALE == "uk" || LOCALE == "de" || LOCALE == "fr") {
	      if(pSubject.options[pSubject.selectedIndex].value == "Order: Furniture enquiry" || pSubject.options[pSubject.selectedIndex].value == "Order: Item missing from my order" || pSubject.options[pSubject.selectedIndex].value == "Order: Received faulty/damaged item" || pSubject.options[pSubject.selectedIndex].value == "Order: Received incorrect item" || pSubject.options[pSubject.selectedIndex].value == "Order: Some or all of my items were cancelled"){
            document.getElementById( "orderNumber" ).style.display = "";
            document.getElementById( "orderNumber" ).style.width = "250px";
            document.getElementById( "orderLabel" ).style.display = "";
          }
          else{
            document.getElementById( "orderNumber" ).style.display = "none";
            document.getElementById( "orderLabel" ).style.display = "none";
            document.getElementById( "orderNumber" ).value = "";
          }
        }
        else {
          if(pSubject.options[pSubject.selectedIndex].text == "Orders" || pSubject.options[pSubject.selectedIndex].text == "Customer Service"){
            document.getElementById( "orderNumber" ).style.display = "";
            document.getElementById( "orderNumber" ).style.width = "250px";
            document.getElementById( "orderLabel" ).style.display = "";
          }
          else{
            document.getElementById( "orderNumber" ).style.display = "none";
            document.getElementById( "orderLabel" ).style.display = "none";
            document.getElementById( "orderNumber" ).value = "";
          }
        }
      }
}
//End of Functions added for 1535.
//Function added for Trac 1598.
function ReplaceAll(Source,stringToFind,stringToReplace){
    var temp = Source;
    var index = temp.indexOf(stringToFind);
    while(index != -1){
      temp = temp.replace(stringToFind,stringToReplace);
      index = temp.indexOf(stringToFind);
    }
    return temp;
}
//End of Function added for 1598.

//Code added for Trac 1997.
function changeProductColor(item){
  document.selectForm.selectedProductColor.value=item.value;
  document.selectForm.submit();
}
function chooseSorting(item){
  document.selectSortbyForm.sortby.value=item.value;
  document.selectSortbyForm.submit();
}
function resetSelect(Obj, newvalue) {
  //To add space in the size name if user comes from 'Continue Shopping' link
    if( newvalue.indexOf(" ") == -1){
      if(newvalue.indexOf("SIZE") == 0 ){
        newvalue=newvalue.replace("SIZE","SIZE ");
      }else if(newvalue.indexOf("ONE") == 0 ){
      newvalue=newvalue.replace("ONE","ONE ");
      }
    }
   if(Obj != null){
    for(i=0;i< Obj.options.length;i++){
      if (Obj.options[i].value == newvalue) {
        Obj.selectedIndex = i;
        return;
      }
    }
   }

}
//Used to assign 'selectedProductSize' param  with selected size.
function changeProductSize(item){
    document.selectShopbySizeForm.selectedProductSize.value=item.value;
    document.selectShopbySizeForm.submit();
}
//setSelectedSizeForShopBySize() used to select the size in the ProductDetail page.
function setSelectedSizeForShopBySize(pProductId,pSizeName,isLeaderProduct){
  var productSelector = getProductSelector(pProductId, false, isLeaderProduct);
  if(productSelector != null){
    //To get the size name for MixedTemplate, because
    //Selected size name will be in the following format:
    //sizeName@templateType(Ex: SMALL@WomenApparelTemplate)
      if(pSizeName.indexOf("@")!= -1 ){
        pSizeName = pSizeName.substr(0, pSizeName.indexOf("@"));
      }
      //To add space if user comes from 'Continue Shopping' link
      if(pSizeName.indexOf("SIZE") == 0 && pSizeName.indexOf(" ") == -1){
        pSizeName = pSizeName.replace("SIZE", "SIZE ");
      }

    var Obj = productSelector.skuSelector.mAvailableSizes;
    //To select XSMALL and XLARGE if product has these sizes.
    for(i=0;i< Obj.length;i++){
      if (Obj[i].indexOf("XSMALL") == 0 && pSizeName.indexOf("X-SMALL") == 0) {
        pSizeName = Obj[i];
        break;
      }else if(Obj[i].indexOf("XLARGE") == 0 && pSizeName.indexOf("X-LARGE") == 0) {
        pSizeName = Obj[i];
        break;
      }
    }

    var currentSku = productSelector.skuSelector.getSku(pSizeName);
    //Checks an availability status for the current SKU
    if(currentSku != null && currentSku.availabilityStatus != 1001){
      productSelector.setSelectedSizeName(pSizeName);
      initializeAllProducts(isLeaderProduct);
    }
  }
}

//End of Code added for Trac 1997.


// sizeChart plugin
(function( $ ) {

  $(document).ready(function() {

      $("#size_chart").click(function() {

        $("#product-size-chart").sizeChart({

          gender : $('meta[name=rootCategory]').attr("content"),
          department : $('meta[name=defaultParent]').attr("content"),
          productDetailPage : true

        });

        return false;

      });

  });

    $.fn.sizeChart = function( options ) {

      var settings = $.extend({

        gender: "WOMENS",
        department: "W_DRESSES",
        productID: "21103023",
        selector: this.selector,
        rootCat : $('meta[name=rootCategory]').attr("content"),
        defaultCat : $('meta[name=defaultParent]').attr("content"),
        productDetailPage: false

      }, options );

         //determine root category and show corresponding size chart


      if(settings.gender == "MENS" || settings.gender == "MENS-EU") {
          settings.url = "/" + LOCALE + "/html/" + LOCALE + "/mens_sizechart.html";
      } else {
          settings.url = "/" + LOCALE + "/html/" + LOCALE + "/womens_sizechart.html";
      }

      return this.load( settings.url, function() {

          // this is all the js that could fire on load

          // if on product detail page, resize modal window and add css class
          if ( settings.productDetailPage === true ) {


            $("#sizechart").addClass("productDetailPage");

            adjustModalWindow("#sizechart_wrapper", "#sizechart");

            $("#sizechart").addClass("productDetailPage");

          } else {
            $("#sizechart_wrapper").hide();
          }

          // reload sizeChart when different gender is selected
          $("input:radio[name='gender']").change( function() {

            settings.gender = $(this).attr( "value" );

            // call sizechart again with new gender
            $.fn.sizeChart.call( $(settings.selector), {
              gender: settings.gender
            });

          });

          // select appropriate department
          $("#sizechart_header ul li").click(function() {
            $("#sizechart_header ul li").removeClass("selected");
            $(this).addClass("selected");

            var sIndex = $("#sizechart_header ul li").index(this);

            $(".sizechart_sizes").hide();
            $(".sizechart_sizes").eq(sIndex).show();

            if($(this).text() == "Shoes")  { //if shoes, hide conversion
              $(".conversionSelection").hide();
            } else {
              $(".conversionSelection").show();
            }
          });

          // inches vs centimeter conversion
          $("input:radio[name='conversion']").click(function() {

            if($(this).val() == "in") {

              $(".sizechart_sizes .in").show();
              $(".sizechart_sizes .cm").hide();

            } else {

              $(".sizechart_sizes .in").hide();
              $(".sizechart_sizes .cm").show();

            }

          });

          var sizeID;
          // add hover arrows
          $(".arrow_hover").mouseover(function(){

            sizeID = $(this).attr("id");

            $("#" + sizeID + "_arrow").addClass("hover");

          }).mouseleave( function(){

            // reset arrow position
            $("#" + sizeID + "_arrow").removeClass("hover");

          }).click( function() {
            return false;
          });

          var myObj = {};
            // this handles the hover affect for rows and columns
            $(".sizechart_sizes").delegate('td','mouseover mouseleave', function(e) {
            if (e.type == 'mouseover') {

              var temporaryRow;
              var bottoms = false;
              var tempIndex;

              if ( $("#sizechart_header .selected").html() == "Bottoms" ) {
                bottoms = true;
              }

                $(this).addClass("current");
                $(this).parent().addClass("hover");


                if ( $(this).attr("rowspan") > 0 ) {

                  // the hovered cell has a rowspan;
                  temporaryRow = $(this).parent();

                  for (var i = $(this).attr("rowspan") - 1; i >= 0; i--) {

                    $(temporaryRow).addClass("hover");
                    temporaryRow = temporaryRow.next();

                  };

              } else {

                // The hovered cell has no rowspan.
                // We need to traverse to find the primary row, and add the hoverRowspans class to that.
                // This will only hover cells with rowspans

                  if ( $(this).parent().hasClass("primary") ) {
                    temporaryRow = $(this).parent();

                  } else if ( $(this).parent().prev().hasClass("primary") ) {
                    temporaryRow = $(this).parent().prev();

                  } else {
                    temporaryRow = $(this).parent().prev().prev();
                  }

                  $(temporaryRow).addClass("hoverRowspans");

              }

              myObj = $(this).parent().parent().parent().children('colgroup').children('col');

              // add col hover
              if ( bottoms == true ) {

                if ( !$(this).parent().hasClass("primary") ) {
                  // not a primary row - need to set special conditions for highlighting col
                  tempIndex = $(this).index() + 1;

                  if ( tempIndex > 2 ) {
                    // cell is in the right two cells;  must add 8 to the index to jump over all international cells
                    tempIndex += 8;
                  }

                  $( myObj[ tempIndex ]).addClass("hover");

                } else {

                  // primary row - just do standard highlighting
                    $( myObj[ $(this).index() ]).addClass("hover");

                }

              } else {

                // standard row highlight - not on bottoms page
                  $( myObj[ $(this).index() ]).addClass("hover");

              }

            } else {
              $('tr').removeClass("hover");
              $('tr').removeClass("hoverRowspans");
              $('td').removeClass("current");
              $("col").removeClass("hover");
            }
        });

        // trigger default category on product detail pages
          switch(settings.rootCat) {
            case "WOMENS":
              if(settings.defaultCat.indexOf("DRESSES") >= 0) {
                $("#sizechart_header ul li").eq(0).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("TOPS") >= 0 || settings.defaultCat.indexOf("OUTERWEAR") >= 0) {
                $("#sizechart_header ul li").eq(1).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("BOTTOMS") >= 0 || settings.defaultCat.indexOf("JEANS") >= 0) {
                $("#sizechart_header ul li").eq(2).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("SWIM") >= 0 || settings.defaultCat.indexOf("INTIMATES") >= 0) {
                $("#sizechart_header ul li").eq(3).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("SHOES") >= 0) {
                $("#sizechart_header ul li").eq(4).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("ACCESSORIES") >= 0 || settings.defaultCat.indexOf("BAGS") >= 0) {
                $("#sizechart_header ul li").eq(5).trigger('click');
                break;
              } else {
                $("#sizechart_header ul li").eq(0).trigger('click');
                break;
              }
            case "WOMENS-EU":
              if(settings.defaultCat.indexOf("DRESSES") >= 0 || settings.defaultCat.indexOf("PLAYSUITS") >= 0) {
                $("#sizechart_header ul li").eq(0).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("TOPS") >= 0 || settings.defaultCat.indexOf("KIMONOS") >= 0 || settings.defaultCat.indexOf("KNITWEAR") >= 0 || settings.defaultCat.indexOf("JACKETS") >= 0 || settings.defaultCat.indexOf("SHIRTS") >= 0 || settings.defaultCat.indexOf("JUMPERS") >= 0) {
                $("#sizechart_header ul li").eq(1).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("BOTTOMS") >= 0 || settings.defaultCat.indexOf("JEANS") >= 0 || settings.defaultCat.indexOf("TROUSERS") >= 0 || settings.defaultCat.indexOf("SKIRTS") >= 0 || settings.defaultCat.indexOf("SHORTS") >= 0) {
                $("#sizechart_header ul li").eq(2).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("SWIMWEAR") >= 0 || settings.defaultCat.indexOf("LINGERIE") >= 0) {
                $("#sizechart_header ul li").eq(3).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("SHOES") >= 0) {
                $("#sizechart_header ul li").eq(4).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("ACCESSORIES") >= 0 || settings.defaultCat.indexOf("BAGS") >= 0 || settings.defaultCat.indexOf("JEWELLERY") >= 0) {
                $("#sizechart_header ul li").eq(5).trigger('click');
                break;
              } else {
                $("#sizechart_header ul li").eq(0).trigger('click');
                break;
              }
            case "MENS":
              if(settings.defaultCat.indexOf("TOPS") >= 0 || settings.defaultCat.indexOf("OUTERWEAR") >= 0)  {
                $("#sizechart_header ul li").eq(0).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("BOTTOMS") >= 0 || settings.defaultCat.indexOf("JEANS") >= 0) {
                $("#sizechart_header ul li").eq(1).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("SHOES") >= 0) {
                $("#sizechart_header ul li").eq(2).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("ACCESSORIES") >= 0 || settings.defaultCat.indexOf("BAGS") >= 0) {
                $("#sizechart_header ul li").eq(3).trigger('click');
                break;
              } else {
                $("#sizechart_header ul li").eq(0).trigger('click');
                break;
              }
            case "MENS-EU":
              if(settings.defaultCat.indexOf("TOPS") >= 0 || settings.defaultCat.indexOf("JACKETS") >= 0 || settings.defaultCat.indexOf("KNITWEAR") >= 0|| settings.defaultCat.indexOf("COMMODITY") >= 0 || settings.defaultCat.indexOf("JUMPERS") >= 0 || settings.defaultCat.indexOf("SHIRTS") >= 0)  {
                $("#sizechart_header ul li").eq(0).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("BOTTOMS") >= 0 || settings.defaultCat.indexOf("JEANS") >= 0 || settings.defaultCat.indexOf("SHORTS") >= 0 || settings.defaultCat.indexOf("CHINOS") >= 0 || settings.defaultCat.indexOf("TROUSERS") >= 0 || settings.defaultCat.indexOf("UNDERWEAR") >= 0 || settings.defaultCat.indexOf("ONESIES") >= 0) {
                $("#sizechart_header ul li").eq(1).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("SHOES") >= 0) {
                $("#sizechart_header ul li").eq(2).trigger('click');
                break;
              } else if(settings.defaultCat.indexOf("ACCESSORIES") >= 0 || settings.defaultCat.indexOf("BAGS") >= 0 || settings.defaultCat.indexOf("BELTS") >= 0 || settings.defaultCat.indexOf("HATS") >= 0) {
                $("#sizechart_header ul li").eq(3).trigger('click');
                break;
              } else {
                $("#sizechart_header ul li").eq(0).trigger('click');
                break;
              }
            default:
          }

          // Listen for "close" event on modal window.
          $("#sizechart_wrapper, #sizechart #sizechart_close_btn").click(function() {
            $("#product-size-chart").empty();
            return false;
          });

      });  // end .load

    };


var adjustModalWindow = function(wrapper, obj) {

  // set object references
  var wrapperObj = $(wrapper);
  var availObj = $(obj);

  // get the user's screen dimensions and calculate center point
  var screenWidth = getBrowserWidth();
  var screenHeight = getBrowserHeight();

  // scrolling offset
  var scrollY = getOffsetY();

  // set wrapper height
  if( window.innerHeight && window.scrollMaxY ) // Firefox
  {
    pageWidth = window.innerWidth + window.scrollMaxX;
    pageHeight = window.innerHeight + window.scrollMaxY;
  }
  else if( document.body.scrollHeight > document.body.offsetHeight ) // all but Explorer Mac
  {
    pageWidth = document.body.scrollWidth;
    pageHeight = document.body.scrollHeight;
  }
  else // works in Explorer 6 Strict, Mozilla (not FF) and Safari
  {
    pageWidth = document.body.offsetWidth + document.body.offsetLeft;
    pageHeight = document.body.offsetHeight + document.body.offsetTop;
  }

  if (availObj && wrapperObj) {
  // snapshot dimensions
  var availObjWidth = availObj.width();
  var availObjHeight = availObj.height();

  // set snapshot coordinates
  var x = Math.floor(screenWidth/2) - Math.floor(availObjWidth/2) + "px";
  var y = Math.floor(screenHeight/2) - Math.floor(availObjHeight/2) + scrollY + "px";

  // make visible
  availObj.css({'top' : y, 'left' : x});

  // set wrapper height
  wrapperObj.height(pageHeight);
  if (ie) {
              wrapperObj.width(screenWidth);
          }
  }

}

}( jQuery ));

var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

var getCookieName = function(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

// get cookies, assign
var getCookies = function(){
  var pairs = document.cookie.split(";");
  var pairsLength = pairs.length;
  var cookies = {};
  for (var i=0; i<pairsLength; i++){
    var pair = pairs[i].split("=");
    pair[0] = jQuery.trim( pair[0] );
    cookies[pair[0]] = unescape(pair[1]);
  }
  return cookies;
}

var getURLParameter = function(name, url) {
    if (url == null) {
        url = window.location.search;
    }
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    name = "[\\?&]" + name + "=([^&#]*)";
    var regexp = new RegExp(name);
    var value = regexp.exec(url);
    if (value == null) {
        return "";
    }
    return value[1];
}

function getMetaValue( meta_name ) {

  var my_arr=document.getElementsByTagName("META");

  for (var counter=0; counter<my_arr.length; counter++) {

    if (my_arr[counter].name.toLowerCase() == meta_name.toLowerCase()) {
      return my_arr[counter].content;
    }
  }

  return "N/A";

}

function lowercaser(inputField) {
  tempUsername = jQuery(inputField).val();
  tempUsername = tempUsername.toLowerCase();
  jQuery(inputField).val( tempUsername );
}

//ipad and iphone fix
jQuery(document).ready(function() {
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
    	jQuery("#utilityNav .languageSelect .toggleSummary").click(function(){
        	// event listener to enable hover state on iPad currency/lang toggle
        });
    }
});

(function($) {

    $(document).ready(function() {

      //  The commented out code below is for the UrbanOn modal window that used to be on the login page.  If we don't need it by the time responsive goes live (approx. summer '14), it can be deleted.

    // if ( typeof utag_data !== "undefined" ) {

    //   // begin on_modal code

    //   var cookie_for_declined_loyalty_interstitial = localStorage.getItem("cookie_for_declined_loyalty_interstitial");
    //   var pathname = window.location.pathname;
    //   var recognized = false;
    //   var on_login_page = false;
    //   var display_modal = false;
    //   var just_logged_out = (getURLParameter("DPSLogout") == "true");
    //   var checking_out = (getURLParameter("checkout") == "true");
    //   var isUS = ( LOCALE == "urban" ) ? true : false;

    //   if ( utag_data.customer_type !== "New" ) {
    //     recognized = true;
    //   }

    //   if ( pathname.indexOf("checkout_login.jsp") > -1 ) {
    //     on_login_page = true;
    //   }

    //   // The only time anonymous users see the modal is on the login page
    //   if ( (!recognized) && on_login_page && isUS && just_logged_out !== true && cookie_for_declined_loyalty_interstitial !== "true" && utag_data.declined_loyalty_interstitial !== "true"  && checking_out !== true) {
    //     display_modal = true;

    //   } else if (recognized) {

    //     // Recognized users see it as long as they havent declined the modal, and haven't made a loyalty ID


    //       // check - they havent declined the interstitial, signed up for loyalty already, have a cookie for the interstitial, and are recognized
    //       if ( utag_data.declined_loyalty_interstitial !== "true" && utag_data.loyalty_id === "" && cookie_for_declined_loyalty_interstitial !== "true"  && on_login_page && isUS) {
    //         display_modal = true;

    //       }



    //   }

    //   if ( display_modal ) {

    //     $.colorbox({
    //       href: "/" + LOCALE +  "/html/" + LOCALE + "/on_modal.html",
    //       onComplete: function() {

    //         $(".check_it_out").on("click", function() {
    //           localStorage.setItem("cookie_for_declined_loyalty_interstitial", "true");
    //           window.location.href = "/" + LOCALE + "/on/urbanon.jsp";

    //         });

    //         // must keep this function inside onComplete because .on_modal .close doesn't exist until HTML is pulled
    //         $(".on_modal .close_modal").click( function() {
    //           $.colorbox.close();
    //           return false;
    //         });

    //         var styles = {
    //           "width" : "100%",
    //           "opacity" : ".8",
    //           "z-index" : "1000",
    //         }

    //         $(".black_overlay").css( styles );

    //         $(".black_overlay").on( "click", function() {
    //           $.colorbox.close();
    //         });

    //         $.colorbox.resize();

    //       }

    //     });

    //     // handle closing the popup
    //     $(document).bind('cbox_closed', function () {

    //       $(".black_overlay").remove();

    //       localStorage.setItem("cookie_for_declined_loyalty_interstitial", "true");

    //       $.ajax("/urban/on/decline_interstitial.jsp");

    //     });

    //   }

    // }

    // end on_modal code

    // begin login lowercase fix

    if ( $("#loginColumns").length > 0 ) {

      lowercaser( jQuery(".centerColumn [name='regLogin']") );

      jQuery(".centerColumn [name='regLogin']").on('input', function() {
        lowercaser( jQuery(this) );
      });

      if ( $(".rightColumn").length > 0 ) {

        jQuery(".rightColumn [name='guestLogin']").on('input', function() {
          lowercaser( jQuery(this) );
        });

      }

    }

    $('form[name="changeLoginOrPasswordForm"] input[name="login"]').on('input', function() {
      lowercaser( $(this) );
    });

    // end login lowercase fix


  //begin function to populate birthday years
    if ($("#birthYear").length > 0){
      var item = $("#birthYear");
      var curYear = new Date().getFullYear();
      var maxOffSet = 100;
      var minOffSet = 0;

      if (item){
        for (x=minOffSet; x <= maxOffSet; x++ ){
          var year = curYear - x;
          var opt = $("<option />", {value: year, text: year});

          if (selectedBirthYear != null) {
            if (opt.val() == selectedBirthYear) {
              opt.prop("selected","selectedBirthYear");
            }
          }
          opt.appendTo(item);
        }
      }
    }
    //end function to populate birthday years

    });
})(jQuery);

var headerFooterVars = {
  bottomOfPage: 0,
  displayingFooter: false,
  documentHeight: 0,
  expandedRegionHeight: 40,
  inCheckout: false,
  inUOONYOU: false,
  outsideBuffer: false,
  pathname: window.location.pathname,
  query: window.location.search,
  scrollTop: 0,
  scrollingUp: false,
  scrollingUpBuffer: 200,
  windowHeight: 1
};


// start header
(function($) {

  var hideLargeHeader = function() {
    $(".header").addClass("mini");
  }

  var showLargeHeader = function() {
    $(".header").removeClass("mini");
  }

  var scrollToFooter = function( activateStoreLocations ) {
    $.scrollTo( '100%', 500, {
      onAfter: function() {

        // focus the store locations input box when appropriate
        if ( activateStoreLocations && !Modernizr.touch ) {
          $("#footer-findAStore-query").focus();
        }



      }
    });

  }

  var hideMiniFooter = function() {
    $(".miniFooter").hide();
  }

  $(window).load( function( ) {

    uiInterface.resetPageHeight();

    // determine if we are on a checkout page
    if ( headerFooterVars.pathname.indexOf("checkout.jsp") != -1 ) {

      headerFooterVars.inCheckout = true;

    // determine if we're on the UOONYOU page
    } else if ( headerFooterVars.query.indexOf("UOONYOU") != -1 ) {

      headerFooterVars.inUOONYOU = true;
      $('footer').hide();
      hideMiniFooter();

    }

    // reset page height on page resize;  bugfix
    $(window).resize( function() {

      uiInterface.resetPageHeight();

    });

    // When someone clicks a toggleFooter link, jump to the bottom of the page
    $(".toggleFooter a").click( function() {

      var activateStoreLocations = false;

      // if the store locations link is the one that is clicked, we need to set this variable to true.  It gets passed to the scrollToFooter function, which ultimately highlights the input box.
      if ( $(this).hasClass("footer-mini-storeLocations") ) {
        activateStoreLocations = true;
      }

      // if we are on the homepage, need to load all images before we scroll down
      if ( document.URL.indexOf("urban/index.jsp") > 0 ) {

        // load all images
        $("img").trigger("unveil");

        // not proud of this, but no callback is easily available so this is how its going down
        // scroll to the footer after 500 and 1000 ms to be safe.  Small delay allows images to load.
        var timeoutID1 = window.setTimeout( scrollToFooter, 500, activateStoreLocations);
        var timeoutID2 = window.setTimeout( scrollToFooter, 1000, activateStoreLocations);

      } else {
        // we're not on the homepage, so we can just jump down
        scrollToFooter();
      }

      return false;

    });

    $(window).scroll( function() {

      // figure out if we are scrolling down or up
      var tmp = $(this).scrollTop();

      // fix ie8 bug - can't handle window.scrollTop
      if ( tmp == 0 ) {
        tmp = jQuery( 'html' ).scrollTop();
      }

      if ( tmp > headerFooterVars.scrollTop) {
        // we are scrolling down, there's nothing to do.  reset the value in scrolltop

        headerFooterVars.scrollingUp = false;
        headerFooterVars.outsideBuffer = false;
        headerFooterVars.scrollTop = tmp;

      } else {

        // we're scrolling up.  we need to see if we're outside the buffer
        headerFooterVars.scrollingUp = true;

        if ( (headerFooterVars.scrollTop - tmp) > headerFooterVars.scrollingUpBuffer ) {

          headerFooterVars.outsideBuffer = true;

        }

      }

      // only activate header below the top given region
      if ( tmp > headerFooterVars.expandedRegionHeight ) {

        if ( headerFooterVars.scrollingUp === true && headerFooterVars.outsideBuffer === true ) {

          showLargeHeader();

          // reset scrolltop
          headerFooterVars.scrollTop = tmp;

        } else {
          hideLargeHeader();
        }

        // handle the little X in the footer.  Must be hidden if the user scrolled to the bottom of the page
        $(".footer .close").show();

      } else {

        showLargeHeader();

      }

    });

});  // end window.load

$(function() {

  /******************* JOLLER UPDATED JQUERY  START**************/
  $('#header-search-query').on('keyup change paste click', function() {

    var inCheckout = false;
    var pathname = window.location.pathname;

    // determine if we are on a checkout page
    if ( pathname.indexOf("checkout.jsp") != -1 ) {
      inCheckout = true;
    }

    // disable black background in checkout pages
    if ( inCheckout ) {

      // dont show black background in checkout pages - they have suggestive search disabled
    } else {

      // turn on black background when someone clicks in search box
      $('#header-search').addClass('active-search');
      $('.black_overlay').addClass('active-search-bg');

    }

    if( $( '.has-results' ).length ){

    } else {

      // no instant search results
      $('#instant-search').html('');
      $('#header-search').removeClass('has-results');
      $('.instant-search-view-all').remove();

    }

}).blur( function() {

  setTimeout(function(){

    $('.black_overlay').removeClass('active-search-bg');
    $('#header-search').removeClass('active-search');
    $('#header-search-query').val('');

  }, 250);

});

  //  not sure if this line is necessary; it might be in instantsearch.js
  $('.black_overlay').css('height', + ($(document).height()));
  /************* JOLLER UPDATED JQUERY  END*******************/

  // catch clicks on the magnifying glass; submit search form
  $(".header-search-icon").click(function() {
    $('#header-search-submit').click()
  });

  // catch clicks on the magnifying glass next to search, and focus the searchbox
  $(".header-search-icon").click( function() {
    $("#header-search-query").focus();
    return false;
  });

});

})(jQuery);
// end header

var uiInterface = {

  resetPageHeight : function() {

    headerFooterVars.documentHeight = jQuery(document).height();
    headerFooterVars.windowHeight = jQuery( window ).height();
    headerFooterVars.scrollTop = jQuery( window ).scrollTop();
    headerFooterVars.bottomOfPage = headerFooterVars.documentHeight - headerFooterVars.windowHeight;

    // fix ie8 bug - can't handle window.scrollTop
    if ( headerFooterVars.scrollTop == 0 ) {
      headerFooterVars.scrollTop = jQuery( 'html' ).scrollTop();
    }

  }

}

function socialWindow(e, d, b, c, a) {
    // enable social buttons to load in a new small window
    var w = null;
    l = (screen.width) ? (screen.width - b) / 2 : 0;
    t = (screen.height) ? (screen.height - c) / 2 : 0;
    s = "height=" + c + ",width=" + b + ",top=" + t + ",left=" + l + ",scrollbars=" + a + ",resizable";
    w = window.open(e, d, s);
}

(function ($) {

    var showLanguageSelect = function () {
        $("li.languageSelect").show();
    };

    var hideLanguageSelect = function () {
        $("li.languageSelect").hide();
    };

    var languageSwitch = function (message, language) {
        if (LOCALE != "urban") showLanguageSelect();
        $.ajax("/" + LOCALE + "/utility/log.jsp?message=CHANGE_SITE_LANGUAGE_TO_" + message + "&language=" + language)
            .done(function () {
                if (LOCALE != "urban") hideLanguageSelect();
            });
    };

    $(document).ready(function () {
      if ( typeof utag_data !== "undefined" ) {
        if (utag_data.site_language == "de-DE" && LOCALE != "de") {
            switch (LOCALE) {
            case "uk":
                languageSwitch("ENGLISH", "en-GB");
                break;
            case "fr":
                languageSwitch("FRENCH", "fr-FR");
                break;
            default:
                languageSwitch("AMERICAN_ENGLISH", "en-US");
            }
        } else if (utag_data.site_language == "fr-FR" && LOCALE != "fr") {
            switch (LOCALE) {
            case "uk":
                languageSwitch("ENGLISH", "en-GB");
                break;
            case "de":
                languageSwitch("GERMAN", "de-DE");
                break;
            default:
                languageSwitch("AMERICAN_ENGLISH", "en-US");
            }
        } else if (utag_data.site_language == "en-GB" && LOCALE != "uk") {
            switch (LOCALE) {
            case "fr":
                languageSwitch("FRENCH", "fr-FR");
                break;
            case "de":
                languageSwitch("GERMAN", "de-DE");
                break;
            default:
                languageSwitch("AMERICAN_ENGLISH", "en-US");
            }
        } else if (utag_data.site_language == "en-US" && LOCALE != "urban") {
            switch (LOCALE) {
            case "fr":
                languageSwitch("FRENCH", "fr-FR");
                break;
            case "de":
                languageSwitch("GERMAN", "de-DE");
                break;
            default:
                languageSwitch("ENGLISH", "en-GB");
            }
        }
      }
    });

	var modalSignup = function() {}
	// Declare modalSignup function

	/* Adding Cheetahmail form to signup and firing
	 * a hidden image to send data to Cheetahmail
	*/
	modalSignup.action = {
		options: {
        	eopts: ""
		},
		init: function () {
    		var modal = (getCookieName('closePopup').length > 0 || getCookieName('submitPopup').length > 0) ? true : false;

			if (!modal) {
				modalSignup.action.displayPopup();
			}

			$('.submitForm').on('click', function() {
				modalSignup.action.addGender($(this).data("gender"));
			});

			$('#modalSignup').submit(function (a) {
            	modalSignup.action.options.eopts = a;
				modalSignup.action.modalSubmit(modalSignup.action.options.eopts, this);
			});

			// Close popup on escape key
			$(document).bind('keydown', function(e) {
	        	if (e.which == 27) {
		        	modalSignup.action.closePopup();
				}
			});

			$('.signupPopupClose').on('click', function() {
				modalSignup.action.closePopup();
				return false;
			})
		},
		addGender: function (gender) {
    		// Gender population for guys / girls
			$('input[name=GENDER]').val(gender);
		},
		modalSubmit: function (a, b) {
    		// submit form and trigger data image
			a.preventDefault();
			if (modalSignup.action.checkForm(b)) {
            	createCookie('submitPopup','User-Submitted-The-Popup',365);
				// input variables
				var e = b.email.value,
                	g = b.GENDER.value,
					s = b.SOURCE.value,
					aid = b.aid.value,
					n = b.n.value,
					m = b.a.value,
					c = b.COUNTRY.value;
				// Creating the image
				i = document.createElement('img');
				i.src = "http://ebm.cheetahmail.com/r/regf2?aid=" + aid + "&n=" + n + "&a=" + m + "&email=" + e + "&GENDER=" + g + "&SOURCE=" + s + "&COUNTRY=" + c;
				i.style.display = 'none';
				// If no error, display thank you div
				$(i).bind('error', function (a) {
                	$(b).fadeOut('fast');
					setTimeout(function () {
                    	$(".signupForm .thanks").fadeIn('slow');
						//fadeBackOut();
					}, 500);
					$(".signupHeader").fadeTo(500, .1, function () {
						$(this).addClass('hidden').fadeTo(500, 1)
					});
					// Then close form entirely
					function fadeBackOut() {
                    	setTimeout(function () {
                        	$('.body .signupPopup').fadeOut('slow');
							$('.body .signupPopupOverlay').fadeOut('slow');
						}, 2000);
					}
				});
				$(i).prependTo(document.body);
			} else {
            	// Keeps the rest of the handlers from being executed
				a.stopImmediatePropagation();
			}
		},
		checkForm: function (vfm) {
    		// Validation for the email input
			var v = true,
            	rEx = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-\+])+\.)+([a-zA-Z0-9]{2,4})+$/,
				a = $('.body .signupPopup .invalidEmail').text(),
				cerror = $('.body .signupPopup .invalidCountry').text();
			e = ""
			if (!vfm.email.value || !vfm.email.value.match(rEx)) {
            	v = false;
				e += a;
			}
			if (vfm.COUNTRY.options[vfm.COUNTRY.selectedIndex].value === ""){
            	v = false;
				e += cerror;
			}
			if (!v) {
            	alert(e);
			}
			return v;
		},
		displayPopup: function () {
    		// Display popup if there is no history of popup cookie
            $('.body .signupPopup').css('display', 'block');
            $('.body .signupPopupOverlay').css('display', 'block');
		},
		closePopup: function () {
    		// Function for closing the popup if user selects it
			createCookie('closePopup','User-Closed-The-Popup',30);
			$('.body .signupPopup').fadeOut('slow');
			$('.body .signupPopupOverlay').fadeOut('slow');
		}
	}

	$(document).ready(function() {

		if (LOCALE !== "urban") {

			var cookie = (getCookieName('cookiePolicy').length > 0) ? true : false,
				modal_signup = false;

			if (typeof utag_data !== "undefined") {
				if (utag_data.page_type == "home" || utag_data.page_type == "gateway") {
					modal_signup = true;
				}
			}

			if (modal_signup) {
				modalSignup.action.init();
			}

			if (!cookie) {
				$('.cookiePolicy').fadeIn();
				$('.cookiePolicy a.closeCookie').bind('click', function() {
					createCookie('cookiePolicy','User-Informed-About-Cookie-Policy',1825);
					$('.cookiePolicy').fadeOut();
					return false;
				})
			}
		}

		cheetahquickSignup.init();

	});  // end document.ready

  // load all the fonts!
  WebFont.load({
    google: {
      families: ['Roboto', 'Cardo', 'Pathway+Gothic+One']
    }
  });

})(jQuery);
