//your code goes heree
$( document ).ready(function() {
  //create global variables that will be used to update cart prices
  subtotal = 0;
  total = 0;
  taxes = 0;
  tax = 0.13;

  $(".latest-toppings .toppings-list__item").on("click", function(){
    //add classes to indicate item has been added to cart
    $(this).closest("li").addClass("in-cart");
    $(this).closest("li").find(".fa-shopping-cart").addClass("discard");
    //extract data that new elements in the cart and glance sections will need
    var title = $(this).find("h3").text();
    var imgClass = $(this).find("img").attr("class").split(" ")[0];
    var imgSrc = $(this).find("img").attr("src");
    var price = $(this).find(".toppings-list__item-price").text();

    //create cart wrapper elements, add classes/text/css and use extracted data from variables above when necessary
    var cartListItem = $(document.createElement("li")).addClass("cart-list__item cf");
    var counterWrap = $(document.createElement("div")).addClass("cart-list__item-counter");
    //create cart counter elements, add classes/text/css and use extracted data from variables above when necessary
    var plus = $(document.createElement("span")).addClass("fa fa-plus");
    var counter = $(document.createElement("span")).addClass("cart-list__item-counter-quantity").text("1");
    var minus = $(document.createElement("span")).addClass("fa fa-minus");
    //create cart item elements, add classes/text/css and use extracted data from variables above when necessary
    var cartImg = $(document.createElement("img")).addClass(imgClass+" cart-list__item-image").attr("src",imgSrc);
    var cartTitle = $(document.createElement("span")).addClass("cart-list__item-name").text(title);
    var cartPrice = $(document.createElement("span")).addClass("cart-list__item-price").text(price);
    var basePrice = $(document.createElement("span")).addClass("base-price").text(price).css("display","none");
    //create cart discard button element, add classes/text/css and use extracted data from variables above when necessary
    var cartDiscard = $(document.createElement("span")).addClass("cart-list__item-discard discard-from-cart fa fa-lg fa-trash");
    //create pie at a glance elements, add classes/text/css and use extracted data from variables above when necessary
    var pieListItem = $(document.createElement("li")).addClass("toppings-list__item");
    var pieImg = $(document.createElement("img")).addClass(imgClass+" toppings-list__item-image").attr("src",imgSrc);

    //create if statement that returns if item already exists in glance section
    if($("div.box.pizza").find("."+imgClass).length>0){
      return;
    }

    //append counter elements to counter wrapper
    counterWrap.append(plus).append(counter).append(minus);
    //append counter, cart item and discard button elements to cart li element
    cartListItem.append(counterWrap).append(cartImg).append(cartTitle).append(cartPrice).append(basePrice).append(cartDiscard);
    //append image element to pie li element
    pieListItem.append(pieImg);
    //prepend entire cart li element to cart ul
    $(".cart-list").prepend(cartListItem);
    //prepend entire pie li element to pie ul
    $(".pizza .toppings-list").prepend(pieListItem);

    //update subtotal with extracted price
    subtotal = subtotal + parseFloat(price.split(" ")[1]);
    //update taxes by multiplying global variable tax with updated subtotal
    taxes = parseFloat(tax*subtotal);
    //call on function which is defined at the end of script
    updateTotal(subtotal, taxes);
  });

  //create on click function to increase counter
  $(".cart-list").on("click", ".fa.fa-plus", function(){
    //get current counter value
    var counter = $(this).next().text();
    //increase counter by 1
    counter++;
    //add increased value to next element
    $(this).next().text(counter);

    //get base price value and convert to number
    var getPrice = parseFloat($(this).closest("div").parent().find(".base-price").text().replace("$ ",""))
    //calculate final price using base price and counter
    var finalPrice = (getPrice*counter)
    //add final price to cart
    $(this).closest("div").parent().find(".cart-list__item-price").text("$ "+(finalPrice).toFixed(2));

    //update subtotal and taxes for when counter increases
    subtotal = subtotal + getPrice;
    taxes = subtotal*tax;
    //call on function which is defined at the end of script
    updateTotal(subtotal, taxes);
  });

  //create on click function to decrease counter
  $(".cart-list").on("click", ".fa.fa-minus", function(){
    //get current counter value
    var counter = $(this).prev().text();
    //if counter is 1, return the same value
    if (counter==1)
      return;
    //else if decrease counter by 1
    counter--;
    //add decreased value to previous element
    $(this).prev().text(counter);

    //get base price value and convert to number
    var getPrice = parseFloat($(this).closest("div").parent().find(".base-price").text().replace("$ ",""))
    //calculate final price using base price and counter
    var finalPrice = (getPrice*counter)
    //add final price to cart
    $(this).closest("div").parent().find(".cart-list__item-price").text("$ "+(finalPrice).toFixed(2));

    //update subtotal and taxes for when counter decreases
    subtotal = subtotal - getPrice;
    taxes = subtotal*tax;
    //call on function which is defined at the end of script
    updateTotal(subtotal, taxes);
  });

  //create on click function to remove cart item
  $(".cart-list").on("click", ".cart-list__item-discard.discard-from-cart.fa.fa-lg.fa-trash", function(){
    $(this).parent().remove();
    var pie = $(this).parent().find("img").attr("class").split(" ")[0];
    $("div.box.pizza").find("."+ pie + ".toppings-list__item-image").remove();
    var getPrice = parseFloat($(this).parent().find(".cart-list__item-price").text().split(" ")[1]);

    //update subtotal and taxes for when item is removed
    subtotal = subtotal - getPrice;
    taxes = subtotal*tax;
    //call on function which is defined at the end of script
    updateTotal(subtotal, taxes);
  });

  $(".categories-list").on("click", ".categories-list__item", function(){
    $(this).addClass("active");
    var selectedFilter = $(this).find("span").attr("class").split("-")[1];
    $("."+selectedFilter).find("a").css({
      "transition":"0.5s",
      "border":"10px solid #000"
    });
  });

  $(".categories-list").on("click", "button", function(){
    $(this).parent().removeClass("active");
  })

  //create function that fades fades checkout button in and out
  function checkout() {
    $(".button").fadeTo("slow",.5).delay(500).fadeTo("slow",1)
  };
  //make function run every 10s
  var myCheckout = setInterval(function(){checkout()}, 10000);

  //function called on throughout script tp update prices
  function updateTotal(subtotal, taxes){
    $(".cart-list__subtotal-number").text("$ "+ subtotal.toFixed(2));
    $(".cart-list__tax-rate-number").text("$ "+ taxes.toFixed(2));
    $(".cart-list__total-number").text("$ "+ (subtotal+taxes).toFixed(2));
  }
});
