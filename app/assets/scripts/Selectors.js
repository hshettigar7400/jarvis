/**
 Framework for Responsive eLearning Development (FRED)
 Version 2.0
 Copyright © Upside Learning Solutions Pvt. Ltd.

 This is a legal agreement between you or the company, organization, employer, or other entity on behalf of whom you are entering into this agreement ("Purchaser") and Upside Learning Solutions Pvt. Ldt., a provider of learning solutions having its head office at Punakar Complex, Survey No-117, 1st Floor, Bangalore Pune Highway, Warje, Pune – 411058, Maharashtra, India, as the licensor hereunder ("Upside Learning"). The Purchaser has been granted a one-time non-exclusive non-transferable license for FRED v2.0. This grants permission to the Purchaser or any Purchaser employee to use this framework (including templates) and its associated documentation to:
 1.Modify the framework and templates as desired.
 2.Use the (modified) framework and templates to create eLearning content.

 The Purchaser may not resell or freely redistribute FRED or its associated documentation to anyone outside the Purchaser (including vendors, service providers, partners, clients or customers); nor may the Purchaser transfer this license to anyone.

 It is strongly recommended that the framework and template source files included in the packaged eLearning content (i.e. the output) should be minified prior to distribution, to restrict unauthorized access to the source.
 */

/**
 * @author Shivaji Babar
 * @name Files.js
 * @namespace FRED
 * @version 2.0
 */
function Selectors() {
    "use strict";
}

/**
 * Page container classes
 */
Selectors.modContainer = 'player-module';
Selectors.secContainer = 'player-section';
Selectors.topContainer = 'player-topic';
Selectors.pgContainer = 'player-page';
/**
 * Utility classes
 */
Selectors.disabled = 'disabled';
Selectors.selected = 'selected';
Selectors.visited = 'visited';
Selectors.active = 'mactive';
Selectors.hover = 'mhover';
Selectors.focus = 'mfocus';
Selectors.tabIndex = 'tabindex';
Selectors.buttonBox = 'button-box';
Selectors.accBackground = 'acc-prop-background';
/**
 * Mobile first mode navigation buttons to navigate through module
 */
Selectors.buttonNextModule = '#next-module-button';
Selectors.buttonPrevModule = '#prev-module-button';
Selectors.buttonScrollTopModule = '#back-top-button';
/**
 * Navigation buttons used to control global framework components
 */
Selectors.buttonExit = '#button-exit';
Selectors.buttonNext = '#button-next';
Selectors.buttonBack = '#button-back';
Selectors.buttonPlayPause = "#button-playPause";
Selectors.buttonReplay = "#button-replay";
Selectors.buttonAudio = "#button-audio";
Selectors.buttonPrint = '#button-print';

Selectors.buttonHelp = "#button-help";
Selectors.buttonMenu = "#button-menu";
Selectors.buttonTools = "#button-tools";
Selectors.buttonSearch = "#button-search";
Selectors.buttonNotepad = '#button-notepad';
Selectors.buttonContact = "#button-contact";
Selectors.buttonGlossary = '#button-glossary';
Selectors.buttonResources = '#button-resources';
Selectors.buttonTranscript = '#button-transcript';
Selectors.buttonAccessibility = '#button-accessibility';

Selectors.buttonTranscriptClose = '#transcript-close-button';
Selectors.buttonGlossaryClose = '#glossary-close-button';
Selectors.buttonResourcesClose = '#resource-close-button';
Selectors.buttonAccessibilityClose = '#accessibility-close-button';
Selectors.buttonNotepadClose = '#notepad-close-button';
Selectors.buttonMenuClose = '#menu-close-button';
Selectors.buttonHelpClose = '#help-close-button';
Selectors.buttonAutoPlay = ".button-autoPlay"
/**
 * Framework containers user to load different components
 */
Selectors.player = '#player';
Selectors.topBar = '#top-bar';
Selectors.bottomBar = '#bottom-bar';
Selectors.mfNavigation = '#mf-bottom-nav';
Selectors.container = '#content-wrapper';
Selectors.modalContainer = '#component-modal-panel';
Selectors.introContainer = '#intro-container';
Selectors.bookmarkContainer = '#player-bookmark';

Selectors.playerContainer = '#player-container';
Selectors.contentContainer = '#pages';
Selectors.accessibilityColorPalette = '#player-jscolor';

Selectors.scrollContainer = '#pages';
Selectors.helpContainer = '#player-help';
Selectors.menuContainer = '#player-menu';
Selectors.toolsContainer = '#player-tools';
Selectors.searchContainer = '#player-search';
Selectors.contactContainer = '#player-contact';
Selectors.glossaryContainer = '#player-glossary';
Selectors.notepadContainer = '#player-notepad';
Selectors.transcriptContainer = '#player-transcript';
Selectors.resourcesContainer = '#player-resources';
Selectors.accessibilityContainer = '#player-accessibility';
Selectors.printContainer = '#player-print';
Selectors.exitContainer = '#player-exit';
/**
 * Framework title selectors
 */
Selectors.courseTitle = '#courseTitle';
Selectors.modTitle = '#moduleTitle';
Selectors.secTitle = '#sectionTitle';
Selectors.topTitle = '#topicTitle';
Selectors.titleSeperator = '.icon-title-seperator';

/**AudioSlider */
Selectors.sliderBar = ".audio-slider-bar";
Selectors.sliderBarHandle = ".audio-slider-handle";
Selectors.sliderBufferBar = ".audio-slider-bar-buffer";
Selectors.sliderBarFill = ".audio-slider-bar-fill";