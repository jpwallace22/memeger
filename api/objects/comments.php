<?php
include_once '../config/middleware.php';

class Comments{
  
    // database connection and table name
    private $conn;
    private $table_name = "comments";
  
    // object properties
    public $comment_id;
    public $user_id;
    public $post_id;
    public $parent_id;
    public $body;
    public $date;
    public $is_approved;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    /**
     * ADDS NEW COMMENT TO THE TABLE
     */
    function add_comment($post_id, $user_id, $body){

         $query = " INSERT INTO $this->table_name
                    (user_id, post_id, parent_id, body, date, is_approved )
                    VALUES
                    (:user_id, :post_id, 0, :body, now(), 1 )";

    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute([ 'user_id' => $user_id, 'post_id' => $post_id, 'body' => $body ]);

    //return last id to search database for and return all its info
    $comment_id = $this->conn->lastInsertId();

    $query = " SELECT c.*, u.username, u.profile_pic
                FROM comments AS c
                    LEFT JOIN users AS u
                    ON c.user_id = u.user_id
                WHERE comment_id = :comment_id";
    
    //prepare new query
    $stmt = $this->conn->prepare($query);

    $stmt->execute([ "comment_id" => $comment_id]);

    return $stmt;
    }
}