<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

$post_id = get_the_ID();
$current_id = get_post_meta($post_id, 'flipbook_id', true);


if (empty($current_id)) {

	$flipbook = array();
} else {
	$flipbook_id = intval($current_id);
	$flipbook = get_option("real3dflipbook_" . $flipbook_id);
	$flipbook['id'] =  $flipbook_id;
}

function r3d_postbox($r3d_postbox_title, $r3d_name)
{

	$r3d_postbox_id = 'flipbook-' . $r3d_name . '-options';
	$r3d_postbox_class = 'postbox closed';

?>

<div class="<?php echo esc_attr($r3d_postbox_class); ?>">
	<div class="postbox-header">
		<h2 class="hndle ui-sortable-handle"><?php echo esc_html($r3d_postbox_title); ?></h2>
		<button type="button" class="handlediv" aria-disabled="false"><span class="screen-reader-text"><?php esc_html_e('Toggle panel:', 'real3d-flipbook');
																											echo esc_html(' ' . $r3d_postbox_title); ?></span><span class="toggle-indicator"
				aria-hidden="true"></span></button>
	</div>
	<div class="inside">
		<table class="form-table" id="<?php echo esc_attr($r3d_postbox_id); ?>">
			<tbody></tbody>
		</table>
		<div class="clear"></div>
	</div>
</div>

<?php

}

?>

<div id='real3dflipbook-admin' style="display:none;">

	<?php
	if (!empty($current_id)) {
	?>

	<input class="flipbook-option-field" type="hidden" name="id" value="<?php echo esc_attr($flipbook_id); ?>">
	<input class="flipbook-option-field" type="hidden" name="bookId" value="<?php echo esc_attr($flipbook_id); ?>">

	<?php
	}
	?>

	<div>
		<h2 id="r3d-tabs" class="nav-tab-wrapper wp-clearfix">
			<a href="#" class="nav-tab" data-tab="tab-pages"><?php esc_html_e('Pages', 'real3d-flipbook'); ?></a>
			<a href="#" class="nav-tab" data-tab="tab-general"><?php esc_html_e('General', 'real3d-flipbook'); ?></a>
			<a href="#" class="nav-tab"
				data-tab="tab-toc"><?php esc_html_e('Table of Contents', 'real3d-flipbook'); ?></a>
			<a href="#" class="nav-tab" data-tab="tab-lightbox"><?php esc_html_e('Lightbox', 'real3d-flipbook'); ?></a>
			<a href="#" class="nav-tab" data-tab="tab-webgl"><?php esc_html_e('WebGL', 'real3d-flipbook'); ?></a>
			<a href="#" class="nav-tab" data-tab="tab-mobile"><?php esc_html_e('Mobile', 'real3d-flipbook'); ?></a>
			<?php
			
			?>
			<a href="#" class="nav-tab" data-tab="tab-ui"><?php esc_html_e('UI', 'real3d-flipbook'); ?></a>
			<?php
			
			?>
			<a href="#" class="nav-tab" data-tab="tab-menu"><?php esc_html_e('Menu Buttons', 'real3d-flipbook'); ?></a>
		</h2>
		<div id="tab-pages" style="display:none;">

			<table class="form-table">
				<tbody>

					<tr>
						<td>
							<button class='button-primary add-pages-button'
								id='r3d-select-source'><?php esc_html_e("Select PDF or images", "real3d-flipbook"); ?></button>
							<input type='text' class='regular-text flipbook-option-field' name="pdfUrl"
								id='r3d-pdf-source' placeholder="PDF URL">
							<button class='button-primary convert-button' id='r3d-convert'
								style="display: none;"><?php esc_html_e("Convert with PDF Tools", "real3d-flipbook"); ?></button>

							<p id="add-pages-description" class="description">
								<?php esc_html_e("Select PDF or images from media library, or enter PDF URL", "real3d-flipbook") ?>
							</p>
							<p id="buy-pdf-tools" style="display:none;">

								<?php
								$message = sprintf(
									/* translators: %1$s is replaced with the anchor HTML for the "PDF Tools Addon" link. */
									esc_html__(
										'Optimize Real3D PDF Flipbooks with %1$s by converting PDF to images and JSON. Speed up the flipbook loading and secure the PDF.',
										'real3d-flipbook'
									),
									'<a href="' . esc_url('https://real3dflipbook.com/pdf-tools-addon/?ref=wp') . '" style="text-decoration: none; font-weight: bold;" target="_blank">' . esc_html__('PDF Tools Addon for Real3D Flipbook', 'real3d-flipbook') . '</a>'
								);

								echo wp_kses(
									$message,
									[
										'a' => [
											'href' => [],
											'style' => [],
											'target' => [],
										],
									]
								);
								?>
							</p>
							<p id="add-pages-info" class="description" style="display:none;"></p>
						</td>
					</tr>
				</tbody>
			</table>

			<div>
				<ul id="pages-container" tabindex="-1" class="attachments ui-sortable"></ul>
				<span
					class="button button-secondary paste-page"><?php esc_html_e('Paste page', 'real3d-flipbook'); ?></span>
				<span
					class="button button-secondary delete-pages-button"><?php esc_html_e('Delete all pages', 'real3d-flipbook'); ?></span>
			</div>
		</div>

		<div id="tab-toc" style="display:none;">
			<p class="description">
				<?php esc_html_e('Create custom Table of Contents. This overrides default PDF outline or table of contents created by page titles.', 'real3d-flipbook'); ?>
			</p>
			<p>
				<a class="add-toc-item button-primary" href="#"><?php esc_html_e('Add item', 'real3d-flipbook'); ?></a>
				<a href="#" type="button"
					class="button-link toc-delete-all"><?php esc_html_e('Delete all', 'real3d-flipbook'); ?></a>
			</p>
			<table class="form-table" id="flipbook-toc-options">
				<tbody></tbody>
			</table>
			<div id="toc-items" tabindex="-1" class="attachments ui-sortable"></div>
		</div>
		<div id="tab-general" style="display:none;">
			<table class="form-table" id="flipbook-general-options">
				<tbody></tbody>
			</table>
		</div>
		<div id="tab-normal" style="display:none;">
			<table class="form-table" id="flipbook-normal-options">
				<tbody></tbody>
			</table>
		</div>
		<div id="tab-mobile" style="display:none;">
			<p class="description">
				<?php esc_html_e('Override settings for mobile devices (use different view mode, smaller textures ect)', 'real3d-flipbook'); ?>
			</p>
			<table class="form-table" id="flipbook-mobile-options">
				<tbody></tbody>
			</table>
		</div>
		<div id="tab-lightbox" style="display:none;">
			<table class="form-table" id="flipbook-lightbox-options">
				<tbody></tbody>
			</table>
		</div>
		<div id="tab-webgl" style="display:none;">
			<table class="form-table" id="flipbook-webgl-options">
				<tbody></tbody>
			</table>
		</div>
		<div id="tab-ui" style="display:none;">
			<div class="meta-box-sortables">

				<?php
				
				?>

				<table class="form-table" id="flipbook-ui-options">
					<tbody></tbody>
				</table>
				<h3><?php esc_html_e('Advanced settings', 'real3d-flipbook'); ?></h3>
				<p><?php esc_html_e('Override layout and skin settings', 'real3d-flipbook'); ?></p>

				<?php
				
				?>

				<?php
				
				r3d_postbox(__('Skin', 'real3d-flipbook'), 'skin'); // escaped in r3d_postbox()
				r3d_postbox(__('Flipbook background', 'real3d-flipbook'), 'bg'); // escaped in r3d_postbox()
				r3d_postbox(__('Top Menu', 'real3d-flipbook'), 'menu-bar-2'); // escaped in r3d_postbox()
				r3d_postbox(__('Bottom Menu', 'real3d-flipbook'), 'menu-bar'); // escaped in r3d_postbox()
				r3d_postbox(__('Buttons', 'real3d-flipbook'), 'menu-buttons'); // escaped in r3d_postbox()
				r3d_postbox(__('Floating Buttons (on transparent menu)', 'real3d-flipbook'), 'menu-floating'); // escaped in r3d_postbox()
				r3d_postbox(__('Arrows', 'real3d-flipbook'), 'side-buttons'); // escaped in r3d_postbox()
				r3d_postbox(__('Close lightbox button', 'real3d-flipbook'), 'close-button'); // escaped in r3d_postbox()
				r3d_postbox(__('Sidebar', 'real3d-flipbook'), 'sidebar'); // escaped in r3d_postbox()
				
				?>

			</div>
		</div>
		<div id="tab-menu" style="display:none;">
			<div class="meta-box-sortables">
				<h3><?php esc_html_e('Menu buttons', 'real3d-flipbook'); ?></h3>

				<?php

				r3d_postbox(__('Current page', 'real3d-flipbook'), 'currentPage'); // escaped in r3d_postbox()
				
				r3d_postbox(__('First page', 'real3d-flipbook'), 'btnFirst'); // escaped in r3d_postbox()
				
				r3d_postbox(__('Previous page', 'real3d-flipbook'), 'btnPrev'); // escaped in r3d_postbox()
				r3d_postbox(__('Next page', 'real3d-flipbook'), 'btnNext'); // escaped in r3d_postbox()
				
				r3d_postbox(__('Last page', 'real3d-flipbook'), 'btnLast'); // escaped in r3d_postbox()
				r3d_postbox(__('Autoplay', 'real3d-flipbook'), 'btnAutoplay'); // escaped in r3d_postbox()
				
				r3d_postbox(__('Zoom In', 'real3d-flipbook'), 'btnZoomIn'); // escaped in r3d_postbox()
				r3d_postbox(__('Zoom Out', 'real3d-flipbook'), 'btnZoomOut'); // escaped in r3d_postbox()
				r3d_postbox(__('Table of Contents', 'real3d-flipbook'), 'btnToc'); // escaped in r3d_postbox()
				r3d_postbox(__('Thumbnails', 'real3d-flipbook'), 'btnThumbs'); // escaped in r3d_postbox()
				r3d_postbox(__('Share', 'real3d-flipbook'), 'btnShare'); // escaped in r3d_postbox()
				
				r3d_postbox(__('Notes', 'real3d-flipbook'), 'btnNotes'); // escaped in r3d_postbox()
				
				r3d_postbox(__('Print', 'real3d-flipbook'), 'btnPrint'); // escaped in r3d_postbox()
				
				r3d_postbox(__('Download pages', 'real3d-flipbook'), 'btnDownloadPages'); // escaped in r3d_postbox()
				
				r3d_postbox(__('Download PDF', 'real3d-flipbook'), 'btnDownloadPdf'); // escaped in r3d_postbox()
				r3d_postbox(__('Sound', 'real3d-flipbook'), 'btnSound'); // escaped in r3d_postbox()
				r3d_postbox(__('Fullscreen', 'real3d-flipbook'), 'btnExpand'); // escaped in r3d_postbox()
				
				r3d_postbox(__('Toggle Single Page', 'real3d-flipbook'), 'btnSingle'); // escaped in r3d_postbox()
				r3d_postbox(__('Search Button', 'real3d-flipbook'), 'btnSearch'); // escaped in r3d_postbox()
				r3d_postbox(__('Search Input', 'real3d-flipbook'), 'search'); // escaped in r3d_postbox()
				r3d_postbox(__('Bookmark', 'real3d-flipbook'), 'btnBookmark'); // escaped in r3d_postbox()
				
				r3d_postbox(__('Tools', 'real3d-flipbook'), 'btnTools'); // escaped in r3d_postbox()
				r3d_postbox(__('Close', 'real3d-flipbook'), 'btnClose'); // escaped in r3d_postbox()
				r3d_postbox(__('Social share buttons', 'real3d-flipbook'), 'share-buttons'); // escaped in r3d_postbox()

				?>

			</div>
		</div>
	</div>
</div>
<div id="edit-page-modal-wrapper">

	<div tabindex="0" class="media-modal wp-core-ui" id="edit-page-modal" style="display: none;">

		<button type="button" class="media-modal-close STX-modal-close"><span class="media-modal-icon"><span
					class="screen-reader-text"><?php esc_html_e('Close media panel', 'real3d-flipbook'); ?></span></span></button>
		<div class="media-modal-content STX-modal-content">
			<div class="edit-attachment-frame mode-select hide-menu hide-router">

				<div class="edit-media-header">
					<button class="left dashicons"><span
							class="screen-reader-text"><?php esc_html_e('Edit previous media item', 'real3d-flipbook'); ?></span></button>
					<button class="right dashicons"><span
							class="screen-reader-text"><?php esc_html_e('Edit next media item', 'real3d-flipbook'); ?></span></button>
					<button type="button" class="media-modal-close"><span class="media-modal-icon"><span
								class="screen-reader-text"><?php esc_html_e('Close dialog', 'real3d-flipbook'); ?></span></span></button>
				</div>

				<div class="media-frame-title STX-modal-title">
					<h1><?php esc_html_e('Edit page', 'real3d-flipbook'); ?></h1>
				</div>

				<div class="media-frame-content STX-modal-frame-content">

					<div class="page-editor">
						<div class="page-preview">
							<div class="thumbnail thumbnail-image">

								<img id="edit-page-img" draggable="false" alt="">

								<div class="attachment-actions">

									<button type="button"
										class="button replace-page"><?php esc_html_e('Replace image', 'real3d-flipbook'); ?></button>

									<button type="button"
										class="button copy-page"><?php esc_html_e('Copy page', 'real3d-flipbook'); ?></button>

								</div>
							</div>
						</div>
						<div class="page-editor-sidebar">

							<div class="settings">

								<div class="setting" data-setting="title">
									<label for="edit-page-title"
										class="name"><?php esc_html_e('Title', 'real3d-flipbook'); ?></label>
									<input type="text" id="edit-page-title"
										placeholder="Page title (for Table of Content)">
								</div>

								<div class="setting" data-setting="caption">
									<label for="edit-page-caption"
										class="name"><?php esc_html_e('Caption', 'real3d-flipbook'); ?></label>
									<textarea type="text" id="edit-page-caption" placeholder="Page caption"></textarea>
								</div>

								<div class="setting" data-setting="html-content">
									<label for="edit-page-html-content"
										class="name"><?php esc_html_e('HTML Content', 'real3d-flipbook'); ?></label>
									<textarea id="edit-page-html-content"
										placeholder="Add any HTML content to page, set style and position with inline CSS"></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="media-modal-backdrop" style="display: none;"></div>
</div>

<?php

wp_enqueue_media();
add_thickbox();

wp_enqueue_script("real3d-flipbook-iscroll");
wp_enqueue_script("real3d-flipbook-pdfjs");
wp_enqueue_script("real3d-flipbook-pdfworkerjs");
wp_enqueue_script("real3d-flipbook-pdfservice");
wp_enqueue_script("real3d-flipbook-threejs");
wp_enqueue_script("real3d-flipbook-book3");
wp_enqueue_script("real3d-flipbook-bookswipe");
wp_enqueue_script("real3d-flipbook-webgl");
wp_enqueue_script("real3d_flipbook");
wp_enqueue_style('real3d-flipbook-style');

wp_enqueue_script('alpha-color-picker');
wp_enqueue_script('sweet-alert-2');
wp_enqueue_style('sweet-alert-2');

if (defined('R3D_PAGE_EDITOR_VERSION')) {
	wp_enqueue_script('r3d-page-item');
	wp_enqueue_script('r3d-page-editor');
	wp_enqueue_style('r3d-page-editor');
}

if (defined('R3D_PDF_TOOLS_VERSION')) {
	if (version_compare(R3D_PDF_TOOLS_VERSION, '2.0', '>='))
		wp_enqueue_script('r3d-pdf-to-jpg');
}

wp_enqueue_script('real3d-flipbook-edit-post');
wp_enqueue_style('alpha-color-picker');
wp_enqueue_style('real3d-flipbook-admin');

$ajax_nonce = wp_create_nonce("saving-real3d-flipbook");



$flipbook['security'] = $ajax_nonce;

$flipbook_global = get_option("real3dflipbook_global");

$flipbook_global_defaults = r3dfb_getDefaults();

$flipbook['globals'] = r3d_array_merge_deep($flipbook_global_defaults, $flipbook_global);
$flipbook['globals']['plugins_url'] = plugins_url();
wp_localize_script('real3d-flipbook-edit-post', 'options', $flipbook);


