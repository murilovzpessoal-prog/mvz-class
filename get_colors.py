from PIL import Image
import sys

def get_dominant_color(image_path):
    img = Image.open(image_path)
    img = img.resize((50, 50))
    colors = img.getcolors(2500)
    # Sort by count
    colors.sort(key=lambda x: x[0], reverse=True)
    # Find the most vibrant color (not black/white/grey)
    for count, color in colors:
        if len(color) >= 3:
            r, g, b = color[:3]
            # Simple vibrancy check (max - min)
            if max(r, g, b) - min(r, g, b) > 50 and sum([r,g,b]) > 100:
                return '#%02x%02x%02x' % (r, g, b)
    return '#ffffff'

print("Iniciante:", get_dominant_color("public/missao-iniciante.png"))
print("Intermediaria:", get_dominant_color("public/missao-intermediaria.png"))
print("Elite:", get_dominant_color("public/missao-elite.png"))
