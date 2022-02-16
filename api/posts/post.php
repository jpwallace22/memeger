<?php
include '../config/config.php';

/**
 * FETCHES SINGLE POST BY ID
 * :: endpoint ==> api/posts/post.php?post_id=@param
 * 
 *@param integer
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/posts.php';
  
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$posts = new Posts($db);
  
// query posts
$id = filter_var(strip_tags(trim($_GET["post_id"])), FILTER_SANITIZE_NUMBER_INT) ;
$stmt = $posts->get_single_post($id);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
  
    // retrieve table contents
    // fetch() is faster than fetchAll() @http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // extract row this will make $row['name'] to just $name only
        extract($row);
  
        //create array to convert to JSON
        $post_item=array(
            "post_id" => $post_id,
            "title" => html_entity_decode($title),
            "image" => $image,
            "body" => html_entity_decode($body),
            "votes" => $votes,
            "views" => $views,
            "date" => $date,
            "user_id" => $user_id,
            "username" => $username,
            "profile_pic" => $profile_pic,
            "comments_count" => $comments_count,
            "allow_comments" => $allow_comments,
            "is_published" => $is_published,
            "is_winner" => $is_winner,
        );
        array_push($post_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show users data in json format
    echo json_encode($post_item);
} else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // return error if not found
    echo json_encode(
        array("error" => "Uh Oh, we seam to have lost this post.. ")
    );
}
