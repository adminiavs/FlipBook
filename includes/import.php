<?php 
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}
?>
<div class='wrap'>

	<h3><?php esc_html_e('Import flipbooks', 'real3d-flipbook'); ?></h3>


	<p><?php esc_html_e('Import flipbooks from JSON( overwrite existing flipbooks)', 'real3d-flipbook'); ?></p>



	<textarea name="flipbooks" id="flipbook-admin-json" rows="20" cols="100" placeholder="Paste JSON here"></textarea>
	<p class="submit"><a href="#" id="import" class="button button-secondary">Import</a></p>


	<h3><?php esc_html_e('Export flipbooks', 'real3d-flipbook'); ?></h3>
	<p>
		<a class='button button-secondary' id="download"
			href='#'><?php esc_html_e('Download JSON', 'real3d-flipbook'); ?></a>
	</p>

</div>
<?php 

wp_enqueue_script( "real3d-flipbook-import"); 
$r3d_nonce = wp_create_nonce( "r3d_nonce");
wp_localize_script( 'real3d-flipbook-import', 'r3d_nonce', array($r3d_nonce) );