<?php
include_once '../config/config.php';
include_once '../config/middleware.php';

/**
 * FETCHES ALL USER PROFILE INFO BY USERNAME
 * ::endpoint ==> api/users/user.php
 * 
 *@param JSON
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/users.php';
include_once '../objects/posts.php';

//extract JSON data
$json = file_get_contents('php://input');
$data = json_decode($json);

//SANITIZE DATA
$username = clean_string( strtolower( $data->username ) );
  
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$users = new Users($db);
$posts = new Posts($db);  

//get profile information
$stmt = $users->profile_page_info($username);
// debug_statement($stmt);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
  
    // retrieve table contents
    // fetch() is faster than fetchAll() @http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // extract row this will make $row['name'] to just $name only
        extract($row);
  
        //create array to convert to JSON
        $user=array(
            "user_id" => $user_id,
            "email" => $email,
            "username" => $username,
            "profile_pic" => $profile_pic,
            "bio" => html_entity_decode($bio),
            "join_date" => $join_date,
            "last_login" => $last_login,
            "is_admin" => $is_admin,
            "win_count" => $win_count,
            "fav_count" => $fav_count,
        );
    }

    //get profile posts information
    $stmt = $posts->get_posts_by_user($user_id);
    $num = $stmt->rowCount();
    if($num>0){
        $post_arr = [];
        // retrieve table contents
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $post = [
                'post_id' => $post_id,
                'title' => $title,
                'image' => $image,
                'body' => $body,
                'views' => $views,
                'votes' => $votes,
                'date' => $date,
                'user_id' => $user_id,
                'allow_comments' => $allow_comments,
                'is_published' => $is_published,
                'is_winner' => $is_winner,
                'comments_count' => $comments_count,
                'username' => $username,
                'profile_pic' => $profile_pic,
                'votes' => $votes
            ];
            array_push($post_arr, $post);
        }

   $user['posts'] = $post_arr;
    // set response code - 200 OK
    http_response_code(200);
  
    // show users data in json format
    echo json_encode($user);
    } else {
        // set response code - 200 OK
    http_response_code(200);
  
    // show users data in json format
    echo json_encode($user);
    }
} else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // return error if not found
    echo json_encode(
        array("error" => "Sorry, that user doesn't exist.")
    );
}
