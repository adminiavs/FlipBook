<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

$r3d_globals_settings = get_option("real3dflipbook_global");

if (!$r3d_globals_settings)
	r3dfb_setDefaults();

function r3dfb_setDefaults()
{
	$defaults = r3dfb_getDefaults();
	delete_option("real3dflipbook_global");
	add_option("real3dflipbook_global", $defaults);
}

function r3d_sanitize_array($input)
{
	foreach ($input as $key => $value) {
		if (is_array($value)) {
			$input[$key] = r3d_sanitize_array($value); // Recursive call
		} else {
			// Use wp_kses_post for HTML content, sanitize_text_field for plain text
			// Choose based on key name - HTML fields vs plain text fields
			$input[$key] = wp_kses_post($value);
		}
	}
	return $input;
}

add_action('wp_ajax_r3d_save_general', 'r3d_save_general_callback');

function r3d_save_general_callback()
{

	check_ajax_referer('r3d_nonce', 'security');

	unset($_POST['security'], $_POST['action']);

	$data = $_POST;

	if (isset($data['slug']) && (get_option('real3dflipbook_global')['slug'] ?? '') != $data['slug']) {
		update_option('r3d_flush_rewrite_rules', true);
	}

	update_option('real3dflipbook_global', $data);

	if (isset($data["manageFlipbooks"])) {
		switch ($data["manageFlipbooks"]) {
			case "Administrator":
				update_option("real3dflipbook_capability", "activate_plugins");
				break;
			case "Editor":
				update_option("real3dflipbook_capability", "publish_pages");
				break;
			default:
				update_option("real3dflipbook_capability", "publish_posts");
		}
	}

	wp_die();
}

add_action('wp_ajax_r3d_reset_general', 'r3d_reset_general_callback');

function r3d_reset_general_callback()
{

	check_ajax_referer('r3d_nonce', 'security');

	r3dfb_setDefaults();

	wp_die();
}



add_action('wp_ajax_r3d_save_thumbnail', 'r3dfb_save_thumbnail_callback');

function r3dfb_save_thumbnail_callback()
{
	// Security & permission
	check_ajax_referer('saving-real3d-flipbook', 'security');
	if (!current_user_can('upload_files')) {
		wp_send_json_error(['message' => esc_html__('You do not have permission to upload files.', 'real3d-flipbook')]);
	}

	// Flipbook ID check
	$id = isset($_POST['id']) ? absint(sanitize_text_field(wp_unslash($_POST['id']))) : 0;
	if ($id <= 0) {
		wp_send_json_error(['message' => esc_html__('Invalid flipbook ID.', 'real3d-flipbook')]);
	}

	$book = get_option('real3dflipbook_' . $id);
	if (!$book) {
		wp_send_json_error(['message' => esc_html__('The specified flipbook does not exist.', 'real3d-flipbook')]);
	}

	// Upload paths
	$upload_dir = wp_upload_dir();
	if (!empty($upload_dir['error'])) {
		wp_send_json_error(['message' => esc_html__('Upload directory error: ', 'real3d-flipbook') . esc_html($upload_dir['error'])]);
	}

	$book_folder = $upload_dir['basedir'] . "/real3d-flipbook/flipbook_{$id}/";
	$book_url = $upload_dir['baseurl'] . "/real3d-flipbook/flipbook_{$id}/";

	if ((!file_exists($book_folder) && !mkdir($book_folder, 0755, true)) || !is_writable($book_folder)) {
		wp_send_json_error(['message' => esc_html(sprintf(__('Cannot write to folder: %s', 'real3d-flipbook'), $book_folder))]);
	}

	// Validate upload
	if (empty($_FILES['file']['tmp_name'])) {
		wp_send_json_error(['message' => esc_html__('No file uploaded.', 'real3d-flipbook')]);
	}

	// File size (2MB)
	if ($_FILES['file']['size'] > 2 * 1024 * 1024) {
		wp_send_json_error(['message' => esc_html__('File size exceeds the maximum limit.', 'real3d-flipbook')]);
	}

	// Extension & image check
	$allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
	$filename = sanitize_file_name($_FILES['file']['name']);
	$extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
	if (!in_array($extension, $allowed_extensions)) {
		wp_send_json_error(['message' => esc_html__('Invalid file extension.', 'real3d-flipbook')]);
	}
	if (getimagesize($_FILES['file']['tmp_name']) === false) {
		wp_send_json_error(['message' => esc_html__('File is not a valid image.', 'real3d-flipbook')]);
	}

	// Unique filename
	$hashed_filename = 'thumbnail_' . time() . '_' . wp_generate_password(4, false, false) . '.' . $extension;
	$destination = $book_folder . $hashed_filename;
	$counter = 0;
	while (file_exists($destination)) {
		$counter++;
		$hashed_filename = 'thumbnail_' . time() . '_' . wp_generate_password(4, false, false) . "_{$counter}." . $extension;
		$destination = $book_folder . $hashed_filename;
	}

	// Move file
	if (!move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
		wp_send_json_error(['message' => esc_html__('Failed to save the uploaded file.', 'real3d-flipbook')]);
	}
	$thumbnail_url = $book_url . $hashed_filename;

	// Remove old thumbnail
	if (!empty($book['lightboxThumbnailUrl'])) {
		$old_file = str_replace($upload_dir['baseurl'], $upload_dir['basedir'], $book['lightboxThumbnailUrl']);
		if (file_exists($old_file)) {
			@unlink($old_file);
		}
	}

	// Save option
	$book['lightboxThumbnailUrl'] = esc_url($thumbnail_url);
	update_option('real3dflipbook_' . $id, $book);

	wp_send_json_success(['thumbnail_url' => $thumbnail_url]);
}
