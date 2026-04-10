from PIL import Image

img = Image.open('public/car.png')
img = img.convert("RGBA")

datas = img.getdata()
newData = []

for item in datas:
    # Identify white pixels and make them transparent
    if item[0] > 230 and item[1] > 230 and item[2] > 230:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)

img.putdata(newData)
img.save('public/car.png', "PNG")
print("Successfully removed white background!")
