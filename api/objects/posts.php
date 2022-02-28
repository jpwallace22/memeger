<?php
include_once '../config/middleware.php';

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

    /**
     * RETRIEVE POSTS & INFO BY DATE WITH FLEXIBLE LIMIT AND OFFSET FOR PAGINATION 
     * 
     * @param string    $date "YYYY-MM-DD" -- start date of the search
     * @param int       $limit (default 20) -- Amount of posts fetched
     * @param int       $offset (default 0) -- Where in the list it starts
     */
    function get_posts($date, $limit, $offset, $order){
        //todays date for the endpoint on the query
        $todays_date = date("Y-m-d");

        //only allow these exact strings through for order
        $allowed_orders = ['votes','p.date'];
        $order = white_list($order, $allowed_orders, "Nice try, but you're not hacking me!");

        //add time for the beginning of the day
        $date = "$date 00:00:00";

        // select all query
        $query = "  SELECT p.*, COUNT( DISTINCT c.comment_id) AS comments_count, u.username, u.profile_pic, COUNT(DISTINCT v.user_id) AS votes
                    FROM posts AS p
                        LEFT JOIN comments AS c
                        ON p.post_id = c.post_id
                        LEFT JOIN users AS u
                        ON p.user_id = u.user_id
                        LEFT JOIN votes AS v
                        ON p.post_id = v.post_id
                    WHERE p.date
                    BETWEEN :startdate AND '$todays_date 23:59:59'
                        AND p.is_published = 1
                    GROUP BY p.post_id
                    ORDER BY $order DESC
                    LIMIT :amount OFFSET :off_set";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        //bind variables
        $stmt->bindValue(':amount', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':off_set', $offset, PDO::PARAM_INT);
        $stmt->bindValue(':startdate', $date, PDO::PARAM_STR);
        // execute query
        $stmt->execute();
      
        return $stmt;
        }

     /**
     * RETRIEVE SINGLE POST AND ITS INFO
     * 
     * @param int $id -- post_id
     */
    function get_single_post($id){
        // select all query
        $query = "  SELECT p.*, COUNT( DISTINCT c.comment_id) AS comments_count, u.username, u.profile_pic, COUNT(DISTINCT v.user_id) AS votes
                    FROM posts AS p
                        LEFT JOIN comments AS c
                        ON p.post_id = c.post_id
                        LEFT JOIN users AS u
                        ON p.user_id = u.user_id
                        LEFT JOIN votes AS v
                        ON p.post_id = v.post_id
                        WHERE p.post_id = :id
                    GROUP BY p.post_id
                    ORDER BY p.date DESC
                    LIMIT 1";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        //bind variables
        $stmt->bindValue('id', $id, PDO::PARAM_INT);
        // execute query
        $stmt->execute();
      
        return $stmt;
        }

    /**
     * RETRIEVE SINGLE POST COMMENTS
     * 
     * @param int $id -- post_id
     */
    function get_single_post_comments($id){
        // select all query
        $query = "  SELECT c.*, u.username AS commenter, u.profile_pic AS commenter_pic
                    FROM comments AS c
                        LEFT JOIN users as u
                        ON c.user_id = u.user_id
                    WHERE post_id = :id 
                    AND is_approved = 1
                    ORDER BY c.date ASC ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        //bind variables
        $stmt->bindValue('id', $id, PDO::PARAM_INT);
        // execute query
        $stmt->execute();
      
        return $stmt;
        }

    /**
     * GET ALL POSTS FOR A SINGLE USER
     * 
     * @param int $id -- post_id
     */
    function get_posts_by_user($id){
        // select all query
        $query = "  SELECT p.*, COUNT( DISTINCT c.comment_id) AS comments_count, u.username, u.profile_pic, COUNT( DISTINCT v.user_id) AS votes
                    FROM posts AS p
                        LEFT JOIN comments AS c
                        ON p.post_id = c.post_id
                        LEFT JOIN users AS u
                        ON p.user_id = u.user_id
                        LEFT JOIN votes AS v
                        ON p.post_id = v.post_id
                    WHERE p.user_id = :id
                        AND p.is_published = 1
                    GROUP BY p.post_id
                    ORDER BY p.date DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        //bind variables
        $stmt->bindValue('id', $id, PDO::PARAM_INT);
        // execute query
        $stmt->execute();
      
        return $stmt;
        }

         /**
     * RETRIEVE POSTS & INFO BY DATE WITH FLEXIBLE LIMIT AND OFFSET FOR PAGINATION 
     * 
     * @param string    $date "YYYY-MM-DD" -- start date of the search
     * @param int       $limit (default 20) -- Amount of posts fetched
     * @param int       $offset (default 0) -- Where in the list it starts
     */
    function search($search){
        // select all query
        $query = "  SELECT p.*, COUNT( DISTINCT c.comment_id) AS comments_count, u.username, u.profile_pic, COUNT( DISTINCT v.user_id) AS votes
                    FROM posts AS p
                        LEFT JOIN comments AS c
                        ON p.post_id = c.post_id
                        LEFT JOIN users AS u
                        ON p.user_id = u.user_id
                        LEFT JOIN votes AS v
                        ON p.post_id = v.post_id
                    WHERE p.is_published = 1
                        AND (
                             p.title LIKE :search
                             OR p.body LIKE :search
                             OR u.username LIKE :search
                             )
                    GROUP BY p.post_id
                    ORDER BY p.date DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        //bind variables
        $stmt->bindValue(':search', $search, PDO::PARAM_STR);
        // execute query
        $stmt->execute();
        
      
        return $stmt;
        }

    /**
     * ADD NEW POST
     * 
     * @param string - title
     * @param string - body
     * @param string - src
     * @param int - allow_comments
     * @param int - user_id
     */
    function add_new_post($title, $body, $src, $allow_comments, $user_id){
        // select all query
        $query = "  INSERT INTO $this->table_name
                    (title, image, body, views, date, user_id, allow_comments, is_published, is_winner)
                    VALUES
                    (:title, :src, :body, 0, now(), :user_id, :allow_comments, 1, 0) ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute([
            'title' => $title,
            'src' => $src,
            'body' => $body,
            'user_id' => $user_id,
            'allow_comments' => $allow_comments,
        ]);
      
        return $stmt;
        }

    /**
     * CHECK IF A USER HAS VOTED
     */
function check_vote($post_id, $user_id){
    $params = [
        'user_id' => $user_id,
        'post_id' => $post_id,
    ];
    // select all query
    $query ="SELECT * FROM votes
             WHERE user_id = :user_id
             AND post_id = :post_id
             LIMIT 1";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute($params);
    return $stmt;
}



    /**
     * ADD OR REMOVE VOTE
     */
    function vote($post_id, $user_id){
        $params = [
            'user_id' => $user_id,
            'post_id' => $post_id,
        ];
        // select all query
        $query ="SELECT * FROM votes
                 WHERE user_id = :user_id
                 AND post_id = :post_id
                 LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);

        //delete or add query
        if( $stmt->rowCount() >= 1 ){
            $query = "DELETE FROM votes
                        WHERE user_id = :user_id
                        AND post_id = :post_id";
        }else{
            $query = "INSERT INTO votes
                        (user_id, post_id, date)
                        VALUES
                        ( :user_id, :post_id, now() )";
        }
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        return $stmt;
        }

}
