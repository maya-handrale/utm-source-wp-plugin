<?php
/*
Plugin Name: utm-source-wp-plugin
Description: Redirect users after submitting a Contact Form 7 form.
Version: 1.0
Author: Maya Handrale
*/
if( ! defined('ABSPATH')){
    header("Location:".site_url());
    die("can't access");
}


function pangrow_plugin_activation(){
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
}

register_activation_hook(__FILE__, 'pangrow_plugin_activation');


function pangrow_plugin_deactivation(){

}

register_deactivation_hook(__FILE__, 'pangrow_plugin_deactivation');

//styles
add_action( 'wp_enqueue_scripts', 'add_custom_script' );


function add_custom_script(){
	wp_register_script( 'jquery-cookie','https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js', array(), '', true );
	wp_enqueue_script( 'customMainfile',plugins_url('js/main.js',__FILE__), array( 'jquery','jquery-cookie'),
    filemtime(plugin_dir_path(__FILE__).'js/main.js'), true );	
  //  wp_enqueue_script('regax','https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js','',true);
	wp_enqueue_script( 'googletranslate','//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit', array(), '', true );
	//wp_enqueue_style( 'customfile',plugins_url('css/customfile.css',__FILE__), array(  ), '');

    $translation_array = array(
        'path' => COOKIEPATH,
        'ajax_url' => admin_url( 'admin-ajax.php' ),
        'ajax_nonce ' => wp_create_nonce( 'secure_nonce_name' )
    );
    wp_localize_script( 'customMainfile', 'skillSector_object', $translation_array );

}
function enqueue_custom_scripts() {
    // Enqueue your custom JavaScript file
    wp_enqueue_script('custom-scripts', get_template_directory_uri() . '/js/custom-scripts.js', array('jquery'), null, true);

    // Pass nonce to script.js with wp_localize_script()
    wp_localize_script('custom-scripts', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));
}

add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');
function enqueue_custom_path_scripts() {
    // Enqueue your JavaScript file
    wp_enqueue_script('custom-script', get_template_directory_uri() . '/js/custom-script.js', array('jquery'), '1.0', true);

    // Pass server-side data (current slug) to the JavaScript file
    global $post;
    $current_slug = $post->post_name;
    wp_localize_script('custom-script', 'custom_current_slug_vars', array(
        'currentSlug' => $current_slug,
    ));
}

add_action('wp_enqueue_scripts', 'enqueue_custom_path_scripts');
function home_url_script() {
    // Enqueue your JavaScript file
    wp_enqueue_script('custom-script', get_template_directory_uri() . '/js/custom-script.js', array('jquery'), '1.0', true);

    // Pass server-side data (home URL) to the JavaScript file
    wp_localize_script('custom-script', 'custom_script_vars', array(
        'homeUrl' => esc_url(home_url()),
    ));
}

add_action('wp_enqueue_scripts', 'home_url_script');


