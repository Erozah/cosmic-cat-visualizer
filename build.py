import os
import shutil

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
HOME = os.path.expanduser("~")
CONFIG_APP_DEST = os.path.join(HOME, ".config/spicetify/CustomApps/cat-visualizer")
SPICE_APP_DEST = os.path.join(HOME, ".spicetify/CustomApps/cat-visualizer")
CONFIG_EXT_DEST = os.path.join(HOME, ".config/spicetify/Extensions")
SPICE_EXT_DEST = os.path.join(HOME, ".spicetify/Extensions")

for d in [CONFIG_APP_DEST, SPICE_APP_DEST, CONFIG_EXT_DEST, SPICE_EXT_DEST]:
    os.makedirs(d, exist_ok=True)

files_to_copy = [
    "manifest.json",
    "index.js",
    "style.css",
    "extension.js",
    "WoodenDeck.js",
    "CosmicFractals.js",
    "CatGeometry.js",
    "TailPhysics.js",
    "ColorPalettes.js",
    "CosmicEnvironment.js",
    "AudioAnalysisEngine.js",
    "VisualizerEngine.js"
]

for f in files_to_copy:
    src = os.path.join(PROJECT_DIR, f)
    shutil.copy2(src, os.path.join(CONFIG_APP_DEST, f))
    shutil.copy2(src, os.path.join(SPICE_APP_DEST, f))
    print(f"Copied {f}")

# Build standalone extension bundle
css_content = open(os.path.join(PROJECT_DIR, "style.css"), "r").read()
deck_js = open(os.path.join(PROJECT_DIR, "WoodenDeck.js"), "r").read()
fractals_js = open(os.path.join(PROJECT_DIR, "CosmicFractals.js"), "r").read()
cat_geo = open(os.path.join(PROJECT_DIR, "CatGeometry.js"), "r").read()
tail_phys = open(os.path.join(PROJECT_DIR, "TailPhysics.js"), "r").read()
color_pal = open(os.path.join(PROJECT_DIR, "ColorPalettes.js"), "r").read()
cosmic_env = open(os.path.join(PROJECT_DIR, "CosmicEnvironment.js"), "r").read()
audio_eng = open(os.path.join(PROJECT_DIR, "AudioAnalysisEngine.js"), "r").read()
vis_eng = open(os.path.join(PROJECT_DIR, "VisualizerEngine.js"), "r").read()
index_js = open(os.path.join(PROJECT_DIR, "index.js"), "r").read()
ext_code = open(os.path.join(PROJECT_DIR, "extension.js"), "r").read()

import json

inline_style_inject = f"""
    if (!document.getElementById("cosmic-cat-styles")) {{
        const style = document.createElement("style");
        style.id = "cosmic-cat-styles";
        style.textContent = {json.dumps(css_content)};
        document.head.appendChild(style);
    }}
"""

bundle_content = f"""// NAME: Cosmic Cat Visualizer
// AUTHOR: Erozah
// DESCRIPTION: Immersive cosmic music visualizer with sitting cat, compact deck, sacred geometry fractals, and energy shockwaves.

(function() {{
{deck_js}
{fractals_js}
{cat_geo}
{tail_phys}
{color_pal}
{cosmic_env}
{audio_eng}
{vis_eng}

{inline_style_inject}

{ext_code}
}})();
"""

dist_dir = os.path.join(PROJECT_DIR, "dist")
os.makedirs(dist_dir, exist_ok=True)
ext_file = os.path.join(dist_dir, "cat-visualizer.js")
with open(ext_file, "w") as f:
    f.write(bundle_content)

shutil.copy2(ext_file, os.path.join(CONFIG_EXT_DEST, "cat-visualizer.js"))
shutil.copy2(ext_file, os.path.join(SPICE_EXT_DEST, "cat-visualizer.js"))

# Build self-contained Custom App bundle for Spicetify CustomApps
custom_app_bundle = f"""// NAME: Cosmic Cat Custom App
// AUTHOR: Erozah
// DESCRIPTION: Immersive cosmic music visualizer custom app with HUD and settings.

(function() {{
{deck_js}
{fractals_js}
{cat_geo}
{tail_phys}
{color_pal}
{cosmic_env}
{audio_eng}
{vis_eng}

{inline_style_inject}

{index_js}
}})();
"""

with open(os.path.join(CONFIG_APP_DEST, "index.js"), "w") as f:
    f.write(custom_app_bundle)
with open(os.path.join(SPICE_APP_DEST, "index.js"), "w") as f:
    f.write(custom_app_bundle)

print("Successfully built and deployed standalone extension and custom app bundles to all Spicetify directories.")
