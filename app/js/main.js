$(document).ready(controlDropup);

$(document).ready(controlModal);

function controlDropup() {
    var dropup = false;
    var activeDropup = {};
    var unitPrice = "руб";
    var unitWeight = "кг";
    // Определяет начало редактирование цены
    $(".product__price-block").on("click", initChange);

    // Определяет активный пункт
    $(".price-product__item").on("click", selectPoint);

    function initChange() {
        dropup = true;
        activeDropup = $(this);
    }

    function selectPoint() {
        if(dropup){
            var price;
            var weight;
            var stringPrice = '';
            var stringWeight = '';

            activeDropup.find(".price-product__item.active-product").removeClass('active-product');
            $(this).addClass("active-product");

            price = $(this).data('price');
            weight = $(this).data('weight');
            stringPrice =  price + " " + unitPrice;
            stringWeight = weight + " " + unitWeight;

            activeDropup.find(".product__price").html(stringPrice);
            activeDropup.find(".product__price").data("price", price);
            activeDropup.find(".change-weight").html(stringWeight);
            activeDropup.find(".change-weight").data("weight", weight);
            activeDropup = {};
            dropup =false;
        }
    }
}

function controlModal() {
    var changeProduct = {};
    var contentBasket = {};
    var oldQuantity;
    var newQuantity;
    var totalPrice;
    var basketWeightBlock = $(".basket__weight");
    var totalPriceBlock = $(".total-price");


    //Изменение контента модального окна
    $(".product__buttons-basket").on("click", bildModal);

    //Добавление количества шт продукта
    $(".basket__weight-add").on("click", addQuantityProduct);

    //Уменьшение количества шт продукта
    $(".basket__weight-minus").on("click", minusQuantityProduct);


    function calcPrice() {
        basketWeightBlock.data("guantity", newQuantity);
        basketWeightBlock.html(newQuantity);
        totalPrice = newQuantity*contentBasket.price;
        totalPriceBlock.html(totalPrice);
        totalPriceBlock.data("total-price" , totalPrice);
    };


    function bildModal() {
        //Получение значений
        changeProduct = $(this).parents(".product");
        contentBasket.name =        changeProduct.find(".product__name-link").html();
        contentBasket.description = changeProduct.find(".product__description").html();
        contentBasket.url =         changeProduct.find(".product__img").attr("src");
        contentBasket.price =       changeProduct.find(".product__price").data("price");
        contentBasket.weight =      changeProduct.find(".change-weight").data("weight");

        //Изменение контента
        $(".basket__title").html(contentBasket.name);
        $(".basket__description").html(contentBasket.description + " " + contentBasket.weight + " кг");
        $(".basket__img").attr("src", contentBasket.url);
        $(".basket__price").html(contentBasket.price + " " + "руб");
        basketWeightBlock.data("guantity", 1);
        basketWeightBlock.html("1");
        $(".total-price").html(contentBasket.price);
    };


    function addQuantityProduct(){
        oldQuantity = basketWeightBlock.data("guantity");

        if(oldQuantity<10){
            newQuantity = oldQuantity + 1;
            calcPrice();
        }
        oldQuantity =0;
        newQuantity =0;
        totalPrice  =0;
    };

    function minusQuantityProduct(){
        oldQuantity = basketWeightBlock.data("guantity");

        if(oldQuantity>1){
            newQuantity = oldQuantity - 1;
            calcPrice();
        }
        oldQuantity =0;
        newQuantity =0;
        totalPrice  =0;
    };
}