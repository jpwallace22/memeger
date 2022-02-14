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
    public $is_admin;
    public $join_date;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read products
    function read($id){
  
    // select all query
    $query = "SELECT *
                FROM $this->table_name 
                WHERE user_id = $id";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
  
    // execute query
    $stmt->execute();
  
    return $stmt;
    }
}