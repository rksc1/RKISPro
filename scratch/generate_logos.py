import os

def create_svg_mark(fill_navy="#0B1D2F", fill_teal="#00A8AF", fill_teal_light="#00C4CC", fill_navy_light="#1A344D"):
    """
    Creates the standalone interlocking ribbon emblem (Option 2).
    ViewBox: 0 0 100 100.
    """
    # Mathematical polygon vertices for the interlocking ribbon:
    # Outer bounds: 10 to 90
    # Two interlinked chamfered rectangular rings rotated at 45 degrees
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none">
  <defs>
    <linearGradient id="tealMain" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{fill_teal_light}" />
      <stop offset="100%" stop-color="{fill_teal}" />
    </linearGradient>
    <linearGradient id="navyMain" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{fill_navy_light}" />
      <stop offset="100%" stop-color="{fill_navy}" />
    </linearGradient>
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.15" />
    </filter>
  </defs>

  <g filter="url(#subtleShadow)">
    <!-- BACK LAYER: Navy Loop Bottom & Left sections -->
    <!-- Navy bottom outer corner & left leg -->
    <path d="M 28 42 L 50 64 L 42 72 L 20 50 L 20 42 Z" fill="{fill_navy}" />
    <path d="M 50 64 L 64 78 L 56 86 L 36 66 L 42 72 Z" fill="{fill_navy}" />
    <!-- Navy top left corner -->
    <path d="M 36 14 L 56 34 L 50 40 L 28 18 L 36 14 Z" fill="{fill_navy_light}" />
    <path d="M 28 18 L 20 26 L 14 36 L 14 28 L 22 18 Z" fill="{fill_navy}" />
    <path d="M 14 28 L 14 42 L 20 42 L 20 34 L 28 42 Z" fill="{fill_navy}" />

    <!-- INTERTWINED TEAL LOOP: Complete Front & Mid Ribbons -->
    <!-- Teal Top-Right Loop Segment -->
    <path d="M 50 14 L 72 36 L 86 36 L 64 14 L 56 14 Z" fill="url(#tealMain)" />
    <path d="M 72 36 L 86 36 L 86 50 L 78 58 L 64 44 L 72 36 Z" fill="{fill_teal}" />
    <path d="M 78 58 L 58 78 L 50 70 L 64 56 L 64 44 Z" fill="{fill_teal}" />
    <!-- Teal Inner Cross & Bridge -->
    <path d="M 50 34 L 64 48 L 56 56 L 42 42 L 50 34 Z" fill="url(#tealMain)" />
    <path d="M 42 42 L 34 50 L 26 42 L 34 34 L 42 42 Z" fill="{fill_teal_light}" />

    <!-- FOREGROUND NAVY OVERLAP: The knot lock -->
    <path d="M 34 50 L 50 66 L 42 74 L 26 58 L 34 50 Z" fill="url(#navyMain)" />
    <path d="M 56 34 L 64 26 L 78 40 L 70 48 L 56 34 Z" fill="url(#navyMain)" />
    <!-- Center Bevel Core -->
    <path d="M 46 46 L 54 46 L 54 54 L 46 54 Z" fill="{fill_teal_light}" opacity="0.9" />
  </g>
</svg>'''
    return svg

print("Script template ready")
