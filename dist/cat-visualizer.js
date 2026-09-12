// NAME: Cyber & Cosmic Cat Visualizer
// AUTHOR: Erozah
// DESCRIPTION: Modular visualizer with 2 discrete buttons (On/Off & Settings Dropdown), exclusive models/palettes, and composable independent background effects.

(function() {
if (!document.getElementById('cyber-cat-styles')) {
    const style = document.createElement('style');
    style.id = 'cyber-cat-styles';
    style.textContent = "/* src/styles/root.css - Root variables, Spotify layout locks, and glassmorphism */\n\nbody.cyber-cat-visualizer-active {\n    --spice-main: transparent !important;\n    --spice-sidebar: transparent !important;\n    --spice-player: transparent !important;\n    --spice-card: rgba(255, 255, 255, 0.04) !important;\n    --spice-main-elevated: rgba(255, 255, 255, 0.04) !important;\n    --spice-highlight: rgba(0, 240, 255, 0.12) !important;\n    --spice-highlight-elevated: rgba(0, 240, 255, 0.18) !important;\n    --background-base: transparent !important;\n    --background-tinted-base: transparent !important;\n    --background-highlight: transparent !important;\n    --background-press: transparent !important;\n}\n\nhtml, body {\n    height: 100vh !important;\n    min-height: 100vh !important;\n    max-height: 100vh !important;\n    width: 100vw !important;\n    overflow: hidden !important;\n    margin: 0 !important;\n    padding: 0 !important;\n}\n\n#main,\n.Root__top-container {\n    position: relative !important;\n    z-index: auto !important;\n    height: 100vh !important;\n    min-height: 100vh !important;\n    max-height: 100vh !important;\n    width: 100vw !important;\n    box-sizing: border-box !important;\n    background: transparent !important;\n}\n\n.Root__main-view {\n    position: relative !important;\n    z-index: 1 !important;\n    transition: background 0.3s ease !important;\n}\n\n/* Sidebars & Top Navigation Layers */\n.Root__nav-bar,\n.Root__right-sidebar {\n    position: relative !important;\n    z-index: 10 !important;\n}\n\n.Root__globalNav,\n.Root__top-bar {\n    position: relative !important;\n    z-index: 15 !important;\n}\n\n.Root__now-playing-bar {\n    position: relative !important;\n    z-index: 20 !important;\n}\n\n\n/* src/styles/canvas.css - Global fixed canvas wallpaper */\n\n#cyber-cat-canvas {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    z-index: 0 !important;\n    pointer-events: none !important;\n    display: none !important;\n    background: transparent !important;\n}\n\nbody.cyber-cat-visualizer-active #cyber-cat-canvas {\n    display: block !important;\n}\n\n\n\n/* src/styles/transparency.css - Spotify UI transparency and glassmorphic panels (Active ONLY when visualizer is ON) */\n\nbody.cyber-cat-visualizer-active {\n    --spice-main: transparent !important;\n    --spice-sidebar: transparent !important;\n    --spice-player: transparent !important;\n    --spice-card: rgba(255, 255, 255, 0.04) !important;\n    --spice-main-elevated: rgba(255, 255, 255, 0.04) !important;\n}\n\nbody.cyber-cat-visualizer-active #main,\nbody.cyber-cat-visualizer-active .Root__top-container {\n    position: relative !important;\n    z-index: 1 !important;\n    background: transparent !important;\n    background-color: transparent !important;\n}\n\n/* Left Sidebar - Full Height, Expansion for Virtualized List & Full Transparency */\nbody.cyber-cat-visualizer-active .Root__nav-bar,\nbody.cyber-cat-visualizer-active #Desktop_LeftSidebar_Id,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-navBar,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-library,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-libraryContainer,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-header,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-listContent,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-isScrolled,\nbody.cyber-cat-visualizer-active .main-rootlist-rootlist,\nbody.cyber-cat-visualizer-active .main-rootlist-wrapper,\nbody.cyber-cat-visualizer-active .main-navBar-mainNav,\nbody.cyber-cat-visualizer-active .main-navBar-navBar,\nbody.cyber-cat-visualizer-active .YourLibraryX,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-entryPoints {\n    height: 100% !important;\n    min-height: 100% !important;\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Library Filter Chips (Playlists, Artistes, Albums) Contrast & Selection */\nbody.cyber-cat-visualizer-active .main-yourLibraryX-filterChips button,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-chip,\nbody.cyber-cat-visualizer-active [data-testid=\"your-library-chip\"] {\n    background: rgba(255, 255, 255, 0.08) !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(255, 255, 255, 0.15) !important;\n    backdrop-filter: blur(8px) !important;\n}\n\nbody.cyber-cat-visualizer-active .main-yourLibraryX-filterChips button:hover,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-chip:hover {\n    background: rgba(0, 240, 255, 0.15) !important;\n    border-color: #00f0ff !important;\n    color: #ffffff !important;\n}\n\nbody.cyber-cat-visualizer-active .main-yourLibraryX-filterChips button[aria-checked=\"true\"],\nbody.cyber-cat-visualizer-active .main-yourLibraryX-chip[aria-checked=\"true\"],\nbody.cyber-cat-visualizer-active [data-active=\"true\"] {\n    background: #00f0ff !important;\n    color: #000000 !important;\n    font-weight: 700 !important;\n    border-color: #00f0ff !important;\n}\n\nbody.cyber-cat-visualizer-active .main-yourLibraryX-filterChips button[aria-checked=\"true\"] *,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-chip[aria-checked=\"true\"] * {\n    color: #000000 !important;\n    fill: #000000 !important;\n}\n\n/* Library rows, subtitles & icons */\nbody.cyber-cat-visualizer-active .main-yourLibraryX-listRowSubtitle,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-rowSubTitle,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-listRowSubtitleLeadingWrapper {\n    color: rgba(255, 255, 255, 0.7) !important;\n    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9) !important;\n}\n\n/* Right Sidebar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__right-sidebar,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-container,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-content,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-nowPlayingWidget,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-section,\nbody.cyber-cat-visualizer-active .main-buddyFeed-container,\nbody.cyber-cat-visualizer-active .main-buddyFeed-content,\nbody.cyber-cat-visualizer-active .main-nowPlayingWidget-nowPlaying,\nbody.cyber-cat-visualizer-active .main-trackInfo-container,\nbody.cyber-cat-visualizer-active .main-trackInfo-trackInfo {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Top Navigation Bar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__top-bar,\nbody.cyber-cat-visualizer-active .Root__globalNav,\nbody.cyber-cat-visualizer-active .main-topBar-container,\nbody.cyber-cat-visualizer-active .main-topBar-background,\nbody.cyber-cat-visualizer-active .main-topBar-overlay,\nbody.cyber-cat-visualizer-active .main-topBar-historyButtons {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Bottom Player Bar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__now-playing-bar,\nbody.cyber-cat-visualizer-active .main-nowPlayingBar-container,\nbody.cyber-cat-visualizer-active .main-nowPlayingBar-nowPlayingBar {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Typography & Icon Readability Over Live Canvas */\nbody.cyber-cat-visualizer-active .Root__nav-bar button,\nbody.cyber-cat-visualizer-active .Root__nav-bar a,\nbody.cyber-cat-visualizer-active .Root__nav-bar span,\nbody.cyber-cat-visualizer-active .Root__nav-bar p,\nbody.cyber-cat-visualizer-active .Root__now-playing-bar button,\nbody.cyber-cat-visualizer-active .Root__now-playing-bar span {\n    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8) !important;\n}\n\n\n/* src/styles/mainView.css - Dynamic central view visibility & transparency (Active ONLY when visualizer is ON) */\n\n/* 1. VISUALIZER ACTIVE: Central Spotify page content transparent so playlists & tracks are visible over the wallpaper */\nbody.cyber-cat-visualizer-active .Root__main-view,\nbody.cyber-cat-visualizer-active main,\nbody.cyber-cat-visualizer-active .main-view-container,\nbody.cyber-cat-visualizer-active .Root__main-view .main-view-container__scroll-node,\nbody.cyber-cat-visualizer-active .Root__main-view .main-view-container__scroll-node-child,\nbody.cyber-cat-visualizer-active .Root__main-view .os-viewport,\nbody.cyber-cat-visualizer-active .Root__main-view .os-host,\nbody.cyber-cat-visualizer-active .Root__main-view .os-padding,\nbody.cyber-cat-visualizer-active .Root__main-view .os-content,\nbody.cyber-cat-visualizer-active .Root__main-view .under-main-view,\nbody.cyber-cat-visualizer-active .Root__main-view .main-home-homeHeader,\nbody.cyber-cat-visualizer-active .Root__main-view .main-actionBarBackground-background,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-background,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-overlay,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-container,\nbody.cyber-cat-visualizer-active .Root__main-view .main-trackList-trackListHeader,\nbody.cyber-cat-visualizer-active .Root__main-view .main-trackList-trackListHeaderRow,\nbody.cyber-cat-visualizer-active .Root__main-view .main-shelf-shelf,\nbody.cyber-cat-visualizer-active .Root__main-view .main-trackList-trackList,\nbody.cyber-cat-visualizer-active .Root__main-view .main-gridContainer-gridContainer {\n    height: 100% !important;\n    min-height: 100% !important;\n    background: transparent !important;\n    background-color: transparent !important;\n    box-shadow: none !important;\n    border: none !important;\n    opacity: 1 !important;\n    pointer-events: auto !important;\n    visibility: visible !important;\n}\n\n/* 2. Glassmorphic cards & playlist track rows for crisp legibility */\nbody.cyber-cat-visualizer-active .main-card-card {\n    background: rgba(255, 255, 255, 0.05) !important;\n    backdrop-filter: blur(8px) !important;\n    -webkit-backdrop-filter: blur(8px) !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n}\n\nbody.cyber-cat-visualizer-active .main-card-card:hover {\n    background: rgba(255, 255, 255, 0.12) !important;\n    border-color: rgba(0, 240, 255, 0.35) !important;\n}\n\nbody.cyber-cat-visualizer-active .main-trackList-trackListRow {\n    background: transparent !important;\n}\n\nbody.cyber-cat-visualizer-active .main-trackList-trackListRow:hover {\n    background-color: rgba(255, 255, 255, 0.08) !important;\n}\n\nbody.cyber-cat-visualizer-active .main-trackList-trackListRow.main-trackList-selected {\n    background-color: rgba(255, 255, 255, 0.15) !important;\n}\n\n\n/* src/styles/dropdown.css - Glassmorphic settings dropdown panel & toggles */\n\n#cosmic-cat-settings-dropdown,\n#cosmic-cat-settings-dropdown * {\n    box-sizing: border-box !important;\n}\n\n#cosmic-cat-settings-dropdown {\n    position: fixed !important;\n    z-index: 99999999 !important;\n    width: 320px !important;\n    max-width: 90vw !important;\n    background: rgba(12, 10, 26, 0.94) !important;\n    backdrop-filter: blur(20px) !important;\n    -webkit-backdrop-filter: blur(20px) !important;\n    border: 1px solid rgba(0, 240, 255, 0.35) !important;\n    border-radius: 16px !important;\n    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.75), 0 0 20px rgba(0, 240, 255, 0.2) !important;\n    padding: 16px !important;\n    font-family: inherit !important;\n    color: #ffffff !important;\n    pointer-events: auto !important;\n    user-select: none !important;\n    opacity: 0 !important;\n    visibility: hidden !important;\n    transform: translateY(10px) scale(0.96) !important;\n    transition: opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1),\n                transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),\n                visibility 0.22s ease !important;\n}\n\n#cosmic-cat-settings-dropdown.open {\n    opacity: 1 !important;\n    visibility: visible !important;\n    transform: translateY(0) scale(1) !important;\n}\n\n/* Header */\n.dropdown-header {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding-bottom: 12px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;\n    margin-bottom: 12px !important;\n}\n\n.dropdown-title {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n    font-size: 13px !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.5px !important;\n    color: #00f0ff !important;\n}\n\n.dropdown-close-btn {\n    background: transparent !important;\n    border: 0 !important;\n    color: rgba(255, 255, 255, 0.6) !important;\n    font-size: 16px !important;\n    cursor: pointer !important;\n    padding: 2px 6px !important;\n    border-radius: 6px !important;\n    transition: all 0.15s ease !important;\n}\n\n.dropdown-close-btn:hover {\n    color: #ffffff !important;\n    background: rgba(255, 255, 255, 0.15) !important;\n}\n\n/* Section Common */\n.dropdown-section {\n    margin-bottom: 14px !important;\n}\n\n.section-label {\n    font-size: 10px !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.8px !important;\n    text-transform: uppercase !important;\n    color: rgba(255, 255, 255, 0.5) !important;\n    margin-bottom: 8px !important;\n}\n\n/* Model Selector Grid (Exclusive) */\n.model-selector-grid {\n    display: grid !important;\n    grid-template-columns: 1fr 1fr !important;\n    gap: 8px !important;\n}\n\n.model-btn {\n    background: rgba(255, 255, 255, 0.05) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 10px !important;\n    padding: 8px 10px !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    gap: 6px !important;\n    cursor: pointer !important;\n    text-align: center !important;\n    color: #ffffff !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    outline: none !important;\n    white-space: nowrap !important;\n}\n\n.model-btn:hover {\n    background: rgba(255, 255, 255, 0.1) !important;\n    border-color: rgba(0, 240, 255, 0.5) !important;\n    transform: translateY(-1px) !important;\n}\n\n.model-btn.active {\n    background: rgba(0, 240, 255, 0.15) !important;\n    border-color: #00f0ff !important;\n    box-shadow: 0 0 12px rgba(0, 240, 255, 0.3) !important;\n}\n\n.model-icon {\n    font-size: 16px !important;\n    line-height: 1 !important;\n    flex-shrink: 0 !important;\n}\n\n.model-name {\n    font-size: 12px !important;\n    font-weight: 700 !important;\n    color: #ffffff !important;\n}\n\n.model-btn.active .model-name {\n    color: #00f0ff !important;\n}\n\n/* Palette Swatches Row (Exclusive) */\n.palette-swatches-row {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 6px !important;\n    padding: 4px 0 !important;\n}\n\n.dropdown-palette-btn {\n    width: 24px !important;\n    height: 24px !important;\n    border-radius: 50% !important;\n    border: 2px solid rgba(255, 255, 255, 0.3) !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    cursor: pointer !important;\n    outline: none !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n.dropdown-palette-btn:hover {\n    transform: scale(1.3) !important;\n    border-color: #ffffff !important;\n    box-shadow: 0 0 10px currentColor !important;\n}\n\n.dropdown-palette-btn.active {\n    transform: scale(1.35) !important;\n    border-color: #ffffff !important;\n    box-shadow: 0 0 14px currentColor, 0 0 4px #ffffff !important;\n}\n\n/* Effects Toggle List (Independent) */\n.effects-toggle-list {\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 6px !important;\n}\n\n.effect-toggle-item {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 5px 8px !important;\n    background: rgba(255, 255, 255, 0.03) !important;\n    border-radius: 8px !important;\n    cursor: pointer !important;\n    transition: background 0.15s ease !important;\n}\n\n.effect-toggle-item:hover {\n    background: rgba(255, 255, 255, 0.07) !important;\n}\n\n.effect-info {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n}\n\n.effect-icon {\n    font-size: 14px !important;\n}\n\n.effect-name {\n    font-size: 11px !important;\n    font-weight: 500 !important;\n    color: rgba(255, 255, 255, 0.9) !important;\n}\n\n/* Animated Switch */\n.toggle-checkbox {\n    display: none !important;\n}\n\n.toggle-switch {\n    position: relative !important;\n    width: 32px !important;\n    height: 18px !important;\n    background: rgba(255, 255, 255, 0.2) !important;\n    border-radius: 999px !important;\n    transition: background 0.2s ease !important;\n    flex-shrink: 0 !important;\n}\n\n.toggle-switch::after {\n    content: '' !important;\n    position: absolute !important;\n    top: 2px !important;\n    left: 2px !important;\n    width: 14px !important;\n    height: 14px !important;\n    background: #ffffff !important;\n    border-radius: 50% !important;\n    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n.toggle-checkbox:checked + .toggle-switch {\n    background: #00f0ff !important;\n    box-shadow: 0 0 8px rgba(0, 240, 255, 0.5) !important;\n}\n\n.toggle-checkbox:checked + .toggle-switch::after {\n    transform: translateX(14px) !important;\n}\n\n/* Fullscreen Immersion Menu Button */\n.fullscreen-menu-btn {\n    width: 100% !important;\n    background: rgba(0, 240, 255, 0.08) !important;\n    border: 1px solid rgba(0, 240, 255, 0.35) !important;\n    border-radius: 10px !important;\n    padding: 8px 12px !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n    cursor: pointer !important;\n    color: #ffffff !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    outline: none !important;\n    box-sizing: border-box !important;\n}\n\n.fullscreen-menu-btn:hover {\n    background: rgba(0, 240, 255, 0.2) !important;\n    border-color: #00f0ff !important;\n    box-shadow: 0 0 14px rgba(0, 240, 255, 0.35) !important;\n    transform: translateY(-1px) !important;\n}\n\n.fullscreen-menu-btn svg {\n    color: #00f0ff !important;\n    flex-shrink: 0 !important;\n}\n\n.fs-btn-content {\n    display: flex !important;\n    flex-direction: column !important;\n    align-items: flex-start !important;\n    text-align: left !important;\n}\n\n.fs-btn-title {\n    font-size: 11px !important;\n    font-weight: 700 !important;\n    color: #ffffff !important;\n    white-space: nowrap !important;\n}\n\n.fs-btn-sub {\n    font-size: 9px !important;\n    color: rgba(255, 255, 255, 0.55) !important;\n    white-space: nowrap !important;\n}\n\n/* Footer */\n.dropdown-footer {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    padding-top: 10px !important;\n    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;\n    font-size: 10px !important;\n    color: rgba(255, 255, 255, 0.4) !important;\n}\n\n.footer-hint kbd {\n    background: rgba(255, 255, 255, 0.12) !important;\n    padding: 1px 4px !important;\n    border-radius: 3px !important;\n    color: #00f0ff !important;\n    font-family: inherit !important;\n}\n\n\n/* src/styles/fullscreen.css - Fullscreen immersion mode and floating toast hint */\n\nbody.cyber-cat-fullscreen-active #cyber-cat-canvas {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    z-index: 2147483640 !important; /* Absolute foreground above all Spotify UI */\n    pointer-events: auto !important;\n    cursor: pointer !important;\n    display: block !important;\n}\n\n#cyber-cat-fs-hint {\n    position: fixed !important;\n    bottom: 28px !important;\n    left: 50% !important;\n    transform: translateX(-50%) translateY(20px) !important;\n    background: rgba(12, 10, 28, 0.94) !important;\n    border: 1px solid rgba(0, 240, 255, 0.6) !important;\n    color: #ffffff !important;\n    padding: 8px 22px !important;\n    border-radius: 20px !important;\n    font-size: 12px !important;\n    font-weight: 600 !important;\n    letter-spacing: 0.5px !important;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.85), 0 0 16px rgba(0, 240, 255, 0.3) !important;\n    z-index: 2147483647 !important;\n    pointer-events: none !important;\n    opacity: 0 !important;\n    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n#cyber-cat-fs-hint.visible {\n    opacity: 1 !important;\n    transform: translateX(-50%) translateY(0) !important;\n}\n\n\n/* src/styles/playbar.css - The 2 discrete playbar buttons: On/Off & Settings Gear */\n\n.cosmic-playbar-btn {\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    position: relative !important;\n    cursor: pointer !important;\n    background: transparent !important;\n    border: 0 !important;\n    padding: 0 4px !important;\n    margin: 0 2px !important;\n    color: var(--spice-subtext, rgba(255, 255, 255, 0.65)) !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    outline: none !important;\n}\n\n.cosmic-playbar-btn:hover {\n    color: #00f0ff !important;\n    transform: scale(1.15) !important;\n    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.6)) !important;\n}\n\n#cosmic-cat-toggle-btn.active {\n    color: #00f0ff !important;\n    transform: scale(1.1) !important;\n    filter: drop-shadow(0 0 8px currentColor) !important;\n}\n\n#cosmic-cat-toggle-btn:not(.active) {\n    opacity: 0.55 !important;\n    filter: none !important;\n}\n\n#cosmic-cat-settings-btn:hover {\n    transform: rotate(30deg) scale(1.15) !important;\n}\n\n/* Spotify Play/Pause Button Contrast Fix: Crisp black icon on white button */\n.main-playPauseButton-button,\nbutton[data-testid=\"control-button-playpause\"],\nbutton[data-testid=\"play-button\"],\n.player-controls__buttons button.main-playPauseButton-button {\n    background-color: #ffffff !important;\n    color: #000000 !important;\n}\n\n.main-playPauseButton-button svg,\n.main-playPauseButton-button path,\n.main-playPauseButton-button span,\nbutton[data-testid=\"control-button-playpause\"] svg,\nbutton[data-testid=\"control-button-playpause\"] path,\nbutton[data-testid=\"control-button-playpause\"] span,\nbutton[data-testid=\"play-button\"] svg,\nbutton[data-testid=\"play-button\"] path,\nbutton[data-testid=\"play-button\"] span,\n.player-controls__buttons button.main-playPauseButton-button svg,\n.player-controls__buttons button.main-playPauseButton-button path {\n    fill: #000000 !important;\n    color: #000000 !important;\n    text-shadow: none !important;\n}\n\n.main-playPauseButton-button:hover,\nbutton[data-testid=\"control-button-playpause\"]:hover,\nbutton[data-testid=\"play-button\"]:hover {\n    background-color: #f0f0f0 !important;\n    transform: scale(1.05) !important;\n}\n\n/* Spotify Toasts, Banners, Snackbars, Tooltips & System Messages */\n.notistack-SnackbarContainer {\n    z-index: 99999999 !important;\n}\n\n.notistack-SnackbarContainer .notistack-Snackbar,\n.notistack-SnackbarContainer [class*=\"Snackbar\"],\n.main-notificationBubble-notificationBubble,\n.Root__notification-bar,\n[data-testid=\"toast-box\"],\n[data-encore-id=\"toast\"],\n[data-encore-id=\"banner\"],\n[data-encore-id=\"popover\"],\n[data-encore-id=\"tooltip\"] {\n    background: #100e20 !important;\n    background-color: #100e20 !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(0, 240, 255, 0.45) !important;\n    border-radius: 10px !important;\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.85), 0 0 16px rgba(0, 240, 255, 0.25) !important;\n    z-index: 99999999 !important;\n}\n\n/* Force ALL inner text & elements inside toasts/messages to be legible white on dark */\n.notistack-SnackbarContainer .notistack-Snackbar *,\n.notistack-SnackbarContainer [class*=\"Snackbar\"] *,\n.main-notificationBubble-notificationBubble *,\n.Root__notification-bar *,\n[data-testid=\"toast-box\"] *,\n[data-encore-id=\"toast\"] *,\n[data-encore-id=\"banner\"] *,\n[data-encore-id=\"popover\"] *,\n[data-encore-id=\"tooltip\"] * {\n    background: transparent !important;\n    background-color: transparent !important;\n    color: #ffffff !important;\n    fill: #ffffff !important;\n    text-shadow: none !important;\n}\n\n/* Toast action buttons (e.g. Undo, Cancel, View) */\n[data-testid=\"toast-box\"] button,\n[data-encore-id=\"toast\"] button,\n.main-notificationBubble-notificationBubble button,\n.notistack-Snackbar button {\n    background: rgba(0, 240, 255, 0.15) !important;\n    border: 1px solid rgba(0, 240, 255, 0.5) !important;\n    border-radius: 6px !important;\n    color: #00f0ff !important;\n    padding: 2px 8px !important;\n    cursor: pointer !important;\n}\n\n[data-testid=\"toast-box\"] button:hover,\n[data-encore-id=\"toast\"] button:hover,\n.main-notificationBubble-notificationBubble button:hover,\n.notistack-Snackbar button:hover {\n    background: rgba(0, 240, 255, 0.3) !important;\n    color: #ffffff !important;\n}\n";
    document.head.appendChild(style);
} else {
    document.getElementById('cyber-cat-styles').textContent = "/* src/styles/root.css - Root variables, Spotify layout locks, and glassmorphism */\n\nbody.cyber-cat-visualizer-active {\n    --spice-main: transparent !important;\n    --spice-sidebar: transparent !important;\n    --spice-player: transparent !important;\n    --spice-card: rgba(255, 255, 255, 0.04) !important;\n    --spice-main-elevated: rgba(255, 255, 255, 0.04) !important;\n    --spice-highlight: rgba(0, 240, 255, 0.12) !important;\n    --spice-highlight-elevated: rgba(0, 240, 255, 0.18) !important;\n    --background-base: transparent !important;\n    --background-tinted-base: transparent !important;\n    --background-highlight: transparent !important;\n    --background-press: transparent !important;\n}\n\nhtml, body {\n    height: 100vh !important;\n    min-height: 100vh !important;\n    max-height: 100vh !important;\n    width: 100vw !important;\n    overflow: hidden !important;\n    margin: 0 !important;\n    padding: 0 !important;\n}\n\n#main,\n.Root__top-container {\n    position: relative !important;\n    z-index: auto !important;\n    height: 100vh !important;\n    min-height: 100vh !important;\n    max-height: 100vh !important;\n    width: 100vw !important;\n    box-sizing: border-box !important;\n    background: transparent !important;\n}\n\n.Root__main-view {\n    position: relative !important;\n    z-index: 1 !important;\n    transition: background 0.3s ease !important;\n}\n\n/* Sidebars & Top Navigation Layers */\n.Root__nav-bar,\n.Root__right-sidebar {\n    position: relative !important;\n    z-index: 10 !important;\n}\n\n.Root__globalNav,\n.Root__top-bar {\n    position: relative !important;\n    z-index: 15 !important;\n}\n\n.Root__now-playing-bar {\n    position: relative !important;\n    z-index: 20 !important;\n}\n\n\n/* src/styles/canvas.css - Global fixed canvas wallpaper */\n\n#cyber-cat-canvas {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    z-index: 0 !important;\n    pointer-events: none !important;\n    display: none !important;\n    background: transparent !important;\n}\n\nbody.cyber-cat-visualizer-active #cyber-cat-canvas {\n    display: block !important;\n}\n\n\n\n/* src/styles/transparency.css - Spotify UI transparency and glassmorphic panels (Active ONLY when visualizer is ON) */\n\nbody.cyber-cat-visualizer-active {\n    --spice-main: transparent !important;\n    --spice-sidebar: transparent !important;\n    --spice-player: transparent !important;\n    --spice-card: rgba(255, 255, 255, 0.04) !important;\n    --spice-main-elevated: rgba(255, 255, 255, 0.04) !important;\n}\n\nbody.cyber-cat-visualizer-active #main,\nbody.cyber-cat-visualizer-active .Root__top-container {\n    position: relative !important;\n    z-index: 1 !important;\n    background: transparent !important;\n    background-color: transparent !important;\n}\n\n/* Left Sidebar - Full Height, Expansion for Virtualized List & Full Transparency */\nbody.cyber-cat-visualizer-active .Root__nav-bar,\nbody.cyber-cat-visualizer-active #Desktop_LeftSidebar_Id,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-navBar,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-library,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-libraryContainer,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-header,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-listContent,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-isScrolled,\nbody.cyber-cat-visualizer-active .main-rootlist-rootlist,\nbody.cyber-cat-visualizer-active .main-rootlist-wrapper,\nbody.cyber-cat-visualizer-active .main-navBar-mainNav,\nbody.cyber-cat-visualizer-active .main-navBar-navBar,\nbody.cyber-cat-visualizer-active .YourLibraryX,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-entryPoints {\n    height: 100% !important;\n    min-height: 100% !important;\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Library Filter Chips (Playlists, Artistes, Albums) Contrast & Selection */\nbody.cyber-cat-visualizer-active .main-yourLibraryX-filterChips button,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-chip,\nbody.cyber-cat-visualizer-active [data-testid=\"your-library-chip\"] {\n    background: rgba(255, 255, 255, 0.08) !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(255, 255, 255, 0.15) !important;\n    backdrop-filter: blur(8px) !important;\n}\n\nbody.cyber-cat-visualizer-active .main-yourLibraryX-filterChips button:hover,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-chip:hover {\n    background: rgba(0, 240, 255, 0.15) !important;\n    border-color: #00f0ff !important;\n    color: #ffffff !important;\n}\n\nbody.cyber-cat-visualizer-active .main-yourLibraryX-filterChips button[aria-checked=\"true\"],\nbody.cyber-cat-visualizer-active .main-yourLibraryX-chip[aria-checked=\"true\"],\nbody.cyber-cat-visualizer-active [data-active=\"true\"] {\n    background: #00f0ff !important;\n    color: #000000 !important;\n    font-weight: 700 !important;\n    border-color: #00f0ff !important;\n}\n\nbody.cyber-cat-visualizer-active .main-yourLibraryX-filterChips button[aria-checked=\"true\"] *,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-chip[aria-checked=\"true\"] * {\n    color: #000000 !important;\n    fill: #000000 !important;\n}\n\n/* Library rows, subtitles & icons */\nbody.cyber-cat-visualizer-active .main-yourLibraryX-listRowSubtitle,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-rowSubTitle,\nbody.cyber-cat-visualizer-active .main-yourLibraryX-listRowSubtitleLeadingWrapper {\n    color: rgba(255, 255, 255, 0.7) !important;\n    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9) !important;\n}\n\n/* Right Sidebar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__right-sidebar,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-container,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-content,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-nowPlayingWidget,\nbody.cyber-cat-visualizer-active .main-nowPlayingView-section,\nbody.cyber-cat-visualizer-active .main-buddyFeed-container,\nbody.cyber-cat-visualizer-active .main-buddyFeed-content,\nbody.cyber-cat-visualizer-active .main-nowPlayingWidget-nowPlaying,\nbody.cyber-cat-visualizer-active .main-trackInfo-container,\nbody.cyber-cat-visualizer-active .main-trackInfo-trackInfo {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Top Navigation Bar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__top-bar,\nbody.cyber-cat-visualizer-active .Root__globalNav,\nbody.cyber-cat-visualizer-active .main-topBar-container,\nbody.cyber-cat-visualizer-active .main-topBar-background,\nbody.cyber-cat-visualizer-active .main-topBar-overlay,\nbody.cyber-cat-visualizer-active .main-topBar-historyButtons {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Bottom Player Bar - Full Transparency */\nbody.cyber-cat-visualizer-active .Root__now-playing-bar,\nbody.cyber-cat-visualizer-active .main-nowPlayingBar-container,\nbody.cyber-cat-visualizer-active .main-nowPlayingBar-nowPlayingBar {\n    background: transparent !important;\n    background-color: transparent !important;\n    backdrop-filter: none !important;\n    -webkit-backdrop-filter: none !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* Typography & Icon Readability Over Live Canvas */\nbody.cyber-cat-visualizer-active .Root__nav-bar button,\nbody.cyber-cat-visualizer-active .Root__nav-bar a,\nbody.cyber-cat-visualizer-active .Root__nav-bar span,\nbody.cyber-cat-visualizer-active .Root__nav-bar p,\nbody.cyber-cat-visualizer-active .Root__now-playing-bar button,\nbody.cyber-cat-visualizer-active .Root__now-playing-bar span {\n    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8) !important;\n}\n\n\n/* src/styles/mainView.css - Dynamic central view visibility & transparency (Active ONLY when visualizer is ON) */\n\n/* 1. VISUALIZER ACTIVE: Central Spotify page content transparent so playlists & tracks are visible over the wallpaper */\nbody.cyber-cat-visualizer-active .Root__main-view,\nbody.cyber-cat-visualizer-active main,\nbody.cyber-cat-visualizer-active .main-view-container,\nbody.cyber-cat-visualizer-active .Root__main-view .main-view-container__scroll-node,\nbody.cyber-cat-visualizer-active .Root__main-view .main-view-container__scroll-node-child,\nbody.cyber-cat-visualizer-active .Root__main-view .os-viewport,\nbody.cyber-cat-visualizer-active .Root__main-view .os-host,\nbody.cyber-cat-visualizer-active .Root__main-view .os-padding,\nbody.cyber-cat-visualizer-active .Root__main-view .os-content,\nbody.cyber-cat-visualizer-active .Root__main-view .under-main-view,\nbody.cyber-cat-visualizer-active .Root__main-view .main-home-homeHeader,\nbody.cyber-cat-visualizer-active .Root__main-view .main-actionBarBackground-background,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-background,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-overlay,\nbody.cyber-cat-visualizer-active .Root__main-view .main-entityHeader-container,\nbody.cyber-cat-visualizer-active .Root__main-view .main-trackList-trackListHeader,\nbody.cyber-cat-visualizer-active .Root__main-view .main-trackList-trackListHeaderRow,\nbody.cyber-cat-visualizer-active .Root__main-view .main-shelf-shelf,\nbody.cyber-cat-visualizer-active .Root__main-view .main-trackList-trackList,\nbody.cyber-cat-visualizer-active .Root__main-view .main-gridContainer-gridContainer {\n    height: 100% !important;\n    min-height: 100% !important;\n    background: transparent !important;\n    background-color: transparent !important;\n    box-shadow: none !important;\n    border: none !important;\n    opacity: 1 !important;\n    pointer-events: auto !important;\n    visibility: visible !important;\n}\n\n/* 2. Glassmorphic cards & playlist track rows for crisp legibility */\nbody.cyber-cat-visualizer-active .main-card-card {\n    background: rgba(255, 255, 255, 0.05) !important;\n    backdrop-filter: blur(8px) !important;\n    -webkit-backdrop-filter: blur(8px) !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n}\n\nbody.cyber-cat-visualizer-active .main-card-card:hover {\n    background: rgba(255, 255, 255, 0.12) !important;\n    border-color: rgba(0, 240, 255, 0.35) !important;\n}\n\nbody.cyber-cat-visualizer-active .main-trackList-trackListRow {\n    background: transparent !important;\n}\n\nbody.cyber-cat-visualizer-active .main-trackList-trackListRow:hover {\n    background-color: rgba(255, 255, 255, 0.08) !important;\n}\n\nbody.cyber-cat-visualizer-active .main-trackList-trackListRow.main-trackList-selected {\n    background-color: rgba(255, 255, 255, 0.15) !important;\n}\n\n\n/* src/styles/dropdown.css - Glassmorphic settings dropdown panel & toggles */\n\n#cosmic-cat-settings-dropdown,\n#cosmic-cat-settings-dropdown * {\n    box-sizing: border-box !important;\n}\n\n#cosmic-cat-settings-dropdown {\n    position: fixed !important;\n    z-index: 99999999 !important;\n    width: 320px !important;\n    max-width: 90vw !important;\n    background: rgba(12, 10, 26, 0.94) !important;\n    backdrop-filter: blur(20px) !important;\n    -webkit-backdrop-filter: blur(20px) !important;\n    border: 1px solid rgba(0, 240, 255, 0.35) !important;\n    border-radius: 16px !important;\n    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.75), 0 0 20px rgba(0, 240, 255, 0.2) !important;\n    padding: 16px !important;\n    font-family: inherit !important;\n    color: #ffffff !important;\n    pointer-events: auto !important;\n    user-select: none !important;\n    opacity: 0 !important;\n    visibility: hidden !important;\n    transform: translateY(10px) scale(0.96) !important;\n    transition: opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1),\n                transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),\n                visibility 0.22s ease !important;\n}\n\n#cosmic-cat-settings-dropdown.open {\n    opacity: 1 !important;\n    visibility: visible !important;\n    transform: translateY(0) scale(1) !important;\n}\n\n/* Header */\n.dropdown-header {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding-bottom: 12px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;\n    margin-bottom: 12px !important;\n}\n\n.dropdown-title {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n    font-size: 13px !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.5px !important;\n    color: #00f0ff !important;\n}\n\n.dropdown-close-btn {\n    background: transparent !important;\n    border: 0 !important;\n    color: rgba(255, 255, 255, 0.6) !important;\n    font-size: 16px !important;\n    cursor: pointer !important;\n    padding: 2px 6px !important;\n    border-radius: 6px !important;\n    transition: all 0.15s ease !important;\n}\n\n.dropdown-close-btn:hover {\n    color: #ffffff !important;\n    background: rgba(255, 255, 255, 0.15) !important;\n}\n\n/* Section Common */\n.dropdown-section {\n    margin-bottom: 14px !important;\n}\n\n.section-label {\n    font-size: 10px !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.8px !important;\n    text-transform: uppercase !important;\n    color: rgba(255, 255, 255, 0.5) !important;\n    margin-bottom: 8px !important;\n}\n\n/* Model Selector Grid (Exclusive) */\n.model-selector-grid {\n    display: grid !important;\n    grid-template-columns: 1fr 1fr !important;\n    gap: 8px !important;\n}\n\n.model-btn {\n    background: rgba(255, 255, 255, 0.05) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 10px !important;\n    padding: 8px 10px !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    gap: 6px !important;\n    cursor: pointer !important;\n    text-align: center !important;\n    color: #ffffff !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    outline: none !important;\n    white-space: nowrap !important;\n}\n\n.model-btn:hover {\n    background: rgba(255, 255, 255, 0.1) !important;\n    border-color: rgba(0, 240, 255, 0.5) !important;\n    transform: translateY(-1px) !important;\n}\n\n.model-btn.active {\n    background: rgba(0, 240, 255, 0.15) !important;\n    border-color: #00f0ff !important;\n    box-shadow: 0 0 12px rgba(0, 240, 255, 0.3) !important;\n}\n\n.model-icon {\n    font-size: 16px !important;\n    line-height: 1 !important;\n    flex-shrink: 0 !important;\n}\n\n.model-name {\n    font-size: 12px !important;\n    font-weight: 700 !important;\n    color: #ffffff !important;\n}\n\n.model-btn.active .model-name {\n    color: #00f0ff !important;\n}\n\n/* Palette Swatches Row (Exclusive) */\n.palette-swatches-row {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 6px !important;\n    padding: 4px 0 !important;\n}\n\n.dropdown-palette-btn {\n    width: 24px !important;\n    height: 24px !important;\n    border-radius: 50% !important;\n    border: 2px solid rgba(255, 255, 255, 0.3) !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    cursor: pointer !important;\n    outline: none !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n.dropdown-palette-btn:hover {\n    transform: scale(1.3) !important;\n    border-color: #ffffff !important;\n    box-shadow: 0 0 10px currentColor !important;\n}\n\n.dropdown-palette-btn.active {\n    transform: scale(1.35) !important;\n    border-color: #ffffff !important;\n    box-shadow: 0 0 14px currentColor, 0 0 4px #ffffff !important;\n}\n\n/* Effects Toggle List (Independent) */\n.effects-toggle-list {\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 6px !important;\n}\n\n.effect-toggle-item {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 5px 8px !important;\n    background: rgba(255, 255, 255, 0.03) !important;\n    border-radius: 8px !important;\n    cursor: pointer !important;\n    transition: background 0.15s ease !important;\n}\n\n.effect-toggle-item:hover {\n    background: rgba(255, 255, 255, 0.07) !important;\n}\n\n.effect-info {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n}\n\n.effect-icon {\n    font-size: 14px !important;\n}\n\n.effect-name {\n    font-size: 11px !important;\n    font-weight: 500 !important;\n    color: rgba(255, 255, 255, 0.9) !important;\n}\n\n/* Animated Switch */\n.toggle-checkbox {\n    display: none !important;\n}\n\n.toggle-switch {\n    position: relative !important;\n    width: 32px !important;\n    height: 18px !important;\n    background: rgba(255, 255, 255, 0.2) !important;\n    border-radius: 999px !important;\n    transition: background 0.2s ease !important;\n    flex-shrink: 0 !important;\n}\n\n.toggle-switch::after {\n    content: '' !important;\n    position: absolute !important;\n    top: 2px !important;\n    left: 2px !important;\n    width: 14px !important;\n    height: 14px !important;\n    background: #ffffff !important;\n    border-radius: 50% !important;\n    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n.toggle-checkbox:checked + .toggle-switch {\n    background: #00f0ff !important;\n    box-shadow: 0 0 8px rgba(0, 240, 255, 0.5) !important;\n}\n\n.toggle-checkbox:checked + .toggle-switch::after {\n    transform: translateX(14px) !important;\n}\n\n/* Fullscreen Immersion Menu Button */\n.fullscreen-menu-btn {\n    width: 100% !important;\n    background: rgba(0, 240, 255, 0.08) !important;\n    border: 1px solid rgba(0, 240, 255, 0.35) !important;\n    border-radius: 10px !important;\n    padding: 8px 12px !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n    cursor: pointer !important;\n    color: #ffffff !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    outline: none !important;\n    box-sizing: border-box !important;\n}\n\n.fullscreen-menu-btn:hover {\n    background: rgba(0, 240, 255, 0.2) !important;\n    border-color: #00f0ff !important;\n    box-shadow: 0 0 14px rgba(0, 240, 255, 0.35) !important;\n    transform: translateY(-1px) !important;\n}\n\n.fullscreen-menu-btn svg {\n    color: #00f0ff !important;\n    flex-shrink: 0 !important;\n}\n\n.fs-btn-content {\n    display: flex !important;\n    flex-direction: column !important;\n    align-items: flex-start !important;\n    text-align: left !important;\n}\n\n.fs-btn-title {\n    font-size: 11px !important;\n    font-weight: 700 !important;\n    color: #ffffff !important;\n    white-space: nowrap !important;\n}\n\n.fs-btn-sub {\n    font-size: 9px !important;\n    color: rgba(255, 255, 255, 0.55) !important;\n    white-space: nowrap !important;\n}\n\n/* Footer */\n.dropdown-footer {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    padding-top: 10px !important;\n    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;\n    font-size: 10px !important;\n    color: rgba(255, 255, 255, 0.4) !important;\n}\n\n.footer-hint kbd {\n    background: rgba(255, 255, 255, 0.12) !important;\n    padding: 1px 4px !important;\n    border-radius: 3px !important;\n    color: #00f0ff !important;\n    font-family: inherit !important;\n}\n\n\n/* src/styles/fullscreen.css - Fullscreen immersion mode and floating toast hint */\n\nbody.cyber-cat-fullscreen-active #cyber-cat-canvas {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    z-index: 2147483640 !important; /* Absolute foreground above all Spotify UI */\n    pointer-events: auto !important;\n    cursor: pointer !important;\n    display: block !important;\n}\n\n#cyber-cat-fs-hint {\n    position: fixed !important;\n    bottom: 28px !important;\n    left: 50% !important;\n    transform: translateX(-50%) translateY(20px) !important;\n    background: rgba(12, 10, 28, 0.94) !important;\n    border: 1px solid rgba(0, 240, 255, 0.6) !important;\n    color: #ffffff !important;\n    padding: 8px 22px !important;\n    border-radius: 20px !important;\n    font-size: 12px !important;\n    font-weight: 600 !important;\n    letter-spacing: 0.5px !important;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.85), 0 0 16px rgba(0, 240, 255, 0.3) !important;\n    z-index: 2147483647 !important;\n    pointer-events: none !important;\n    opacity: 0 !important;\n    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n\n#cyber-cat-fs-hint.visible {\n    opacity: 1 !important;\n    transform: translateX(-50%) translateY(0) !important;\n}\n\n\n/* src/styles/playbar.css - The 2 discrete playbar buttons: On/Off & Settings Gear */\n\n.cosmic-playbar-btn {\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    position: relative !important;\n    cursor: pointer !important;\n    background: transparent !important;\n    border: 0 !important;\n    padding: 0 4px !important;\n    margin: 0 2px !important;\n    color: var(--spice-subtext, rgba(255, 255, 255, 0.65)) !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    outline: none !important;\n}\n\n.cosmic-playbar-btn:hover {\n    color: #00f0ff !important;\n    transform: scale(1.15) !important;\n    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.6)) !important;\n}\n\n#cosmic-cat-toggle-btn.active {\n    color: #00f0ff !important;\n    transform: scale(1.1) !important;\n    filter: drop-shadow(0 0 8px currentColor) !important;\n}\n\n#cosmic-cat-toggle-btn:not(.active) {\n    opacity: 0.55 !important;\n    filter: none !important;\n}\n\n#cosmic-cat-settings-btn:hover {\n    transform: rotate(30deg) scale(1.15) !important;\n}\n\n/* Spotify Play/Pause Button Contrast Fix: Crisp black icon on white button */\n.main-playPauseButton-button,\nbutton[data-testid=\"control-button-playpause\"],\nbutton[data-testid=\"play-button\"],\n.player-controls__buttons button.main-playPauseButton-button {\n    background-color: #ffffff !important;\n    color: #000000 !important;\n}\n\n.main-playPauseButton-button svg,\n.main-playPauseButton-button path,\n.main-playPauseButton-button span,\nbutton[data-testid=\"control-button-playpause\"] svg,\nbutton[data-testid=\"control-button-playpause\"] path,\nbutton[data-testid=\"control-button-playpause\"] span,\nbutton[data-testid=\"play-button\"] svg,\nbutton[data-testid=\"play-button\"] path,\nbutton[data-testid=\"play-button\"] span,\n.player-controls__buttons button.main-playPauseButton-button svg,\n.player-controls__buttons button.main-playPauseButton-button path {\n    fill: #000000 !important;\n    color: #000000 !important;\n    text-shadow: none !important;\n}\n\n.main-playPauseButton-button:hover,\nbutton[data-testid=\"control-button-playpause\"]:hover,\nbutton[data-testid=\"play-button\"]:hover {\n    background-color: #f0f0f0 !important;\n    transform: scale(1.05) !important;\n}\n\n/* Spotify Toasts, Banners, Snackbars, Tooltips & System Messages */\n.notistack-SnackbarContainer {\n    z-index: 99999999 !important;\n}\n\n.notistack-SnackbarContainer .notistack-Snackbar,\n.notistack-SnackbarContainer [class*=\"Snackbar\"],\n.main-notificationBubble-notificationBubble,\n.Root__notification-bar,\n[data-testid=\"toast-box\"],\n[data-encore-id=\"toast\"],\n[data-encore-id=\"banner\"],\n[data-encore-id=\"popover\"],\n[data-encore-id=\"tooltip\"] {\n    background: #100e20 !important;\n    background-color: #100e20 !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(0, 240, 255, 0.45) !important;\n    border-radius: 10px !important;\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.85), 0 0 16px rgba(0, 240, 255, 0.25) !important;\n    z-index: 99999999 !important;\n}\n\n/* Force ALL inner text & elements inside toasts/messages to be legible white on dark */\n.notistack-SnackbarContainer .notistack-Snackbar *,\n.notistack-SnackbarContainer [class*=\"Snackbar\"] *,\n.main-notificationBubble-notificationBubble *,\n.Root__notification-bar *,\n[data-testid=\"toast-box\"] *,\n[data-encore-id=\"toast\"] *,\n[data-encore-id=\"banner\"] *,\n[data-encore-id=\"popover\"] *,\n[data-encore-id=\"tooltip\"] * {\n    background: transparent !important;\n    background-color: transparent !important;\n    color: #ffffff !important;\n    fill: #ffffff !important;\n    text-shadow: none !important;\n}\n\n/* Toast action buttons (e.g. Undo, Cancel, View) */\n[data-testid=\"toast-box\"] button,\n[data-encore-id=\"toast\"] button,\n.main-notificationBubble-notificationBubble button,\n.notistack-Snackbar button {\n    background: rgba(0, 240, 255, 0.15) !important;\n    border: 1px solid rgba(0, 240, 255, 0.5) !important;\n    border-radius: 6px !important;\n    color: #00f0ff !important;\n    padding: 2px 8px !important;\n    cursor: pointer !important;\n}\n\n[data-testid=\"toast-box\"] button:hover,\n[data-encore-id=\"toast\"] button:hover,\n.main-notificationBubble-notificationBubble button:hover,\n.notistack-Snackbar button:hover {\n    background: rgba(0, 240, 255, 0.3) !important;\n    color: #ffffff !important;\n}\n";
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


// --- Module: audio/spotifyAnalysis.js ---
// src/audio/spotifyAnalysis.js - High-fidelity Spotify Audio Analysis engine (beats, bars, sections, segments, pitches, timbre)

class SpotifyAnalysis {
    constructor() {
        this.trackId = null;
        this.data = null;
        this.isLoading = false;

        // Cursors for fast sequential lookup
        this.beatCursor = 0;
        this.barCursor = 0;
        this.sectionCursor = 0;
        this.segmentCursor = 0;

        // Current musical state
        this.lastBeatIndex = -1;
        this.lastBarIndex = -1;
        this.lastSectionIndex = -1;

        this.currentBeat = null;
        this.currentBar = null;
        this.currentSection = null;
        this.currentSegment = null;

        this.isBeat = false;
        this.isBar = false;
        this.isDrop = false;
        this.sectionEnergy = 0.5;
        this.sectionLoudness = -10;
        this.bpm = 120;
    }

    async load(trackUriOrId) {
        if (!trackUriOrId) return;
        const trackId = trackUriOrId.replace("spotify:track:", "").trim();
        if (!trackId || this.trackId === trackId) return;

        this.trackId = trackId;
        this.isLoading = true;
        this.data = null;
        this.beatCursor = 0;
        this.barCursor = 0;
        this.sectionCursor = 0;
        this.segmentCursor = 0;
        this.lastBeatIndex = -1;
        this.lastBarIndex = -1;
        this.lastSectionIndex = -1;

        try {
            // 1. Spicetify CosmosAsync standard endpoint
            if (typeof Spicetify !== "undefined" && Spicetify.CosmosAsync) {
                try {
                    const res = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`);
                    if (res && (res.beats || res.track || res.sections)) {
                        this.data = res;
                        if (res.track && res.track.tempo) {
                            this.bpm = res.track.tempo;
                        }
                        this.isLoading = false;
                        return;
                    }
                } catch (e1) {
                    // Fallback to internal web player pathway
                    try {
                        const resPartner = await Spicetify.CosmosAsync.get(`https://api-partner.spotify.com/pathway/v1/web-player/analysis/${trackId}`);
                        if (resPartner && (resPartner.beats || resPartner.track || resPartner.sections)) {
                            this.data = resPartner;
                            if (resPartner.track && resPartner.track.tempo) {
                                this.bpm = resPartner.track.tempo;
                            }
                            this.isLoading = false;
                            return;
                        }
                    } catch (e2) {}
                }
            }

            // 2. Direct fetch with platform auth token
            if (typeof Spicetify !== "undefined" && Spicetify.Platform && Spicetify.Platform.AuthorizationAPI) {
                const token = await Spicetify.Platform.AuthorizationAPI.getAccessToken();
                if (token) {
                    const resp = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (resp.ok) {
                        const json = await resp.json();
                        if (json && (json.beats || json.track || json.sections)) {
                            this.data = json;
                            if (json.track && json.track.tempo) {
                                this.bpm = json.track.tempo;
                            }
                        }
                    }
                }
            }
        } catch (err) {
            console.warn("[SpotifyAnalysis] Analysis fetch unavailable, falling back to envelope follower:", err);
        } finally {
            this.isLoading = false;
        }
    }

    findItem(list, cursorName, sec) {
        if (!list || list.length === 0) return { item: null, index: -1 };

        let idx = this[cursorName] || 0;
        // If track seeked backwards, reset cursor
        if (idx >= list.length || (idx > 0 && list[idx].start > sec)) {
            idx = 0;
        }

        while (idx < list.length - 1 && list[idx + 1].start <= sec) {
            idx++;
        }

        this[cursorName] = idx;
        const item = list[idx];
        return { item, index: idx };
    }

    query(progressSec) {
        if (!this.data || !this.data.beats || this.data.beats.length === 0) {
            return null;
        }

        const sec = Math.max(0, progressSec);

        // 1. Current Beat
        const { item: beat, index: beatIdx } = this.findItem(this.data.beats, 'beatCursor', sec);
        let beatPhase = 0;
        let beatImpulse = 0;
        let isBeat = false;

        if (beat) {
            const beatDur = Math.max(0.1, beat.duration || 0.5);
            beatPhase = Math.max(0, Math.min(1, (sec - beat.start) / beatDur));
            isBeat = (beatIdx !== this.lastBeatIndex && beatIdx >= 0);
            if (isBeat) {
                this.lastBeatIndex = beatIdx;
            }
            // Sharp initial peak with natural organic decay
            beatImpulse = Math.max(0, 1.0 - Math.pow(beatPhase, 0.45) * 1.6);
        }

        // 2. Current Bar (Measure)
        const { item: bar, index: barIdx } = this.findItem(this.data.bars, 'barCursor', sec);
        let barPhase = 0;
        let isBar = false;

        if (bar) {
            const barDur = Math.max(0.4, bar.duration || 2.0);
            barPhase = Math.max(0, Math.min(1, (sec - bar.start) / barDur));
            isBar = (barIdx !== this.lastBarIndex && barIdx >= 0);
            if (isBar) {
                this.lastBarIndex = barIdx;
            }
        }

        // 3. Current Section (Intro, Verse, Chorus, Drop, Breakdown)
        const { item: section, index: secIdx } = this.findItem(this.data.sections, 'sectionCursor', sec);
        if (section) {
            if (secIdx !== this.lastSectionIndex) {
                this.lastSectionIndex = secIdx;
                if (section.tempo) {
                    this.bpm = section.tempo;
                }
            }
            this.sectionLoudness = section.loudness || -10;
            // Map loudness (-28 dB to -3 dB) to normalized energy [0.1 .. 1.0]
            this.sectionEnergy = Math.max(0.1, Math.min(1.0, (this.sectionLoudness + 28) / 25));
            // Detect drops/explosive choruses: high loudness & high tempo
            this.isDrop = this.sectionEnergy > 0.72 || (this.sectionLoudness > -6.5);
        }

        // 4. Current Segment (Timbre & Pitches)
        const { item: segment } = this.findItem(this.data.segments, 'segmentCursor', sec);
        let bassEnergy = 0.2;
        let midEnergy = 0.2;
        let trebleEnergy = 0.2;
        let snareImpulse = 0.0;
        let segmentLoudness = this.sectionEnergy;

        if (segment) {
            // Loudness interpolation
            const segDur = Math.max(0.05, segment.duration || 0.25);
            const segPhase = Math.max(0, Math.min(1, (sec - segment.start) / segDur));
            const loudStart = segment.loudness_start || -20;
            const loudMax = segment.loudness_max || -8;
            const maxTimeNorm = (segment.loudness_max_time || 0.05) / segDur;

            let currentDb = loudStart;
            if (segPhase <= maxTimeNorm && maxTimeNorm > 0) {
                currentDb = loudStart + (loudMax - loudStart) * (segPhase / maxTimeNorm);
            } else if (maxTimeNorm < 1) {
                currentDb = loudMax + (loudStart - loudMax) * ((segPhase - maxTimeNorm) / (1 - maxTimeNorm));
            }
            segmentLoudness = Math.max(0.1, Math.min(1.0, (currentDb + 32) / 28));

            // Pitches (12 chroma frequencies)
            if (segment.pitches && segment.pitches.length === 12) {
                const p = segment.pitches;
                const lowPitch = (p[0] + p[1] + p[2] + p[3]) / 4;
                const midPitch = (p[4] + p[5] + p[6] + p[7] + p[8]) / 5;
                const highPitch = (p[9] + p[10] + p[11]) / 3;

                // Timbre coefficients
                const t0 = segment.timbre ? Math.max(0, (segment.timbre[0] + 50) / 60) : 0.5; // Overall loudness
                const t1 = segment.timbre ? Math.max(0, Math.min(1, (segment.timbre[1] + 80) / 160)) : 0.5; // Brightness / highs

                bassEnergy = Math.min(1.0, lowPitch * 0.45 + beatImpulse * 0.55 + (this.isDrop ? 0.2 : 0));
                midEnergy = Math.min(1.0, midPitch * 0.55 + segmentLoudness * 0.45);
                trebleEnergy = Math.min(1.0, highPitch * 0.5 + t1 * 0.4 + beatImpulse * 0.2);

                // Detect snare / clap transient: mid/treble spike without deep bass dominance
                if (isBeat && (beatIdx % 2 === 1) && (t1 > 0.45 || highPitch > 0.55)) {
                    snareImpulse = Math.min(1.0, (highPitch + t1) * 0.85);
                }
            }
        }

        return {
            isBeat,
            isBar,
            is4BeatPulse: isBeat && (beatIdx % 4 === 0),
            beatPhase,
            beatProgress: beatPhase,
            beatImpulse,
            barPhase,
            beatCount: beatIdx,
            barCount: barIdx,
            bpm: this.bpm,
            isDrop: this.isDrop,
            sectionEnergy: this.sectionEnergy,
            bass: bassEnergy,
            mid: midEnergy,
            mids: midEnergy,
            treble: trebleEnergy,
            highs: trebleEnergy,
            energy: Math.min(1.0, (bassEnergy * 0.45 + midEnergy * 0.3 + trebleEnergy * 0.25) * (0.7 + segmentLoudness * 0.3)),
            snareImpulse
        };
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

        const targetBass = 0.35 + beatDecay * 0.65 + Math.max(0, subBeat);
        const targetMid = 0.25 + Math.sin(t * 3.2) * 0.25 + (engine.isBeat ? 0.35 : 0);
        const targetTreble = 0.2 + Math.cos(t * 6.5) * 0.3 + beatDecay * 0.4;

        engine.bass += (targetBass - engine.bass) * 0.28;
        engine.mid += (targetMid - engine.mid) * 0.20;
        engine.treble += (targetTreble - engine.treble) * 0.24;

        // Snare impulse on beat 2 and 4
        const beatInBar = (engine.beatCount % 4);
        if (engine.isBeat && (beatInBar === 1 || beatInBar === 3)) {
            engine.snareImpulse = 0.85;
        } else {
            engine.snareImpulse = (engine.snareImpulse || 0) * 0.85;
        }
    } else {
        // Serene resting breathing when paused
        const breath = 0.12 + (Math.sin(engine.liveTime * 1.5) * 0.5 + 0.5) * 0.1;
        engine.bass += (breath - engine.bass) * 0.08;
        engine.mid += (breath * 0.8 - engine.mid) * 0.08;
        engine.treble += (breath * 0.5 - engine.treble) * 0.08;
        engine.snareImpulse = 0;
    }

    engine.energy = (engine.bass * 0.5) + (engine.mid * 0.3) + (engine.treble * 0.2);

    // Multi-model aliases
    engine.mids = engine.mid;
    engine.highs = engine.treble;
    engine.bpm = engine.tempo;
    engine.beatImpulse = (engine.isBeat ? 1.0 : 0.0) + Math.max(0, 1.0 - engine.beatProgress * 2.2) * 0.5;
    engine.isBeatPulse = engine.isBeat;
    engine.is4BeatPulse = engine.isBeat && (engine.beatCount % 4 === 0);
    engine.barPhase = (engine.beatCount % 4 + engine.beatProgress) / 4;
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

        // Measures & drops
        this.isBar = false;
        this.barCount = 0;
        this.barPhase = 0;
        this.isDrop = false;
        this.sectionEnergy = 0.5;
        this.snareImpulse = 0;

        // Aliases for multi-model compatibility
        this.mids = 0.1;
        this.highs = 0.1;
        this.bpm = 124;
        this.beatPhase = 0;
        this.beatImpulse = 0;
        this.isBeatPulse = false;
        this.is4BeatPulse = false;

        // Optional Web Audio API spectrum bridge & Spotify Analysis
        this.webAudio = new WebAudioBridge();
        this.spotifyAnalysis = new SpotifyAnalysis();

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
            const newUri = data.item.uri || "";
            if (newUri && newUri !== this.trackUri) {
                this.trackUri = newUri;
                this.tempo = estimateTrackTempo(this.trackUri, data.item.name || "");
                this.bpm = this.tempo;
                this.spotifyAnalysis.load(this.trackUri);
            }
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
            this.barPhase = (this.beatCount % 4) / 4;
            this.snareImpulse = (this.beatCount % 2 === 1 && this.isBeat) ? 0.8 : (this.snareImpulse * 0.85);
            return;
        }

        // 2. Sync playback progress with Spotify Player
        if (typeof Spicetify !== "undefined" && Spicetify.Player) {
            this.isPlaying = Spicetify.Player.isPlaying();
            const prog = Spicetify.Player.getProgress();
            this.progress = (typeof prog === "number" && !isNaN(prog)) ? prog : this.progress + (this.isPlaying ? dt * 1000 : 0);
        } else {
            this.progress += (this.isPlaying ? dt * 1000 : 0);
        }

        // 3. Check for authentic Spotify Audio Analysis data
        const analysisData = this.isPlaying ? this.spotifyAnalysis.query(this.progress / 1000) : null;

        if (analysisData) {
            this.tempo = analysisData.bpm;
            this.bpm = analysisData.bpm;
            this.beatProgress = analysisData.beatProgress;
            this.beatPhase = analysisData.beatPhase;
            this.isBeat = analysisData.isBeat;
            this.isBar = analysisData.isBar;
            this.is4BeatPulse = analysisData.is4BeatPulse;
            this.isBeatPulse = analysisData.isBeat;
            this.beatCount = analysisData.beatCount;
            this.barCount = analysisData.barCount;
            this.barPhase = analysisData.barPhase;
            this.isDrop = analysisData.isDrop;
            this.sectionEnergy = analysisData.sectionEnergy;
            this.snareImpulse = analysisData.snareImpulse;
            this.beatImpulse = analysisData.beatImpulse;

            if (this.isBeat) {
                this.lastBeatTime = this.liveTime;
            }

            const smoothRate = analysisData.isBeat ? 0.4 : 0.22;
            this.bass += (analysisData.bass - this.bass) * smoothRate;
            this.mid += (analysisData.mid - this.mid) * (smoothRate * 0.85);
            this.treble += (analysisData.treble - this.treble) * smoothRate;
            this.energy += (analysisData.energy - this.energy) * smoothRate;
            this.mids = this.mid;
            this.highs = this.treble;
            return;
        }

        // 4. Algorithmic fallback when analysis is unavailable
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
// src/backgrounds/CosmicStar.js - Twinkling cosmic starfield particle with hyperspace warp streaks

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

    update(dt, w, h, audio) {
        const treble = typeof audio === "number" ? audio : (audio && audio.treble ? audio.treble : 0);
        const isDrop = audio && typeof audio === "object" && audio.isDrop;
        const energy = audio && typeof audio === "object" && audio.energy ? audio.energy : 0.4;

        // Drift slowly like calm celestial dust on chill music; rush on drops
        const speedMult = isDrop ? 4.0 : (energy > 0.7 ? 1.8 : (0.28 + energy * 0.72));
        this.y += this.speedY * dt * (1 + treble * 0.3) * speedMult;
        if (this.y > h + 20) {
            this.reset(w, h);
        }
    }

    render(ctx, time, audio, color) {
        const treble = typeof audio === "number" ? audio : (audio && audio.treble ? audio.treble : 0);
        const isDrop = audio && typeof audio === "object" && audio.isDrop;
        const energy = audio && typeof audio === "object" && audio.energy ? audio.energy : 0.4;
        const bpm = audio && typeof audio === "object" && audio.bpm ? audio.bpm : 120;

        const isWarping = isDrop || (bpm >= 130 && energy > 0.65);
        const twinkleSpeed = this.pulseSpeed * (0.4 + energy * 0.6);
        const twinkle = Math.sin(time * twinkleSpeed + this.phase) * 0.25 + 0.75;
        const alpha = Math.min(1, this.baseAlpha * twinkle * (0.8 + treble * 0.6));

        if (isWarping) {
            // Hyperspace warp streak
            const streakLen = Math.min(65, this.speedY * (isDrop ? 2.4 : 1.2));
            ctx.save();
            ctx.strokeStyle = color;
            ctx.lineWidth = Math.max(0.7, this.size * 0.85);
            ctx.globalAlpha = Math.min(1.0, alpha * 1.3);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y - streakLen);
            ctx.stroke();

            // Bright star head
            ctx.fillStyle = "#ffffff";
            ctx.globalAlpha = Math.min(1.0, alpha * 1.5);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            return;
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-point diffraction cross spikes on bright celestial stars (heritage Legacy)
        if (this.hasCross && alpha > 0.45) {
            const clen = this.crossSize * (0.8 + treble * 0.5);
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
// src/backgrounds/Shockwave.js - Audio beat-driven shockwave pulse ring (dual kick & snare)

class Shockwave {
    constructor(x, y, maxRadius, color, type = "kick") {
        this.x = x;
        this.y = y;
        this.type = type;
        this.maxRadius = maxRadius;
        this.color = color;
        this.life = 1.0;

        if (type === "snare") {
            this.radius = 26;
            this.speed = 6.2;
            this.decay = 2.2;
            this.baseLineWidth = 1.2;
        } else {
            // Kick / Bass shockwave
            this.radius = 16;
            this.speed = 3.6;
            this.decay = 1.35;
            this.baseLineWidth = 2.8;
        }
    }

    update(dt) {
        this.radius += (this.maxRadius - this.radius) * (dt * this.speed);
        this.life -= dt * this.decay;
        return this.life > 0;
    }

    render(ctx) {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = this.color;
        ctx.lineWidth = Math.max(0.6, this.baseLineWidth * this.life);
        ctx.globalAlpha = Math.max(0, this.life * (this.type === "snare" ? 0.75 : 0.65));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (this.type === "kick" && this.radius > 35) {
            ctx.lineWidth = 1.0 * this.life;
            ctx.globalAlpha = Math.max(0, this.life * 0.35);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.75, 0, Math.PI * 2);
            ctx.stroke();
        } else if (this.type === "snare" && this.radius > 30) {
            ctx.lineWidth = 0.7 * this.life;
            ctx.globalAlpha = Math.max(0, this.life * 0.4);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.88, 0, Math.PI * 2);
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
        const energy = audio.energy || 0.35;
        const tempoNorm = Math.max(0.4, Math.min(2.0, (audio.bpm || 120) / 120));
        // Calm synthwave cruise on chill music, fast rush on intense music
        const speed = audio.isPlaying !== false 
            ? (14 + tempoNorm * 18 + energy * 50) 
            : 8;
        this.offsetY = (this.offsetY + dt * speed) % 40;

        const sparkleSpeedMult = 0.4 + energy * 0.6;
        for (let i = 0; i < this.sparkles.length; i++) {
            const sp = this.sparkles[i];
            sp.y -= (sp.speedY * dt * sparkleSpeedMult) / 500;
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
        const mids = audioState.mids || audioState.mid || 0;
        const energy = audioState.energy || 0.35;
        const isDrop = audioState.isDrop || false;

        const dropSpeed = isDrop ? 2.4 : 1.0;
        const tempoNorm = Math.max(0.4, Math.min(2.0, bpm / 120));
        // Slow, majestic, meditative rotation on chill tracks; dynamic acceleration on drops
        const rotSpeed = isPlaying 
            ? ((0.025 + tempoNorm * 0.045 + mids * 0.08) * (0.35 + energy * 0.65) * dropSpeed) 
            : 0.012;
        this.rotationAngle += rotSpeed * dt;
    }

    /**
     * Render large, ultra-luminous sacred geometry mandala rings behind the cat
     */
    render(ctx, cx, cy, baseRadius, palette, audioState) {
        const bass = audioState.bass || 0;
        const mids = audioState.mids || audioState.mid || 0;
        const beat = audioState.beatImpulse || 0;
        const snare = audioState.snareImpulse || 0;
        const energy = audioState.energy || 0.4;
        const isDrop = audioState.isDrop || false;
        const dropMultiplier = isDrop ? 1.25 : 1.0;

        const fractalScale = baseRadius * (1.18 + bass * 0.22 + beat * 0.14) * dropMultiplier;
        const alphaBase = Math.min(0.60, (0.24 + energy * 0.22 + bass * 0.14 + (isDrop ? 0.15 : 0)) * 0.85);

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.translate(cx, cy);
        ctx.rotate(this.rotationAngle);

        // 1. Batched Celestial Outer Tick Marks Ring (With snare reactivity)
        const outerTickRadius = fractalScale * (1.08 + snare * 0.06);
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
        ctx.strokeStyle = snare > 0.4 ? palette.core : palette.accentAlpha(alphaBase * (0.75 + snare * 0.4));
        ctx.lineWidth = 1.0 + snare * 0.8;
        ctx.stroke();

        // 2. Concentric Sacred Harmonic Rings (Batched by style)
        // Outer glow rings
        ctx.beginPath();
        ctx.arc(0, 0, fractalScale * 1.08, 0, Math.PI * 2);
        ctx.arc(0, 0, fractalScale * 1.0, 0, Math.PI * 2);
        ctx.strokeStyle = isDrop ? palette.core : palette.accentAlpha(alphaBase * 0.75);
        ctx.lineWidth = 1.4 + (isDrop ? 0.8 : 0);
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
        centralGlow.addColorStop(0, `rgba(255, 255, 255, ${alphaBase * (0.65 + (isDrop ? 0.35 : 0))})`);
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


// --- Module: backgrounds/deckPlanks.js ---
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


// --- Module: backgrounds/deckLighting.js ---
// src/models/cosmic/deckLighting.js - Wooden deck rim light, reflection, and contact shadow with audio transients

function renderDeckLighting(ctx, width, height, deckY, palette, audioState, centerX = null) {
    const deckHeight = height - deckY;
    const bass = audioState.bass || 0;
    const beat = audioState.beatImpulse || 0;
    const snare = audioState.snareImpulse || 0;
    const energy = audioState.energy || 0.5;
    const isDrop = audioState.isDrop || false;
    const dropMultiplier = isDrop ? 1.4 : 1.0;
    const cx = centerX !== null ? centerX : width * 0.5;

    // 1. Deck Horizon Rim Light
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    const rimGrad = ctx.createLinearGradient(0, deckY - 4, 0, deckY + 8);
    rimGrad.addColorStop(0, palette.accentAlpha(Math.min(1.0, (0.65 + beat * 0.35 + snare * 0.3) * dropMultiplier)));
    rimGrad.addColorStop(0.35, palette.primaryAlpha(Math.min(1.0, (0.4 + bass * 0.3) * dropMultiplier)));
    rimGrad.addColorStop(1.0, "transparent");

    ctx.fillStyle = rimGrad;
    ctx.fillRect(0, deckY - 3, width, 10);

    // Diffuse rim line
    ctx.strokeStyle = palette.accentAlpha(Math.min(1.0, (0.5 + beat * 0.3 + snare * 0.25) * dropMultiplier));
    ctx.lineWidth = 3.0 + (isDrop ? 1.5 : 0);
    ctx.beginPath();
    ctx.moveTo(0, deckY);
    ctx.lineTo(width, deckY);
    ctx.stroke();

    // Crisp white core rim (flashes bright on snares & drops)
    const whiteRimAlpha = Math.min(1.0, (0.6 + beat * 0.4 + snare * 0.4) * dropMultiplier);
    ctx.strokeStyle = `rgba(255, 255, 255, ${whiteRimAlpha})`;
    ctx.lineWidth = 1.0 + (isDrop ? 0.5 : 0);
    ctx.beginPath();
    ctx.moveTo(0, deckY);
    ctx.lineTo(width, deckY);
    ctx.stroke();

    ctx.restore();

    // 2. Ambient Cat & Energy Reflection on Polished Wood Surface
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    const reflW = width * 0.34 * (1.0 + bass * 0.25 + (isDrop ? 0.3 : 0));
    const reflH = deckHeight * 0.85;

    const woodReflGrad = ctx.createRadialGradient(
        cx, deckY + 6, 4,
        cx, deckY + reflH * 0.5, reflW
    );

    const reflAlpha = Math.min(1.0, (0.22 + bass * 0.18 + beat * 0.2 + snare * 0.15) * (0.8 + energy * 0.4) * dropMultiplier);
    woodReflGrad.addColorStop(0, palette.accentAlpha(reflAlpha * 0.95));
    woodReflGrad.addColorStop(0.3, palette.primaryAlpha(reflAlpha * 0.65));
    woodReflGrad.addColorStop(0.7, palette.secondaryAlpha(reflAlpha * 0.3));
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


// --- Module: backgrounds/WoodenDeck.js ---
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

    spawnShockwave(x, y, maxRadius, color, type = "kick") {
        if (this.shockwaves.length < 12) {
            this.shockwaves.push(new Shockwave(x, y, maxRadius, color, type));
        }
    }

    resize(w, h) {
        this.initStars(w, h);
    }

    update(dt, w, h, audio, palette, catCenterX, catCenterY) {
        // 1. Stars update (if enabled)
        if (this.effects.stars) {
            for (let i = 0; i < this.stars.length; i++) {
                this.stars[i].update(dt, w, h, audio);
            }
        }

        // 2. Nebula update (if enabled)
        if (this.effects.nebula) {
            this.nebula.update(dt, audio.liveTime || 0, audio, audio.isPlaying);
        }

        // 3. Shockwaves update (if enabled)
        if (this.effects.shockwaves && audio.isPlaying) {
            const energy = audio.energy || 0.35;
            // Kick shockwave (heavy bass ring, triggered on solid impacts, quiet on chill tracks)
            if ((audio.isBeat && audio.bass > 0.52 && energy > 0.32) || (audio.beatImpulse > 0.78)) {
                this.spawnShockwave(catCenterX, catCenterY, Math.min(w, h) * 0.50, palette.shockwave, "kick");
            }
            // Snare shockwave (rapid thin ripple on true crisp transients)
            if (audio.snareImpulse > 0.68 && energy > 0.32) {
                this.spawnShockwave(catCenterX, catCenterY, Math.min(w, h) * 0.44, palette.accent, "snare");
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
                this.stars[i].render(ctx, time, audio, palette.core);
            }
        }

        // Layer 5: Concentric audio aura rings (subtle presence)
        const isDrop = audio && audio.isDrop;
        const dropMultiplier = isDrop ? 1.5 : 1.0;
        const auraRadius = (135 + (audio.bass || 0) * 35) * dropMultiplier;
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = isDrop ? palette.accent : palette.primary;
        ctx.lineWidth = 1.0 + (isDrop ? 0.8 : 0);
        ctx.globalAlpha = Math.min(0.5, (0.15 + (audio.bass || 0) * 0.15) * dropMultiplier);
        ctx.beginPath();
        ctx.arc(catCenterX, catCenterY, auraRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Layer 6: Radial beat & snare shockwaves (if enabled)
        if (this.effects.shockwaves) {
            for (let i = 0; i < this.shockwaves.length; i++) {
                this.shockwaves[i].render(ctx);
            }
        }

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
    const snare = audioState.snareImpulse || 0;
    const isDrop = !!audioState.isDrop;

    // Burst of sparks on snare / clap hit
    if (isPlaying && snare > 0.4) {
        const burstCount = Math.floor(3 + snare * 4 + (isDrop ? 3 : 0));
        for (let b = 0; b < burstCount; b++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 30 + Math.random() * 60;
            sparkTrail.push({
                x: tipNode.x,
                y: tipNode.y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                life: 1.0,
                decay: 1.2 + Math.random() * 1.5,
                size: (2.0 + Math.random() * 3.0) * baseScale,
                color: Math.random() < 0.5 ? "accent" : "starlight"
            });
        }
    }

    // Continuous trailing sparks
    if (isPlaying && Math.random() < (0.35 + highs * 0.5 + beat * 0.35 + (isDrop ? 0.3 : 0))) {
        sparkTrail.push({
            x: tipNode.x + (Math.random() - 0.5) * 8,
            y: tipNode.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 25 - 12,
            vy: (Math.random() - 0.5) * 25 - 12,
            life: 1.0,
            decay: 1.1 + Math.random() * 1.4,
            size: (1.5 + Math.random() * 2.8) * baseScale,
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

    // 1. Natural Feline Sway Rhythm (fluid, lazy sway on chill music, reactive on intense tracks)
    const tempoNorm = Math.max(0.4, Math.min(2.0, bpm / 120));
    const tempoHz = isPlaying ? (0.15 + tempoNorm * 0.35 * (0.35 + energy * 0.65)) : 0.10;
    const swaySpeed = isPlaying ? (tempoHz * (0.75 + energy * 0.5)) : 0.10;
    tail.swayPhase += swaySpeed * dt;

    // 2. Beat Deck Tap & Tip Twitch (only on energetic beats)
    if (isPlaying && beat > 0.45 && energy > 0.3) {
        tail.tipTwitch += (beat * 1.4 * energy) * (Math.sin(tail.swayPhase) > 0 ? 1 : -1);
        tail.deckTapImpulse = Math.min(1.0, tail.deckTapImpulse + beat * 0.6 * energy);
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

    // Sway amplitude scales softly with energy
    const maxSwayAngle = isPlaying ? (0.16 + energy * 0.24 + bass * 0.15) : 0.05;

    for (let i = 1; i < tail.segmentCount; i++) {
        const frac = i / (tail.segmentCount - 1);
        
        // Feline S-curve harmonic wave
        const wavePhase = tail.swayPhase - frac * 2.2;
        const horizontalSway = Math.sin(wavePhase) * maxSwayAngle * (frac * 1.2);
        const secondaryHarmonic = (isPlaying && energy > 0.35) ? (Math.sin(wavePhase * 1.6) * 0.10 * frac * energy) : 0;

        // Tip twitch & energetic whip
        const tipCurl = tail.tipTwitch * Math.pow(frac, 2.5) * 1.2;

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
            const tipSpeed = 0.8 + tempoNorm * 1.2 * (0.4 + energy * 0.6);
            const tipLift = Math.sin(time * tipSpeed + frac * 4) * (4 * baseScale * highs * (0.3 + energy * 0.7)) - (tail.deckTapImpulse * 6 * baseScale);
            targetY += tipLift;
        }

        // Smooth spring damping towards target (cushioned and fluid)
        const blend = 0.32 + (1 - frac) * 0.22;
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
    const isDrop = !!audioState?.isDrop;
    const snare = Number.isFinite(audioState?.snareImpulse) ? audioState.snareImpulse : 0.0;

    const energy = Number.isFinite(audioState?.energy) ? audioState.energy : 0.4;
    const tempoNorm = Math.max(0.4, Math.min(2.0, bpm / 120));

    // Peaceful resting breath or audio-reactive respiration (slow, calm cadence on chill tracks)
    const breathSpeed = isPlaying ? (0.65 + tempoNorm * 0.5 * (0.35 + energy * 0.65)) : 0.4;
    const breathAmp = isPlaying ? (0.018 + energy * 0.022) : 0.010;
    const breath = Math.sin(time * breathSpeed) * breathAmp;

    // Dynamic Feline Squash & Stretch on beat impacts
    const dropMultiplier = isDrop ? 1.45 : 1.0;
    const energyScale = 0.35 + energy * 0.65;
    const squashCompressY = isPlaying ? (-beat * 0.07 * dropMultiplier * energyScale + bass * 0.04 * energyScale) : 0;
    const stretchWidenX = isPlaying ? (beat * 0.09 * dropMultiplier * energyScale + bass * 0.05 * energyScale) : 0;

    // High frequency micro-vibration on distinct cymbal / hi-hat attacks only (not on quiet ambient)
    const vibration = (isPlaying && highs > 0.35) ? Math.sin(time * 35) * (highs - 0.35) * 0.015 : 0;

    const currentScaleX = (1.0 + breath + stretchWidenX + vibration) * (width * 0.5);
    const currentScaleY = (1.0 - breath * 0.5 + squashCompressY) * (height * 0.5);

    // Spine organic swaying (slow, hypnotic, majestic on chill tracks)
    const spineSwaySpeed = isPlaying ? (0.35 + tempoNorm * 0.45 * (0.4 + energy * 0.6)) : 0.25;
    const spineSwayAmp = (0.012 + mids * 0.035 * dropMultiplier) * energyScale;
    const spineSway = isPlaying 
        ? (Math.sin(time * spineSwaySpeed) * spineSwayAmp) 
        : (Math.sin(time * 0.4) * 0.005);

    // Ear perk intensity on snare, claps, and high frequencies
    const earPerk = isPlaying ? (highs * 0.06 + snare * 0.10 + beat * 0.05) * energyScale : 0;

    // Ground base firmly at deckY with dynamic springy bounce (gentle and cushioned on chill tracks)
    const bounceOffset = isPlaying ? (-Math.sin((audioState?.beatProgress || 0) * Math.PI) * (2.5 * bass + 5.5 * beat) * dropMultiplier * energyScale) : 0;
    const actualCy = deckY ? (deckY - currentScaleY * 0.96 + bounceOffset) : (cy + bounceOffset);

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
        isDrop,
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

    const dropBloom = p.isDrop ? 1.45 : 1.0;
    const heartPulseRadius = scaleY * (0.75 + beat * 0.35 * dropBloom + (p.mids || 0) * 0.2);
    const heartGlow = ctx.createRadialGradient(
        spineMid[0], spineMid[1] - scaleY * 0.2, 5,
        spineMid[0], spineMid[1] - scaleY * 0.1, heartPulseRadius
    );
    heartGlow.addColorStop(0, "rgba(255, 255, 255, 0.98)");
    heartGlow.addColorStop(0.25, palette.accentAlpha(0.95 * dropBloom));
    heartGlow.addColorStop(0.55, palette.primaryAlpha((0.75 + bass * 0.25) * dropBloom));
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
    const spineWaveSpeed = 0.5 + ((p.bpm || 120) / 120) * 0.7 * (0.4 + (p.energy || 0.4) * 0.6);
    const spineLineWidth = (2.4 + beat * 1.8 + (p.mids || 0) * 1.2) * (p.isDrop ? 1.4 : 1.0);
    ctx.beginPath();
    ctx.moveTo(headCenter[0], headCenter[1] + 10);
    ctx.quadraticCurveTo(spineMid[0] + Math.sin(time * spineWaveSpeed) * (3.0 + beat * 5), spineMid[1], baseCenter[0], baseCenter[1] - 8);
    ctx.strokeStyle = palette.accentAlpha(1.0);
    ctx.lineWidth = spineLineWidth;
    ctx.stroke();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(1.0, spineLineWidth * 0.45);
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
    const energy = audio.energy || 0.35;
    const tempoNorm = Math.max(0.4, Math.min(2.0, (audio.bpm || audio.tempo || 120) / 120));
    const isPlaying = audio.isPlaying !== false;

    // Slow, lazy cyber tail sway on chill songs (0.15 - 0.25 Hz)
    const swayFreq = isPlaying ? (0.65 + tempoNorm * 0.45 * (0.35 + energy * 0.65)) : 0.35;
    const swayAmp = isPlaying ? (16 + energy * 20 + (audio.bass || 0) * 16) : 12;

    ctx.beginPath();
    ctx.moveTo(rootX, rootY);

    for (let i = 0; i < tailSegments; i++) {
        const frac = (i + 1) / tailSegments;
        const wave = Math.sin(time * swayFreq - frac * 2.5);
        const curl = Math.pow(frac, 1.3) * (swayAmp * wave);
        const segX = rootX + curl + Math.sin(frac * Math.PI) * (15 + energy * 10);
        const segY = rootY + frac * 65 - Math.pow(frac, 2) * 18;

        tailPoints[i] = { x: segX, y: segY };
        ctx.lineTo(segX, segY);
    }

    ctx.globalCompositeOperation = 'screen';
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 3.0 + (audio.bass || 0) * 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = palette.core;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // Data pulse along tail spine: relaxed cruise on chill songs
    const pulseSpeed = 0.5 + tempoNorm * 0.5 * (0.4 + energy * 0.6);
    const pulsePos = (time * pulseSpeed) % 1.0;
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
// src/models/cyber/cyberConstellation.js - Constellation nodes, lines, and frequency-mapped pulsar heart

function renderCyberConstellation(ctx, nodes, links, time, audio, palette) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    const bass = audio.bass || 0;
    const mid = audio.mid || 0;
    const treble = audio.treble || 0;
    const beat = audio.beatImpulse || 0;
    const snare = audio.snareImpulse || 0;
    const isDrop = audio.isDrop || false;
    const dropMultiplier = isDrop ? 1.5 : 1.0;

    const nodeMap = {};
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        nodeMap[n.id] = n;
    }

    // Dynamic link rendering with drop intensity
    const linkAlpha = Math.min(1.0, (0.45 + mid * 0.35 + beat * 0.2) * dropMultiplier);
    ctx.strokeStyle = isDrop && palette.accentAlpha ? palette.accentAlpha(linkAlpha) : (palette.primaryAlpha ? palette.primaryAlpha(linkAlpha) : palette.primary);
    ctx.lineWidth = (1.0 + snare * 0.8 + (isDrop ? 0.6 : 0));

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

    // Dynamic frequency-mapped nodes (slow celestial shimmer on chill music)
    const energy = audio.energy || 0.35;
    const tempoNorm = Math.max(0.4, Math.min(2.0, (audio.bpm || 120) / 120));
    const nodePulseSpeed = 0.8 + tempoNorm * 0.6 * (0.35 + energy * 0.65);

    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(time * nodePulseSpeed + i * 0.8) * 0.18 + 0.82;

        // Frequency mapping by anatomical position:
        // Lower body (hips, tailBase, flanks) -> Bass
        // Core (heart, spine) -> Mids
        // Upper body (throat, shoulders) -> Treble & Snare
        let freqBand = mid;
        if (n.relY >= 35) {
            freqBand = bass * 1.3 + beat * 0.6;
        } else if (n.relY <= -20) {
            freqBand = treble * 1.2 + snare * 0.8;
        } else {
            freqBand = mid * 1.1 + beat * 0.3;
        }

        const size = n.size * (pulse + freqBand * 0.5) * dropMultiplier;

        if (n.isHeart) {
            const heartPulse = (1.0 + bass * 0.9 + beat * 0.5) * dropMultiplier;
            const heartRadius = 18 * heartPulse;

            // Outer radiant corona
            const heartGrad = ctx.createRadialGradient(n.relX, n.relY, 1, n.relX, n.relY, heartRadius);
            heartGrad.addColorStop(0, palette.core);
            heartGrad.addColorStop(0.35, palette.accentAlpha ? palette.accentAlpha(0.9) : palette.accent);
            heartGrad.addColorStop(0.7, palette.primaryAlpha ? palette.primaryAlpha(0.4) : palette.primary);
            heartGrad.addColorStop(1, 'rgba(255, 0, 127, 0)');

            ctx.fillStyle = heartGrad;
            ctx.globalAlpha = Math.min(1.0, 0.85 + bass * 0.2);
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, heartRadius, 0, Math.PI * 2);
            ctx.fill();

            // Inner intense pulsar core
            ctx.fillStyle = palette.core;
            ctx.globalAlpha = 1.0;
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, 4.5 * heartPulse, 0, Math.PI * 2);
            ctx.fill();

            // Extra flash during drops or high beats
            if (isDrop || beat > 0.7) {
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(n.relX, n.relY, 2.5 * heartPulse, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Node color modulation according to frequency band
            ctx.fillStyle = (freqBand > 0.45 || isDrop) ? palette.core : palette.accent;
            ctx.globalAlpha = Math.min(1.0, 0.7 + freqBand * 0.3);
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
// src/models/cyber/cyberWhiskers.js - Audio-reactive vibrating cyber whiskers with multi-harmonic flex & snare response

function renderCyberWhiskers(ctx, time, audio, palette) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const treble = audio.treble || 0;
    const mid = audio.mid || 0;
    const snare = audio.snareImpulse || 0;
    const energy = audio.energy || 0.35;
    const energyScale = 0.35 + energy * 0.65;
    const isDrop = audio.isDrop || false;
    const dropMultiplier = isDrop ? 1.4 : 1.0;

    // Gentle slow breathing flex on calm music; rapid sensory flutter only on distinct treble/snare transients
    const fastFlutter = (treble > 0.38 || snare > 0.45) 
        ? Math.sin(time * 24.0) * (Math.max(0, treble - 0.38) * 3.5 + snare * 4.0) 
        : 0;
    const slowBreath = Math.sin(time * 1.6) * (mid * 1.2 * energyScale);
    const vibe = (fastFlutter + slowBreath) * dropMultiplier;

    const leftWhiskers = [
        { startX: -14, startY: 14, cpX: -32, cpY: 10 + vibe * 0.7, endX: -50, endY: 7 + vibe },
        { startX: -15, startY: 17, cpX: -34, cpY: 17 + vibe * 0.3, endX: -55, endY: 17 + vibe * 0.4 },
        { startX: -14, startY: 20, cpX: -32, cpY: 23 - vibe * 0.6, endX: -48, endY: 27 - vibe }
    ];

    const rightWhiskers = [
        { startX: 14, startY: 14, cpX: 32, cpY: 10 + vibe * 0.7, endX: 50, endY: 7 + vibe },
        { startX: 15, startY: 17, cpX: 34, cpY: 17 + vibe * 0.3, endX: 55, endY: 17 + vibe * 0.4 },
        { startX: 14, startY: 20, cpX: 32, cpY: 23 - vibe * 0.6, endX: 48, endY: 27 - vibe }
    ];

    const whiskerAlpha = Math.min(1.0, (0.55 + treble * 0.35 + snare * 0.3) * dropMultiplier);
    const tipRadius = 1.0 + treble * 1.5 + snare * 2.0;

    // Render left whiskers
    for (let i = 0; i < leftWhiskers.length; i++) {
        const w = leftWhiskers[i];
        ctx.strokeStyle = palette.primaryAlpha ? palette.primaryAlpha(whiskerAlpha) : palette.primary;
        ctx.lineWidth = 1.0 + snare * 0.6;
        ctx.beginPath();
        ctx.moveTo(w.startX, w.startY);
        ctx.quadraticCurveTo(w.cpX, w.cpY, w.endX, w.endY);
        ctx.stroke();

        // Neon tip on transients
        if (treble > 0.3 || snare > 0.4 || isDrop) {
            ctx.fillStyle = palette.core;
            ctx.beginPath();
            ctx.arc(w.endX, w.endY, tipRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Render right whiskers
    for (let i = 0; i < rightWhiskers.length; i++) {
        const w = rightWhiskers[i];
        ctx.strokeStyle = palette.primaryAlpha ? palette.primaryAlpha(whiskerAlpha) : palette.primary;
        ctx.lineWidth = 1.0 + snare * 0.6;
        ctx.beginPath();
        ctx.moveTo(w.startX, w.startY);
        ctx.quadraticCurveTo(w.cpX, w.cpY, w.endX, w.endY);
        ctx.stroke();

        // Neon tip on transients
        if (treble > 0.3 || snare > 0.4 || isDrop) {
            ctx.fillStyle = palette.core;
            ctx.beginPath();
            ctx.arc(w.endX, w.endY, tipRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}


// --- Module: models/cyber/cyberEyes.js ---
// src/models/cyber/cyberEyes.js - Animated cyber cat eyes with audio-reactive pupil dilation & drop radiance

function renderCyberEyes(ctx, isBlinking, blinkProgress, audio, palette) {
    ctx.save();
    const headY = -72;
    ctx.translate(0, headY);

    const blink = isBlinking ? Math.sin(blinkProgress) : 0;
    const eyeHeightScale = Math.max(0.08, 1.0 - blink * 0.95);

    const bass = audio.bass || 0;
    const beat = audio.beatImpulse || 0;
    const energy = audio.energy || 0.4;
    const isDrop = audio.isDrop || false;

    // Feline pupil dilation: from narrow slit on calm to large dilated aperture on bass/drops
    const pupilDilate = Math.min(1.0, bass * 0.65 + beat * 0.45 + (isDrop ? 0.35 : 0));
    const pupilWidth = 1.5 + pupilDilate * 4.2; // 1.5px (sharp feline slit) up to 5.7px (wide dilated hunt aperture)
    const pupilHeight = 4.2 + pupilDilate * 0.6;

    // Outer Ocular Halo Flare during high energy / drops
    if (isDrop || energy > 0.65) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const haloRadius = 14 + (isDrop ? 8 : 0) + beat * 4;
        const haloAlpha = isDrop ? 0.5 : 0.3;

        [-14, 14].forEach(eyeX => {
            const haloGrad = ctx.createRadialGradient(eyeX, 2, 2, eyeX, 2, haloRadius);
            haloGrad.addColorStop(0, palette.core);
            haloGrad.addColorStop(0.4, palette.accentAlpha ? palette.accentAlpha(haloAlpha) : palette.accent);
            haloGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = haloGrad;
            ctx.beginPath();
            ctx.arc(eyeX, 2, haloRadius, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }

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
    ctx.ellipse(0, 0, pupilWidth, pupilHeight, 0, 0, Math.PI * 2);
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
    ctx.ellipse(0, 0, pupilWidth, pupilHeight, 0, 0, Math.PI * 2);
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

        // Feline ear twitch reflexes on snare / claps or natural intervals
        const isPlaying = audio.isPlaying !== false;
        const energy = audio.energy || 0.35;
        const energyScale = 0.35 + energy * 0.65;

        // Snare / high transient reflex twitch (attenuated on quiet chill music)
        const snare = audio.snareImpulse || 0;
        if (snare > 0.45 && energy > 0.3) {
            this.leftEarTwitch = (Math.random() - 0.5) * 0.35 * snare * energyScale;
            this.rightEarTwitch = (Math.random() - 0.5) * 0.35 * snare * energyScale;
        } else {
            this.leftEarTwitch *= Math.pow(0.88, dt * 60);
            this.rightEarTwitch *= Math.pow(0.88, dt * 60);
        }

        const earBeatBounce = ((audio.mid || 0) * 0.04 + (audio.snareImpulse || 0) * 0.05) * energyScale;
        this.currentLeftEarAngle = this.leftEarTwitch - earBeatBounce;
        this.currentRightEarAngle = this.rightEarTwitch + earBeatBounce;
    }

    render(ctx, centerX, centerY, scale, time, audio, palette, bgMode, width, height) {
        ctx.save();
        ctx.translate(centerX, centerY);

        const energy = audio.energy || 0.35;
        const energyScale = 0.35 + energy * 0.65;
        const tempoNorm = Math.max(0.4, Math.min(2.0, (audio.bpm || 120) / 120));
        const isDrop = !!audio.isDrop;
        const dropMultiplier = isDrop ? 1.5 : 1.0;
        const beat = audio.beatImpulse || 0;
        const bass = audio.bass || 0;

        // Feline squash & stretch scaling (cushioned on chill music)
        const squashX = 1.0 + (beat * 0.06 + bass * 0.03) * dropMultiplier * energyScale;
        const squashY = 1.0 - (beat * 0.045) * dropMultiplier * energyScale;
        ctx.scale(scale * squashX, scale * squashY);

        // Natural breath & springy bass bounce (slow, deep breathing on chill music)
        const breathFreq = 0.65 + tempoNorm * 0.45 * (0.35 + energy * 0.65);
        const breath = Math.sin(time * breathFreq) * (1.6 + energy * 2.0);
        const bassBounce = (bass * 5.0 + beat * 7.5) * dropMultiplier * energyScale;
        ctx.translate(0, -bassBounce + breath);

        // Organic rhythm sway (gentle, hypnotic posture sway)
        const swayFreq = 0.35 + tempoNorm * 0.45 * (0.4 + energy * 0.6);
        const swayAngle = Math.sin(time * swayFreq) * ((0.008 + (audio.mid || 0) * 0.016) * energyScale);
        ctx.rotate(swayAngle);

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
        hint.textContent = 'Cliquez n\'importe où pour quitter le plein écran';
        document.body.appendChild(hint);
    }
    hint.classList.add('visible');
    clearTimeout(fullscreenHintTimer);
    fullscreenHintTimer = setTimeout(() => {
        hint.classList.remove('visible');
    }, 3200);
}

function setupFullscreenClickHandler(engine) {
    window.addEventListener('click', (e) => {
        if (engine && engine.isFullscreen) {
            e.preventDefault();
            e.stopPropagation();
            engine.toggleFullscreen(false);
        }
    }, true);
}

function toggleVisualizerFullscreen(engine, forceState) {
    engine.isFullscreen = typeof forceState === 'boolean' ? forceState : !engine.isFullscreen;

    if (engine.isFullscreen && !engine.isForeground) {
        engine.toggleActive(true);
    }

    document.body.classList.toggle('cyber-cat-fullscreen-active', engine.isFullscreen);

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
    constructor(canvas) {
        this.canvas = canvas;
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
        setupFullscreenClickHandler(this);

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

        <!-- Section 4: Immersion Plein Écran (Premier Plan) -->
        <div class="dropdown-section">
            <div class="section-label">Immersion Plein Écran</div>
            <button type="button" class="fullscreen-menu-btn" id="dropdown-fs-btn" title="Passer le visualiseur au premier plan plein écran">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
                <div class="fs-btn-content">
                    <span class="fs-btn-title">Plein Écran (Premier Plan)</span>
                    <span class="fs-btn-sub">Cliquez n'importe où pour quitter</span>
                </div>
            </button>
        </div>

        <div class="dropdown-footer">
            <span class="footer-hint"><kbd>A</kbd> On/Off &nbsp;|&nbsp; <kbd>C</kbd> Modèle &nbsp;|&nbsp; <kbd>T</kbd> Couleur &nbsp;|&nbsp; <kbd>F</kbd> Plein Écran</span>
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
    const fsBtn = dropdown.querySelector("#dropdown-fs-btn");
    if (fsBtn) {
        fsBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const eng = engineGetter();
            if (eng) {
                closeSettingsDropdown();
                eng.toggleFullscreen(true);
            }
        });
    }

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