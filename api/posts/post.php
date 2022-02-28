<?php
include '../config/config.php';


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

/**
 * FETCHES SINGLE POST BY ID
 * :: endpoint ==> api/posts/post.php?post_id=@param
 * 
 *@param integer
 */

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    
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
        
    }

    $stmt = $posts->get_single_post_comments($id);
    $num = $stmt->rowCount();
    
    // check if more than 0 record found
    if($num>0){
        $comments = [];
        // retrieve table contents
        // fetch() is faster than fetchAll() @http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    
            // extract row this will make $row['name'] to just $name only
            extract($row);

            //create array
            $comment_item = [
                'user_id' => $user_id,
                'post_id' => $post_id,
                'parent_id' => $parent_id,
                'body' => $body,
                'date' => $date,
                'is_approved' => $is_approved,
                'username' => $commenter,
                'profile_pic' => $commenter_pic
            ];
            
            array_push($comments, $comment_item);
        }
    } else {
        $comments = [
            'error' => 'No comments yet. Be the first!'
        ];
    }
    $payload = [
        'post' => $post_item,
        'comments' => $comments,
    ];
    // set response code - 200 OK
    http_response_code(200);
  
    // show users data in json format
    echo json_encode($payload);
    
} else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // return error if not found
    echo json_encode(
        array("error" => "Uh Oh, we seam to have lost this post.. ")
    );
 }
}


/**
 * ADDS NEW POST
 * :: endpoint ==> api/posts/post.php
 * 
 *@param JSON
 */
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    
    //SANITIZE DATA
    $title = clean_string( $data->title );
    $body = clean_string( $data->body );
    $src = clean_string( $data->src );
    $allow_comments = clean_int( $data->allow_comments );
    $user_id = clean_int( $data->user_id );
    $valid = true;
    $errors= [];

    //check if logged in and sumitted user_id is correct
    if(!check_login($user_id)){
        $valid = false;
        $errors['invalid'] = 'You must be logged in';
    }
    //title exists and title less than 50
    if(strlen($title) < 1 || strlen($title) > 50 ){
        $valid = false;
        $errors['title'] = 'Required and must be under 50 characters';
    }
    //body exists less than 500
    if(strlen($body) < 1 || strlen($body) > 500 ){
        $valid = false;
        $errors['body'] = 'Required and must be under 500 characters';
    }
    if($allow_comments < 0 || $allow_comments > 1){
        $valid = false;
        $errors['comments'] = 'I have no idea what you are doing.';
    }

    if( ! $valid){
        // set response code - 200 OK
        http_response_code(500);
    
        // show users data in json format
        echo json_encode($errors);

        exit;
    }

    $stmt = $posts->add_new_post($title, $body, $src, $allow_comments, $user_id);
    // debug_statement($stmt);
    $num = $stmt->rowCount();

    if($num>0){
        // set response code - 200 OK
        http_response_code(200);
    
        // show users data in json format
        echo json_encode('success');
    } else {
         // set response code - 200 OK
         http_response_code(500);
    
         // show users data in json format
         echo json_encode('error');
    }
}