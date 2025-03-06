document.addEventListener('DOMContentLoaded', function () {

    // Access the current slug
    var currentSlug = custom_current_slug_vars.currentSlug;
    //console.log("Current Slug: " + currentSlug);
    // Get the home URL
    
    var homeUrl = custom_script_vars.homeUrl;
    // Use the home URL as needed
    console.log("Home URL: " + homeUrl);
    
      // Declare utmSource globally
      var utmSource = getParameterByName('utm_source');
      window.addEventListener('beforeunload', function () {
        document.cookie = "utmSource=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
      if (utmSource) {
        setCookie('utm_source', utmSource);
        //setCookie('utm_term', slug);
      }
    
     
     
      // Function to get URL parameter by name
      function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
      }
    
      // Function to set a cookie
      function setCookie(name, value, days) {
        var expires = '';
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
         // expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value +  '; path=/';
      }
    
      // Function to get a cookie value
      function getCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      }
     
     // Get the elements with the class name "wpcf7-hidden"
     var hiddenInputs = document.getElementsByClassName('wpcf7-hidden');
     if (hiddenInputs.length > 0 || utmSource) {
       var getSourceValue = getCookie('utm_source', utmSource);
       console.log("UTM source: " + getSourceValue);
         hiddenInputs[0].value = encodeURIComponent(getSourceValue);
     } else {
       hiddenInputs[0].value = 'wp';
     }
      // Handle form submission event
      document.addEventListener('wpcf7mailsent', function (event) {
        // Get the value of the 'service' field
        var attrs = $('#service').val();
        var exampleCookieValue = getCookie('utm_source', utmSource);
        console.log(exampleCookieValue);
        
        // Access utmSource globally
        if (exampleCookieValue) {
          // Convert 'attrs' to a slug
        function convertToSlugUsingRegex(title) {
          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
          return slug.replace(/^-+|-+$/g, '');
        }
    
        const slug = convertToSlugUsingRegex(attrs);
    
          // Set your default redirect links
          var firstLink = homeUrl + '/thank-you';
          var secondLink = homeUrl + '/thank-you';
    
          // Set the utm_source and utm_term in the URL
          location.href = firstLink + '?utm_source=' + encodeURIComponent(exampleCookieValue) + '&utm_term=' + encodeURI(slug);
            // Delete the cookie after setting the URL
           
        } else if(!exampleCookieValue) {
          // Handle the case when utmSource is not present
          console.log('utm_source is not present, redirecting to another page');
          
          // Redirect to another page when utm_source is not present
          window.location.href = homeUrl + '/thank-you';
      }
      });
      window.addEventListener('beforeunload', function () {
        // Specify the cookies you want to delete
        var cookiesToDelete = ['utm_source', 'utm_term'];
    
        // Loop through the cookies and delete each one
        cookiesToDelete.forEach(function (utmSource) {
            document.cookie = utmSource + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        });
    });
    
    
     
    });
      
    
    