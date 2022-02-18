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
//username too long / short
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
//password too short
if( strlen( $password ) < 8){
    $valid = false;
    $errors['password'] = 'Password must be at least 8 characters.';
}
//email validate
if(! filter_var($email, FILTER_VALIDATE_EMAIL)){
    $valid = false;
    $errors['email'] = 'Please use a valid email';
} else {
    //email is unique
    $stmt = $users->check_email($email);
    $num = $stmt->rowCount();
    if($num > 0){
        $valid = false;
        $errors['email'] = 'That email is already in use.';
    }
}

if(!$valid){
      // set response code
      http_response_code(500);
      // show users data in json format
      echo json_encode(array('errors' => $errors));
      exit;
}




// query users
$stmt = $users->read($id);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
  
    // define users array
    $users_arr=array();
  
    // retrieve table contents
    // fetch() is faster than fetchAll() @http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // extract row this will make $row['name'] to just $name only
        extract($row);
  
        //create array to convert to JSON
        $users_arr=array(
            "user_id" => $user_id,
            "email" => $email,
            "username" => $username,
            "password" => $password,
            "profile_pic" => $profile_pic,
            "bio" => html_entity_decode($bio),
            "is_admin" => $is_admin,
            "join_date" => $join_date,
        );
    }
  
    // set response code
    http_response_code(200);
  
    // show users data in json format
    echo json_encode($users_arr);
} else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // return error if not found
    echo json_encode(
        array("error" => "Sorry, that user doesn't exist.")
    );
}
