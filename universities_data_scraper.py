import requests
import json
from bs4 import BeautifulSoup
import re

def get_university_list(url):
    print(f"Fetching main page: {url}")
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    university_data = []
    
    link_count = 0
    for li in soup.select("#mw-content-text li a"):
        if li.has_attr("href") and li["href"].startswith("/wiki/"):
            link_count += 1
            uni_name = li.text.strip()
            wiki_url = f"https://en.wikipedia.org{li['href']}"
            
            print(f"\nProcessing {link_count}: {uni_name}")
            print(f"Article URL: {wiki_url}")
            
            if any(x in li['href'] for x in ["Category:", "List_of", "(disambiguation)"]):
                print(f"Skipping: appears to be a special page")
                continue
            
            try:
                uni_response = requests.get(wiki_url)
                uni_soup = BeautifulSoup(uni_response.text, 'html.parser')
                
                # Get coordinates
                coords = extract_coordinates_from_script(uni_soup)
                
                # Get student count
                students = extract_student_count(uni_soup)
                
                # Only add university if we have either coordinates or student count
                if coords or students:
                    uni_data = {
                        "name": uni_name
                    }
                    
                    if coords:
                        uni_data["latitude"] = coords[0]
                        uni_data["longitude"] = coords[1]
                        print(f"Found coordinates: {coords}")
                    
                    if students:
                        uni_data["students"] = students
                        print(f"Found student count: {students}")
                    
                    university_data.append(uni_data)
                else:
                    print(f"No coordinates or student count found for {uni_name}")
                    
            except Exception as e:
                print(f"Error processing {uni_name}: {str(e)}")
    
    return university_data

def extract_coordinates_from_script(soup):
    scripts = soup.find_all('script')
    
    for script in scripts:
        if script.string and '"wgCoordinates"' in script.string:
            match = re.search(r'"wgCoordinates":\{"lat":(-?\d+\.\d+),"lon":(-?\d+\.\d+)\}', script.string)
            if match:
                lat = float(match.group(1))
                lon = float(match.group(2))
                return lat, lon
    return None

def extract_student_count(soup):
    # Find the Students row in the infobox
    students_row = soup.find('th', string='Students')
    if students_row:
        # Get the corresponding data cell
        data_cell = students_row.find_next_sibling('td')
        if data_cell:
            # Extract the number and remove any non-digit characters except comma
            number_text = re.sub(r'[^\d,]', '', data_cell.text.strip())
            if number_text:
                # Remove commas and convert to integer
                try:
                    return int(number_text.replace(',', ''))
                except ValueError:
                    return None
    return None

if __name__ == "__main__":
    url = "https://en.wikipedia.org/wiki/List_of_universities_in_Ukraine"
    universities = get_university_list(url)
    
    print(f"\nSummary:")
    print(f"Found data for {len(universities)} universities")
    
    # Count universities with each type of data
    with_coords = sum(1 for uni in universities if "latitude" in uni)
    with_students = sum(1 for uni in universities if "students" in uni)
    print(f"Universities with coordinates: {with_coords}")
    print(f"Universities with student count: {with_students}")
    
    with open("ukrainian_universities.json", "w", encoding="utf-8") as f:
        json.dump(universities, f, ensure_ascii=False, indent=4)
    
    print(f"Data saved to ukrainian_universities.json")