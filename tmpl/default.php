<?php 

/**
 * @package     mod_amu_plotly_bubbleplots
 * @author      Pierre Veelen, amultis.eu
 * @copyright   Copyright (C) 2023 Pierre Veelen. All rights reserved.
 * @license     GNU General Public License version 2 or later.
 *
 * default.php  Used to output the data to html page.
 *
 */

/*
 * No direct access to this file
 * - \defined checks global namespace 
 * - defined checks local namespace
 */
\defined('_JEXEC') or die;

/* inspiration: https://joomla.stackexchange.com/questions/28178/use-addscriptoptions-for-multiple-modules-on-same-page
 * Your configuration settings as an associative array
 */

//Set required parameters for the lineplots.js
$configs = $document->getScriptOptions('mod_amu_plotly_bubbleplots');

//Get the parameters from the module settings in the backend
$params_array = $params;

//add the module-id-name for the div where the plotly charts will be placed
$params_array["module_id_name"] = "map-plotly-bubblegraph-" . $module->id;

$configs[$module->id] = $params_array;

// Add the script options to the "mod_amu_plotly_bubbleplots" module
$document->addScriptOptions('mod_amu_plotly_bubbleplots', $configs);
?>

<!-- Get the module class suffix-->
<div class="<?php echo $params->get("moduleclass_sfx");?>">
	
	<!-- Get the text to be displayed before the graph-->
	<div><?php echo $params->get("pretext");?> </div>

    <!-- Create DIV with unique id for the location to display the graph based on module id number-->
	<div id="<?php echo 'map-plotly-bubblegraph-'.$module->id;?>" class="plotly-bubblegraph" style='width: 100%; height: 600px;'></div>
	
	<!-- Get the text to be displayed after the graph-->	
	<div><?php echo $params->get("posttext");?></div>

</div>
