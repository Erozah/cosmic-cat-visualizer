// NAME: Cyber & Cosmic Cat Visualizer
// AUTHOR: Erozah
// DESCRIPTION: Modular visualizer with 2 discrete buttons (On/Off & Settings Dropdown), exclusive models/palettes, and composable independent background effects.

(function() {
if (!document.getElementById('cyber-cat-styles')) {
    const style = document.createElement('style');
    style.id = 'cyber-cat-styles';
    style.textContent = "/* src/styles/root.css - Root variables, Spotify layout locks, and glassmorphism */\n\n:root, html, body {\n    --spice-main: transparent !important;\n    --spice-sidebar: transparent !important;\n    --spice-player: transparent !important;\n    --spice-card: rgba(255, 255, 255, 0.04) !important;\n    --spice-main-elevated: rgba(255, 255, 255, 0.04) !important;\n    --spice-highlight: rgba(0, 240, 255, 0.12) !important;\n    --spice-highlight-elevated: rgba(0, 240, 255, 0.18) !important;\n    --background-base: transparent !important;\n    --background-elevated-base: transparent !important;\n    --background-tinted-base: transparent !important;\n    --background-highlight: transparent !important;\n    --background-press: transparent !important;\n    background: transparent !important;\n    background-color: transparent !important;\n}\n\nhtml, body {\n    height: 100vh !important;\n    min-height: 100vh !important;\n    max-height: 100vh !important;\n    width: 100vw !important;\n    overflow: hidden !important;\n    margin: 0 !important;\n    padding: 0 !important;\n}\n\n#main,\n.Root__top-container {\n    position: relative !important;\n    z-index: auto !important;\n    height: 100vh !important;\n    min-height: 100vh !important;\n    max-height: 100vh !important;\n    width: 100vw !important;\n    box-sizing: border-box !important;\n    background: transparent !important;\n}\n\n.Root__main-view {\n    position: relative !important;\n    z-index: 1 !important;\n    transition: background 0.3s ease !important;\n}\n\n/* Background Mode: Translucent glassmorphism so frozen visualizer shines through */\nbody.cyber-cat-bg-active .Root__main-view {\n    background: rgba(16, 14, 24, 0.70) !important;\n    backdrop-filter: blur(8px) !important;\n    -webkit-backdrop-filter: blur(8px) !important;\n}\n\nbody.cyber-cat-bg-active .playlist-playlist-playlistContent {\n    background: transparent !important;\n}\n\nbody.cyber-cat-bg-active .main-entityHeader-backgroundColor {\n    opacity: 0.65 !important;\n}\n\n/* Sidebars & Top Navigation Layers */\n.Root__nav-bar,\n.Root__right-sidebar {\n    position: relative !important;\n    z-index: 10 !important;\n}\n\n.Root__globalNav,\n.Root__top-bar {\n    position: relative !important;\n    z-index: 15 !important;\n}\n\n.Root__now-playing-bar {\n    position: relative !important;\n    z-index: 20 !important;\n}\n\n\n/* src/styles/canvas.css - Global fixed canvas wallpaper */\n\n#cyber-cat-canvas {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    z-index: 0 !important;\n    pointer-events: none !important;\n    display: none !important;\n    background: transparent !important;\n}\n\nbody.cyber-cat-visualizer-active #cyber-cat-canvas {\n    display: block !important;\n}\n\nbody.cyber-cat-fullscreen-active #cyber-cat-canvas {\n    z-index: 999999 !important;\n    pointer-events: auto !important;\n    cursor: pointer !important;\n}\n\n\n/* src/styles/transparency.css - Spotify UI transparency and glassmorphic panels (Active ONLY when visualizer is ON) */\n\nbody.cyber-cat-visualizer-active {\n    --spice-main: transparent !important;\n    --spice-sidebar: transparent !important;\n    --spice-player: transparent !important;\n    --spice-card: rgba(255, 255, 255, 0.04) !important;\n    --spice-main-elevated: rgba(255, 255, 255, 0.04) !important;\n}\n\nbody.cyber-cat-visualizer-active #main,\nbody.cyber-cat-visualizer-active .Root__top-container {\n    position: relative !important;\n    z-index: 1 !important;\n    background: transparent !important;\n    background-color: transparent !important;\n}\n\n/* Left Sidebar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__nav-bar,\nbody.cyber-cat-visualizer-active #Desktop_LeftSidebar_Id,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-navBar,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-library,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-libraryContainer,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-header,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-listContent,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-isScrolled,\nbody.cyber-cat-visualizer-active .main-rootlist-rootlist,\nbody.cyber-cat-visualizer-active .main-rootlist-wrapper,\nbody.cyber-cat-visualizer-active .main-navBar-mainNav,\nbody.cyber-cat-visualizer-active .main-navBar-navBar,\nbody.cyber-cat-visualizer-active .YourLibraryX,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-entryPoints {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Right Sidebar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__right-sidebar,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-container,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-content,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-nowPlayingWidget,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-section,\nbody.cyber-cat-visualizer-active .main-buddyFeed-container,\nbody.cyber-cat-visualizer-active .main-buddyFeed-content,\nbody.cyber-cat-visualizer-active .main-nowPlayingWidget-nowPlaying,\nbody.cyber-cat-visualizer-active .main-trackInfo-container,\nbody.cyber-cat-visualizer-active .main-trackInfo-trackInfo {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Top Navigation Bar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__top-bar,\nbody.cyber-cat-visualizer-active .Root__globalNav,\nbody.cyber-cat-visualizer-active .main-topBar-container,\nbody.cyber-cat-visualizer-active .main-topBar-background,\nbody.cyber-cat-visualizer-active .main-topBar-overlay,\nbody.cyber-cat-visualizer-active .main-topBar-historyButtons {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Bottom Player Bar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__now-playing-bar,\nbody.cyber-cat-visualizer-active .main-nowPlayingBar-container,\nbody.cyber-cat-visualizer-active .main-nowPlayingBar-nowPlayingBar {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Typography & Icon Readability Over Live Canvas */\nbody.cyber-cat-visualizer-active .Root__nav-bar button,\nbody.cyber-cat-visualizer-active .Root__nav-bar a,\nbody.cyber-cat-visualizer-active .Root__nav-bar span,\nbody.cyber-cat-visualizer-active .Root__now-playing-bar button,\nbody.cyber-cat-visualizer-active .Root__now-playing-bar span {\n    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8) !important;\n}\n\n\n/* src/styles/mainView.css - Dynamic central view visibility & transparency (Active ONLY when visualizer is ON) */\n\n/* 1. VISUALIZER ACTIVE: Central Spotify page content hidden to free the cat */\nbody.cyber-cat-visualizer-active .Root__main-view,\nbody.cyber-cat-visualizer-active main,\nbody.cyber-cat-visualizer-active .main-view-container {\n    background: transparent !important;\n    background-color: transparent !important;\n    box-shadow: none !important;\n    border: none !important;\n    border-radius: 0 !important;\n}\n\nbody.cyber-cat-visualizer-active .Root__main-view .main-view-container__scroll-node,\nbody.cyber-cat-visualizer-active .Root__main-view .main-view-container__scroll-node-child,\nbody.cyber-cat-visualizer-active .Root__main-view .os-viewport,\nbody.cyber-cat-visualizer-active .Root__main-view .os-host,\nbody.cyber-cat-visualizer-active .Root__main-view .under-main-view,\nbody.cyber-cat-visualizer-active .Root__main-view .main-home-homeHeader,\nbody.cyber-cat-visualizer-active .Root__main-view .main-actionBarBackground-background,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-background,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-overlay,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-container,\nbody.cyber-cat-visualizer-active .Root__main-view .main-trackList-trackList,\nbody.cyber-cat-visualizer-active .Root__main-view .main-gridContainer-gridContainer {\n    opacity: 0 !important;\n    pointer-events: none !important;\n    visibility: hidden !important;\n    transition: opacity 0.25s ease, visibility 0.25s ease !important;\n}\n\n\n/* src/styles/dropdown.css - Glassmorphic settings dropdown panel & toggles */\n\n#cosmic-cat-settings-dropdown,\n#cosmic-cat-settings-dropdown * {\n    box-sizing: border-box !important;\n}\n\n#cosmic-cat-settings-dropdown {\n    position: fixed !important;\n    z-index: 99999999 !important;\n    width: 320px !important;\n    max-width: 90vw !important;\n    background: rgba(12, 10, 26, 0.94) !important;\n    backdrop-filter: blur(20px) !important;\n    -webkit-backdrop-filter: blur(20px) !important;\n    border: 1px solid rgba(0, 240, 255, 0.35) !important;\n    border-radius: 16px !important;\n    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.75), 0 0 20px rgba(0, 240, 255, 0.2) !important;\n    padding: 16px !important;\n    font-family: inherit !important;\n    color: #ffffff !important;\n    pointer-events: auto !important;\n    user-select: none !important;\n    opacity: 0 !important;\n    visibility: hidden !important;\n    transform: translateY(10px) scale(0.96) !important;\n    transition: opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1),\n                transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),\n                visibility 0.22s ease !important;\n}\n\n#cosmic-cat-settings-dropdown.open {\n    opacity: 1 !important;\n    visibility: visible !important;\n    transform: translateY(0) scale(1) !important;\n}\n\n/* Header */\n.dropdown-header {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding-bottom: 12px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;\n    margin-bottom: 12px !important;\n}\n\n.dropdown-title {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n    font-size: 13px !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.5px !important;\n    color: #00f0ff !important;\n}\n\n.dropdown-close-btn {\n    background: transparent !important;\n    border: 0 !important;\n    color: rgba(255, 255, 255, 0.6) !important;\n    font-size: 16px !important;\n    cursor: pointer !important;\n    padding: 2px 6px !important;\n    border-radius: 6px !important;\n    transition: all 0.15s ease !important;\n}\n\n.dropdown-close-btn:hover {\n    color: #ffffff !important;\n    background: rgba(255, 255, 255, 0.15) !important;\n}\n\n/* Section Common */\n.dropdown-section {\n    margin-bottom: 14px !important;\n}\n\n.section-label {\n    font-size: 10px !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.8px !important;\n    text-transform: uppercase !important;\n    color: rgba(255, 255, 255, 0.5) !important;\n    margin-bottom: 8px !important;\n}\n\n/* Model Selector Grid (Exclusive) */\n.model-selector-grid {\n    display: grid !important;\n    grid-template-columns: 1fr 1fr !important;\n    gap: 8px !important;\n}\n\n.model-btn {\n    background: rgba(255, 255, 255, 0.05) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 10px !important;\n    padding: 8px 10px !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    gap: 6px !important;\n    cursor: pointer !important;\n    text-align: center !important;\n    color: #ffffff !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    outline: none !important;\n    white-space: nowrap !important;\n}\n\n.model-btn:hover {\n    background: rgba(255, 255, 255, 0.1) !important;\n    border-color: rgba(0, 240, 255, 0.5) !important;\n    transform: translateY(-1px) !important;\n}\n\n.model-btn.active {\n    background: rgba(0, 240, 255, 0.15) !important;\n    border-color: #00f0ff !important;\n    box-shadow: 0 0 12px rgba(0, 240, 255, 0.3) !important;\n}\n\n.model-icon {\n    font-size: 16px !important;\n    line-height: 1 !important;\n    flex-shrink: 0 !important;\n}\n\n.model-name {\n    font-size: 12px !important;\n    font-weight: 700 !important;\n    color: #ffffff !important;\n}\n\n.model-btn.active .model-name {\n    color: #00f0ff !important;\n}\n\n/* Palette Swatches Row (Exclusive) */\n.palette-swatches-row {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 6px !important;\n    padding: 4px 0 !important;\n}\n\n.dropdown-palette-btn {\n    width: 24px !important;\n    height: 24px !important;\n    border-radius: 50% !important;\n    border: 2px solid rgba(255, 255, 255, 0.3) !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    cursor: pointer !important;\n    outline: none !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n.dropdown-palette-btn:hover {\n    transform: scale(1.3) !important;\n    border-color: #ffffff !important;\n    box-shadow: 0 0 10px currentColor !important;\n}\n\n.dropdown-palette-btn.active {\n    transform: scale(1.35) !important;\n    border-color: #ffffff !important;\n    box-shadow: 0 0 14px currentColor, 0 0 4px #ffffff !important;\n}\n\n/* Effects Toggle List (Independent) */\n.effects-toggle-list {\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 6px !important;\n}\n\n.effect-toggle-item {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 5px 8px !important;\n    background: rgba(255, 255, 255, 0.03) !important;\n    border-radius: 8px !important;\n    cursor: pointer !important;\n    transition: background 0.15s ease !important;\n}\n\n.effect-toggle-item:hover {\n    background: rgba(255, 255, 255, 0.07) !important;\n}\n\n.effect-info {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n}\n\n.effect-icon {\n    font-size: 14px !important;\n}\n\n.effect-name {\n    font-size: 11px !important;\n    font-weight: 500 !important;\n    color: rgba(255, 255, 255, 0.9) !important;\n}\n\n/* Animated Switch */\n.toggle-checkbox {\n    display: none !important;\n}\n\n.toggle-switch {\n    position: relative !important;\n    width: 32px !important;\n    height: 18px !important;\n    background: rgba(255, 255, 255, 0.2) !important;\n    border-radius: 999px !important;\n    transition: background 0.2s ease !important;\n    flex-shrink: 0 !important;\n}\n\n.toggle-switch::after {\n    content: '' !important;\n    position: absolute !important;\n    top: 2px !important;\n    left: 2px !important;\n    width: 14px !important;\n    height: 14px !important;\n    background: #ffffff !important;\n    border-radius: 50% !important;\n    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n.toggle-checkbox:checked + .toggle-switch {\n    background: #00f0ff !important;\n    box-shadow: 0 0 8px rgba(0, 240, 255, 0.5) !important;\n}\n\n.toggle-checkbox:checked + .toggle-switch::after {\n    transform: translateX(14px) !important;\n}\n\n/* Footer */\n.dropdown-footer {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding-top: 10px !important;\n    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;\n    font-size: 10px !important;\n    color: rgba(255, 255, 255, 0.4) !important;\n}\n\n.footer-action-btn {\n    background: rgba(255, 255, 255, 0.08) !important;\n    border: 1px solid rgba(255, 255, 255, 0.15) !important;\n    color: #ffffff !important;\n    padding: 3px 8px !important;\n    border-radius: 6px !important;\n    font-size: 10px !important;\n    cursor: pointer !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 4px !important;\n    transition: all 0.15s ease !important;\n}\n\n.footer-action-btn:hover {\n    background: rgba(0, 240, 255, 0.2) !important;\n    border-color: #00f0ff !important;\n    color: #00f0ff !important;\n}\n\n.footer-hint kbd {\n    background: rgba(255, 255, 255, 0.12) !important;\n    padding: 1px 4px !important;\n    border-radius: 3px !important;\n    color: #00f0ff !important;\n    font-family: inherit !important;\n}\n\n\n/* src/styles/fullscreen.css - Fullscreen immersion mode and floating toast hint */\n\nbody.cyber-cat-fullscreen-active #cyber-cat-panel,\n#cyber-cat-panel.fullscreen {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    z-index: 999999 !important;\n    border-radius: 0 !important;\n    cursor: pointer !important;\n}\n\n#cyber-cat-fs-hint {\n    position: fixed !important;\n    bottom: 24px !important;\n    left: 50% !important;\n    transform: translateX(-50%) translateY(20px) !important;\n    background: rgba(12, 10, 28, 0.9) !important;\n    border: 1px solid rgba(0, 240, 255, 0.5) !important;\n    color: #ffffff !important;\n    padding: 8px 18px !important;\n    border-radius: 20px !important;\n    font-size: 13px !important;\n    font-weight: 500 !important;\n    box-shadow: 0 4px 20px rgba(0, 240, 255, 0.25) !important;\n    z-index: 1000000 !important;\n    pointer-events: none !important;\n    opacity: 0 !important;\n    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n#cyber-cat-fs-hint.visible {\n    opacity: 1 !important;\n    transform: translateX(-50%) translateY(0) !important;\n}\n\n\n/* src/styles/playbar.css - The 2 discrete playbar buttons: On/Off & Settings Gear */\n\n.cosmic-playbar-btn {\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    position: relative !important;\n    cursor: pointer !important;\n    background: transparent !important;\n    border: 0 !important;\n    padding: 0 4px !important;\n    margin: 0 2px !important;\n    color: var(--spice-subtext, rgba(255, 255, 255, 0.65)) !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    outline: none !important;\n}\n\n.cosmic-playbar-btn:hover {\n    color: #00f0ff !important;\n    transform: scale(1.15) !important;\n    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.6)) !important;\n}\n\n#cosmic-cat-toggle-btn.active {\n    color: #00f0ff !important;\n    transform: scale(1.1) !important;\n    filter: drop-shadow(0 0 8px currentColor) !important;\n}\n\n#cosmic-cat-toggle-btn:not(.active) {\n    opacity: 0.55 !important;\n    filter: none !important;\n}\n\n#cosmic-cat-settings-btn:hover {\n    transform: rotate(30deg) scale(1.15) !important;\n}\n\n/* Toast & Notification Stacking Fix */\n.notistack-SnackbarContainer {\n    z-index: 99999999 !important;\n}\n\n.notistack-SnackbarContainer .notistack-Snackbar,\n.notistack-SnackbarContainer [class*=\"Snackbar\"],\n.main-notificationBubble-notificationBubble,\n.Root__notification-bar,\n[data-testid=\"toast-box\"],\ndiv[role=\"alert\"],\ndiv[role=\"status\"] {\n    background: rgba(18, 14, 32, 0.96) !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(0, 240, 255, 0.4) !important;\n    border-radius: 8px !important;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 240, 255, 0.2) !important;\n}\n";
    document.head.appendChild(style);
} else {
    document.getElementById('cyber-cat-styles').textContent = "/* src/styles/root.css - Root variables, Spotify layout locks, and glassmorphism */\n\n:root, html, body {\n    --spice-main: transparent !important;\n    --spice-sidebar: transparent !important;\n    --spice-player: transparent !important;\n    --spice-card: rgba(255, 255, 255, 0.04) !important;\n    --spice-main-elevated: rgba(255, 255, 255, 0.04) !important;\n    --spice-highlight: rgba(0, 240, 255, 0.12) !important;\n    --spice-highlight-elevated: rgba(0, 240, 255, 0.18) !important;\n    --background-base: transparent !important;\n    --background-elevated-base: transparent !important;\n    --background-tinted-base: transparent !important;\n    --background-highlight: transparent !important;\n    --background-press: transparent !important;\n    background: transparent !important;\n    background-color: transparent !important;\n}\n\nhtml, body {\n    height: 100vh !important;\n    min-height: 100vh !important;\n    max-height: 100vh !important;\n    width: 100vw !important;\n    overflow: hidden !important;\n    margin: 0 !important;\n    padding: 0 !important;\n}\n\n#main,\n.Root__top-container {\n    position: relative !important;\n    z-index: auto !important;\n    height: 100vh !important;\n    min-height: 100vh !important;\n    max-height: 100vh !important;\n    width: 100vw !important;\n    box-sizing: border-box !important;\n    background: transparent !important;\n}\n\n.Root__main-view {\n    position: relative !important;\n    z-index: 1 !important;\n    transition: background 0.3s ease !important;\n}\n\n/* Background Mode: Translucent glassmorphism so frozen visualizer shines through */\nbody.cyber-cat-bg-active .Root__main-view {\n    background: rgba(16, 14, 24, 0.70) !important;\n    backdrop-filter: blur(8px) !important;\n    -webkit-backdrop-filter: blur(8px) !important;\n}\n\nbody.cyber-cat-bg-active .playlist-playlist-playlistContent {\n    background: transparent !important;\n}\n\nbody.cyber-cat-bg-active .main-entityHeader-backgroundColor {\n    opacity: 0.65 !important;\n}\n\n/* Sidebars & Top Navigation Layers */\n.Root__nav-bar,\n.Root__right-sidebar {\n    position: relative !important;\n    z-index: 10 !important;\n}\n\n.Root__globalNav,\n.Root__top-bar {\n    position: relative !important;\n    z-index: 15 !important;\n}\n\n.Root__now-playing-bar {\n    position: relative !important;\n    z-index: 20 !important;\n}\n\n\n/* src/styles/canvas.css - Global fixed canvas wallpaper */\n\n#cyber-cat-canvas {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    z-index: 0 !important;\n    pointer-events: none !important;\n    display: none !important;\n    background: transparent !important;\n}\n\nbody.cyber-cat-visualizer-active #cyber-cat-canvas {\n    display: block !important;\n}\n\nbody.cyber-cat-fullscreen-active #cyber-cat-canvas {\n    z-index: 999999 !important;\n    pointer-events: auto !important;\n    cursor: pointer !important;\n}\n\n\n/* src/styles/transparency.css - Spotify UI transparency and glassmorphic panels (Active ONLY when visualizer is ON) */\n\nbody.cyber-cat-visualizer-active {\n    --spice-main: transparent !important;\n    --spice-sidebar: transparent !important;\n    --spice-player: transparent !important;\n    --spice-card: rgba(255, 255, 255, 0.04) !important;\n    --spice-main-elevated: rgba(255, 255, 255, 0.04) !important;\n}\n\nbody.cyber-cat-visualizer-active #main,\nbody.cyber-cat-visualizer-active .Root__top-container {\n    position: relative !important;\n    z-index: 1 !important;\n    background: transparent !important;\n    background-color: transparent !important;\n}\n\n/* Left Sidebar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__nav-bar,\nbody.cyber-cat-visualizer-active #Desktop_LeftSidebar_Id,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-navBar,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-library,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-libraryContainer,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-header,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-listContent,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-isScrolled,\nbody.cyber-cat-visualizer-active .main-rootlist-rootlist,\nbody.cyber-cat-visualizer-active .main-rootlist-wrapper,\nbody.cyber-cat-visualizer-active .main-navBar-mainNav,\nbody.cyber-cat-visualizer-active .main-navBar-navBar,\nbody.cyber-cat-visualizer-active .YourLibraryX,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-entryPoints {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Right Sidebar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__right-sidebar,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-container,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-content,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-nowPlayingWidget,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-section,\nbody.cyber-cat-visualizer-active .main-buddyFeed-container,\nbody.cyber-cat-visualizer-active .main-buddyFeed-content,\nbody.cyber-cat-visualizer-active .main-nowPlayingWidget-nowPlaying,\nbody.cyber-cat-visualizer-active .main-trackInfo-container,\nbody.cyber-cat-visualizer-active .main-trackInfo-trackInfo {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Top Navigation Bar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__top-bar,\nbody.cyber-cat-visualizer-active .Root__globalNav,\nbody.cyber-cat-visualizer-active .main-topBar-container,\nbody.cyber-cat-visualizer-active .main-topBar-background,\nbody.cyber-cat-visualizer-active .main-topBar-overlay,\nbody.cyber-cat-visualizer-active .main-topBar-historyButtons {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Bottom Player Bar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__now-playing-bar,\nbody.cyber-cat-visualizer-active .main-nowPlayingBar-container,\nbody.cyber-cat-visualizer-active .main-nowPlayingBar-nowPlayingBar {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Typography & Icon Readability Over Live Canvas */\nbody.cyber-cat-visualizer-active .Root__nav-bar button,\nbody.cyber-cat-visualizer-active .Root__nav-bar a,\nbody.cyber-cat-visualizer-active .Root__nav-bar span,\nbody.cyber-cat-visualizer-active .Root__now-playing-bar button,\nbody.cyber-cat-visualizer-active .Root__now-playing-bar span {\n    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8) !important;\n}\n\n\n/* src/styles/mainView.css - Dynamic central view visibility & transparency (Active ONLY when visualizer is ON) */\n\n/* 1. VISUALIZER ACTIVE: Central Spotify page content hidden to free the cat */\nbody.cyber-cat-visualizer-active .Root__main-view,\nbody.cyber-cat-visualizer-active main,\nbody.cyber-cat-visualizer-active .main-view-container {\n    background: transparent !important;\n    background-color: transparent !important;\n    box-shadow: none !important;\n    border: none !important;\n    border-radius: 0 !important;\n}\n\nbody.cyber-cat-visualizer-active .Root__main-view .main-view-container__scroll-node,\nbody.cyber-cat-visualizer-active .Root__main-view .main-view-container__scroll-node-child,\nbody.cyber-cat-visualizer-active .Root__main-view .os-viewport,\nbody.cyber-cat-visualizer-active .Root__main-view .os-host,\nbody.cyber-cat-visualizer-active .Root__main-view .under-main-view,\nbody.cyber-cat-visualizer-active .Root__main-view .main-home-homeHeader,\nbody.cyber-cat-visualizer-active .Root__main-view .main-actionBarBackground-background,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-background,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-overlay,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-container,\nbody.cyber-cat-visualizer-active .Root__main-view .main-trackList-trackList,\nbody.cyber-cat-visualizer-active .Root__main-view .main-gridContainer-gridContainer {\n    opacity: 0 !important;\n    pointer-events: none !important;\n    visibility: hidden !important;\n    transition: opacity 0.25s ease, visibility 0.25s ease !important;\n}\n\n\n/* src/styles/dropdown.css - Glassmorphic settings dropdown panel & toggles */\n\n#cosmic-cat-settings-dropdown,\n#cosmic-cat-settings-dropdown * {\n    box-sizing: border-box !important;\n}\n\n#cosmic-cat-settings-dropdown {\n    position: fixed !important;\n    z-index: 99999999 !important;\n    width: 320px !important;\n    max-width: 90vw !important;\n    background: rgba(12, 10, 26, 0.94) !important;\n    backdrop-filter: blur(20px) !important;\n    -webkit-backdrop-filter: blur(20px) !important;\n    border: 1px solid rgba(0, 240, 255, 0.35) !important;\n    border-radius: 16px !important;\n    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.75), 0 0 20px rgba(0, 240, 255, 0.2) !important;\n    padding: 16px !important;\n    font-family: inherit !important;\n    color: #ffffff !important;\n    pointer-events: auto !important;\n    user-select: none !important;\n    opacity: 0 !important;\n    visibility: hidden !important;\n    transform: translateY(10px) scale(0.96) !important;\n    transition: opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1),\n                transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),\n                visibility 0.22s ease !important;\n}\n\n#cosmic-cat-settings-dropdown.open {\n    opacity: 1 !important;\n    visibility: visible !important;\n    transform: translateY(0) scale(1) !important;\n}\n\n/* Header */\n.dropdown-header {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding-bottom: 12px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;\n    margin-bottom: 12px !important;\n}\n\n.dropdown-title {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n    font-size: 13px !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.5px !important;\n    color: #00f0ff !important;\n}\n\n.dropdown-close-btn {\n    background: transparent !important;\n    border: 0 !important;\n    color: rgba(255, 255, 255, 0.6) !important;\n    font-size: 16px !important;\n    cursor: pointer !important;\n    padding: 2px 6px !important;\n    border-radius: 6px !important;\n    transition: all 0.15s ease !important;\n}\n\n.dropdown-close-btn:hover {\n    color: #ffffff !important;\n    background: rgba(255, 255, 255, 0.15) !important;\n}\n\n/* Section Common */\n.dropdown-section {\n    margin-bottom: 14px !important;\n}\n\n.section-label {\n    font-size: 10px !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.8px !important;\n    text-transform: uppercase !important;\n    color: rgba(255, 255, 255, 0.5) !important;\n    margin-bottom: 8px !important;\n}\n\n/* Model Selector Grid (Exclusive) */\n.model-selector-grid {\n    display: grid !important;\n    grid-template-columns: 1fr 1fr !important;\n    gap: 8px !important;\n}\n\n.model-btn {\n    background: rgba(255, 255, 255, 0.05) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 10px !important;\n    padding: 8px 10px !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    gap: 6px !important;\n    cursor: pointer !important;\n    text-align: center !important;\n    color: #ffffff !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    outline: none !important;\n    white-space: nowrap !important;\n}\n\n.model-btn:hover {\n    background: rgba(255, 255, 255, 0.1) !important;\n    border-color: rgba(0, 240, 255, 0.5) !important;\n    transform: translateY(-1px) !important;\n}\n\n.model-btn.active {\n    background: rgba(0, 240, 255, 0.15) !important;\n    border-color: #00f0ff !important;\n    box-shadow: 0 0 12px rgba(0, 240, 255, 0.3) !important;\n}\n\n.model-icon {\n    font-size: 16px !important;\n    line-height: 1 !important;\n    flex-shrink: 0 !important;\n}\n\n.model-name {\n    font-size: 12px !important;\n    font-weight: 700 !important;\n    color: #ffffff !important;\n}\n\n.model-btn.active .model-name {\n    color: #00f0ff !important;\n}\n\n/* Palette Swatches Row (Exclusive) */\n.palette-swatches-row {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 6px !important;\n    padding: 4px 0 !important;\n}\n\n.dropdown-palette-btn {\n    width: 24px !important;\n    height: 24px !important;\n    border-radius: 50% !important;\n    border: 2px solid rgba(255, 255, 255, 0.3) !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    cursor: pointer !important;\n    outline: none !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n.dropdown-palette-btn:hover {\n    transform: scale(1.3) !important;\n    border-color: #ffffff !important;\n    box-shadow: 0 0 10px currentColor !important;\n}\n\n.dropdown-palette-btn.active {\n    transform: scale(1.35) !important;\n    border-color: #ffffff !important;\n    box-shadow: 0 0 14px currentColor, 0 0 4px #ffffff !important;\n}\n\n/* Effects Toggle List (Independent) */\n.effects-toggle-list {\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 6px !important;\n}\n\n.effect-toggle-item {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 5px 8px !important;\n    background: rgba(255, 255, 255, 0.03) !important;\n    border-radius: 8px !important;\n    cursor: pointer !important;\n    transition: background 0.15s ease !important;\n}\n\n.effect-toggle-item:hover {\n    background: rgba(255, 255, 255, 0.07) !important;\n}\n\n.effect-info {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n}\n\n.effect-icon {\n    font-size: 14px !important;\n}\n\n.effect-name {\n    font-size: 11px !important;\n    font-weight: 500 !important;\n    color: rgba(255, 255, 255, 0.9) !important;\n}\n\n/* Animated Switch */\n.toggle-checkbox {\n    display: none !important;\n}\n\n.toggle-switch {\n    position: relative !important;\n    width: 32px !important;\n    height: 18px !important;\n    background: rgba(255, 255, 255, 0.2) !important;\n    border-radius: 999px !important;\n    transition: background 0.2s ease !important;\n    flex-shrink: 0 !important;\n}\n\n.toggle-switch::after {\n    content: '' !important;\n    position: absolute !important;\n    top: 2px !important;\n    left: 2px !important;\n    width: 14px !important;\n    height: 14px !important;\n    background: #ffffff !important;\n    border-radius: 50% !important;\n    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n.toggle-checkbox:checked + .toggle-switch {\n    background: #00f0ff !important;\n    box-shadow: 0 0 8px rgba(0, 240, 255, 0.5) !important;\n}\n\n.toggle-checkbox:checked + .toggle-switch::after {\n    transform: translateX(14px) !important;\n}\n\n/* Footer */\n.dropdown-footer {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding-top: 10px !important;\n    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;\n    font-size: 10px !important;\n    color: rgba(255, 255, 255, 0.4) !important;\n}\n\n.footer-action-btn {\n    background: rgba(255, 255, 255, 0.08) !important;\n    border: 1px solid rgba(255, 255, 255, 0.15) !important;\n    color: #ffffff !important;\n    padding: 3px 8px !important;\n    border-radius: 6px !important;\n    font-size: 10px !important;\n    cursor: pointer !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 4px !important;\n    transition: all 0.15s ease !important;\n}\n\n.footer-action-btn:hover {\n    background: rgba(0, 240, 255, 0.2) !important;\n    border-color: #00f0ff !important;\n    color: #00f0ff !important;\n}\n\n.footer-hint kbd {\n    background: rgba(255, 255, 255, 0.12) !important;\n    padding: 1px 4px !important;\n    border-radius: 3px !important;\n    color: #00f0ff !important;\n    font-family: inherit !important;\n}\n\n\n/* src/styles/fullscreen.css - Fullscreen immersion mode and floating toast hint */\n\nbody.cyber-cat-fullscreen-active #cyber-cat-panel,\n#cyber-cat-panel.fullscreen {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    z-index: 999999 !important;\n    border-radius: 0 !important;\n    cursor: pointer !important;\n}\n\n#cyber-cat-fs-hint {\n    position: fixed !important;\n    bottom: 24px !important;\n    left: 50% !important;\n    transform: translateX(-50%) translateY(20px) !important;\n    background: rgba(12, 10, 28, 0.9) !important;\n    border: 1px solid rgba(0, 240, 255, 0.5) !important;\n    color: #ffffff !important;\n    padding: 8px 18px !important;\n    border-radius: 20px !important;\n    font-size: 13px !important;\n    font-weight: 500 !important;\n    box-shadow: 0 4px 20px rgba(0, 240, 255, 0.25) !important;\n    z-index: 1000000 !important;\n    pointer-events: none !important;\n    opacity: 0 !important;\n    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n#cyber-cat-fs-hint.visible {\n    opacity: 1 !important;\n    transform: translateX(-50%) translateY(0) !important;\n}\n\n\n/* src/styles/playbar.css - The 2 discrete playbar buttons: On/Off & Settings Gear */\n\n.cosmic-playbar-btn {\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    position: relative !important;\n    cursor: pointer !important;\n    background: transparent !important;\n    border: 0 !important;\n    padding: 0 4px !important;\n    margin: 0 2px !important;\n    color: var(--spice-subtext, rgba(255, 255, 255, 0.65)) !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    outline: none !important;\n}\n\n.cosmic-playbar-btn:hover {\n    color: #00f0ff !important;\n    transform: scale(1.15) !important;\n    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.6)) !important;\n}\n\n#cosmic-cat-toggle-btn.active {\n    color: #00f0ff !important;\n    transform: scale(1.1) !important;\n    filter: drop-shadow(0 0 8px currentColor) !important;\n}\n\n#cosmic-cat-toggle-btn:not(.active) {\n    opacity: 0.55 !important;\n    filter: none !important;\n}\n\n#cosmic-cat-settings-btn:hover {\n    transform: rotate(30deg) scale(1.15) !important;\n}\n\n/* Toast & Notification Stacking Fix */\n.notistack-SnackbarContainer {\n    z-index: 99999999 !important;\n}\n\n.notistack-SnackbarContainer .notistack-Snackbar,\n.notistack-SnackbarContainer [class*=\"Snackbar\"],\n.main-notificationBubble-notificationBubble,\n.Root__notification-bar,\n[data-testid=\"toast-box\"],\ndiv[role=\"alert\"],\ndiv[role=\"status\"] {\n    background: rgba(18, 14, 32, 0.96) !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(0, 240, 255, 0.4) !important;\n    border-radius: 8px !important;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 240, 255, 0.2) !important;\n}\n";
}


// --- Module: theme/palettesData.js ---
// src/theme/palettesData.js - Curated color palettes data for Cyber & Cosmic Cat Visualizer

const VisualizerPalettes = {
    cyberpunk: {
        id: "cyberpunk",
        name: "Cyberpunk Neon",
        primary: "#00f0ff",     // Laser Cyan
        accent: "#ff007f",      // Hot Neon Pink
        secondary: "#9d4edd",   // Electric Purple
        core: "#ffffff",        // Brilliant Starlight
        glow: "rgba(0, 240, 255, 0.4)",
        starGlow: "rgba(255, 0, 127, 0.35)",
        shockwave: "#00f0ff",
        ambient: "rgba(10, 5, 25, 0.85)",
        rgb: {
            primary: [0, 240, 255],
            accent: [255, 0, 127],
            secondary: [157, 78, 221],
            deepNebula: [12, 6, 28],
            starlight: [255, 255, 255]
        }
    },
    celestial: {
        id: "celestial",
        name: "Celestial Galaxy",
        primary: "#4cc9f0",     // Astral Blue
        accent: "#b5179e",      // Galactic Magenta
        secondary: "#7209b7",   // Deep Cosmic Violet
        core: "#f8f9fa",        // Pure Starlight White
        glow: "rgba(76, 201, 240, 0.4)",
        starGlow: "rgba(181, 23, 158, 0.35)",
        shockwave: "#4cc9f0",
        ambient: "rgba(8, 4, 22, 0.85)",
        rgb: {
            primary: [76, 201, 240],
            accent: [181, 23, 158],
            secondary: [114, 9, 183],
            deepNebula: [10, 5, 26],
            starlight: [248, 249, 250]
        }
    },
    solar: {
        id: "solar",
        name: "Solar Flare",
        primary: "#ffb703",     // Solar Gold
        accent: "#ff4d6d",      // Plasma Rose
        secondary: "#fb8500",   // Hyperion Orange
        core: "#fff3b0",        // Solar Flare White
        glow: "rgba(255, 183, 3, 0.4)",
        starGlow: "rgba(255, 77, 109, 0.35)",
        shockwave: "#ffb703",
        ambient: "rgba(20, 8, 5, 0.85)",
        rgb: {
            primary: [255, 183, 3],
            accent: [255, 77, 109],
            secondary: [251, 133, 0],
            deepNebula: [28, 10, 6],
            starlight: [255, 243, 176]
        }
    },
    aurora: {
        id: "aurora",
        name: "Emerald Aurora",
        primary: "#00f5d4",     // Radiant Mint
        accent: "#7b2cbf",      // Mystic Violet
        secondary: "#06d6a0",   // Aurora Emerald
        core: "#ffffff",        // Starlight
        glow: "rgba(0, 245, 212, 0.4)",
        starGlow: "rgba(123, 44, 191, 0.35)",
        shockwave: "#00f5d4",
        ambient: "rgba(4, 18, 16, 0.85)",
        rgb: {
            primary: [0, 245, 212],
            accent: [123, 44, 191],
            secondary: [6, 214, 160],
            deepNebula: [6, 24, 20],
            starlight: [255, 255, 255]
        }
    },
    amethyst: {
        id: "amethyst",
        name: "Amethyst Prism",
        primary: "#c77dff",     // Amethyst Neon
        accent: "#e0aaff",      // Crystal Lilac
        secondary: "#5a189a",   // Deep Abyss Purple
        core: "#ffffff",        // Diamond White
        glow: "rgba(199, 125, 255, 0.4)",
        starGlow: "rgba(224, 170, 255, 0.35)",
        shockwave: "#c77dff",
        ambient: "rgba(12, 6, 24, 0.85)",
        rgb: {
            primary: [199, 125, 255],
            accent: [224, 170, 255],
            secondary: [90, 24, 154],
            deepNebula: [16, 6, 32],
            starlight: [255, 255, 255]
        }
    }
};


// --- Module: theme/paletteHelpers.js ---
// src/theme/paletteHelpers.js - Dynamic color alpha decorators for palettes

function decoratePalette(raw) {
    const rgb = raw.rgb || {
        primary: [0, 240, 255],
        accent: [255, 0, 127],
        secondary: [157, 78, 221],
        deepNebula: [12, 6, 28],
        starlight: [255, 255, 255]
    };

    const p = { ...raw };
    const clampAlpha = (a) => Math.max(0, Math.min(1, a));

    p.primaryAlpha = (a) => `rgba(${rgb.primary[0]}, ${rgb.primary[1]}, ${rgb.primary[2]}, ${clampAlpha(a)})`;
    p.accentAlpha = (a) => `rgba(${rgb.accent[0]}, ${rgb.accent[1]}, ${rgb.accent[2]}, ${clampAlpha(a)})`;
    p.secondaryAlpha = (a) => `rgba(${rgb.secondary[0]}, ${rgb.secondary[1]}, ${rgb.secondary[2]}, ${clampAlpha(a)})`;
    p.deepNebulaAlpha = (a) => `rgba(${rgb.deepNebula[0]}, ${rgb.deepNebula[1]}, ${rgb.deepNebula[2]}, ${clampAlpha(a)})`;
    p.starlightAlpha = (a) => `rgba(${rgb.starlight[0]}, ${rgb.starlight[1]}, ${rgb.starlight[2]}, ${clampAlpha(a)})`;

    return p;
}


// --- Module: theme/PaletteManager.js ---
// src/theme/PaletteManager.js - State manager for visualizer color themes

class PaletteManager {
    constructor() {
        this.paletteKeys = Object.keys(VisualizerPalettes);
        this.currentIndex = 0;
        this.current = decoratePalette(VisualizerPalettes[this.paletteKeys[0]]);
    }

    setPalette(id, immediate = true) {
        if (!VisualizerPalettes[id]) return;
        this.currentIndex = this.paletteKeys.indexOf(id);
        this.current = decoratePalette(VisualizerPalettes[id]);
    }

    nextPalette() {
        this.currentIndex = (this.currentIndex + 1) % this.paletteKeys.length;
        const nextId = this.paletteKeys[this.currentIndex];
        this.setPalette(nextId, true);
        return this.current;
    }

    get active() {
        return this.current;
    }
}


// --- Module: audio/spotifyHooks.js ---
// src/audio/spotifyHooks.js - Spicetify Player lifecycle hooks and event listeners

function setupSpotifyHooks(engine) {
    if (typeof Spicetify === "undefined" || !Spicetify.Player) return;

    try {
        engine.isPlaying = Spicetify.Player.isPlaying();

        Spicetify.Player.addEventListener("onplaypause", () => {
            engine.isPlaying = Spicetify.Player.isPlaying();
        });

        Spicetify.Player.addEventListener("onprogress", (e) => {
            if (e && e.data) {
                engine.progress = e.data;
            }
        });

        Spicetify.Player.addEventListener("songchange", () => {
            engine.updateTrackInfo();
        });

        engine.updateTrackInfo();
    } catch (err) {
        console.warn("[AudioEngine] Spotify hooks warning:", err);
    }
}


// --- Module: audio/tempoEstimator.js ---
// src/audio/tempoEstimator.js - Algorithmic tempo & duration extraction

function estimateTrackTempo(trackUri = "", trackName = "") {
    const raw = (trackUri + trackName).split("");
    const hash = raw.reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return 110 + (hash % 40); // 110 - 150 BPM range
}


// --- Module: audio/envelopeFollower.js ---
// src/audio/envelopeFollower.js - Energy envelope calculation & audio bands smoothing

function updateAudioEnvelope(engine, t, beatPhase) {
    if (engine.isPlaying) {
        const beatDecay = Math.max(0, 1 - Math.pow(beatPhase, 0.4) * 1.5);
        const subBeat = Math.sin(t * Math.PI * 4) * 0.15;

        const targetBass = 0.4 + beatDecay * 0.6 + Math.max(0, subBeat);
        const targetMid = 0.3 + Math.sin(t * 3.2) * 0.2 + (engine.isBeat ? 0.4 : 0);
        const targetTreble = 0.25 + Math.cos(t * 6.5) * 0.25 + beatDecay * 0.3;

        engine.bass += (targetBass - engine.bass) * 0.25;
        engine.mid += (targetMid - engine.mid) * 0.18;
        engine.treble += (targetTreble - engine.treble) * 0.22;
    } else {
        // Serene resting breathing when paused
        const breath = 0.15 + (Math.sin(engine.liveTime * 1.5) * 0.5 + 0.5) * 0.12;
        engine.bass += (breath - engine.bass) * 0.08;
        engine.mid += (breath * 0.8 - engine.mid) * 0.08;
        engine.treble += (breath * 0.5 - engine.treble) * 0.08;
    }

    engine.energy = (engine.bass * 0.5) + (engine.mid * 0.3) + (engine.treble * 0.2);

    // Multi-model aliases
    engine.mids = engine.mid;
    engine.highs = engine.treble;
    engine.bpm = engine.tempo;
    engine.beatImpulse = (engine.isBeat ? 1.0 : 0.0) + Math.max(0, 1.0 - engine.beatProgress * 2.5) * 0.4;
    engine.isBeatPulse = engine.isBeat;
    engine.is4BeatPulse = engine.isBeat && (engine.beatCount % 4 === 0);
}


// --- Module: audio/WebAudioBridge.js ---
// src/audio/WebAudioBridge.js - Optional Web Audio API FFT spectrum analyzer bridge (Heritage Legacy)

class WebAudioBridge {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.sourceNode = null;
        this.freqData = null;
        this.isActive = false;

        this.bass = 0;
        this.mid = 0;
        this.treble = 0;
        this.energy = 0;
        this.isBeat = false;
        this.lastBeatTime = 0;
        this.bassHistory = [];
    }

    /**
     * Connect an HTMLMediaElement (audio/video) or a MediaStream (microphone)
     */
    connect(source) {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return false;

            if (!this.audioContext) {
                this.audioContext = new AudioCtx();
            }

            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }

            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 512;
            this.analyser.smoothingTimeConstant = 0.82;
            this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

            if (source instanceof HTMLMediaElement) {
                this.sourceNode = this.audioContext.createMediaElementSource(source);
                this.sourceNode.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
            } else if (source instanceof MediaStream) {
                this.sourceNode = this.audioContext.createMediaStreamSource(source);
                this.sourceNode.connect(this.analyser);
            } else if (source && typeof source.connect === 'function') {
                source.connect(this.analyser);
            }

            this.isActive = true;
            return true;
        } catch (err) {
            console.warn('[WebAudioBridge] Connection failed:', err);
            this.isActive = false;
            return false;
        }
    }

    disconnect() {
        this.isActive = false;
        if (this.sourceNode) {
            try { this.sourceNode.disconnect(); } catch (e) {}
            this.sourceNode = null;
        }
    }

    update(now = performance.now()) {
        if (!this.isActive || !this.analyser || !this.freqData) {
            return null;
        }

        this.analyser.getByteFrequencyData(this.freqData);
        const len = this.freqData.length;

        // Band bins
        const bassEnd = Math.max(2, Math.floor(len * 0.08));
        const midEnd = Math.floor(len * 0.45);

        let bassSum = 0;
        for (let i = 0; i < bassEnd; i++) bassSum += this.freqData[i];
        const rawBass = bassSum / (bassEnd * 255);

        let midSum = 0;
        for (let i = bassEnd; i < midEnd; i++) midSum += this.freqData[i];
        const rawMid = midSum / ((midEnd - bassEnd) * 255);

        let trebSum = 0;
        for (let i = midEnd; i < len; i++) trebSum += this.freqData[i];
        const rawTreble = trebSum / ((len - midEnd) * 255);

        this.bass = rawBass;
        this.mid = rawMid;
        this.treble = rawTreble;
        this.energy = (rawBass * 0.5) + (rawMid * 0.3) + (rawTreble * 0.2);

        // Beat detection via sliding history
        this.bassHistory.push(rawBass);
        if (this.bassHistory.length > 30) this.bassHistory.shift();

        const avgBass = this.bassHistory.reduce((a, b) => a + b, 0) / this.bassHistory.length;
        const isOnset = rawBass > avgBass * 1.35 && rawBass > 0.35;

        if (isOnset && (now - this.lastBeatTime > 220)) {
            this.isBeat = true;
            this.lastBeatTime = now;
        } else {
            this.isBeat = false;
        }

        return {
            active: true,
            bass: this.bass,
            mid: this.mid,
            treble: this.treble,
            energy: this.energy,
            isBeat: this.isBeat
        };
    }
}


// --- Module: audio/AudioEngine.js ---
// src/audio/AudioEngine.js - Musical pulse & audio reactivity orchestrator

class AudioEngine {
    constructor() {
        this.isPlaying = false;
        this.progress = 0;
        this.duration = 0;
        this.trackUri = "";
        this.liveTime = 0;

        // Energy bands
        this.bass = 0.1;
        this.mid = 0.1;
        this.treble = 0.1;
        this.energy = 0.1;

        // Rhythm & beat tracking
        this.tempo = 124;
        this.beatProgress = 0;
        this.isBeat = false;
        this.beatCount = 0;
        this.lastBeatTime = 0;

        // Aliases for multi-model compatibility
        this.mids = 0.1;
        this.highs = 0.1;
        this.bpm = 124;
        this.beatPhase = 0;
        this.beatImpulse = 0;
        this.isBeatPulse = false;
        this.is4BeatPulse = false;

        // Optional Web Audio API spectrum bridge
        this.webAudio = new WebAudioBridge();

        setupSpotifyHooks(this);
    }

    connectLiveSource(source) {
        return this.webAudio.connect(source);
    }

    disconnectLiveSource() {
        this.webAudio.disconnect();
    }

    updateTrackInfo() {
        if (typeof Spicetify === "undefined" || !Spicetify.Player) return;
        const data = Spicetify.Player.data;
        if (data && data.item) {
            this.duration = data.item.duration ? data.item.duration.milliseconds : 180000;
            this.trackUri = data.item.uri || "";
            this.tempo = estimateTrackTempo(this.trackUri, data.item.name || "");
            this.bpm = this.tempo;
        }
    }

    update(dt) {
        this.liveTime += dt;

        // 1. If real-time Web Audio API stream is active, use FFT data directly
        const liveFft = this.webAudio.update();
        if (liveFft && liveFft.active) {
            this.isPlaying = true;
            this.bass += (liveFft.bass - this.bass) * 0.35;
            this.mid += (liveFft.mid - this.mid) * 0.25;
            this.treble += (liveFft.treble - this.treble) * 0.3;
            this.energy = liveFft.energy;

            this.mids = this.mid;
            this.highs = this.treble;
            this.isBeat = liveFft.isBeat;
            if (this.isBeat) {
                this.lastBeatTime = this.liveTime;
                this.beatCount++;
            }
            this.beatImpulse = (this.isBeat ? 1.0 : 0.0) + this.energy * 0.4;
            this.isBeatPulse = this.isBeat;
            this.is4BeatPulse = this.isBeat && (this.beatCount % 4 === 0);
            return;
        }

        // 2. Otherwise sync with Spotify Player and algorithmic envelope
        if (typeof Spicetify !== "undefined" && Spicetify.Player) {
            this.isPlaying = Spicetify.Player.isPlaying();
            const prog = Spicetify.Player.getProgress();
            this.progress = (typeof prog === "number" && !isNaN(prog)) ? prog : this.progress + (this.isPlaying ? dt * 1000 : 0);
        } else {
            this.progress += (this.isPlaying ? dt * 1000 : 0);
        }

        const beatInterval = 60 / this.tempo;
        const t = this.isPlaying ? (this.progress / 1000) : (this.liveTime * 0.5);
        const beatPhase = (t % beatInterval) / beatInterval;
        this.beatProgress = beatPhase;
        this.beatPhase = beatPhase;

        // Beat onset trigger
        const currentBeatIndex = Math.floor(t / beatInterval);
        if (currentBeatIndex !== this.beatCount && this.isPlaying) {
            this.beatCount = currentBeatIndex;
            this.isBeat = true;
            this.lastBeatTime = this.liveTime;
        } else {
            this.isBeat = false;
        }

        // Energy envelope & bands update
        updateAudioEnvelope(this, t, beatPhase);
    }
}


// --- Module: backgrounds/CosmicStar.js ---
// src/backgrounds/CosmicStar.js - Twinkling cosmic starfield particle with diffraction spikes

class CosmicStar {
    constructor(w, h) {
        this.reset(w, h, true);
    }

    reset(w, h, initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : -10;
        this.size = 0.6 + Math.random() * 1.8;
        this.speedY = 10 + Math.random() * 20;
        this.baseAlpha = 0.2 + Math.random() * 0.6;
        this.pulseSpeed = 1.0 + Math.random() * 3.0;
        this.phase = Math.random() * Math.PI * 2;
        this.hasCross = Math.random() > 0.82;
        this.crossSize = 4 + Math.random() * 7;
    }

    update(dt, w, h, treble) {
        this.y += this.speedY * dt * (1 + (treble || 0) * 0.4);
        if (this.y > h + 10) {
            this.reset(w, h);
        }
    }

    render(ctx, time, treble, color) {
        const twinkle = Math.sin(time * this.pulseSpeed + this.phase) * 0.3 + 0.7;
        const alpha = Math.min(1, this.baseAlpha * twinkle * (0.8 + (treble || 0) * 0.6));
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-point diffraction cross spikes on bright celestial stars (heritage Legacy)
        if (this.hasCross && alpha > 0.45) {
            const clen = this.crossSize * (0.8 + (treble || 0) * 0.5);
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.75;
            ctx.globalAlpha = alpha * 0.65;
            ctx.beginPath();
            ctx.moveTo(this.x - clen, this.y);
            ctx.lineTo(this.x + clen, this.y);
            ctx.moveTo(this.x, this.y - clen);
            ctx.lineTo(this.x, this.y + clen);
            ctx.stroke();
        }
    }
}


// --- Module: backgrounds/CosmicNebula.js ---
// src/backgrounds/CosmicNebula.js - Volumetric cosmic nebula clouds & deep space aura
// Grounded on visual hierarchy guidelines: keeps background soft (alpha 0.3 - 0.55) so foreground cat shines brightest.

class CosmicNebula {
    constructor() {
        this.cloudDrift = 0;
    }

    update(dt, time, audio, isPlaying = true) {
        const driftSpeed = isPlaying ? (0.04 + audio.energy * 0.06) : 0.015;
        this.cloudDrift = (this.cloudDrift + dt * driftSpeed) % (Math.PI * 2);
    }

    render(ctx, w, h, cx, cy, audio, palette, time) {
        const bass = audio.bass || 0;
        const beat = audio.beatImpulse || 0;
        const energy = audio.energy || 0.3;

        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // 1. Large soft cosmic aura behind subject
        const baseRadius = Math.max(160, Math.min(w, h) * 0.38);
        const auraRadius = baseRadius * (1.0 + bass * 0.2 + beat * 0.15);

        const auraGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, auraRadius);
        const alpha = Math.min(0.5, 0.22 + energy * 0.18 + bass * 0.12);

        auraGrad.addColorStop(0, palette.accentAlpha ? palette.accentAlpha(alpha * 0.8) : "rgba(255, 0, 127, 0.25)");
        auraGrad.addColorStop(0.35, palette.primaryAlpha ? palette.primaryAlpha(alpha * 0.55) : "rgba(0, 240, 255, 0.18)");
        auraGrad.addColorStop(0.7, palette.secondaryAlpha ? palette.secondaryAlpha(alpha * 0.25) : "rgba(157, 78, 221, 0.1)");
        auraGrad.addColorStop(1, "transparent");

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Multi-puff volumetric cosmic clouds with subtle orbital drift
        const cloudCount = 3;
        for (let i = 0; i < cloudCount; i++) {
            const angle = this.cloudDrift + (i * Math.PI * 2) / cloudCount;
            const dist = baseRadius * 0.45;
            const puffX = cx + Math.cos(angle) * dist;
            const puffY = cy + Math.sin(angle * 0.8) * (dist * 0.6);
            const puffRadius = baseRadius * (0.65 + Math.sin(time + i) * 0.1);

            const puffGrad = ctx.createRadialGradient(puffX, puffY, 10, puffX, puffY, puffRadius);
            const puffAlpha = alpha * 0.45;

            if (i % 2 === 0) {
                puffGrad.addColorStop(0, palette.primaryAlpha ? palette.primaryAlpha(puffAlpha) : "rgba(0, 240, 255, 0.15)");
                puffGrad.addColorStop(0.5, palette.secondaryAlpha ? palette.secondaryAlpha(puffAlpha * 0.4) : "rgba(157, 78, 221, 0.08)");
            } else {
                puffGrad.addColorStop(0, palette.accentAlpha ? palette.accentAlpha(puffAlpha) : "rgba(255, 0, 127, 0.15)");
                puffGrad.addColorStop(0.5, palette.primaryAlpha ? palette.primaryAlpha(puffAlpha * 0.4) : "rgba(0, 240, 255, 0.08)");
            }
            puffGrad.addColorStop(1, "transparent");

            ctx.fillStyle = puffGrad;
            ctx.beginPath();
            ctx.arc(puffX, puffY, puffRadius, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}


// --- Module: backgrounds/Shockwave.js ---
// src/backgrounds/Shockwave.js - Audio beat-driven shockwave pulse ring

class Shockwave {
    constructor(x, y, maxRadius, color) {
        this.x = x;
        this.y = y;
        this.radius = 16;
        this.maxRadius = maxRadius;
        this.color = color;
        this.life = 1.0;
        this.decay = 1.35;
    }

    update(dt) {
        this.radius += (this.maxRadius - this.radius) * (dt * 3.5);
        this.life -= dt * this.decay;
        return this.life > 0;
    }

    render(ctx) {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = this.color;
        ctx.lineWidth = Math.max(0.5, 2.5 * this.life);
        ctx.globalAlpha = Math.max(0, this.life * 0.65);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (this.radius > 35) {
            ctx.lineWidth = 1.0 * this.life;
            ctx.globalAlpha = Math.max(0, this.life * 0.35);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.75, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
    }
}


// --- Module: backgrounds/CyberGrid.js ---
// src/backgrounds/CyberGrid.js - 3D perspective synthwave grid & cyber sparkles

class CyberGrid {
    constructor() {
        this.offsetY = 0;
        this.sparkles = [];
        for (let i = 0; i < 35; i++) {
            this.sparkles.push({
                x: Math.random(),
                y: Math.random(),
                size: 1 + Math.random() * 2,
                speedY: 20 + Math.random() * 45,
                alpha: 0.2 + Math.random() * 0.6
            });
        }
    }

    update(dt, audio) {
        const speed = (audio.isPlaying ? (45 + audio.energy * 65) : 15);
        this.offsetY = (this.offsetY + dt * speed) % 40;

        for (let i = 0; i < this.sparkles.length; i++) {
            const sp = this.sparkles[i];
            sp.y -= (sp.speedY * dt) / 500;
            if (sp.y < 0) {
                sp.y = 1.0;
                sp.x = Math.random();
            }
        }
    }

    render(ctx, w, h, horizonY, audio, palette) {
        if (horizonY >= h) return;
        const gridH = h - horizonY;
        const cx = w * 0.5;

        ctx.save();

        // 1. Horizon glow aura
        const horizonGrad = ctx.createLinearGradient(0, horizonY - 40, 0, horizonY + 30);
        horizonGrad.addColorStop(0, "transparent");
        horizonGrad.addColorStop(0.5, palette.accentAlpha ? palette.accentAlpha(0.4 + audio.bass * 0.3) : "rgba(255, 0, 127, 0.4)");
        horizonGrad.addColorStop(1, "transparent");
        ctx.fillStyle = horizonGrad;
        ctx.fillRect(0, horizonY - 40, w, 70);

        // Horizon sharp laser line
        ctx.strokeStyle = palette.primary;
        ctx.lineWidth = 1.8 + audio.bass * 1.5;
        ctx.beginPath();
        ctx.moveTo(0, horizonY);
        ctx.lineTo(w, horizonY);
        ctx.stroke();

        // 2. Perspective grid floor
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, horizonY, w, gridH);
        ctx.clip();

        // Moving horizontal perspective lines (power distribution for 3D depth)
        const lineCount = 14;
        for (let i = 0; i < lineCount; i++) {
            const frac = (i + (this.offsetY / 40)) / lineCount;
            const norm = Math.pow(frac, 2.5); // perspective distortion
            const ly = horizonY + norm * gridH;
            const alpha = norm * (0.65 + audio.energy * 0.35);

            ctx.strokeStyle = palette.accentAlpha ? palette.accentAlpha(alpha) : palette.accent;
            ctx.lineWidth = 1.0 + norm * 1.6;
            ctx.beginPath();
            ctx.moveTo(0, ly);
            ctx.lineTo(w, ly);
            ctx.stroke();
        }

        // Radiating perspective vertical lines
        const vCount = 18;
        for (let i = -vCount / 2; i <= vCount / 2; i++) {
            const bottomX = cx + (i / (vCount / 2)) * (w * 0.95);
            ctx.strokeStyle = palette.primaryAlpha ? palette.primaryAlpha(0.45 + audio.energy * 0.3) : palette.primary;
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(cx, horizonY);
            ctx.lineTo(bottomX, h);
            ctx.stroke();
        }

        // Floating digital cyber sparks rising from grid
        for (let i = 0; i < this.sparkles.length; i++) {
            const sp = this.sparkles[i];
            const sx = sp.x * w;
            const sy = horizonY + sp.y * gridH;
            ctx.fillStyle = palette.core || "#ffffff";
            ctx.globalAlpha = sp.alpha * (0.65 + audio.treble * 0.35);
            ctx.beginPath();
            ctx.arc(sx, sy, sp.size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
        ctx.restore();
    }
}


// --- Module: backgrounds/SacredFractals.js ---
/**
 * CosmicFractals.js
 * Ultra-lightweight, 60/120 FPS high-performance procedural fractals.
 * Renders large, ultra-luminous sacred geometry mandalas with precomputed trigonometry and batched GPU draw calls.
 */

class CosmicFractals {
    constructor() {
        this.rotationAngle = 0;

        // Precompute 36 outer tick mark trigonometry lookup table
        this.ticksCos = new Float32Array(36);
        this.ticksSin = new Float32Array(36);
        for (let i = 0; i < 36; i++) {
            const angle = (i * Math.PI * 2) / 36;
            this.ticksCos[i] = Math.cos(angle);
            this.ticksSin[i] = Math.sin(angle);
        }

        // Precompute 6-fold flower petal trigonometry lookup table
        this.petalCos = new Float32Array(6);
        this.petalSin = new Float32Array(6);
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            this.petalCos[i] = Math.cos(angle);
            this.petalSin[i] = Math.sin(angle);
        }

        // Precompute hexagram chords
        this.hexagramPoints = [];
        for (let t = 0; t < 2; t++) {
            const offsetAngle = (t * Math.PI) / 3;
            const triangle = [];
            for (let i = 0; i <= 3; i++) {
                const a = offsetAngle + (i * Math.PI * 2) / 3;
                triangle.push({ cos: Math.cos(a), sin: Math.sin(a) });
            }
            this.hexagramPoints.push(triangle);
        }
    }

    update(dt, time, audioState, isPlaying = true) {
        const bpm = audioState.bpm || 120;
        const mids = audioState.mids || 0;

        const rotSpeed = isPlaying ? (0.12 + (bpm / 60) * 0.12 + mids * 0.35) : 0.025;
        this.rotationAngle += rotSpeed * dt;
    }

    /**
     * Render large, ultra-luminous sacred geometry mandala rings behind the cat
     */
    render(ctx, cx, cy, baseRadius, palette, audioState) {
        const bass = audioState.bass || 0;
        const mids = audioState.mids || 0;
        const beat = audioState.beatImpulse || 0;
        const energy = audioState.energy || 0.4;

        const fractalScale = baseRadius * (1.18 + bass * 0.18 + beat * 0.12);
        const alphaBase = Math.min(0.55, (0.24 + energy * 0.20 + bass * 0.12) * 0.85);

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.translate(cx, cy);
        ctx.rotate(this.rotationAngle);

        // 1. Batched Celestial Outer Tick Marks Ring (Using precomputed table)
        const outerTickRadius = fractalScale * 1.08;
        const innerTickRadius = fractalScale * 1.03;
        const majorTickRadius = fractalScale * 0.99;

        ctx.beginPath();
        for (let i = 0; i < 36; i++) {
            const rIn = (i % 3 === 0) ? majorTickRadius : innerTickRadius;
            const cos = this.ticksCos[i];
            const sin = this.ticksSin[i];
            ctx.moveTo(cos * rIn, sin * rIn);
            ctx.lineTo(cos * outerTickRadius, sin * outerTickRadius);
        }
        ctx.strokeStyle = palette.accentAlpha(alphaBase * 0.75);
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // 2. Concentric Sacred Harmonic Rings (Batched by style)
        // Outer glow rings
        ctx.beginPath();
        ctx.arc(0, 0, fractalScale * 1.08, 0, Math.PI * 2);
        ctx.arc(0, 0, fractalScale * 1.0, 0, Math.PI * 2);
        ctx.strokeStyle = palette.accentAlpha(alphaBase * 0.75);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Inner harmonic rings
        ctx.beginPath();
        ctx.arc(0, 0, fractalScale * 0.72, 0, Math.PI * 2);
        ctx.arc(0, 0, fractalScale * 0.48, 0, Math.PI * 2);
        ctx.arc(0, 0, fractalScale * 0.24, 0, Math.PI * 2);
        ctx.strokeStyle = palette.primaryAlpha(alphaBase * 0.55);
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // 3. Batched 6-Fold Sacred Geometry Petals (Flower of Life - Using precomputed lookup)
        const petalDist = fractalScale * 0.48;
        const petalRadius = fractalScale * 0.48;

        // Outer petals path
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const px = this.petalCos[i] * petalDist;
            const py = this.petalSin[i] * petalDist;
            ctx.moveTo(px + petalRadius, py);
            ctx.arc(px, py, petalRadius, 0, Math.PI * 2);
        }
        ctx.strokeStyle = palette.accentAlpha(alphaBase * 0.75);
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Inner sub-petals and chords path
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const px = this.petalCos[i] * petalDist;
            const py = this.petalSin[i] * petalDist;
            ctx.moveTo(px + petalRadius * 0.5, py);
            ctx.arc(px, py, petalRadius * 0.5, 0, Math.PI * 2);
            // Center radial chord
            ctx.moveTo(0, 0);
            ctx.lineTo(px * 2.0, py * 2.0);
        }
        ctx.strokeStyle = palette.secondaryAlpha(alphaBase * 0.55);
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // 4. Counter-rotating Sacred Hexagram Star Chords
        ctx.save();
        ctx.rotate(-this.rotationAngle * 1.5);
        ctx.beginPath();
        const hexRadius = fractalScale * 0.72;
        for (let t = 0; t < 2; t++) {
            const triangle = this.hexagramPoints[t];
            for (let i = 0; i <= 3; i++) {
                const pt = triangle[i];
                const hx = pt.cos * hexRadius;
                const hy = pt.sin * hexRadius;
                if (i === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
            }
        }
        ctx.strokeStyle = palette.accentAlpha(alphaBase * 0.6);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // 5. Radiant Central Node
        const centralGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, fractalScale * 0.35);
        centralGlow.addColorStop(0, `rgba(255, 255, 255, ${alphaBase * 0.65})`);
        centralGlow.addColorStop(0.35, palette.accentAlpha(alphaBase * 0.55));
        centralGlow.addColorStop(0.8, palette.primaryAlpha(alphaBase * 0.25));
        centralGlow.addColorStop(1.0, "transparent");

        ctx.fillStyle = centralGlow;
        ctx.beginPath();
        ctx.arc(0, 0, fractalScale * 0.35, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = CosmicFractals;
}


// --- Module: backgrounds/BackgroundManager.js ---
// src/backgrounds/BackgroundManager.js - Composable background layers & independent visual effects

class BackgroundManager {
    constructor() {
        this.stars = [];
        this.shockwaves = [];
        this.maxStars = 95;
        this.initStars(window.innerWidth || 1200, window.innerHeight || 800);

        this.grid = new CyberGrid();
        this.nebula = new CosmicNebula();

        // Independent composable visual layers (can be toggled ON/OFF without affecting others)
        this.effects = {
            stars: true,        // Particules & Étoiles célestes
            fractals: true,     // Mandalas sacrés rotatifs
            nebula: true,       // Nébuleuse atmosphérique volumétrique
            shockwaves: true,   // Ondes de choc radiales sur le beat
            grid: false,        // Grille synthwave 3D en perspective
            deck: true          // Plateforme deck en bois (sol)
        };

        this.loadSettings();
    }

    loadSettings() {
        try {
            if (typeof localStorage !== "undefined") {
                const saved = localStorage.getItem("cosmic-cat-effects");
                if (saved) {
                    const parsed = JSON.parse(saved);
                    Object.assign(this.effects, parsed);
                }
            }
        } catch (e) {}
    }

    saveSettings() {
        try {
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("cosmic-cat-effects", JSON.stringify(this.effects));
            }
        } catch (e) {}
    }

    setEffect(name, enabled) {
        if (name in this.effects) {
            this.effects[name] = !!enabled;
            this.saveSettings();
        }
        return this.effects[name];
    }

    toggleEffect(name) {
        if (name in this.effects) {
            this.effects[name] = !this.effects[name];
            this.saveSettings();
        }
        return this.effects[name];
    }

    getEffect(name) {
        return !!this.effects[name];
    }

    initStars(w, h) {
        this.stars = [];
        for (let i = 0; i < this.maxStars; i++) {
            this.stars.push(new CosmicStar(w, h));
        }
    }

    spawnShockwave(x, y, maxRadius, color) {
        if (this.shockwaves.length < 8) {
            this.shockwaves.push(new Shockwave(x, y, maxRadius, color));
        }
    }

    resize(w, h) {
        this.initStars(w, h);
    }

    update(dt, w, h, audio, palette, catCenterX, catCenterY) {
        // 1. Stars update (if enabled)
        if (this.effects.stars) {
            for (let i = 0; i < this.stars.length; i++) {
                this.stars[i].update(dt, w, h, audio.treble);
            }
        }

        // 2. Nebula update (if enabled)
        if (this.effects.nebula) {
            this.nebula.update(dt, audio.liveTime || 0, audio, audio.isPlaying);
        }

        // 3. Shockwaves update (if enabled)
        if (this.effects.shockwaves) {
            if (audio.isBeat && audio.isPlaying && audio.bass > 0.45) {
                this.spawnShockwave(catCenterX, catCenterY, Math.min(w, h) * 0.48, palette.shockwave);
            }
            for (let i = this.shockwaves.length - 1; i >= 0; i--) {
                if (!this.shockwaves[i].update(dt)) {
                    this.shockwaves.splice(i, 1);
                }
            }
        }

        // 4. Cyber 3D Grid update (if enabled)
        if (this.effects.grid) {
            this.grid.update(dt, audio);
        }
    }

    render(ctx, w, h, time, audio, palette, catCenterX, catCenterY, fractalsInstance = null) {
        ctx.save();

        // Base Celestial Void
        const bgGrad = ctx.createRadialGradient(
            catCenterX, catCenterY, 30,
            catCenterX, catCenterY, Math.max(w, h) * 0.75
        );
        bgGrad.addColorStop(0, palette.ambient);
        bgGrad.addColorStop(1, "rgba(2, 2, 6, 0.98)");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Layer 1: Cyber 3D Grid Floor (if enabled)
        if (this.effects.grid) {
            const horizonY = h * 0.68;
            this.grid.render(ctx, w, h, horizonY, audio, palette);
        }

        // Layer 2: Volumetric Nebula & Atmospheric Clouds (if enabled)
        if (this.effects.nebula) {
            this.nebula.render(ctx, w, h, catCenterX, catCenterY, audio, palette, time);
        }

        // Layer 3: Sacred Fractals Mandalas (if enabled)
        if (this.effects.fractals && fractalsInstance) {
            const baseRad = Math.min(w, h) * 0.26;
            fractalsInstance.render(ctx, catCenterX, catCenterY, baseRad, palette, audio);
        }

        // Layer 4: Stars & Particle field (if enabled)
        if (this.effects.stars) {
            ctx.globalCompositeOperation = "screen";
            for (let i = 0; i < this.stars.length; i++) {
                this.stars[i].render(ctx, time, audio.treble, palette.core);
            }
        }

        // Layer 5: Concentric audio aura rings (subtle presence)
        const auraRadius = 135 + (audio.bass || 0) * 30;
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = palette.primary;
        ctx.lineWidth = 1.0;
        ctx.globalAlpha = 0.15 + (audio.bass || 0) * 0.15;
        ctx.beginPath();
        ctx.arc(catCenterX, catCenterY, auraRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Layer 6: Radial beat shockwaves (if enabled)
        if (this.effects.shockwaves) {
            for (let i = 0; i < this.shockwaves.length; i++) {
                this.shockwaves[i].render(ctx);
            }
        }

        ctx.restore();
    }
}


// --- Module: models/cosmic/deckPlanks.js ---
// src/models/cosmic/deckPlanks.js - Wooden deck plank geometry, wood grain, and fasteners

function initDeckPlanks(count = 4) {
    const planks = [];
    for (let i = 0; i < count; i++) {
        const shift = (Math.random() - 0.5) * 8;
        const r = Math.max(8, Math.min(32, 16 + shift));
        const g = Math.max(6, Math.min(26, 12 + shift * 0.8));
        const b = Math.max(10, Math.min(38, 22 + shift * 1.2));

        planks.push({
            r: r | 0,
            g: g | 0,
            b: b | 0,
            topColor: `rgba(${(r + 6) | 0}, ${(g + 5) | 0}, ${(b + 8) | 0}, 0.95)`,
            midColor: `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0.95)`,
            botColor: `rgba(${(r - 4) | 0}, ${(g - 3) | 0}, ${(b - 5) | 0}, 0.95)`,
            grainColor: `rgba(${(r + 14) | 0}, ${(g + 12) | 0}, ${(b + 18) | 0}, 0.16)`,
            nails: [0.12, 0.32, 0.5, 0.68, 0.88]
        });
    }
    return planks;
}

function renderDeckPlanks(ctx, width, height, deckY, planks) {
    const deckHeight = height - deckY;

    // 1. Base Deck Floor Fill
    const baseDeckGrad = ctx.createLinearGradient(0, deckY, 0, height);
    baseDeckGrad.addColorStop(0, "rgba(14, 10, 20, 0.98)");
    baseDeckGrad.addColorStop(0.35, "rgba(20, 14, 26, 0.99)");
    baseDeckGrad.addColorStop(0.7, "rgba(12, 8, 18, 1.0)");
    baseDeckGrad.addColorStop(1.0, "rgba(6, 4, 12, 1.0)");

    ctx.fillStyle = baseDeckGrad;
    ctx.fillRect(0, deckY, width, deckHeight);

    // 2. Horizontal Wooden Planks
    let currentY = deckY;
    const count = planks.length;

    for (let i = 0; i < count; i++) {
        const progress = i / count;
        const pHeight = deckHeight * (0.16 + progress * 0.16);
        const plankBottom = Math.min(height, currentY + pHeight);
        const plank = planks[i];

        const pGrad = ctx.createLinearGradient(0, currentY, 0, plankBottom);
        pGrad.addColorStop(0, plank.topColor);
        pGrad.addColorStop(0.5, plank.midColor);
        pGrad.addColorStop(1.0, plank.botColor);

        ctx.fillStyle = pGrad;
        ctx.fillRect(0, currentY, width, pHeight);

        // Wood Grain Streaks
        ctx.strokeStyle = plank.grainColor;
        ctx.lineWidth = 1.0;
        const grainY = currentY + pHeight * 0.45;

        ctx.beginPath();
        ctx.moveTo(0, grainY);
        ctx.quadraticCurveTo(width * 0.45, grainY - 1.2, width, grainY + 0.8);
        ctx.stroke();

        // Plank Seam Shadow
        ctx.fillStyle = "rgba(4, 3, 8, 0.95)";
        ctx.fillRect(0, plankBottom - 1.5, width, 1.5);

        // Plank Top Bevel Highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
        ctx.fillRect(0, currentY, width, 1);

        // Nail Fasteners
        const nails = plank.nails;
        const nailY = currentY + pHeight * 0.5;
        for (let j = 0; j < nails.length; j++) {
            const nailX = nails[j] * width;

            ctx.beginPath();
            ctx.arc(nailX, nailY, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(10, 8, 16, 0.85)";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(nailX - 0.4, nailY - 0.4, 0.9, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
            ctx.fill();
        }

        currentY = plankBottom;
    }
}


// --- Module: models/cosmic/deckLighting.js ---
// src/models/cosmic/deckLighting.js - Wooden deck rim light, reflection, and contact shadow

function renderDeckLighting(ctx, width, height, deckY, palette, audioState, centerX = null) {
    const deckHeight = height - deckY;
    const bass = audioState.bass || 0;
    const beat = audioState.beatImpulse || 0;
    const energy = audioState.energy || 0.5;
    const cx = centerX !== null ? centerX : width * 0.5;

    // 1. Deck Horizon Rim Light
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    const rimGrad = ctx.createLinearGradient(0, deckY - 3, 0, deckY + 6);
    rimGrad.addColorStop(0, palette.accentAlpha(0.65 + beat * 0.35));
    rimGrad.addColorStop(0.35, palette.primaryAlpha(0.4 + bass * 0.3));
    rimGrad.addColorStop(1.0, "transparent");

    ctx.fillStyle = rimGrad;
    ctx.fillRect(0, deckY - 2, width, 8);

    // Diffuse rim line
    ctx.strokeStyle = palette.accentAlpha(0.5 + beat * 0.3);
    ctx.lineWidth = 3.0;
    ctx.beginPath();
    ctx.moveTo(0, deckY);
    ctx.lineTo(width, deckY);
    ctx.stroke();

    // Crisp white core rim
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 + beat * 0.4})`;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(0, deckY);
    ctx.lineTo(width, deckY);
    ctx.stroke();

    ctx.restore();

    // 2. Ambient Cat & Energy Reflection on Polished Wood Surface
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    const reflW = width * 0.34 * (1.0 + bass * 0.2);
    const reflH = deckHeight * 0.85;

    const woodReflGrad = ctx.createRadialGradient(
        cx, deckY + 6, 4,
        cx, deckY + reflH * 0.5, reflW
    );

    const reflAlpha = (0.22 + bass * 0.18 + beat * 0.2) * (0.8 + energy * 0.4);
    woodReflGrad.addColorStop(0, palette.accentAlpha(reflAlpha * 0.9));
    woodReflGrad.addColorStop(0.3, palette.primaryAlpha(reflAlpha * 0.6));
    woodReflGrad.addColorStop(0.7, palette.secondaryAlpha(reflAlpha * 0.25));
    woodReflGrad.addColorStop(1.0, "transparent");

    ctx.fillStyle = woodReflGrad;
    ctx.beginPath();
    ctx.ellipse(cx, deckY + reflH * 0.4, reflW, reflH * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 3. Contact Shadow directly beneath the cat's seated paws & haunches
    ctx.save();
    const contactShadowGrad = ctx.createRadialGradient(
        cx, deckY + 3, 8,
        cx, deckY + 4, width * 0.16
    );
    contactShadowGrad.addColorStop(0, "rgba(2, 1, 5, 0.90)");
    contactShadowGrad.addColorStop(0.6, "rgba(4, 2, 8, 0.6)");
    contactShadowGrad.addColorStop(1.0, "transparent");

    ctx.fillStyle = contactShadowGrad;
    ctx.beginPath();
    ctx.ellipse(cx, deckY + 3, width * 0.18, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}


// --- Module: models/cosmic/WoodenDeck.js ---
// src/models/cosmic/WoodenDeck.js - Grounded wooden deck orchestrator

class WoodenDeck {
    constructor() {
        this.planks = initDeckPlanks(4);
    }

    render(ctx, width, height, deckY, palette, audioState, cx = null) {
        if (deckY >= height) return;

        const centerX = cx !== null ? cx : width * 0.5;
        ctx.save();
        renderDeckPlanks(ctx, width, height, deckY, this.planks);
        renderDeckLighting(ctx, width, height, deckY, palette, audioState, centerX);
        ctx.restore();
    }
}


// --- Module: models/cosmic/tailPathBuilder.js ---
// src/models/cosmic/tailPathBuilder.js - Catmull-Rom closed spline path builder for feline tail

function buildTailClosedPath(ctx, nodes, leftPoints, rightPoints, segmentCount, baseScale) {
    const lp = leftPoints;
    const rp = rightPoints;
    const n = segmentCount;

    ctx.beginPath();
    ctx.moveTo(lp[0].x, lp[0].y);

    // Left spine side (Smooth Catmull-Rom)
    for (let i = 0; i < n - 1; i++) {
        const p0 = i > 0 ? lp[i - 1] : lp[0];
        const p1 = lp[i];
        const p2 = lp[i + 1];
        const p3 = i < n - 2 ? lp[i + 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) * 0.1666666;
        const cp1y = p1.y + (p2.y - p0.y) * 0.1666666;
        const cp2x = p2.x - (p3.x - p1.x) * 0.1666666;
        const cp2y = p2.y - (p3.y - p1.y) * 0.1666666;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }

    // Rounded tip cap
    const tip = nodes[n - 1];
    const tipRight = rp[n - 1];
    ctx.quadraticCurveTo(tip.x - 4 * baseScale, tip.y + 2 * baseScale, tipRight.x, tipRight.y);

    // Right spine side (back to root)
    for (let i = n - 1; i > 0; i--) {
        const p0 = i < n - 1 ? rp[i + 1] : rp[n - 1];
        const p1 = rp[i];
        const p2 = rp[i - 1];
        const p3 = i > 1 ? rp[i - 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) * 0.1666666;
        const cp1y = p1.y + (p2.y - p0.y) * 0.1666666;
        const cp2x = p2.x - (p3.x - p1.x) * 0.1666666;
        const cp2y = p2.y - (p3.y - p1.y) * 0.1666666;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }

    ctx.closePath();
}


// --- Module: models/cosmic/tailSparks.js ---
// src/models/cosmic/tailSparks.js - Tail tip cosmic sparkle emitter and renderer

function updateTailSparks(sparkTrail, tipNode, baseScale, audioState, dt, isPlaying) {
    const highs = audioState.highs || 0;
    const beat = audioState.beatImpulse || 0;

    // Spawn sparks
    if (isPlaying && Math.random() < 0.35 + highs * 0.5 + beat * 0.3) {
        sparkTrail.push({
            x: tipNode.x + (Math.random() - 0.5) * 6,
            y: tipNode.y + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 20 - 10,
            vy: (Math.random() - 0.5) * 20 - 10,
            life: 1.0,
            decay: 1.1 + Math.random() * 1.4,
            size: (1.5 + Math.random() * 2.5) * baseScale,
            color: Math.random() < 0.6 ? "accent" : "starlight"
        });
    }

    // Update sparks
    for (let i = sparkTrail.length - 1; i >= 0; i--) {
        const sp = sparkTrail[i];
        sp.x += sp.vx * dt;
        sp.y += sp.vy * dt;
        sp.life -= sp.decay * dt;
        if (sp.life <= 0 || !isPlaying) {
            sparkTrail.splice(i, 1);
        }
    }
}

function renderTailSparks(ctx, sparkTrail, palette) {
    for (let i = 0; i < sparkTrail.length; i++) {
        const sp = sparkTrail[i];
        ctx.fillStyle = sp.color === "starlight" ? `rgba(255, 255, 255, ${sp.life})` : palette.accentAlpha(sp.life);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
        ctx.fill();
    }
}


// --- Module: models/cosmic/tailKinematics.js ---
// src/models/cosmic/tailKinematics.js - Realistic feline tail kinematics and spine physics

function updateTailKinematics(tail, anchorPoint, baseScale, audioState, dt, time, deckY, isPlaying) {
    const bpm = audioState.bpm || 120;
    const energy = audioState.energy || 0;
    const bass = audioState.bass || 0;
    const highs = audioState.highs || 0;
    const beat = audioState.beatImpulse || 0;

    const rootX = anchorPoint[0];
    const rootY = anchorPoint[1];

    // 1. Natural Feline Sway Rhythm
    const tempoHz = isPlaying ? Math.max(0.5, Math.min(2.5, (bpm / 60) * 0.45)) : 0.12;
    const swaySpeed = isPlaying ? (tempoHz * (1.0 + energy * 0.4)) : 0.12;
    tail.swayPhase += swaySpeed * dt;

    // 2. Beat Deck Tap & Tip Twitch
    if (isPlaying && beat > 0.4) {
        tail.tipTwitch += (beat * 1.8) * (Math.sin(tail.swayPhase) > 0 ? 1 : -1);
        tail.deckTapImpulse = Math.min(1.0, tail.deckTapImpulse + beat * 0.8);
    } else if (!isPlaying) {
        tail.tipTwitch = 0;
        tail.deckTapImpulse = 0;
    }
    tail.tipTwitch *= Math.pow(0.86, dt * 60);
    tail.deckTapImpulse *= Math.pow(0.88, dt * 60);
    if (isNaN(tail.tipTwitch)) tail.tipTwitch = 0;
    if (isNaN(tail.deckTapImpulse)) tail.deckTapImpulse = 0;

    // 3. Feline Tail Spine Kinematics
    const totalTailLength = 175 * baseScale;
    const segLen = totalTailLength / (tail.segmentCount - 1);

    if (!tail.initialized) {
        for (let i = 0; i < tail.segmentCount; i++) {
            tail.nodes[i].x = rootX - i * segLen * 0.8;
            tail.nodes[i].y = rootY + i * segLen * 0.3;
            tail.nodes[i].thickness = 11.0 * baseScale;
        }
        tail.initialized = true;
    }

    // Set Root Node
    tail.nodes[0].x = rootX;
    tail.nodes[0].y = rootY;
    tail.nodes[0].thickness = 11.0 * baseScale;

    const maxSwayAngle = isPlaying ? (0.35 + energy * 0.25 + bass * 0.2) : 0.05;

    for (let i = 1; i < tail.segmentCount; i++) {
        const frac = i / (tail.segmentCount - 1);
        
        // Feline S-curve harmonic wave
        const wavePhase = tail.swayPhase - frac * 2.2;
        const horizontalSway = Math.sin(wavePhase) * maxSwayAngle * (frac * 1.3);
        const secondaryHarmonic = isPlaying ? (Math.sin(wavePhase * 1.8) * 0.15 * frac) : 0;

        // Tip twitch & energetic whip
        const tipCurl = tail.tipTwitch * Math.pow(frac, 2.5) * 1.4;

        // Target natural resting angle
        const baseDirAngle = Math.PI * 0.88;
        const currentAngle = baseDirAngle + horizontalSway + secondaryHarmonic + tipCurl;

        // Target position
        const prev = tail.nodes[i - 1];
        let targetX = prev.x + Math.cos(currentAngle) * segLen;
        let targetY = prev.y + Math.sin(currentAngle) * segLen;

        // Deck constraint: tail rests gracefully on the wooden deck surface
        if (deckY && targetY > deckY + 12 * baseScale) {
            targetY = deckY + 12 * baseScale;
        }

        // Tip lifts gently off the deck when active
        if (isPlaying && frac > 0.75) {
            const tipLift = Math.sin(time * 3 + frac * 4) * (6 * baseScale * highs) - (tail.deckTapImpulse * 8 * baseScale);
            targetY += tipLift;
        }

        // Smooth spring damping towards target
        const blend = 0.38 + (1 - frac) * 0.25;
        tail.nodes[i].x += (targetX - tail.nodes[i].x) * blend;
        tail.nodes[i].y += (targetY - tail.nodes[i].y) * blend;

        // Realistic Feline Thickness Profile
        const thicknessProfile = 1.0 - Math.pow(frac, 1.4) * 0.65;
        tail.nodes[i].thickness = thicknessProfile * (11.0 * baseScale);
    }

    // 4. Precalculate Envelope Curves in pre-allocated buffers
    for (let i = 0; i < tail.segmentCount; i++) {
        const curr = tail.nodes[i];
        const next = i < tail.segmentCount - 1 ? tail.nodes[i + 1] : curr;
        const prev = i > 0 ? tail.nodes[i - 1] : curr;

        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        const t = curr.thickness;
        tail.leftPoints[i].x = curr.x + nx * t;
        tail.leftPoints[i].y = curr.y + ny * t;
        tail.rightPoints[i].x = curr.x - nx * t;
        tail.rightPoints[i].y = curr.y - ny * t;
    }
}


// --- Module: models/cosmic/tailRenderer.js ---
// src/models/cosmic/tailRenderer.js - Tail canvas rendering with glow and contact shadow

function renderTailLayers(ctx, tail, palette, audioState, baseScale, deckY) {
    if (tail.nodes.length < 3) return;

    const bass = audioState.bass || 0;
    const highs = audioState.highs || 0;
    const beat = audioState.beatImpulse || 0;

    ctx.save();

    // 1. Tail Contact Shadow onto Wooden Deck
    if (deckY) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tail.nodes[0].x, deckY + 4);
        for (let i = 1; i < tail.segmentCount; i++) {
            ctx.lineTo(tail.nodes[i].x, deckY + 6);
        }
        ctx.lineWidth = 14 * baseScale;
        ctx.strokeStyle = "rgba(2, 1, 6, 0.45)";
        ctx.stroke();
        ctx.restore();
    }

    // 2. Tail Interior Cosmic Shimmer
    buildTailClosedPath(ctx, tail.nodes, tail.leftPoints, tail.rightPoints, tail.segmentCount, baseScale);
    const rootNode = tail.nodes[0];
    const tipNode = tail.nodes[tail.segmentCount - 1];
    const tailGrad = ctx.createLinearGradient(rootNode.x, rootNode.y, tipNode.x, tipNode.y);
    tailGrad.addColorStop(0, "rgba(16, 12, 32, 0.95)");
    tailGrad.addColorStop(0.5, "rgba(10, 8, 24, 0.98)");
    tailGrad.addColorStop(1.0, "rgba(6, 4, 16, 1.0)");
    ctx.fillStyle = tailGrad;
    ctx.fill();

    // Subtle inner energy core
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const innerEnergyGrad = ctx.createLinearGradient(rootNode.x, rootNode.y, tipNode.x, tipNode.y);
    innerEnergyGrad.addColorStop(0, palette.primaryAlpha(0.25 + bass * 0.2));
    innerEnergyGrad.addColorStop(0.6, palette.accentAlpha(0.20 + highs * 0.2));
    innerEnergyGrad.addColorStop(1.0, palette.accentAlpha(0.35 + beat * 0.3));
    ctx.fillStyle = innerEnergyGrad;
    ctx.fill();
    ctx.restore();

    // 3. Glowing Feline Fur Outer Contour (GPU Accelerated)
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    // Outer soft glow
    buildTailClosedPath(ctx, tail.nodes, tail.leftPoints, tail.rightPoints, tail.segmentCount, baseScale);
    ctx.strokeStyle = palette.primaryAlpha(0.75 + bass * 0.25);
    ctx.lineWidth = 3.5 * baseScale;
    ctx.stroke();

    // Vibrant neon rim
    buildTailClosedPath(ctx, tail.nodes, tail.leftPoints, tail.rightPoints, tail.segmentCount, baseScale);
    ctx.strokeStyle = palette.accentAlpha(1.0);
    ctx.lineWidth = 1.8 * baseScale;
    ctx.stroke();

    // Starlight crisp highlight
    buildTailClosedPath(ctx, tail.nodes, tail.leftPoints, tail.rightPoints, tail.segmentCount, baseScale);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.92 + highs * 0.08})`;
    ctx.lineWidth = 0.9 * baseScale;
    ctx.stroke();

    // Tip glowing energy tuft
    const tipGlow = ctx.createRadialGradient(tipNode.x, tipNode.y, 0, tipNode.x, tipNode.y, 16 * baseScale);
    tipGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    tipGlow.addColorStop(0.35, palette.accentAlpha(0.85));
    tipGlow.addColorStop(0.75, palette.primaryAlpha(0.4));
    tipGlow.addColorStop(1.0, "transparent");

    ctx.fillStyle = tipGlow;
    ctx.beginPath();
    ctx.arc(tipNode.x, tipNode.y, 16 * baseScale, 0, Math.PI * 2);
    ctx.fill();

    // Spark trail
    renderTailSparks(ctx, tail.sparkTrail, palette);

    ctx.restore();
    ctx.restore();
}


// --- Module: models/cosmic/TailPhysics.js ---
// src/models/cosmic/TailPhysics.js - Tail physics orchestrator

class TailPhysics {
    constructor(segmentCount = 20) {
        this.segmentCount = segmentCount;
        this.nodes = [];
        this.leftPoints = [];
        this.rightPoints = [];

        for (let i = 0; i < this.segmentCount; i++) {
            this.nodes.push({ x: 0, y: 0, thickness: 1.0 });
            this.leftPoints.push({ x: 0, y: 0 });
            this.rightPoints.push({ x: 0, y: 0 });
        }

        this.swayPhase = 0;
        this.tipTwitch = 0;
        this.deckTapImpulse = 0;
        this.initialized = false;
        this.sparkTrail = [];
    }

    update(anchorPoint, baseScale, audioState, dt, time, deckY, isPlaying = true) {
        updateTailKinematics(this, anchorPoint, baseScale, audioState, dt, time, deckY, isPlaying);
        const tipNode = this.nodes[this.segmentCount - 1];
        updateTailSparks(this.sparkTrail, tipNode, baseScale, audioState, dt, isPlaying);
    }

    buildTailPath(ctx, baseScale) {
        buildTailClosedPath(ctx, this.nodes, this.leftPoints, this.rightPoints, this.segmentCount, baseScale);
    }

    render(ctx, palette, audioState, baseScale, deckY) {
        renderTailLayers(ctx, this, palette, audioState, baseScale, deckY);
    }
}


// --- Module: models/cosmic/catDeformation.js ---
// src/models/cosmic/catDeformation.js - Feline audio-reactive deformation & breath kinematics

function computeCatDeformation(cx, cy, width, height, audioState, time, deckY, isPlaying = true) {
    const bass = Number.isFinite(audioState?.bass) ? audioState.bass : 0.2;
    const mids = Number.isFinite(audioState?.mids) ? audioState.mids : 0.2;
    const highs = Number.isFinite(audioState?.highs) ? audioState.highs : 0.2;
    const beat = Number.isFinite(audioState?.beatImpulse) ? audioState.beatImpulse : 0.0;
    const bpm = Number.isFinite(audioState?.bpm) ? audioState.bpm : 120;

    // Peaceful resting breath or audio-reactive respiration
    const breathSpeed = isPlaying ? (1.6 + (bpm / 60) * 0.4) : 0.8;
    const breath = Math.sin(time * breathSpeed) * (isPlaying ? 0.028 : 0.012);

    // Bass expansion & beat pop
    const bassExpansionX = isPlaying ? (bass * 0.07 + beat * 0.05) : 0;
    const bassExpansionY = isPlaying ? (bass * 0.04 + beat * 0.03) : 0;

    // High frequency micro-vibration
    const vibration = isPlaying ? Math.sin(time * 45) * highs * 0.012 : 0;

    const currentScaleX = (1.0 + breath + bassExpansionX + vibration) * (width * 0.5);
    const currentScaleY = (1.0 - breath * 0.5 + bassExpansionY) * (height * 0.5);

    // Spine organic swaying
    const spineSway = isPlaying ? (Math.sin(time * 2.0) * (0.015 + mids * 0.025)) : (Math.sin(time * 0.8) * 0.005);

    // Ear perk intensity
    const earPerk = isPlaying ? (highs * 0.06 + beat * 0.05) : 0;

    // Ground base firmly at deckY
    const actualCy = deckY ? (deckY - currentScaleY * 0.96) : cy;

    return {
        cx,
        cy: actualCy,
        scaleX: currentScaleX,
        scaleY: currentScaleY,
        spineSway,
        earPerk,
        breath,
        bass,
        beat,
        highs,
        mids,
        deckY
    };
}


// --- Module: models/cosmic/catBodyPath.js ---
// src/models/cosmic/catBodyPath.js - Anatomical bezier spline path for cat viewed from behind

function buildCatBodyBezier(ctx, p, landmarks) {
    const { cx, cy, scaleX, scaleY, spineSway, earPerk, bass } = p;

    ctx.beginPath();

    // Start at bottom center base (resting flat on deck)
    const bX = cx;
    const bY = cy + 0.98 * scaleY;
    ctx.moveTo(bX, bY);

    // 1. Bottom center to Left Paw / Base
    const lpX = cx - 0.54 * scaleX;
    const lpY = cy + 0.97 * scaleY;
    ctx.quadraticCurveTo(cx - 0.25 * scaleX, cy + 0.98 * scaleY, lpX, lpY);

    // 2. Left Paw around seated Thigh / Flank
    const lThighX = cx + (-0.66 - bass * 0.04) * scaleX;
    const lThighY = cy + 0.68 * scaleY;
    ctx.quadraticCurveTo(cx - 0.64 * scaleX, cy + 0.92 * scaleY, lThighX, lThighY);

    // 3. Left Thigh up to Mid-Back / Waist
    const lBackX = cx + (-0.42 + spineSway * 0.2) * scaleX;
    const lBackY = cy + 0.24 * scaleY;
    ctx.quadraticCurveTo(cx - 0.65 * scaleX, cy + 0.44 * scaleY, lBackX, lBackY);

    // 4. Left Mid-Back to Shoulder
    const lShX = cx + (-0.34 + spineSway * 0.4) * scaleX;
    const lShY = cy - 0.04 * scaleY;
    ctx.quadraticCurveTo(cx - 0.40 * scaleX, cy + 0.08 * scaleY, lShX, lShY);

    // 5. Left Shoulder to Neck & Head Nape
    const lNapeX = cx + (-0.32 + spineSway * 0.6) * scaleX;
    const lNapeY = cy - 0.36 * scaleY;
    ctx.quadraticCurveTo(cx - 0.28 * scaleX, cy - 0.20 * scaleY, lNapeX, lNapeY);

    // 6. Left Nape to Outer Ear Base
    const lEarOuterX = cx + (-0.36 + spineSway * 0.6) * scaleX;
    const lEarOuterY = cy - 0.52 * scaleY;
    ctx.lineTo(lEarOuterX, lEarOuterY);

    // 7. Outer Ear Base to LEFT EAR TIP
    const lEarTipX = cx + (-0.31 - earPerk * 0.2 + spineSway * 0.7) * scaleX;
    const lEarTipY = cy + (-0.98 - earPerk * 0.4) * scaleY;
    ctx.quadraticCurveTo(cx - 0.37 * scaleX, cy - 0.76 * scaleY, lEarTipX, lEarTipY);

    // 8. Left Ear Tip to Inner Ear Base
    const lEarInnerX = cx + (-0.13 + spineSway * 0.7) * scaleX;
    const lEarInnerY = cy - 0.64 * scaleY;
    ctx.quadraticCurveTo(cx - 0.20 * scaleX, cy - 0.78 * scaleY, lEarInnerX, lEarInnerY);

    // 9. Inner Left Ear Base across Top of Head
    const rEarInnerX = cx + (0.13 + spineSway * 0.7) * scaleX;
    const rEarInnerY = cy - 0.64 * scaleY;
    ctx.quadraticCurveTo(cx + (0.0 + spineSway * 0.7) * scaleX, cy - 0.67 * scaleY, rEarInnerX, rEarInnerY);

    // 10. Inner Right Ear Base to RIGHT EAR TIP
    const rEarTipX = cx + (0.31 + earPerk * 0.2 + spineSway * 0.7) * scaleX;
    const rEarTipY = cy + (-0.98 - earPerk * 0.4) * scaleY;
    ctx.quadraticCurveTo(cx + 0.20 * scaleX, cy - 0.78 * scaleY, rEarTipX, rEarTipY);

    // 11. Right Ear Tip to Outer Right Ear Base
    const rEarOuterX = cx + (0.36 + spineSway * 0.6) * scaleX;
    const rEarOuterY = cy - 0.52 * scaleY;
    ctx.quadraticCurveTo(cx + 0.37 * scaleX, cy - 0.76 * scaleY, rEarOuterX, rEarOuterY);

    // 12. Outer Right Ear Base to Right Nape
    const rNapeX = cx + (0.32 + spineSway * 0.6) * scaleX;
    const rNapeY = cy - 0.36 * scaleY;
    ctx.lineTo(rNapeX, rNapeY);

    // 13. Right Nape to Right Shoulder
    const rShX = cx + (0.34 + spineSway * 0.4) * scaleX;
    const rShY = cy - 0.04 * scaleY;
    ctx.quadraticCurveTo(cx + 0.28 * scaleX, cy - 0.20 * scaleY, rShX, rShY);

    // 14. Right Shoulder to Mid-Back
    const rBackX = cx + (0.42 + spineSway * 0.2) * scaleX;
    const rBackY = cy + 0.24 * scaleY;
    ctx.quadraticCurveTo(cx + 0.40 * scaleX, cy + 0.08 * scaleY, rBackX, rBackY);

    // 15. Right Mid-Back to Right Thigh
    const rThighX = cx + (0.66 + bass * 0.04) * scaleX;
    const rThighY = cy + 0.68 * scaleY;
    ctx.quadraticCurveTo(cx + 0.65 * scaleX, cy + 0.44 * scaleY, rThighX, rThighY);

    // 16. Right Thigh to Right Paw & back to Bottom Center
    const rpX = cx + 0.54 * scaleX;
    const rpY = cy + 0.97 * scaleY;
    ctx.quadraticCurveTo(cx + 0.64 * scaleX, cy + 0.92 * scaleY, rpX, rpY);
    ctx.quadraticCurveTo(cx + 0.25 * scaleX, cy + 0.98 * scaleY, bX, bY);

    ctx.closePath();

    // Update landmarks
    if (landmarks) {
        landmarks.tailAnchor[0] = cx - 0.14 * scaleX;
        landmarks.tailAnchor[1] = cy + 0.92 * scaleY;
        landmarks.leftEarTip[0] = lEarTipX;
        landmarks.leftEarTip[1] = lEarTipY;
        landmarks.leftEarOuter[0] = lEarOuterX;
        landmarks.leftEarOuter[1] = lEarOuterY;
        landmarks.leftEarInner[0] = lEarInnerX;
        landmarks.leftEarInner[1] = lEarInnerY;
        landmarks.rightEarTip[0] = rEarTipX;
        landmarks.rightEarTip[1] = rEarTipY;
        landmarks.rightEarOuter[0] = rEarOuterX;
        landmarks.rightEarOuter[1] = rEarOuterY;
        landmarks.rightEarInner[0] = rEarInnerX;
        landmarks.rightEarInner[1] = rEarInnerY;
        landmarks.headCenter[0] = cx + (0.0 + spineSway * 0.7) * scaleX;
        landmarks.headCenter[1] = cy - 0.45 * scaleY;
        landmarks.spineMid[0] = cx + (0.0 + spineSway * 0.3) * scaleX;
        landmarks.spineMid[1] = cy + 0.12 * scaleY;
        landmarks.baseCenter[0] = bX;
        landmarks.baseCenter[1] = bY;
    }

    return landmarks;
}


// --- Module: models/cosmic/catEarRenderer.js ---
// src/models/cosmic/catEarRenderer.js - Ear glowing contours, tufts, and ridges

function renderCatEars(ctx, p, landmarks, palette) {
    const { leftEarTip, leftEarOuter, leftEarInner, rightEarTip, rightEarOuter, rightEarInner } = landmarks;
    const { beat, highs } = p;

    ctx.save();
    ctx.globalCompositeOperation = "screen";

    // Build ear path
    ctx.beginPath();
    ctx.moveTo(leftEarOuter[0], leftEarOuter[1]);
    ctx.quadraticCurveTo((leftEarOuter[0] + leftEarTip[0]) * 0.5 - 4, (leftEarOuter[1] + leftEarTip[1]) * 0.5, leftEarTip[0], leftEarTip[1]);
    ctx.quadraticCurveTo((leftEarInner[0] + leftEarTip[0]) * 0.5 + 3, (leftEarInner[1] + leftEarTip[1]) * 0.5, leftEarInner[0], leftEarInner[1]);

    ctx.moveTo(rightEarOuter[0], rightEarOuter[1]);
    ctx.quadraticCurveTo((rightEarOuter[0] + rightEarTip[0]) * 0.5 + 4, (rightEarOuter[1] + rightEarTip[1]) * 0.5, rightEarTip[0], rightEarTip[1]);
    ctx.quadraticCurveTo((rightEarInner[0] + rightEarTip[0]) * 0.5 - 3, (rightEarInner[1] + rightEarTip[1]) * 0.5, rightEarInner[0], rightEarInner[1]);

    // Inner glowing ear tufts
    ctx.fillStyle = palette.accentAlpha(0.45 + beat * 0.35);
    ctx.fill();

    // Pass 1: Fine soft neon aura
    ctx.strokeStyle = palette.primaryAlpha(0.85 + beat * 0.15);
    ctx.lineWidth = 4.0;
    ctx.stroke();

    // Pass 2: Intense razor-sharp neon contour
    ctx.strokeStyle = palette.accentAlpha(1.0);
    ctx.lineWidth = 2.0;
    ctx.stroke();

    // Pass 3: Brilliant starlight core
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.0;
    ctx.stroke();

    // Internal ear ridge accent
    ctx.beginPath();
    ctx.moveTo(leftEarTip[0], leftEarTip[1]);
    ctx.quadraticCurveTo(leftEarTip[0] + 6, leftEarTip[1] + 25, (leftEarOuter[0] + leftEarInner[0]) * 0.5, (leftEarOuter[1] + leftEarInner[1]) * 0.5);
    ctx.moveTo(rightEarTip[0], rightEarTip[1]);
    ctx.quadraticCurveTo(rightEarTip[0] - 6, rightEarTip[1] + 25, (rightEarOuter[0] + rightEarInner[0]) * 0.5, (rightEarOuter[1] + rightEarInner[1]) * 0.5);

    ctx.strokeStyle = palette.accentAlpha(0.9 + highs * 0.1);
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();
}


// --- Module: models/cosmic/catInteriorRenderer.js ---
// src/models/cosmic/catInteriorRenderer.js - Celestial body gradient, pulsar heart, and spine starlight

function renderCatInterior(ctx, p, landmarks, palette, time) {
    const { scaleY, scaleX, bass, beat } = p;
    const { headCenter, spineMid, baseCenter } = landmarks;

    ctx.save();

    // 1. Ethereal, luminous celestial body gradient
    const interiorGrad = ctx.createRadialGradient(
        spineMid[0], spineMid[1] - scaleY * 0.15, 10,
        spineMid[0], spineMid[1], scaleY * 1.05
    );
    interiorGrad.addColorStop(0, palette.primaryAlpha(0.65 + beat * 0.25));
    interiorGrad.addColorStop(0.35, palette.secondaryAlpha(0.55 + bass * 0.2));
    interiorGrad.addColorStop(0.75, palette.deepNebulaAlpha(0.75));
    interiorGrad.addColorStop(1.0, "rgba(8, 6, 22, 0.90)");

    ctx.fillStyle = interiorGrad;
    ctx.fill();

    // 2. High-vibrancy glowing chest and feline heart (Ultra-luminous pulsar)
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    const heartGlow = ctx.createRadialGradient(
        spineMid[0], spineMid[1] - scaleY * 0.2, 5,
        spineMid[0], spineMid[1] - scaleY * 0.1, scaleY * 0.75
    );
    heartGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    heartGlow.addColorStop(0.25, palette.accentAlpha(0.95));
    heartGlow.addColorStop(0.55, palette.primaryAlpha(0.75 + bass * 0.2));
    heartGlow.addColorStop(0.85, palette.secondaryAlpha(0.40));
    heartGlow.addColorStop(1.0, "transparent");

    ctx.fillStyle = heartGlow;
    ctx.fill();

    // 3. Flank and back starlight silk sheen
    const silkGrad = ctx.createLinearGradient(
        spineMid[0] - scaleX * 0.5, spineMid[1],
        spineMid[0] + scaleX * 0.5, spineMid[1]
    );
    silkGrad.addColorStop(0, palette.accentAlpha(0.50));
    silkGrad.addColorStop(0.3, palette.primaryAlpha(0.25));
    silkGrad.addColorStop(0.7, palette.primaryAlpha(0.25));
    silkGrad.addColorStop(1.0, palette.accentAlpha(0.50));

    ctx.fillStyle = silkGrad;
    ctx.fill();

    // 4. Luminous spine energy line with sparkling starlight
    ctx.beginPath();
    ctx.moveTo(headCenter[0], headCenter[1] + 10);
    ctx.quadraticCurveTo(spineMid[0] + Math.sin(time * 2.2) * 5, spineMid[1], baseCenter[0], baseCenter[1] - 8);
    ctx.strokeStyle = palette.accentAlpha(1.0);
    ctx.lineWidth = 2.8;
    ctx.stroke();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.4;
    ctx.stroke();

    ctx.restore();
    ctx.restore();
}


// --- Module: models/cosmic/catContourRenderer.js ---
// src/models/cosmic/catContourRenderer.js - Multi-layer laser glowing silhouette contour

function renderCatContour(ctx, p, palette) {
    const { bass, highs, beat } = p;

    ctx.save();

    // Pass 0: Crisp thin dark contrast edge
    ctx.strokeStyle = "rgba(1, 1, 4, 0.95)";
    ctx.lineWidth = 4.5;
    ctx.stroke();

    ctx.save();
    ctx.globalCompositeOperation = "screen";

    // Layer 1: Fine volumetric glow
    ctx.strokeStyle = palette.primaryAlpha(0.85 + bass * 0.15);
    ctx.lineWidth = 5.2 + bass * 1.5;
    ctx.stroke();

    // Layer 2: Ultra-vibrant laser neon edge
    ctx.strokeStyle = palette.accentAlpha(1.0);
    ctx.lineWidth = 2.2;
    ctx.stroke();

    // Layer 3: Pure starlight white laser core
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 + highs * 0.05})`;
    ctx.lineWidth = 1.1;
    ctx.stroke();

    // Layer 4: High-energy beat flash
    if (beat > 0.3) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${beat * 0.8})`;
        ctx.lineWidth = 2.0;
        ctx.stroke();
    }

    ctx.restore();
    ctx.restore();
}


// --- Module: models/cosmic/CatGeometry.js ---
// src/models/cosmic/CatGeometry.js - Cat mathematical geometry and landmarks facade

class CatGeometry {
    constructor() {
        this.landmarks = {
            tailAnchor: [0, 0],
            leftEarTip: [0, 0],
            leftEarOuter: [0, 0],
            leftEarInner: [0, 0],
            rightEarTip: [0, 0],
            rightEarOuter: [0, 0],
            rightEarInner: [0, 0],
            headCenter: [0, 0],
            spineMid: [0, 0],
            baseCenter: [0, 0]
        };
    }

    getDeformedPath(cx, cy, width, height, audioState, time, deckY, isPlaying = true) {
        return computeCatDeformation(cx, cy, width, height, audioState, time, deckY, isPlaying);
    }

    buildBodyPath(ctx, p) {
        return buildCatBodyBezier(ctx, p, this.landmarks);
    }

    renderEarContours(ctx, p, landmarks, palette) {
        renderCatEars(ctx, p, landmarks, palette);
    }

    renderInterior(ctx, p, landmarks, palette, time) {
        renderCatInterior(ctx, p, landmarks, palette, time);
    }

    renderContour(ctx, p, palette) {
        renderCatContour(ctx, p, palette);
    }
}


// --- Module: models/cosmic/CosmicCat.js ---
// src/models/cosmic/CosmicCat.js - Cohesive facade for Cosmic Cat model (Liskov Substitution Principle)

class CosmicCat {
    constructor() {
        this.geometry = new CatGeometry();
        this.tail = new TailPhysics(20);
        this.lastDeformedParams = null;
        this.lastScale = 1.0;
        this.lastDeckY = 0;
    }

    update(dt, time, audio, cx, cy, width, height, isPlaying = true) {
        const w = width || window.innerWidth || 800;
        const h = height || window.innerHeight || 600;
        const deckY = h * 0.86;
        const catWidth = Math.min(270, Math.min(w * 0.32, h * 0.44));
        const catHeight = catWidth * 1.35;
        const catScale = catWidth / 260;

        const deformedParams = this.geometry.getDeformedPath(
            cx, cy,
            catWidth, catHeight,
            audio, time,
            deckY, isPlaying
        );

        this.tail.update(
            this.geometry.landmarks.tailAnchor,
            catScale,
            audio,
            dt,
            time,
            deckY,
            isPlaying
        );

        this.lastDeformedParams = deformedParams;
        this.lastScale = catScale;
        this.lastDeckY = deckY;
    }

    render(ctx, cx, cy, scale, time, audio, palette, effects = null, width = 800, height = 600) {
        const w = width || window.innerWidth || 800;
        const h = height || window.innerHeight || 600;
        const deckY = this.lastDeckY || (h * 0.86);

        const catWidth = Math.min(270, Math.min(w * 0.32, h * 0.44)) * (scale || 1.0);
        const catHeight = catWidth * 1.35;
        const catScale = catWidth / 260;

        const p = this.lastDeformedParams || this.geometry.getDeformedPath(
            cx, cy, catWidth, catHeight, audio, time, deckY, audio.isPlaying
        );

        // 2. Render tail physics resting on deck
        this.tail.render(ctx, palette, audio, catScale, deckY);

        // 3. Render Cosmic Cat body interior, glowing ears and laser contour
        this.geometry.buildBodyPath(ctx, p);
        this.geometry.renderInterior(ctx, p, this.geometry.landmarks, palette, time);
        this.geometry.renderEarContours(ctx, p, this.geometry.landmarks, palette);

        this.geometry.buildBodyPath(ctx, p);
        this.geometry.renderContour(ctx, p, palette);
    }
}


// --- Module: models/cyber/constellationData.js ---
// src/models/cyber/constellationData.js - Cyber cat constellation topology nodes & links

const CYBER_CONSTELLATION_NODES = [
    { id: 'heart', relX: 0, relY: -15, size: 4.5, isHeart: true },
    { id: 'throat', relX: 0, relY: -45, size: 2.8 },
    { id: 'leftShoulder', relX: -26, relY: -22, size: 2.5 },
    { id: 'rightShoulder', relX: 26, relY: -22, size: 2.5 },
    { id: 'spineMid', relX: 0, relY: 15, size: 3.0 },
    { id: 'spineLow', relX: 0, relY: 45, size: 3.2 },
    { id: 'leftFlank', relX: -32, relY: 35, size: 2.5 },
    { id: 'rightFlank', relX: 32, relY: 35, size: 2.5 },
    { id: 'leftHip', relX: -42, relY: 72, size: 2.8 },
    { id: 'rightHip', relX: 42, relY: 72, size: 2.8 },
    { id: 'tailBase', relX: 0, relY: 78, size: 3.5 }
];

const CYBER_CONSTELLATION_LINKS = [
    ['throat', 'heart'],
    ['throat', 'leftShoulder'],
    ['throat', 'rightShoulder'],
    ['leftShoulder', 'heart'],
    ['rightShoulder', 'heart'],
    ['heart', 'spineMid'],
    ['spineMid', 'leftFlank'],
    ['spineMid', 'rightFlank'],
    ['leftFlank', 'leftHip'],
    ['rightFlank', 'rightHip'],
    ['spineMid', 'spineLow'],
    ['spineLow', 'tailBase'],
    ['leftHip', 'tailBase'],
    ['rightHip', 'tailBase']
];


// --- Module: models/cyber/cyberTail.js ---
// src/models/cyber/cyberTail.js - Cyberpunk segmented neon tail kinematics & rendering

function renderCyberTail(ctx, tailPoints, tailSegments, time, audio, palette) {
    ctx.save();
    const rootX = 0;
    const rootY = 78;
    const swayFreq = 1.8 + (audio.isPlaying ? audio.tempo / 120 : 0.8);
    const swayAmp = 42 + audio.bass * 25;

    ctx.beginPath();
    ctx.moveTo(rootX, rootY);

    for (let i = 0; i < tailSegments; i++) {
        const frac = (i + 1) / tailSegments;
        const wave = Math.sin(time * swayFreq - frac * 3.2);
        const curl = Math.pow(frac, 1.4) * (swayAmp * wave);
        const segX = rootX + curl + Math.sin(frac * Math.PI) * 25;
        const segY = rootY + frac * 65 - Math.pow(frac, 2) * 20;

        tailPoints[i] = { x: segX, y: segY };
        ctx.lineTo(segX, segY);
    }

    ctx.globalCompositeOperation = 'screen';
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 3.5 + audio.bass * 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = palette.core;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    const pulsePos = (time * 1.5) % 1.0;
    const pulseIndex = Math.min(tailSegments - 1, Math.floor(pulsePos * tailSegments));
    const pulsePt = tailPoints[pulseIndex];
    if (pulsePt) {
        ctx.fillStyle = palette.core;
        ctx.beginPath();
        ctx.arc(pulsePt.x, pulsePt.y, 3.5 + audio.bass * 2.0, 0, Math.PI * 2);
        ctx.fill();
    }

    const tip = tailPoints[tailSegments - 1];
    if (tip) {
        ctx.fillStyle = palette.primary;
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 4.0 + audio.treble * 3.0, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}


// --- Module: models/cyber/cyberAura.js ---
// src/models/cyber/cyberAura.js - Cyber cat diffuse body aura gradient

function renderCyberBodyAura(ctx, audio, palette) {
    ctx.save();
    const bodyGrad = ctx.createRadialGradient(0, 0, 10, 0, 20, 95);
    bodyGrad.addColorStop(0, palette.primary);
    bodyGrad.addColorStop(0.5, palette.secondary);
    bodyGrad.addColorStop(1, 'rgba(5, 5, 20, 0.45)');

    ctx.fillStyle = bodyGrad;
    ctx.globalAlpha = 0.35 + audio.bass * 0.25;

    ctx.beginPath();
    ctx.moveTo(0, -50);
    ctx.bezierCurveTo(-25, -35, -45, 0, -42, 45);
    ctx.bezierCurveTo(-40, 75, -55, 92, -35, 98);
    ctx.lineTo(35, 98);
    ctx.bezierCurveTo(55, 92, 40, 75, 42, 45);
    ctx.bezierCurveTo(45, 0, 25, -35, 0, -50);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}


// --- Module: models/cyber/cyberConstellation.js ---
// src/models/cyber/cyberConstellation.js - Constellation nodes, lines, and pulsar heart rendering

function renderCyberConstellation(ctx, nodes, links, time, audio, palette) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    const nodeMap = {};
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        nodeMap[n.id] = n;
    }

    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 1.0;
    ctx.globalAlpha = 0.45 + audio.mid * 0.35;

    for (let i = 0; i < links.length; i++) {
        const [idA, idB] = links[i];
        const a = nodeMap[idA];
        const b = nodeMap[idB];
        if (a && b) {
            ctx.beginPath();
            ctx.moveTo(a.relX, a.relY);
            ctx.lineTo(b.relX, b.relY);
            ctx.stroke();
        }
    }

    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(time * 3.5 + i * 0.8) * 0.3 + 0.7;
        const size = n.size * (pulse + audio.energy * 0.4);

        if (n.isHeart) {
            const heartPulse = 1.0 + (audio.bass * 0.8);
            const heartGrad = ctx.createRadialGradient(n.relX, n.relY, 1, n.relX, n.relY, 18 * heartPulse);
            heartGrad.addColorStop(0, palette.core);
            heartGrad.addColorStop(0.4, palette.accent);
            heartGrad.addColorStop(1, 'rgba(255, 0, 127, 0)');

            ctx.fillStyle = heartGrad;
            ctx.globalAlpha = 0.85;
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, 18 * heartPulse, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = palette.core;
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, 4.5 * heartPulse, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = palette.core;
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}


// --- Module: models/cyber/cyberContours.js ---
// src/models/cyber/cyberContours.js - Neon cyber body outline contours and markings

function renderCyberBodyContours(ctx, audio, palette) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.85 + audio.energy * 0.15;

    // Left flank contour
    ctx.beginPath();
    ctx.moveTo(-10, -50);
    ctx.bezierCurveTo(-26, -30, -44, 0, -42, 45);
    ctx.bezierCurveTo(-40, 75, -58, 92, -38, 98);
    ctx.stroke();

    // Right flank contour
    ctx.beginPath();
    ctx.moveTo(10, -50);
    ctx.bezierCurveTo(26, -30, 44, 0, 42, 45);
    ctx.bezierCurveTo(40, 75, 58, 92, 38, 98);
    ctx.stroke();

    // Base paw rests
    ctx.beginPath();
    ctx.moveTo(-38, 98);
    ctx.lineTo(-12, 98);
    ctx.moveTo(12, 98);
    ctx.lineTo(38, 98);
    ctx.stroke();

    // Chest chevron cyber accent
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.5 + audio.mid * 0.3;
    ctx.beginPath();
    ctx.moveTo(-16, -18);
    ctx.lineTo(0, -6);
    ctx.lineTo(16, -18);
    ctx.stroke();

    ctx.restore();
}


// --- Module: models/cyber/cyberWhiskers.js ---
// src/models/cyber/cyberWhiskers.js - Audio-reactive vibrating cyber whiskers

function renderCyberWhiskers(ctx, time, audio, palette) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 1.0;

    const whiskerVibe = Math.sin(time * 12) * (audio.treble * 4.0);

    const leftWhiskers = [
        { startX: -14, startY: 14, endX: -48, endY: 8 + whiskerVibe },
        { startX: -15, startY: 17, endX: -52, endY: 17 },
        { startX: -14, startY: 20, endX: -46, endY: 26 - whiskerVibe }
    ];
    for (let i = 0; i < leftWhiskers.length; i++) {
        const w = leftWhiskers[i];
        ctx.globalAlpha = 0.5 + audio.treble * 0.4;
        ctx.beginPath();
        ctx.moveTo(w.startX, w.startY);
        ctx.lineTo(w.endX, w.endY);
        ctx.stroke();
    }

    const rightWhiskers = [
        { startX: 14, startY: 14, endX: 48, endY: 8 + whiskerVibe },
        { startX: 15, startY: 17, endX: 52, endY: 17 },
        { startX: 14, startY: 20, endX: 46, endY: 26 - whiskerVibe }
    ];
    for (let i = 0; i < rightWhiskers.length; i++) {
        const w = rightWhiskers[i];
        ctx.globalAlpha = 0.5 + audio.treble * 0.4;
        ctx.beginPath();
        ctx.moveTo(w.startX, w.startY);
        ctx.lineTo(w.endX, w.endY);
        ctx.stroke();
    }

    ctx.restore();
}


// --- Module: models/cyber/cyberEyes.js ---
// src/models/cyber/cyberEyes.js - Animated cyber cat eyes with audio-reactive pupils

function renderCyberEyes(ctx, isBlinking, blinkProgress, audio, palette) {
    ctx.save();
    const headY = -72;
    ctx.translate(0, headY);

    const blink = isBlinking ? Math.sin(blinkProgress) : 0;
    const eyeHeightScale = Math.max(0.08, 1.0 - blink * 0.95);
    const pupilWidth = 2.0 + audio.bass * 2.5;

    // Left Eye
    ctx.save();
    ctx.translate(-14, 2);
    ctx.scale(1.0, eyeHeightScale);

    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = palette.primary;
    ctx.beginPath();
    ctx.ellipse(0, 0, 7.5, 5.0, -0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette.core;
    ctx.beginPath();
    ctx.ellipse(0, 0, 4.5, 3.0, -0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#010108';
    ctx.beginPath();
    ctx.ellipse(0, 0, pupilWidth, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(2, -1.8, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right Eye
    ctx.save();
    ctx.translate(14, 2);
    ctx.scale(1.0, eyeHeightScale);

    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = palette.primary;
    ctx.beginPath();
    ctx.ellipse(0, 0, 7.5, 5.0, 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette.core;
    ctx.beginPath();
    ctx.ellipse(0, 0, 4.5, 3.0, 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#010108';
    ctx.beginPath();
    ctx.ellipse(0, 0, pupilWidth, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(2, -1.8, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
}


// --- Module: models/cyber/cyberHead.js ---
// src/models/cyber/cyberHead.js - Cyber cat polygonal head, twitching ears, and forehead gem

function renderCyberHead(ctx, leftEarAngle, rightEarAngle, time, audio, palette) {
    ctx.save();
    const headY = -72;
    ctx.translate(0, headY);

    // Left Ear
    ctx.save();
    ctx.translate(-24, -14);
    ctx.rotate(leftEarAngle);
    
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 2.0;
    ctx.globalCompositeOperation = 'screen';
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(-12, -28);
    ctx.lineTo(14, -6);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = palette.accent;
    ctx.globalAlpha = 0.3 + audio.bass * 0.3;
    ctx.beginPath();
    ctx.moveTo(-2, 6);
    ctx.lineTo(-9, -20);
    ctx.lineTo(9, -4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(24, -14);
    ctx.rotate(rightEarAngle);

    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 2.0;
    ctx.globalCompositeOperation = 'screen';
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(12, -28);
    ctx.lineTo(-14, -6);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = palette.accent;
    ctx.globalAlpha = 0.3 + audio.bass * 0.3;
    ctx.beginPath();
    ctx.moveTo(2, 6);
    ctx.lineTo(9, -20);
    ctx.lineTo(-9, -4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Head polygon
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 2.0;
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.95;

    ctx.beginPath();
    ctx.moveTo(-16, -14);
    ctx.lineTo(16, -14);
    ctx.lineTo(32, 4);
    ctx.lineTo(18, 22);
    ctx.lineTo(0, 26);
    ctx.lineTo(-18, 22);
    ctx.lineTo(-32, 4);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(8, 6, 24, 0.75)';
    ctx.fill();

    // Forehead diamond gem
    const gemPulse = 1 + audio.bass * 0.4;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = palette.core;
    ctx.beginPath();
    ctx.moveTo(0, -10 * gemPulse);
    ctx.lineTo(5 * gemPulse, -4 * gemPulse);
    ctx.lineTo(0, 2 * gemPulse);
    ctx.lineTo(-5 * gemPulse, -4 * gemPulse);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 1.0;
    ctx.stroke();
    ctx.restore();

    // Whiskers
    renderCyberWhiskers(ctx, time, audio, palette);

    // Cyber nose & mouth
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 1.2;
    ctx.globalCompositeOperation = 'screen';
    ctx.beginPath();
    ctx.moveTo(-3, 14);
    ctx.lineTo(3, 14);
    ctx.lineTo(0, 17);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 17);
    ctx.lineTo(0, 20);
    ctx.moveTo(-5, 21);
    ctx.bezierCurveTo(-2, 23, 0, 20, 0, 20);
    ctx.bezierCurveTo(0, 20, 2, 23, 5, 21);
    ctx.stroke();

    ctx.restore();
}


// --- Module: models/cyber/CyberCat.js ---
// src/models/cyber/CyberCat.js - Cyberpunk & Celestial Cat vector model orchestrator

class CyberCat {
    constructor() {
        this.blinkProgress = 0;
        this.nextBlinkTime = 3.0;
        this.isBlinking = false;

        this.leftEarTwitch = 0;
        this.rightEarTwitch = 0;
        this.nextTwitchTime = 2.0;

        this.currentLeftEarAngle = 0;
        this.currentRightEarAngle = 0;

        this.tailSegments = 14;
        this.tailPoints = [];
        for (let i = 0; i < this.tailSegments; i++) {
            this.tailPoints.push({ x: 0, y: 0 });
        }

        this.constellationNodes = CYBER_CONSTELLATION_NODES;
        this.constellationLinks = CYBER_CONSTELLATION_LINKS;
    }

    update(dt, time, audio) {
        if (time > this.nextBlinkTime) {
            this.isBlinking = true;
            this.blinkProgress += dt * 12;
            if (this.blinkProgress >= Math.PI) {
                this.blinkProgress = 0;
                this.isBlinking = false;
                this.nextBlinkTime = time + 2.5 + Math.random() * 4.0;
            }
        }

        if (time > this.nextTwitchTime) {
            if (Math.random() > 0.5) {
                this.leftEarTwitch = 0.08 + Math.random() * 0.08;
            } else {
                this.rightEarTwitch = -0.08 - Math.random() * 0.08;
            }
            this.nextTwitchTime = time + 1.8 + Math.random() * 3.5;
        }
        this.leftEarTwitch += (0 - this.leftEarTwitch) * (dt * 6.0);
        this.rightEarTwitch += (0 - this.rightEarTwitch) * (dt * 6.0);

        const earBeatBounce = audio.mid * 0.05;
        this.currentLeftEarAngle = this.leftEarTwitch - earBeatBounce;
        this.currentRightEarAngle = this.rightEarTwitch + earBeatBounce;
    }

    render(ctx, centerX, centerY, scale, time, audio, palette, bgMode, width, height) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);

        const breath = Math.sin(time * 2.0) * 2.0 * (1 + audio.energy * 0.5);
        const bassBounce = audio.bass * 4.0;
        ctx.translate(0, -bassBounce + breath);

        renderCyberTail(ctx, this.tailPoints, this.tailSegments, time, audio, palette);
        renderCyberBodyAura(ctx, audio, palette);
        renderCyberConstellation(ctx, this.constellationNodes, this.constellationLinks, time, audio, palette);
        renderCyberBodyContours(ctx, audio, palette);
        renderCyberHead(ctx, this.currentLeftEarAngle, this.currentRightEarAngle, time, audio, palette);
        renderCyberEyes(ctx, this.isBlinking, this.blinkProgress, audio, palette);

        ctx.restore();
    }
}


// --- Module: core/panelBounds.js ---
// src/core/panelBounds.js - Viewport canvas sizing & natural central placement (L25)

function syncPanelBounds(engine) {
    if (!engine.canvas) return;

    engine.dpr = window.devicePixelRatio || 1;
    engine.width = window.innerWidth;
    engine.height = window.innerHeight;

    const targetW = Math.floor(engine.width * engine.dpr);
    const targetH = Math.floor(engine.height * engine.dpr);

    if (engine.canvas.width !== targetW || engine.canvas.height !== targetH) {
        engine.canvas.width = targetW;
        engine.canvas.height = targetH;
        engine.ctx.setTransform(engine.dpr, 0, 0, engine.dpr, 0, 0);
        engine.env.resize(engine.width, engine.height);
    }

    // Direct natural centering across the full viewport
    engine.catCenterX = engine.width * 0.5;
    engine.catCenterY = engine.height * 0.52;
}

function setupResizeHandling(engine) {
    const handleResize = () => {
        syncPanelBounds(engine);
        if (engine.isFrozen) {
            engine.renderFrame(0.016, true);
        }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
}


// --- Module: core/keybindings.js ---
// src/core/keybindings.js - Global keyboard shortcut listeners

function setupVisualizerKeybindings(engine) {
    window.addEventListener('keydown', (e) => {
        const tag = e.target.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

        if (e.key === 'a' || e.key === 'A' || e.key === 'v' || e.key === 'V') {
            e.preventDefault();
            engine.toggleActive();
        } else if (e.key === 'c' || e.key === 'C') {
            e.preventDefault();
            engine.nextCat();
        } else if (e.key === 'b' || e.key === 'B' || e.key === 'g' || e.key === 'G') {
            e.preventDefault();
            engine.nextBackground();
        } else if (e.key === 't' || e.key === 'T') {
            e.preventDefault();
            engine.nextPalette();
        } else if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            engine.toggleFullscreen();
        } else if (e.key === 'Escape' && engine.isFullscreen) {
            e.preventDefault();
            engine.toggleFullscreen(false);
        }
    });
}


// --- Module: core/fullscreenManager.js ---
// src/core/fullscreenManager.js - Fullscreen immersion mode and toast hint

let fullscreenHintTimer = null;

function showFullscreenHint() {
    let hint = document.getElementById('cyber-cat-fs-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.id = 'cyber-cat-fs-hint';
        hint.textContent = 'Appuyez sur Échap ou cliquez pour quitter le plein écran';
        document.body.appendChild(hint);
    }
    hint.classList.add('visible');
    clearTimeout(fullscreenHintTimer);
    fullscreenHintTimer = setTimeout(() => {
        hint.classList.remove('visible');
    }, 3000);
}

function toggleVisualizerFullscreen(engine, forceState) {
    engine.isFullscreen = typeof forceState === 'boolean' ? forceState : !engine.isFullscreen;

    if (engine.isFullscreen && !engine.isForeground) {
        engine.toggleActive(true);
    }

    document.body.classList.toggle('cyber-cat-fullscreen-active', engine.isFullscreen);
    if (engine.panel) {
        engine.panel.classList.toggle('fullscreen', engine.isFullscreen);
    }

    syncPanelBounds(engine);

    if (engine.isFullscreen) {
        showFullscreenHint();
    }
}


// --- Module: core/uiSync.js ---
// src/core/uiSync.js - Synchronizing visualizer state with the 2 playbar buttons & settings dropdown

function updateVisualizerUI(engine) {
    const curPalette = engine.paletteManager.active;

    // 1. Bouton On/Off (Chat)
    const toggleBtn = document.getElementById("cosmic-cat-toggle-btn");
    if (toggleBtn) {
        if (engine.isForeground) {
            toggleBtn.classList.add("active");
            toggleBtn.style.color = curPalette.primary;
            toggleBtn.title = `Visualiseur Chat : ACTIF (Clic pour désactiver | Modèle : ${engine.activeCat === 'cyber' ? 'Cyber Cat' : 'Cosmic Cat'})`;
        } else {
            toggleBtn.classList.remove("active");
            toggleBtn.style.color = "var(--spice-subtext, rgba(255,255,255,0.6))";
            toggleBtn.title = "Visualiseur Chat : INACTIF (Clic pour activer)";
        }
    }

    // 2. Bouton Paramètres ⚙️ (Masqué si le visualiseur est inactif)
    const settingsBtn = document.getElementById("cosmic-cat-settings-btn");
    if (settingsBtn) {
        settingsBtn.style.display = engine.isForeground ? "inline-flex" : "none";
        settingsBtn.style.color = engine.isForeground ? curPalette.primary : "var(--spice-subtext, rgba(255,255,255,0.6))";
        settingsBtn.title = "Paramètres du Visualiseur (Modèle, Thème, Effets)";
    }

    // 3. Mise à jour de l'interface du menu déroulant
    if (typeof updateSettingsDropdownUI === "function") {
        updateSettingsDropdownUI(engine);
    }
}


// --- Module: core/renderPipeline.js ---
// src/core/renderPipeline.js - Frame rendering pipeline for composable backgrounds and cat models

function renderVisualizerFrame(engine, dt, isStatic = false) {
    const ctx = engine.ctx;
    const palette = engine.paletteManager.active;

    if (!isStatic) {
        engine.audio.update(dt);
        engine.env.update(dt, engine.width, engine.height, engine.audio, palette, engine.catCenterX, engine.catCenterY);
        if (engine.env.effects && engine.env.effects.fractals) {
            engine.cosmicFractals.update(dt, engine.liveTime, engine.audio, engine.audio.isPlaying);
        }
    }

    ctx.save();
    ctx.setTransform(engine.dpr, 0, 0, engine.dpr, 0, 0);

    // 1. Render Background Composable Layers
    engine.env.render(
        ctx,
        engine.width,
        engine.height,
        engine.liveTime,
        engine.audio,
        palette,
        engine.catCenterX,
        engine.catCenterY,
        engine.cosmicFractals
    );

    // 2. Render Wooden Deck Platform (Decoupled environmental layer for all models)
    if (engine.env.effects && engine.env.effects.deck) {
        const deckY = engine.height * 0.86;
        engine.woodenDeck.render(ctx, engine.width, engine.height, deckY, palette, engine.audio, engine.catCenterX);
    }

    // 3. Polymorphic Model Rendering (Liskov Substitution Principle)
    const model = engine.models[engine.activeCat] || engine.models.cyber;
    const catScale = Math.min(1.2, Math.max(0.65, Math.min(engine.width / 950, engine.height / 700)));

    if (!isStatic && model.update) {
        model.update(dt, engine.liveTime, engine.audio, engine.catCenterX, engine.catCenterY, engine.width, engine.height, engine.audio.isPlaying);
    } else if (isStatic && model.update && !model.lastDeformedParams) {
        model.update(0.016, engine.liveTime, engine.audio, engine.catCenterX, engine.catCenterY, engine.width, engine.height, false);
    }

    model.render(
        ctx,
        engine.catCenterX,
        engine.catCenterY,
        catScale,
        engine.liveTime,
        engine.audio,
        palette,
        engine.env.effects,
        engine.width,
        engine.height
    );

    ctx.restore();
}


// --- Module: core/VisualizerEngine.js ---
// src/core/VisualizerEngine.js - Master Orchestrator for Cyberpunk & Cosmic Cat Visualizer (SOLID Architecture)

class VisualizerEngine {
    constructor(canvas, panel) {
        this.canvas = canvas;
        this.panel = panel || null;
        this.ctx = canvas.getContext('2d', { alpha: false });
        this.dpr = window.devicePixelRatio || 1;

        this.paletteManager = new PaletteManager();
        this.audio = new AudioEngine();
        this.env = new BackgroundManager();
        this.cosmicFractals = new CosmicFractals();
        this.woodenDeck = new WoodenDeck();

        // Polymorphic Model Registry (SOLID OCP / LSP)
        this.models = {
            cyber: new CyberCat(),
            cosmic: new CosmicCat()
        };

        // Saved or default model selection (Exclusive selection)
        const savedModel = (typeof localStorage !== 'undefined') ? localStorage.getItem('cosmic-cat-model') : null;
        this.activeCat = (savedModel && this.models[savedModel]) ? savedModel : 'cyber';

        // Saved theme
        const savedTheme = (typeof localStorage !== 'undefined') ? localStorage.getItem('cosmic-cat-theme') : null;
        if (savedTheme) {
            this.paletteManager.setPalette(savedTheme, true);
        }

        // State: Active vs Frozen/Paused
        const savedActive = (typeof localStorage !== 'undefined') ? localStorage.getItem('cosmic-cat-bg-enabled') === 'true' : false;
        this.isForeground = savedActive;
        this.isFrozen = true;
        this.loopRunning = false;
        this.isFullscreen = false;

        this.liveTime = 0;
        this.lastFrameTime = performance.now();

        this.width = window.innerWidth || 800;
        this.height = window.innerHeight || 600;
        this.catCenterX = this.width * 0.5;
        this.catCenterY = this.height * 0.52;

        if (typeof document !== 'undefined' && document.body) {
            document.body.classList.toggle('cyber-cat-visualizer-active', this.isForeground);
        }

        if (this.canvas) {
            this.canvas.style.display = this.isForeground ? 'block' : 'none';
        }

        setupResizeHandling(this);
        setupVisualizerKeybindings(this);

        // Spotify player hook: freeze when music is paused, unfreeze when playing
        if (typeof Spicetify !== "undefined" && Spicetify.Player) {
            Spicetify.Player.addEventListener("onplaypause", () => {
                const playing = Spicetify.Player.isPlaying();
                this.audio.isPlaying = playing;
                if (this.isForeground) {
                    if (playing) {
                        this.unfreeze();
                    } else {
                        this.freeze();
                    }
                }
            });
        }

        this.loop = this.loop.bind(this);
        if (this.isForeground) {
            const isPlaying = this.audio && this.audio.isPlaying;
            if (isPlaying) {
                this.unfreeze();
            } else {
                this.freeze();
            }
        }
    }

    freeze() {
        if (!this.isForeground) return;
        this.isFrozen = true;
        this.loopRunning = false;
        this.renderFrame(0.016, true);
    }

    unfreeze() {
        if (!this.isForeground) return;
        this.isFrozen = false;
        if (!this.loopRunning) {
            this.loopRunning = true;
            this.lastFrameTime = performance.now();
            requestAnimationFrame(this.loop);
        }
    }

    syncBounds() {
        syncPanelBounds(this);
    }

    toggleActive(forceState) {
        const nextActive = typeof forceState === 'boolean' ? forceState : !this.isForeground;
        this.isForeground = nextActive;

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('cosmic-cat-bg-enabled', this.isForeground ? 'true' : 'false');
        }

        if (typeof document !== 'undefined' && document.body) {
            document.body.classList.toggle('cyber-cat-visualizer-active', this.isForeground);
        }

        if (this.isForeground) {
            // ON: show canvas and resume/freeze depending on playback state
            if (this.canvas) {
                this.canvas.style.display = 'block';
            }
            const isPlaying = this.audio && this.audio.isPlaying;
            if (isPlaying) {
                this.unfreeze();
            } else {
                this.freeze();
            }
        } else {
            // OFF: completely hide canvas, clear canvas pixels and stop loop
            this.loopRunning = false;
            this.isFrozen = true;
            if (this.canvas) {
                this.canvas.style.display = 'none';
            }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (typeof closeSettingsDropdown === 'function') {
                closeSettingsDropdown();
            }
        }

        this.updateAllUI();
    }

    get currentModel() {
        return this.activeCat;
    }

    get isActive() {
        return this.isForeground;
    }

    get cyberCat() {
        return this.models.cyber;
    }

    get cosmicCat() {
        return this.models.cosmic;
    }

    // Exclusive Cat Model Selection (Activating one disables the other)
    setCat(cat) {
        if (this.models[cat]) {
            this.activeCat = cat;
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('cosmic-cat-model', cat);
            }
            this.updateAllUI();
            if (this.isForeground && this.isFrozen) this.renderFrame(0.016, true);
        }
        return this.activeCat;
    }

    nextCat() {
        const keys = Object.keys(this.models);
        const idx = keys.indexOf(this.activeCat);
        return this.setCat(keys[(idx + 1) % keys.length]);
    }

    // Exclusive Palette Selection (Activating one disables the previous)
    setPalette(id) {
        this.paletteManager.setPalette(id, true);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('cosmic-cat-theme', id);
        }
        this.updateAllUI();
        if (this.isForeground && this.isFrozen) this.renderFrame(0.016, true);
    }

    nextPalette() {
        const p = this.paletteManager.nextPalette();
        if (typeof localStorage !== 'undefined' && p && p.id) {
            localStorage.setItem('cosmic-cat-theme', p.id);
        }
        this.updateAllUI();
        if (this.isForeground && this.isFrozen) this.renderFrame(0.016, true);
        return p;
    }

    // Independent Effect Toggles (Fractals, Stars, Nebula, Grid, Shockwaves, Deck)
    toggleEffect(name) {
        const res = this.env.toggleEffect(name);
        this.updateAllUI();
        if (this.isForeground && this.isFrozen) this.renderFrame(0.016, true);
        return res;
    }

    setEffect(name, enabled) {
        const res = this.env.setEffect(name, enabled);
        this.updateAllUI();
        if (this.isForeground && this.isFrozen) this.renderFrame(0.016, true);
        return res;
    }

    getEffect(name) {
        return this.env.getEffect(name);
    }

    updateAllUI() {
        updateVisualizerUI(this);
    }

    toggleFullscreen(forceState) {
        toggleVisualizerFullscreen(this, forceState);
    }

    renderFrame(dt, isStatic = false) {
        renderVisualizerFrame(this, dt, isStatic);
    }

    loop(now) {
        if (!this.isForeground) {
            this.loopRunning = false;
            return;
        }

        // When visualizer is active but music is paused, freeze animation (0% CPU)
        if (this.audio && !this.audio.isPlaying) {
            this.freeze();
            return;
        }

        try {
            const dt = Math.min(0.1, (now - this.lastFrameTime) / 1000) || 0.016;
            this.lastFrameTime = now;
            this.liveTime += dt;

            if ((Math.floor(this.liveTime * 60) % 30) === 0) {
                syncPanelBounds(this);
            }

            if (this.isFrozen) return;

            this.renderFrame(dt, false);
        } catch (err) {
            console.error('[VisualizerEngine] Loop error:', err);
        } finally {
            if (this.loopRunning && !this.isFrozen && this.isForeground) {
                requestAnimationFrame(this.loop);
            }
        }
    }

    destroy() {
        this.loopRunning = false;
        if (this.audio) {
            this.audio.disconnectLiveSource();
        }
    }
}


// --- Module: ui/canvasMount.js ---
// src/ui/canvasMount.js - Persistent global wallpaper canvas mounting

function mountGlobalCanvas() {
    let canvas = document.getElementById('cyber-cat-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'cyber-cat-canvas';
        canvas.className = 'cyber-cat-canvas';
        document.body.prepend(canvas);
    }
    return canvas;
}


// --- Module: ui/settingsDropdown.js ---
// src/ui/settingsDropdown.js - Glassmorphic settings dropdown with exclusive model/color and independent effect toggles

let settingsDropdownEl = null;

function toggleSettingsDropdown(engineGetter) {
    if (!settingsDropdownEl) {
        settingsDropdownEl = mountSettingsDropdown(engineGetter);
    }

    const isOpen = settingsDropdownEl.classList.contains("open");
    if (isOpen) {
        closeSettingsDropdown();
    } else {
        openSettingsDropdown(engineGetter);
    }
}

function openSettingsDropdown(engineGetter) {
    const eng = engineGetter();
    if (!eng || !eng.isForeground) return;

    if (!settingsDropdownEl) {
        settingsDropdownEl = mountSettingsDropdown(engineGetter);
    }

    updateSettingsDropdownUI(eng);
    settingsDropdownEl.classList.add("open");

    // Position above settings button if possible
    const btn = document.getElementById("cosmic-cat-settings-btn");
    if (btn) {
        const rect = btn.getBoundingClientRect();
        const rightOffset = Math.max(16, window.innerWidth - rect.right - 10);
        settingsDropdownEl.style.right = `${rightOffset}px`;
        settingsDropdownEl.style.bottom = `${window.innerHeight - rect.top + 10}px`;
    }
}

function closeSettingsDropdown() {
    if (settingsDropdownEl) {
        settingsDropdownEl.classList.remove("open");
    }
}

function mountSettingsDropdown(engineGetter) {
    let dropdown = document.getElementById("cosmic-cat-settings-dropdown");
    if (dropdown) return dropdown;

    dropdown = document.createElement("div");
    dropdown.id = "cosmic-cat-settings-dropdown";
    dropdown.className = "cosmic-cat-settings-dropdown";

    dropdown.innerHTML = `
        <div class="dropdown-header">
            <div class="dropdown-title">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
                <span>Paramètres Visualiseur</span>
            </div>
            <button type="button" class="dropdown-close-btn" title="Fermer">✕</button>
        </div>

        <!-- Section 1: Modèle (Sélection exclusive) -->
        <div class="dropdown-section">
            <div class="section-label">Modèle de Chat (Exclusif)</div>
            <div class="model-selector-grid">
                <button type="button" class="model-btn" data-model="cyber">
                    <span class="model-icon">🐱</span>
                    <span class="model-name">Cyber Cat</span>
                </button>
                <button type="button" class="model-btn" data-model="cosmic">
                    <span class="model-icon">🌌</span>
                    <span class="model-name">Cosmic Cat</span>
                </button>
            </div>
        </div>

        <!-- Section 2: Couleur (Sélection exclusive) -->
        <div class="dropdown-section">
            <div class="section-label">Palette de Couleurs (Exclusive)</div>
            <div class="palette-swatches-row">
                <!-- Swatches injected dynamically -->
            </div>
        </div>

        <!-- Section 3: Effets & Arrière-plan (Toggles indépendants) -->
        <div class="dropdown-section">
            <div class="section-label">Effets d'Arrière-Plan (Indépendants)</div>
            <div class="effects-toggle-list">
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">☸️</span>
                        <span class="effect-name">Fractales & Mandalas sacrés</span>
                    </span>
                    <input type="checkbox" data-effect="fractals" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">✨</span>
                        <span class="effect-name">Particules & Étoiles célestes</span>
                    </span>
                    <input type="checkbox" data-effect="stars" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">🌌</span>
                        <span class="effect-name">Nébuleuse & Aura volumétrique</span>
                    </span>
                    <input type="checkbox" data-effect="nebula" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">🌐</span>
                        <span class="effect-name">Grille Cyber 3D Synthwave</span>
                    </span>
                    <input type="checkbox" data-effect="grid" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">💥</span>
                        <span class="effect-name">Ondes de choc sur le beat</span>
                    </span>
                    <input type="checkbox" data-effect="shockwaves" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
                <label class="effect-toggle-item">
                    <span class="effect-info">
                        <span class="effect-icon">🪵</span>
                        <span class="effect-name">Deck en bois (Plateforme sol)</span>
                    </span>
                    <input type="checkbox" data-effect="deck" class="toggle-checkbox">
                    <span class="toggle-switch"></span>
                </label>
            </div>
        </div>

        <!-- Section 4: Plein écran & raccourcis -->
        <div class="dropdown-footer">
            <button type="button" class="footer-action-btn" id="dropdown-fs-btn">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
                <span>Plein Écran (F)</span>
            </button>
            <span class="footer-hint"><kbd>A</kbd> On/Off &nbsp;|&nbsp; <kbd>C</kbd> Modèle &nbsp;|&nbsp; <kbd>T</kbd> Couleur</span>
        </div>
    `;

    document.body.appendChild(dropdown);

    // Event: Close Button
    dropdown.querySelector(".dropdown-close-btn").addEventListener("click", closeSettingsDropdown);

    // Event: Model selection (Exclusive)
    dropdown.querySelectorAll(".model-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const modelKey = btn.getAttribute("data-model");
            const eng = engineGetter();
            if (eng && modelKey) {
                eng.setCat(modelKey);
                updateSettingsDropdownUI(eng);
            }
        });
    });

    // Dynamic Swatches injection
    const swatchesRow = dropdown.querySelector(".palette-swatches-row");
    const palettes = VisualizerPalettes;
    Object.keys(palettes).forEach(key => {
        const p = palettes[key];
        const swatchBtn = document.createElement("button");
        swatchBtn.type = "button";
        swatchBtn.className = "dropdown-palette-btn";
        swatchBtn.setAttribute("data-palette", key);
        swatchBtn.title = p.name;
        swatchBtn.style.background = `linear-gradient(135deg, ${p.primary}, ${p.accent})`;
        swatchBtn.style.color = p.primary;

        swatchBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const eng = engineGetter();
            if (eng) {
                eng.setPalette(key);
                updateSettingsDropdownUI(eng);
            }
        });

        swatchesRow.appendChild(swatchBtn);
    });

    // Event: Independent Effect Toggles
    dropdown.querySelectorAll(".toggle-checkbox").forEach(chk => {
        chk.addEventListener("change", (e) => {
            e.stopPropagation();
            const effectName = chk.getAttribute("data-effect");
            const eng = engineGetter();
            if (eng && effectName) {
                eng.setEffect(effectName, chk.checked);
            }
        });
    });

    // Event: Fullscreen button
    dropdown.querySelector("#dropdown-fs-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        const eng = engineGetter();
        if (eng) {
            eng.toggleFullscreen();
            closeSettingsDropdown();
        }
    });

    // Click outside to dismiss
    document.addEventListener("click", (e) => {
        if (!dropdown.classList.contains("open")) return;
        if (dropdown.contains(e.target) || e.target.closest("#cosmic-cat-settings-btn")) return;
        closeSettingsDropdown();
    });

    // Escape key to dismiss
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dropdown.classList.contains("open")) {
            closeSettingsDropdown();
        }
    });

    return dropdown;
}

function updateSettingsDropdownUI(engine) {
    if (!settingsDropdownEl || !engine) return;

    // 1. Update Model Selection (Exclusive active state)
    settingsDropdownEl.querySelectorAll(".model-btn").forEach(btn => {
        const key = btn.getAttribute("data-model");
        btn.classList.toggle("active", key === engine.activeCat);
    });

    // 2. Update Palette Selection (Exclusive active state)
    const activePaletteId = engine.paletteManager.active ? engine.paletteManager.active.id : "cyberpunk";
    settingsDropdownEl.querySelectorAll(".dropdown-palette-btn").forEach(btn => {
        const key = btn.getAttribute("data-palette");
        btn.classList.toggle("active", key === activePaletteId);
    });

    // 3. Update Independent Effects Toggles
    const effects = engine.env.effects || {};
    settingsDropdownEl.querySelectorAll(".toggle-checkbox").forEach(chk => {
        const key = chk.getAttribute("data-effect");
        chk.checked = !!effects[key];
    });
}


// --- Module: ui/playbarButtons.js ---
// src/ui/playbarButtons.js - Injects the 2 buttons: 1. On/Off toggle, 2. Settings dropdown trigger

const CatSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C9.5 2 7.4 3.8 7 6.2 4.6 7.8 3 10.7 3 14c0 5 4 9 9 9s9-4 9-9c0-3.3-1.6-6.2-4-7.8C16.6 3.8 14.5 2 12 2zm-3.2 1.8l1.6 2.4c-.6.4-1.1.9-1.4 1.5L6.5 6.6l2.3-2.8zm6.4 0l2.3 2.8-2.5 1.1c-.3-.6-.8-1.1-1.4-1.5l1.6-2.4z"/></svg>`;
const GearSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`;

let isInjectingPlaybar = false;

function mountPlaybarButtons(engineGetter) {
    if (isInjectingPlaybar) return;
    isInjectingPlaybar = true;

    try {
        const extraControls = document.querySelector(".main-nowPlayingBar-extraControls");
        if (!extraControls) {
            setTimeout(() => mountPlaybarButtons(engineGetter), 500);
            return;
        }

        // 1. Bouton On/Off (CatSvg)
        if (!document.getElementById("cosmic-cat-toggle-btn")) {
            const toggleBtn = document.createElement("button");
            toggleBtn.id = "cosmic-cat-toggle-btn";
            toggleBtn.className = "main-genericButton-button cosmic-playbar-btn";
            toggleBtn.setAttribute("aria-label", "Visualiseur Chat : Activer / Désactiver");
            toggleBtn.innerHTML = CatSvg;

            toggleBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const eng = engineGetter();
                if (eng) eng.toggleActive();
            });

            extraControls.insertBefore(toggleBtn, extraControls.firstChild);
        }

        // 2. Bouton Paramètres ⚙️ (GearSvg) qui ouvre le menu déroulant
        if (!document.getElementById("cosmic-cat-settings-btn")) {
            const settingsBtn = document.createElement("button");
            settingsBtn.id = "cosmic-cat-settings-btn";
            settingsBtn.className = "main-genericButton-button cosmic-playbar-btn";
            settingsBtn.setAttribute("aria-label", "Paramètres du Visualiseur");
            settingsBtn.innerHTML = GearSvg;
            const eng = engineGetter();
            settingsBtn.style.display = (eng && eng.isForeground) ? "inline-flex" : "none";

            settingsBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSettingsDropdown(engineGetter);
            });

            const toggleBtn = document.getElementById("cosmic-cat-toggle-btn");
            if (toggleBtn && toggleBtn.nextSibling) {
                extraControls.insertBefore(settingsBtn, toggleBtn.nextSibling);
            } else {
                extraControls.appendChild(settingsBtn);
            }
        }
    } finally {
        isInjectingPlaybar = false;
    }
}

// Re-observe playbar safely
function initPlaybarObserver(engineGetter) {
    const playbar = document.querySelector(".Root__now-playing-bar, .main-nowPlayingBar-container");
    if (playbar) {
        const obs = new MutationObserver(() => {
            if (!document.getElementById("cosmic-cat-toggle-btn") || !document.getElementById("cosmic-cat-settings-btn")) {
                mountPlaybarButtons(engineGetter);
            }
        });
        obs.observe(playbar, { childList: true, subtree: true });
    } else {
        setTimeout(() => initPlaybarObserver(engineGetter), 500);
    }
}


if (typeof window !== 'undefined') {
    window.VisualizerEngine = VisualizerEngine;
    window.toggleSettingsDropdown = toggleSettingsDropdown;
}

// --- Module: ui/extension.js ---
// src/ui/extension.js - Spicetify Extension Entry Point for Cyber & Cosmic Cat Visualizer

(function() {
    let engineInstance = null;
    const getEngine = () => engineInstance;

    function initCyberCatVisualizer() {
        if (!Spicetify.Player || !Spicetify.Platform) {
            setTimeout(initCyberCatVisualizer, 250);
            return;
        }

        // 1. Mount Persistent Full-Window Wallpaper Canvas
        const canvas = mountGlobalCanvas();

        // 2. Initialize Visualizer Engine
        if (!engineInstance && canvas) {
            engineInstance = new VisualizerEngine(canvas);
            window.cyberCatEngine = engineInstance;
            window.catVisualizerEngine = engineInstance;
        }

        // 3. Mount UI Controls (The 2 Playbar Buttons & Settings Dropdown)
        mountPlaybarButtons(getEngine);
        initPlaybarObserver(getEngine);
        mountSettingsDropdown(getEngine);

        // 4. Click canvas in fullscreen to exit
        if (canvas) {
            canvas.addEventListener('click', () => {
                if (engineInstance && engineInstance.isFullscreen) {
                    engineInstance.toggleFullscreen(false);
                }
            });
        }

        // 5. Register Spicetify Menu Items (Heritage Legacy)
        if (typeof Spicetify !== "undefined" && Spicetify.Menu && Spicetify.Menu.Item) {
            try {
                new Spicetify.Menu.Item("Cat Visualizer : Modèle Suivant (C)", false, () => {
                    if (engineInstance) engineInstance.nextCat();
                }).register();
                new Spicetify.Menu.Item("Cat Visualizer : Fond Suivant (G)", false, () => {
                    if (engineInstance) engineInstance.nextBackground();
                }).register();
                new Spicetify.Menu.Item("Cat Visualizer : Thème Suivant (T)", false, () => {
                    if (engineInstance) engineInstance.nextPalette();
                }).register();
            } catch (e) {}
        }

        console.log('[CyberCat] Global wallpaper visualizer safely initialized.');
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initCyberCatVisualizer();
    } else {
        document.addEventListener('DOMContentLoaded', initCyberCatVisualizer);
    }
})();


})();