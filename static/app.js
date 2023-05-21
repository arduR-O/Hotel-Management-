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
    url: 'static/static/menu.json',
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
    window.location.href = 'payment.html'; // Redirect to payment.html
  });

  $('#payment-form').on('submit', function(e) {
    e.preventDefault();
    const name = $('#name').val().trim();
    const cardNumber = $('#card-number').val().trim();
    const expiration = $('#expiration').val().trim();
    const cvv = $('#cvv').val().trim();

    $('#payment-container').html('<h2>Payment Successful!</h2>');
  });

  function displayMenu(menu) {
    const menuContainer = $('#menu-container');
    menuContainer.empty();
  
    menu.forEach(item => {
      const menuItem = $('<div class="row menu-item">'); // Added 'row' class to the menu item container
  
      const imageColumn = $('<div class="col-md-3">'); // Created a column for the image
      const imageSrc = 'static/images/' + item.image; // Updated the image source path
      imageColumn.append(`<img src="${imageSrc}" alt="${item.name}" class="menu-item-image">`);
      menuItem.append(imageColumn);
  
      const detailsColumn = $('<div class="col-md-9">'); // Created a column for the item details
      detailsColumn.append(`<h3>${item.name}</h3>`);
      detailsColumn.append(`<p>${item.description}</p>`);
      detailsColumn.append(`<p>Price: $${item.price}</p>`);
      detailsColumn.append(`<button class="add-to-cart" data-item="${item.name}">Add to Cart</button>`);
      menuItem.append(detailsColumn);
  
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
