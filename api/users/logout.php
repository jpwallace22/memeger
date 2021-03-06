<?php
include '../config/config.php';


//TODO remove access token from db

//invalidate all cookies and session vars
setcookie('access_token', 0, time() - 9999);
setcookie('user_id', 0, time() - 9999);

// @ https://www.php.net/manual/en/function.session-destroy.php

// Unset all of the session variables.
$_SESSION = array();

// If it's desired to kill the session, also delete the session cookie.
// Note: This will destroy the session, and not just the session data!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finally, destroy the session.
session_destroy();

http_response_code(201);
echo json_encode(["success" => "Success!"]);