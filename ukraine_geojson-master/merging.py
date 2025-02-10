import json
import glob

# Get all GeoJSON files
geojson_files = glob.glob("ukraine_geojson/*.geojson")

# Prepare a merged GeoJSON structure
merged_geojson = {
    "type": "Feature",
    "geometry": []
}

# Read each GeoJSON and merge its features
for file in geojson_files:
    with open(file, "r", encoding="utf-8") as f:
        data = json.load(f)
        merged_geojson["geometry"].extend(data["geometry"])

# Save the merged GeoJSON
with open("ukraine.geojson", "w", encoding="utf-8") as f:
    json.dump(merged_geojson, f, indent=2, ensure_ascii=False)

print("✅ Merging complete! File saved as ukraine.geojson")
