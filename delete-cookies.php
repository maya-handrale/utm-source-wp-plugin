<?php
// Specify the cookies you want to delete
$cookiesToDelete = array('utm_source', 'utm_term');

// Loop through the cookies and delete each one
foreach ($cookiesToDelete as $cookieName) {
    setcookie($cookieName, '', time() - 3600, '/'); // Set expiration time in the past to delete the cookie
}

// Output a response
echo 'Cookies deleted successfully';
?>
