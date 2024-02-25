<?php
 
/**
 * @package     mod_amu_plotly_bubbleplots
 * @author      Pierre Veelen, amultis.dev
 * @copyright   Copyright (C) 2023 Pierre Veelen. All rights reserved.
 * @license     GNU General Public License version 2 or later.
 */

/*
 * No direct access to this file
 * - \defined checks global namespace 
 * - defined checks local namespace
 */
\defined('_JEXEC') or die;

/*
 * Import ModuleHelper to our current scope at the begin of the file. 
 * We need it later for displaying the output.
 */
use Joomla\CMS\Helper\ModuleHelper;

/*
 * Import Factory to our current scope at the begin of the file. 
 * We need it later for adding javascripts.
 */
use Joomla\CMS\Factory;

/*
 * Load Jquery, Needed for Plotly IS DAT WEL ZO ???
 *
 */
use Joomla\CMS\HTML\HTMLHelper;
HTMLHelper::_('jquery.framework');

/**
 * Load the generic plotly.js graphs library
 *
 */
$document = Factory::getDocument();
$document->addScript('https://cdn.plot.ly/plotly-2.25.2.min.js');

/*-- load actual visualisation */
$document->addScript('./media/mod_amu_plotly_bubbleplots/js/amu_plotly_bubbleplots.js');

/*-- load related styling */
/* mind the . which is not placed at the beginning of the file path ! */
$document->addStyleSheet('/media/mod_amu_plotly_bubbleplots/css/amu_plotly_bubbleplots.css');

/**
 * Get layout values from back-end setting tab advanced in $params 
 * This retrieves the 'layout' parameter. Note the second part
 * which states to use a default value of 'default' if the parameter 'layout' cannot be
 * retrieved for some reason
 * 
 */
$layout = $params->get('layout','default');

/**
 * This method returns the path to the layout file for the module.
 * Output depends if the layout has not been overridden or not. 
 * 
 */
require ModuleHelper::getLayoutpath('mod_amu_plotly_bubbleplots', $layout);
?>
