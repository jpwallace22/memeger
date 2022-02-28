<?php
include '../config/config.php';
include '../config/middleware.php';

/**
 * ADDS NEW COMMENT TO DB
 * ::endpoint ==> api/comments/add.php
 * 
 * @param json post_id - int
 * @param json user_id - int
 * @param json body - string
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/comments.php';
include_once '../objects/posts.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$comments = new Comments($db);
$posts = new Posts($db);
  
//extract JSON data
$json = file_get_contents('php://input');
$data = json_decode($json);

//SANITIZE DATA
$body = clean_string( $data->comment );
$post_id = clean_int( $data->postId );
$user_id = clean_int( $data->userId);
$valid = true;

//VALIDATE DATA
//user is currently logged in

if(!check_login()){
    $valid = false;
    $errors['invalid'] = 'Oof, yeah, you gotta be logged in to comment';
}
if( strlen($body) > 500 ){
    $valid = false;
    $errors['body'] = 'Comments must be shorter than 500 characters';
} 
//if valid is still true, check if post_id is in db
if($valid){
    $stmt = $posts->get_single_post($post_id);
    $num = $stmt->rowCount();
    if(!$num>0){
        $valid = false;
        $errors['post'] = "That post doesn't exist anymore";
    }
}

//IF ANYTHING IS NOT VALID RESPOND 500 AND SEND ERRORS AS JSON
if(!$valid){
      http_response_code(500);
      // show users data in json format
      echo json_encode(['errors' => $errors]);
      exit;
}

// query comments
$stmt = $comments->add_comment($post_id, $user_id, $body);
$num = $stmt->rowCount();
if($num>0){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // extract row this will make $row['name'] to just $name only
        extract($row);
  
        //create array to convert to JSON
        $comment=array(
            "comment_id" => $comment_id,
            "user_id" => $user_id,
            "post_id" => $post_id,
            "username" => $username,
            "profile_pic" => $profile_pic,
            "parent_id" => $parent_id,
            "body" => $body,
            "date" => $date,
            "is_approved" => $is_approved,
        );
    }
    http_response_code(201);

    echo json_encode($comment);

} else{

    http_response_code(500);
      // show users data in json format
      $errors['incorrect'] = 'Something went wrong... Maybe your comment posted?';
      echo json_encode(
          array('errors' => $errors)
      );
}