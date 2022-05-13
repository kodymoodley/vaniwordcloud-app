from flask import Flask, request
from utils import gather_text_from_selected_sources
import wordcloud
from wordcloud import WordCloud
import json
import numpy as np
from PIL import Image
from collections import Counter
import base64
from io import BytesIO

app = Flask(__name__, static_folder='../build', static_url_path='/')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/getwordcloud', methods=['POST'])
def get_word_cloud(): 
    wordcloud_text = gather_text_from_selected_sources(request.get_json()['text-selected'], request.get_json()['passage-type'])
    words = wordcloud_text.split()
    cleaned_words = []
    for word in words:
        cleaned_words.append(word.strip())
    term_frequencies = Counter(cleaned_words)
    term_freq_dict = dict(term_frequencies)
    
    w = []
    for key in term_freq_dict:
        tmp = {}
        tmp["text"] = key
        tmp["value"] = term_freq_dict[key]
        w.append(tmp)

    circle_mask = np.array(Image.open(app.static_folder + "/circle_frame.png")) # production
    # circle_mask = np.array(Image.open("../public/circle_frame.png")) # development
    wordcloud = WordCloud(width = 1000, height = 1000,
                background_color ='white',
                mask=circle_mask,
                min_font_size = 10).generate(wordcloud_text)

    wcimage = wordcloud.to_image()
    buffered = BytesIO()
    wcimage.save(buffered, format="PNG")
    img_byte = buffered.getvalue() # bytes
    img_base64 = base64.b64encode(img_byte) #Base64-encoded bytes * not str
    img_str = img_base64.decode('utf-8') # str
    
    jsonString = json.dumps(img_str)
    jsonString = "data:image/png;base64," + jsonString
    jsonString = jsonString.replace('"', '')
    return {"wordlist" : w, "jsonrep": jsonString}