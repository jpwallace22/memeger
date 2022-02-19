<?php
include '../config/config.php';
include '../config/middleware.php';

/**
 * ADDS NEW USER TO THE DB
 * ::endpoint ==> api/users/register.php?username=@param&email=@param&password=@param
 * 
 * @param username
 * @param email
 * @param password
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/users.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$users = new Users($db);
  
//SANITIZE DATA
$username = clean_string($_GET["username"]);
$email = clean_email($_GET["email"]);
$password = clean_string($_GET["password"]);
$valid = true;
$errors= [];

//VALIDATE DATA
//username not too long / short
if( strlen($username) > 30 || strlen( $username ) < 3){
    $valid = false;
    $errors['username'] = 'Username must be between 3 & 30 characters.';
} else {
    //username is unique
    $stmt = $users->check_username($username);
    $num = $stmt->rowCount();
    if($num > 0){
        $valid = false;
        $errors['username'] = 'Bummer. That username is taken.';
    }
}
//password not too short
if( strlen( $password ) < 8){
    $valid = false;
    $errors['password'] = 'Password must be at least 8 characters.';
}
//email validate
if(! filter_var($email, FILTER_VALIDATE_EMAIL)){
    $valid = false;
    $errors['email'] = 'Please use a valid email';
} else {
    //check email is unique
    $stmt = $users->check_email($email);
    $num = $stmt->rowCount();
    if($num > 0){
        $valid = false;
        $errors['email'] = 'That email is already in use.';
    }
}

//IF ANYTHING IS NOT VALID RESPOND 500 AND SEND ERRORS AS JSON
if(!$valid){
      http_response_code(500);
      // show users data in json format
      echo json_encode(array('errors' => $errors));
      exit;
}

require '../config/randomAvatarsGenerator.php';
// Instantiate randomAvatarsGenerator.
$avatar = new randomAvatarsGenerator(); 
// Generate a random preset.
$avatar->generate(); 
// Draw the image corresponding to the preset.
$avatar->draw();
// Save the image in the folder with the name 'avatar.png'.
$avatar->saveImage('../../frontend/src/assets/images/avatars', "$username.png");
//image filepath for query
$image = "/frontend/src/assets/images/avatars/$username.png";

//hash password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// query users
$stmt = $users->register($email, $username, $hashed_password, $image);
$num = $stmt->rowCount(); 
// check if more than 0 record found
if($num>0){

    http_response_code(201);
    echo json_encode(["success" => "Success!"]);

} else{

    http_response_code(404);
    // return error if not found
    echo json_encode(
        array("error" => "Woah, we had a strange error. Try again later.")
    );
}
