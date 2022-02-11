<?php
include '../config/config.php';

/**
 * FETCHES THE USER BY ID
 * 
 * ==> endpoint api/users/user.php?user_id=@param 
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
  
// query users
$id = $_GET["user_id"];
$stmt = $users->read($id);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
  
    // users array
    $users_arr=array();
    $users_arr["user"]=array();
  
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // extract row this will make $row['name'] to just $name only
        extract($row);
  
        $user_item=array(
            "user_id" => $user_id,
            "email" => $email,
            "username" => $username,
            "password" => $password,
            "profile_pic" => $profile_pic,
            "bio" => html_entity_decode($bio),
            "is_admin" => $is_admin,
            "join_date" => $join_date,
        );
  
        array_push($users_arr["user"], $user_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show users data in json format
    echo json_encode($users_arr);
} else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no products found
    echo json_encode(
        array("error" => "No products found.")
    );
}
