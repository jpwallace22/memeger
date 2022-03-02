<?php
include '../config/config.php';
include '../config/middleware.php';

/**
 * ^^POST^^ CHECKS IF VOTED
 * ^^PUT^^ ADDS OR REMOVED A VOTE
 * :: endpoint ==> /api/posts/vote.php 
 * 
 *@param JSON
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/posts.php';

$json = file_get_contents('php://input');
$data = json_decode($json);

//SANITIZE DATA
$post_id = clean_int( $data->post_id );
$user_id = clean_int( $data->user_id);

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
      
 // initialize object
$posts = new Posts($db);
      
if($_SERVER['REQUEST_METHOD'] === 'PUT'){
    if (! check_login($user_id)){
        echo json_encode('Not logged in');
        exit;
    }
    // query posts
    $stmt = $posts->vote($post_id, $user_id);
    // echo debug_statement($stmt);
    $num = $stmt->rowCount();
    if($num>0){
        http_response_code(200);
        echo json_encode("voted");
    } else{
        http_response_code(404);
        echo json_encode(
            array("error" => "Something failed")
        );
    }
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $stmt = $posts->check_vote($post_id, $user_id);
    // echo debug_statement($stmt);
    $num = $stmt->rowCount();
    if($num>0){
        echo true;
    } else {
        echo false;
    }
    }
