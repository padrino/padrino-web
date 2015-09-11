(function() {
  var toggler = document.getElementById('navigation__toggler');
  toggler.addEventListener('click', toggleNavigation);
})();

function toggleNavigation() {
  var navigation__items = document.getElementById('navigation__items');
  var isActive = navigation__items.className.match(/--is-active$/);

  if (isActive) {
    navigation__items.className = 'navigation__items';
  } else {
    navigation__items.className = 'navigation__items navigation__items--is-active';
  }
}
