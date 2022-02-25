<?php 
include '../config/middleware.php';

if( isset($_FILES['uploadedfile']['tmp_name']) ){
	//upload configuration 
	//this directory must exist and be writable
	$target_directory = '../../frontend/src/assets/images/posts/';

	$sizes = array(
		'large'		=> 900,
	);

	//grab the image that they uploaded
	$uploadedfile = $_FILES['uploadedfile']['tmp_name'];
    $user_id = clean_int($_POST["user_id"]);

    echo $user_id;
    
	//validate
	$valid = true;

	//get the dimensions of the image
	list( $width, $height ) = getimagesize( $uploadedfile );

	//does the image contain pixels?
	if( $width == 0 OR $height == 0 ){
		//NOT AN IMAGE
		$valid = false;
		$errors['size'] = 'Your image does not meet the minimum size requirements.';
	}
  

	//if valid, process and resize the image
	if($valid){
 
		//get the filetype
		$filetype = $_FILES['uploadedfile']['type'];

		switch( $filetype ){
			case 'image/jpg':
			case 'image/jpeg':
			case 'image/pjpeg':
				$src = imagecreatefromjpeg( $uploadedfile );
			break;

			case 'image/gif':
				$src = imagecreatefromgif( $uploadedfile );
			break;

			case 'image/png':
				//todo: increase resources on the server
				$src = imagecreatefrompng( $uploadedfile );
			break;
		}

		//unique string for the final file name
		$unique_name = uniqid("$user_id-");
       
		//do the resizing
		foreach( $sizes AS $size_name => $pixels ){
			//square crop calculations -  landscape or portrait
			if( $width > $height ){
				//landscape
				$offset_x = round(( $width - $height )) / 2 ;
				$offset_y = 0;
				$crop_size = $height;
			}else{
				//portrait or square
				$offset_x = 0;
				$offset_y = round(( $height - $width )) / 2;
				$crop_size = $width;
			}
			//create a new blank canvas of the desired size
			$canvas = imagecreatetruecolor( $pixels, $pixels );

			//scale down and align the original onto the canvas
			//dst_image, src_image, dst_x, dst_y, src_x, src_y, dst_w, dst_h, src_w, src_h
			imagecopyresampled( $canvas, $src, 0, 0, $offset_x, $offset_y, $pixels, $pixels, $crop_size, $crop_size );

			//save it into the correct directory
			//something like 	uploads/fdkuhfdghjkfdg_small.jpg
			$filepath = $target_directory . $unique_name . '_' . $size_name . '.jpg';

			$did_save = imagejpeg( $canvas, $filepath, 70 );

		}//end foreach size

		//clean up old resources
		imagedestroy($src);
		imagedestroy($canvas);
		
		if($did_save){
			http_response_code(200);
			echo json_encode(array( "src" => $filepath));
		} else {
			http_response_code(500);
			echo json_encode(array( "error" => 'There was a problem uploading your image'));
		}
		

	}//end if valid
	else{
		http_response_code(500);
		echo json_encode(array( "error" => 'There was a problem uploading your image'));
	}

}//end upload parser