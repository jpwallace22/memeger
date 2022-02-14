<?php
class Posts{
  
    // database connection and table name
    private $conn;
    private $table_name = "posts";
  
    // object properties
    public $post_id;
    public $title;
    public $image;
    public $body;
    public $votes;
    public $views;
    public $date;
    public $user_id;
    public $allow_comments;
    public $is_published;
    public $is_winner;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    //read posts
    function get_posts($date, $limit, $offset){
        $todays_date = date("Y-m-d");

        // select all query
        $query = "  SELECT p.*, COUNT(c.comment_id) as comments_count, u.username, u.profile_pic
                    FROM posts AS p
                        LEFT JOIN comments AS c
                        ON p.post_id = c.post_id
                        LEFT JOIN users AS u
                        ON p.user_id = u.user_id
                        WHERE p.date
                    BETWEEN '$date 00:00:00' AND '$todays_date 23:59:59'
                    GROUP BY p.post_id
                    ORDER BY p.date DESC
                    LIMIT :amount OFFSET :off_set";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':amount', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':off_set', $offset, PDO::PARAM_INT);
        // execute query
        $stmt->execute();
      
        return $stmt;
        }
}