<?php                                                                                                                                                                                                              
/**                                                                                                                                                                                                                
 * Plugin Name:         Alumni Dataverse Client                                                                                                                                                                        
 * Plugin URI:          https://appliedtechnologies.de/                                                                                                                               
 * Description:         A plugin for accessing Microsoft Dataverse via WordPress.                                                                                                              
 * Version:             0.0.2407.2707                                                                                                                                                                                      
 * Author:              Fabian Giesche                                                                                                                                                                           
 * Author URI:          https://appliedtechnologies.de/                                                                                                                                                               
 */                                                                                                                                                                                                                
                                                                                                                                                                                                                   
function load_ng_scripts() {                                                      
    wp_enqueue_style( 'ng_styles', plugin_dir_url( __FILE__ ) . 'dist/alumni-dataverse-client/styles-5INURTSO.css', array( 'benevolence-style', 'benevolence-vendors' ) );                                                                                                   
    wp_register_script( 'ng_main', plugin_dir_url( __FILE__ ) . 'dist/alumni-dataverse-client/main-LS7I6SPZ.js', true );                                                                                                
    wp_register_script( 'ng_polyfills', plugin_dir_url( __FILE__ ) . 'dist/alumni-dataverse-client/polyfills-SCHOHYNV.js', true );                                                                                      
}                                                                                                                                                                                                                  
                                                                                                                                                                                                                   
add_action( 'wp_enqueue_scripts', 'load_ng_scripts' );    
add_action( 'wp_head', function() {
    $location = $_SERVER['REQUEST_URI'];
    echo "<base href='$location'>";
});   
                                                                                                                                                                                                          
function attach_ng_contact() {                                                                                                                                                                                             
    wp_enqueue_script( 'ng_main' );                                                                                                                                                                                
    wp_enqueue_script( 'ng_polyfills' );                                                                                                                                                                           
                                                                                                                                                                                                                   
    return "
        <body class='dx-viewport'>
            <app-root initRoute='/profil'></app-root>     
            <app-redirect></app-redirect>
        </body>
    ";                                                                                                                                                                                
}                                                                                                                                                                                                                  
                                                                                                                                                                                                                   
add_shortcode( 'Alumni_Contact', 'attach_ng_contact' );                                                                                                                                                                             

function attach_ng_eventregistration( $atts ) {                                                                                                                                                                                             
    wp_enqueue_script( 'ng_main' );                                                                                                                                                                                
    wp_enqueue_script( 'ng_polyfills' );                                                                                                                                                                           
    
    $eventId = $atts['eventid'];
                                                                                                                                                                                                                   
    return "
        <body class='dx-viewport'>
            <app-root initRoute='/event-registration/$eventId'></app-root>     
            <app-redirect></app-redirect>
        </body>
    ";                                                                                                                                                                                
}                                                                                                                                                                                                                  
                                                                                                                                                                                                                   
add_shortcode( 'Alumni_EventRegistration', 'attach_ng_eventregistration' ); 

function attach_ng_init() {                                                                                                                                                                                             
    wp_enqueue_script( 'ng_main' );                                                                                                                                                                                
    wp_enqueue_script( 'ng_polyfills' );                                                                                                                                                                           
                                                                                                                                                                                                              
    return "
        <body class='dx-viewport'>
            <app-root></app-root>     
            <app-redirect></app-redirect>
        </body>
    ";                                                                                                                                                                                
}                                                                                                                                                                                                                  
                                                                                                                                                                                                                   
add_shortcode( 'Alumni_Init', 'attach_ng_init' ); 
?>