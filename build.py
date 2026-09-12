import os
import shutil
import json

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
HOME = os.path.expanduser("~")
CONFIG_EXT_DEST = os.path.join(HOME, ".config/spicetify/Extensions")
SPICE_EXT_DEST = os.path.join(HOME, ".spicetify/Extensions")

for d in [CONFIG_EXT_DEST, SPICE_EXT_DEST]:
    os.makedirs(d, exist_ok=True)

SRC_DIR = os.path.join(PROJECT_DIR, "src")

def read_src(subpath):
    filepath = os.path.join(SRC_DIR, subpath)
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Source file not found: {filepath}")
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()

CSS_MODULES = [
    "styles/root.css",
    "styles/canvas.css",
    "styles/transparency.css",
    "styles/mainView.css",
    "styles/dropdown.css",
    "styles/fullscreen.css",
    "styles/playbar.css",
]

JS_MODULES = [
    # 1. Themes & Color Palettes
    "theme/palettesData.js",
    "theme/paletteHelpers.js",
    "theme/PaletteManager.js",

    # 2. Audio Pulse & Envelope Engine (Spotify + Web Audio API)
    "audio/spotifyHooks.js",
    "audio/tempoEstimator.js",
    "audio/envelopeFollower.js",
    "audio/WebAudioBridge.js",
    "audio/AudioEngine.js",

    # 3. Composable Backgrounds & Effects
    "backgrounds/CosmicStar.js",
    "backgrounds/CosmicNebula.js",
    "backgrounds/Shockwave.js",
    "backgrounds/CyberGrid.js",
    "backgrounds/SacredFractals.js",
    "backgrounds/deckPlanks.js",
    "backgrounds/deckLighting.js",
    "backgrounds/WoodenDeck.js",
    "backgrounds/BackgroundManager.js",

    # 4. Cosmic Cat Model, Geometry & Physics (Unified Facade)
    "models/cosmic/tailPathBuilder.js",
    "models/cosmic/tailSparks.js",
    "models/cosmic/tailKinematics.js",
    "models/cosmic/tailRenderer.js",
    "models/cosmic/TailPhysics.js",
    "models/cosmic/catDeformation.js",
    "models/cosmic/catBodyPath.js",
    "models/cosmic/catEarRenderer.js",
    "models/cosmic/catInteriorRenderer.js",
    "models/cosmic/catContourRenderer.js",
    "models/cosmic/CatGeometry.js",
    "models/cosmic/CosmicCat.js",

    # 5. Cyber Cat Model & Topology
    "models/cyber/constellationData.js",
    "models/cyber/cyberTail.js",
    "models/cyber/cyberAura.js",
    "models/cyber/cyberConstellation.js",
    "models/cyber/cyberContours.js",
    "models/cyber/cyberWhiskers.js",
    "models/cyber/cyberEyes.js",
    "models/cyber/cyberHead.js",
    "models/cyber/CyberCat.js",

    # 6. Core Orchestrator & Loop (SOLID Architecture)
    "core/panelBounds.js",
    "core/keybindings.js",
    "core/fullscreenManager.js",
    "core/uiSync.js",
    "core/renderPipeline.js",
    "core/VisualizerEngine.js",

    # 7. UI Components: The 2 Buttons & Settings Dropdown
    "ui/canvasMount.js",
    "ui/settingsDropdown.js",
    "ui/playbarButtons.js",
    "ui/extension.js",
]

css_content = "\n\n".join(read_src(css_mod) for css_mod in CSS_MODULES)

inline_style = (
    "if (!document.getElementById('cyber-cat-styles')) {\n"
    "    const style = document.createElement('style');\n"
    "    style.id = 'cyber-cat-styles';\n"
    f"    style.textContent = {json.dumps(css_content)};\n"
    "    document.head.appendChild(style);\n"
    "} else {\n"
    f"    document.getElementById('cyber-cat-styles').textContent = {json.dumps(css_content)};\n"
    "}\n"
)

js_contents = [read_src(js_mod) for js_mod in JS_MODULES]

bundle_parts = [
    "// NAME: Cyber & Cosmic Cat Visualizer",
    "// AUTHOR: Erozah",
    "// DESCRIPTION: Modular visualizer with 2 discrete buttons (On/Off & Settings Dropdown), exclusive models/palettes, and composable independent background effects.",
    "",
    "(function() {",
    inline_style,
    "",
]

# Add all JS modules except ui/extension.js first
for mod_path, code in zip(JS_MODULES, js_contents):
    if mod_path == "ui/extension.js":
        continue
    bundle_parts.append(f"// --- Module: {mod_path} ---")
    bundle_parts.append(code)
    bundle_parts.append("")

bundle_parts.extend([
    "if (typeof window !== 'undefined') {",
    "    window.VisualizerEngine = VisualizerEngine;",
    "    window.toggleSettingsDropdown = toggleSettingsDropdown;",
    "}",
    "",
    "// --- Module: ui/extension.js ---",
    read_src("ui/extension.js"),
    "",
    "})();"
])

bundle_content = "\n".join(bundle_parts)

dist_dir = os.path.join(PROJECT_DIR, "dist")
os.makedirs(dist_dir, exist_ok=True)
ext_file = os.path.join(dist_dir, "cat-visualizer.js")

with open(ext_file, "w", encoding="utf-8") as f:
    f.write(bundle_content)

shutil.copy2(ext_file, os.path.join(CONFIG_EXT_DEST, "cat-visualizer.js"))
shutil.copy2(ext_file, os.path.join(SPICE_EXT_DEST, "cat-visualizer.js"))

print(f"Successfully built and deployed cat-visualizer.js ({len(JS_MODULES)} JS modules, {len(CSS_MODULES)} CSS modules).")
