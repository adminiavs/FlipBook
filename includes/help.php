<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}
?>
<div class="wrap">
	<h1><?php esc_html_e('Getting Started with Real3D Flipbook', 'real3d-flipbook'); ?></h1>

	<p><?php esc_html_e('Welcome to Real3D Flipbook! Transform your content into engaging flipbooks that captivate your audience. Whether you\'re showcasing portfolios, magazines, or product catalogs, Real3D Flipbook offers a seamless and interactive experience.', 'real3d-flipbook'); ?>
	</p>

	<?php
	?>

	<?php
	
	?>
	<p>
		<?php
		printf(
			/* translators: %s is the link to online documentation */
			esc_html__('Refer to the %sOnline Documentation%s for detailed instructions and tips on using Real3D Flipbook.', 'real3d-flipbook'),
			'<a href="https://real3dflipbook.gitbook.io/wp/" target="_blank">',
			'</a>'
		);
		?>
	</p>
	<?php
	
	?>

	<p>
		<?php esc_html_e('Ready to start? Create your first flipbook now:', 'real3d-flipbook'); ?>
		<a href="<?php echo esc_url(admin_url('post-new.php?post_type=r3d')); ?>" class="button button-primary">
			<?php esc_html_e('Add New Flipbook', 'real3d-flipbook'); ?>
		</a>
	</p>

	<?php
	?>
</div>