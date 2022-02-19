<?php
include '../config/config.php';
include '../config/middleware.php';

/**
 * COMPARES USERNAME AND PASSWORD AND SETS SESSION FOR LOGGED IN USER
 * ::endpoint ==> api/users/login.php
 * 
 * @param username
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
$username = clean_string( strtolower( $_GET["username"] ) );
$not_hashed_password = clean_string( $_GET["password"] );
$valid = true;
$errors= [];

//VALIDATE DATA
//username not too long / short / has weird characters
if(!preg_match('/^[a-zA-Z0-9_]+$/', $username )){
    $valid = false;
    $errors['username'] = 'Can only contain letters, numbers, and underscores.';
}
if( strlen($username) > 30 || strlen( $username ) < 3){
    $valid = false;
    $errors['username'] = 'Username must be between 3 & 30 characters.';
} 
//password not too short
if( strlen( $not_hashed_password ) < 8){
    $valid = false;
    $errors['password'] = 'Password must be at least 8 characters.';
}

//IF ANYTHING IS NOT VALID RESPOND 500 AND SEND ERRORS AS JSON
if(!$valid){
      http_response_code(500);
      // show users data in json format
      echo json_encode(array('errors' => $errors));
      exit;
}

// query users
$stmt = $users->login($username);
$num = $stmt->rowCount(); 
// check if more than 0 record found
if($num>0){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
     // extract row this will make $row['name'] to just $name only
        extract($row);
        
        //create user array for JSON
        $user=array(
            "user_id" => $user_id,
            "email" => $email,
            "username" => $username,
            "password" => $password,
            "profile_pic" => $profile_pic,
            "bio" => html_entity_decode($bio),
            "join_date" => $join_date,
            "last_login" => $last_login,
            "is_admin" => $is_admin,
        );
        
    }
     //check if passwords match
     $do_match = password_verify( $not_hashed_password, $user['password']);
    if( $do_match ){
        
        //update last login time
        $stmt = $users->update_login_date($user['user_id']);
        $num = $stmt->rowCount(); 
       
        //send response
        http_response_code(200);
        echo json_encode($user);
    }
} else{

    http_response_code(404);
    // return error if not found
    echo json_encode(
        array("error" => "Sorry, that username and/or password are incorrect.")
    );
}
