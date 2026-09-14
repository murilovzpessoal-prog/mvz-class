from PIL import Image
for img in ["public/missao-iniciante.png", "public/missao-intermediaria.png", "public/missao-elite.png"]:
    i = Image.open(img)
    print(img, i.size)
