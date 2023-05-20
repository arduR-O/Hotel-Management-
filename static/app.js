$(document).ready(function() {
    $('#menu-container').hide();
    $('#cart-container').hide();
    $('#payment-container').hide();
  
    $('#name-submit').on('click', function(e) {
      e.preventDefault();
  
      const name = $('#name-input').val().trim();
      if (name !== '') {
        $('#name-form').hide();
        $('#menu-container').show();
        $('#cart-container').show();
        $('#menu-container').prepend('<h2>Welcome, ' + name + '!</h2>');
      }
    });
  
    $.ajax({
      url: 'menu.json',
      dataType: 'json',
      success: function(data) {
        displayMenu(data);
      },
      error: function() {
        console.error('Error fetching menu data.');
      }
    });
  
    $(document).on('click', '.add-to-cart', function() {
      const item = $(this).data('item');
      addToCart(item);
    });
  
    $('#clear-cart').on('click', function() {
      clearCart();
    });
  
    $('#checkout').on('click', function() {
      $('#cart-container').hide();
      $('#payment-container').show();
    });
  
    $('#payment-form').on('submit', function(e) {
      e.preventDefault();
      const name = $('#name').val().trim();
      const cardNumber = $('#card-number').val().trim();
      const expiration = $('#expiration').val().trim();
      const cvv = $('#cvv').val().trim();
  
      // Perform payment processing here
      // You can add your logic for handling the payment, such as connecting to a payment gateway or backend server
  
      // After successful payment processing, show the payment confirmation
      $('#payment-container').html('<h2>Payment Successful!</h2>');
    });
  
    function displayMenu(menu) {
      const menuContainer = $('#menu-container');
      menuContainer.empty();
  
      menu.forEach(item => {
        const menuItem = $('<div class="menu-item">');
        menuItem.append(`<h3>${item.name}</h3>`);
        menuItem.append(`<p>${item.description}</p>`);
        menuItem.append(`<p>Price: $${item.price}</p>`);
        menuItem.append(`<button class="add-to-cart" data-item="${item.name}">Add to Cart</button>`);
  
        menuContainer.append(menuItem);
      });
    }
  
    function addToCart(item) {
      const cartItems = $('#cart-items');
      const listItem = $('<li>').text(item);
  
      cartItems.append(listItem);
    }
  
    function clearCart() {
      const cartItems = $('#cart-items');
      cartItems.empty();
    }
  });
  