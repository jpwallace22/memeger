<?php 
include('./config/config.php');

require './config/randomAvatarsGenerator.php';

$avatar = new randomAvatarsGenerator(); // Instantiate randomAvatarsGenerator.
$avatar->generate(); // Generate a random preset.
// $avatar->checkPresetIsUnique(); // Make sure that the preset has never been saved in the database. If yes it will try to generate another one.
$avatar->draw(); // Draw the image corresponding to the preset.
$avatar->saveImage('../frontend/src/assets/images/avatars', 'avatar.png'); // Save the image in the folder 'generated' with the name 'avatar.png'.