<?php
class Users{
  
    // database connection and table name
    private $conn;
    private $table_name = 'users';
  
    // object properties
    public $user_id;
    public $email;
    public $username;
    public $password;
    public $profile_pic;
    public $bio;
    public $join_date;
    public $last_login;
    public $is_admin;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    /**
     * GET ALL USER INFO FOR PROFILE PAGE
     */
    function profile_page_info($username){
  
    $query =   "SELECT 
                    u.user_id, u.email, u.username, u.profile_pic, u.bio, u.join_date, u.last_login, u.is_admin,
                    COUNT(p.is_winner) AS win_count,
                    COUNT(f.post_id) AS fav_count
                FROM users AS u
                    LEFT JOIN posts AS p
                    ON u.user_id = p.user_id
                    LEFT JOIN favorites AS f
                    ON u.user_id = f.user_id
                WHERE u.username = :username
                GROUP BY u.user_id
                LIMIT 1  
                ";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute(['username' => $username]);
    return $stmt;
    }

    /**
     * CHECKS IF USERNAME IS IN DATABASE
     */
    function check_username($username){
    
    $query = "SELECT *
                FROM $this->table_name
                WHERE username = :username ";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute(array( 'username' => $username ));
    return $stmt;
    }

    /**
     * CHECKS IF EMAIL IS IN DATABASE
     */
    function check_email($email){

    $query = "SELECT *
                FROM $this->table_name
                WHERE email = :email ";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute(array( 'email' => $email ));
    return $stmt;
    }

    /**
     * ADD NEW USER TO THE DATABASE
     */
    function register($email, $username, $password, $image){

    $query = "INSERT INTO $this->table_name
                ( email, username, password, profile_pic, bio, join_date, last_login, is_admin)
                VALUES
                (:email, :username, :password, :image,'', now(), now(), 0 )";
   
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute(array( ':email' => $email, ':username' => $username, ':password' => $password, ':image' => $image ));
    return $stmt;
    }

     /**
     * GET ALL USER INFO BY USERNAME
     */
    function login($username){

        $query = "SELECT *
                    FROM $this->table_name 
                    WHERE username = :username";
      
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute(['username' => $username]);
        return $stmt;
        }

     /**
     * UPDATE THE USERS LAST LOGIN TIME
     */
    function update_login_date($id){

        $query = "UPDATE $this->table_name
                    SET last_login = now()
                    WHERE user_id = :id";
      
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute(['id' => $id]);
        return $stmt;
        }
}