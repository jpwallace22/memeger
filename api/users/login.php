<?php
include '../config/config.php';
include '../config/middleware.php';

/**
 * COMPARES USERNAME AND PASSWORD 
 * AND RETURNS JSON OF ALL USER DATA
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
  
//extract JSON data
$json = file_get_contents('php://input');
$data = json_decode($json);

//SANITIZE DATA
$username = clean_string( strtolower( $data->username ) );
$not_hashed_password = clean_string( $data->password );
$valid = true;
$errors= [];

//VALIDATE DATA
//username not too long / short / has weird characters
if(!preg_match('/^[a-zA-Z0-9_]+$/', $username )){
    $valid = false;
    $errors['username'] = 'Username or password are incorrect';
}
if( strlen($username) > 30 || strlen( $username ) < 3){
    $valid = false;
    $errors['username'] = 'Username or password are incorrect';
} 
//password not too short
if( strlen( $not_hashed_password ) < 8){
    $valid = false;
    $errors['password'] = 'Username or password are incorrect';
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
            "profile_pic" => $profile_pic,
            "bio" => html_entity_decode($bio),
            "join_date" => $join_date,
            "last_login" => $last_login,
            "is_admin" => $is_admin,
        );
        //check if passwords match
        $do_match = password_verify( $not_hashed_password, $password);
    }
    if( $do_match ){
        
        //create access token and set session
        $access_token = bin2hex( random_bytes( 30 ) );
        
        setcookie( 'access_token', $access_token, time() + 60 * 60 * 24 * 7);
        $_SESSION["access_token"] = $access_token;
        
        setcookie( 'user_id', $user['user_id'], time() + 60 * 60 * 24 * 7);
        $_SESSION["user_id"] = $user['user_id'];
        
        //update last login time and token
        $stmt = $users->update_login($user['user_id'], $access_token);
        
        //send response
        http_response_code(200);
        echo json_encode($user);
    } else {
        http_response_code(500);
        
      // show users data in json format
      $errors['incorrect'] = 'Username or password are incorrect.';
      echo json_encode(array('errors' => $errors));
    }
} else{

    http_response_code(500);
      // show users data in json format
      $errors['incorrect'] = 'Username or password are incorrect.';
      echo json_encode(array('errors' => $errors));
}
