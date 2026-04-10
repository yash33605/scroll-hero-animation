from PIL import Image

img = Image.open(r"C:\Users\Yash\.gemini\antigravity\brain\3070bc31-4ab1-42e1-8a5d-22f965c69593\porsche_top_down_1775825029242.png")
img = img.convert("RGBA")
datas = img.getdata()
newData = []

for item in datas:
    r, g, b, a = item
    avg = (r + g + b) / 3.0
    
    if avg > 240:
        newData.append((255, 255, 255, 0))
    elif avg > 100:  # Much more aggressive edge detection threshold
        new_alpha = int(255 * (240 - avg) / (240 - 100))
        # Force the halo color to be dark grey so it acts like a shadow/edge instead of a bright halo
        newData.append((50, 50, 50, new_alpha))
    else:
        newData.append(item)

img.putdata(newData)
img.save('public/car.png', "PNG")
print("Processed image with aggressive anti-halo matting!")
