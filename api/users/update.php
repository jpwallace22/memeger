<?php
include_once '../config/config.php';
include_once '../config/middleware.php';

/**
 * FETCHES ALL USER PROFILE INFO BY USERNAME
 * ::endpoint ==> api/users/update.php
 * 
 *@param JSON
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/users.php';

//extract JSON data
$json = file_get_contents('php://input');
$data = json_decode($json);

//SANITIZE DATA
$new_username = clean_string( strtolower( $data->username ) );
$new_bio = clean_string( $data->bio );
$new_profile_pic = clean_string( $data->profile_pic );
$user_id = clean_int( $data->user_id );
$errors = [];

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$users = new Users($db);

//get profile information
$stmt = $users->userInfo($user_id);
// debug_statement($stmt);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
  
        //create array to convert to JSON
        $user=array(
            "email" => $email,
            "username" => $username,
            "profile_pic" => $profile_pic,
            "bio" => html_entity_decode($bio),
        );
    }

    $valid = true;

    if($new_username != $user['username']){
        if( strlen($new_username) > 30 || strlen( $new_username ) < 3){
            $valid = false;
            $errors['username'] = 'Username must be between 3 & 30 characters.';
        } else {
            $stmt = $users->check_username($new_username);
            $num = $stmt->rowCount();
            if($num > 0){
                $valid = false;
                $errors['username'] = 'Bummer. That username is taken.';
            }
        }
    }
    // echo $new_username, $user["username"], $valid;
    if(! $valid){
        http_response_code(500);
        echo json_encode(['errors' => $errors]);
        exit();
       
    }

    //get profile posts information
    $stmt = $users->update_info($user_id, $new_username, $new_profile_pic, $new_bio );
    
    // debug_statement($stmt);
    $num = $stmt->rowCount();
    if($num>0){
    
        http_response_code(201);
        echo json_encode('success');

    } else {

        http_response_code(200);
        echo json_encode('no changes');

    }
} else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // return error if not found
    echo json_encode(
        array("error" => "Incorrect User")
    );
}
