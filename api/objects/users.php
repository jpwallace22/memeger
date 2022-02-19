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

    // read products
    function read($id){
  
    $query = "SELECT *
                FROM $this->table_name 
                WHERE user_id = $id";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
    // execute query
    $stmt->execute();
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