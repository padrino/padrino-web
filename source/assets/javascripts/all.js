export default function activateNavigationToggler() {
  var toggler = document.getElementById('navigation__toggler');
  toggler.addEventListener('click', toggleNavigation);
}

function toggleNavigation() {
  var navigation__items = document.getElementById('navigation__items');
  var isActive = navigation__items.className.match(/--is-active$/);

  if (isActive) {
    navigation__items.className = 'navigation__items';
  } else {
    navigation__items.className = 'navigation__items navigation__items--is-active';
  }
}

export default function activateGoogleAnalytics() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-72258621-1', 'auto');
    ga('send', 'pageview');
}

document.addEventListener('DOMContentLoaded', function() {
  activateNavigationToggler();
  activateGoogleAnalytics();
});
