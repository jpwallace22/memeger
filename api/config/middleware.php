<?php

/**
 * Returns the value if is in array of allowed values
 * @param value     any     [value to be evaluated]
 * @param allowed   array   [values to be evaluated against]
 * @param message   string  [displayed message for errors]
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