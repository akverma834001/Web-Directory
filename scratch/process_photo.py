from PIL import Image, ImageEnhance, ImageFilter
import os

source_path = r"C:\Users\abhis\.gemini\antigravity-ide\brain\a15b538a-126f-40b6-99e4-7cc3e6fe4a8f\.user_uploaded\media_1789684120181.jpg"
target_dir = r"c:\Users\abhis\Desktop\Projects\Portfolio Site\AG\public\assets"
os.makedirs(target_dir, exist_ok=True)

img = Image.open(source_path)
width, height = img.size

# 1. Moderated & Cleaned Headshot (focusing on Abhishek, removing bottom star watermark)
# Abhishek's face and upper suit look stunning when cropped from top: 20 to 920, left: 60 to 960
# Box: (left, upper, right, lower)
crop_box = (40, 20, 984, 964)
cropped = img.crop(crop_box)

# High-resolution output: 800x800 square
cropped_square = cropped.resize((800, 800), Image.Resampling.LANCZOS)
cropped_square.save(os.path.join(target_dir, "abhishek-verma.jpg"), "JPEG", quality=95)

# Also create an executive portrait (4:5 aspect ratio, e.g. 800x1000)
# from left: 80, top: 30, right: 944, bottom: 950
portrait_box = (60, 20, 964, 940)
portrait = img.crop(portrait_box).resize((720, 770), Image.Resampling.LANCZOS)
portrait.save(os.path.join(target_dir, "abhishek-portrait.jpg"), "JPEG", quality=95)

# Also create a circular/square avatar optimized for navbar/badge
avatar = img.crop((180, 40, 840, 700)).resize((256, 256), Image.Resampling.LANCZOS)
avatar.save(os.path.join(target_dir, "abhishek-avatar.jpg"), "JPEG", quality=95)

print("Photos generated successfully in", target_dir)
