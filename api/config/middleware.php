<?php

/**
 * ## https://phpdelusions.net/pdo/whitelisting_helper_function ##
 * Returns the value if is in array of allowed values
 * @param mixed     $value     [value to be evaluated]
 * @param array     $allowed  [values to be evaluated against]
 * @param string    $message  [displayed message for errors]
 */
function white_list( $value, $allowed, $message) {
    if ($value === null) {
        return $allowed[0];
    }
    $key = array_search($value, $allowed, true);
    if ($key === false) { 
        throw new InvalidArgumentException($message); 
    } else {
        return $value;
    }
}

/**
 * SANITIZE FUNCTIONS
 */
function clean_string( $string ){
    return trim( strip_tags( $string ) );
};
function clean_email( $email ){
    return filter_var( $email, FILTER_SANITIZE_EMAIL);
}