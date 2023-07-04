'use strict'

document.getElementById('burger').onclick = function () {
  document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
  item.onclick = () => {
    document.getElementById('menu').classList.remove('open');
  }
})

let phone = $('#phone');


$(phone).inputmask({"mask": "+375 (99) 999-99-99"});


$('#order-button').on('click', function (e) {
  let choiceInput = $('#choice-input');
  let nameInput = $('#name-input');
  let orderFrom = $('#order-content');
  let orderAnswer = $('#order-answer');
  let orderInput = $('.order-input');

  let hasError = false;

  $('.text-error').hide();


  if (!choiceInput.val()) {
    choiceInput.css('border-color', 'red');
    choiceInput.next().show();
    hasError = true;
  } else {
    choiceInput.css('border-color', '#821328FF');
  }
  if (!nameInput.val()) {
    orderInput.css('border-color', 'red');
    nameInput.next().show();
    hasError = true;
  }
  if (!phone.val()) {
    orderInput.css('border-color', 'red');
    phone.next().show();
    hasError = true;
  }

  let loader = $('.loader');

  if (!hasError) {
    loader.css('display', 'flex');
    $.ajax({
      method: "POST",
      url: "https://testologia.site/checkout",
      data: {name: nameInput.val(), product: choiceInput.val(), phone: phone.val()}
    })
      .done(function (msg) {
        loader.hide();
        if (msg.success === 1) {
          orderFrom.css('display', 'none');
          orderAnswer.css('display', 'flex');
        } else {
          alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
        }
      });
  }
  e.preventDefault();
})


