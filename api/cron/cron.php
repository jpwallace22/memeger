<?php
include '../config/config.php';
include '../config/middleware.php';
/**
 * FETCHES ALL POSTS within 24 horus and creates a winner
 * :: endpoint ==> /api/cron/cron.php
 * 
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
$date = date("Y-m-d");

$stmt = $posts->get_posts($date, 1, 0, "votes");
// debug_statement($stmt);
$num = $stmt->rowCount();
// check if more than 0 record found
if($num>0){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);  
  }  
   $stmt = $db->prepare("UPDATE posts
                        SET is_winner=1
                        WHERE post_id = :post_id");
    $stmt->execute(['post_id' => $post_id]);
}