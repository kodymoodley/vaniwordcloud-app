import pandas as pd
import requests
import nltk
from nltk import word_tokenize

english_sw = {'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"} | {"thus", "krsna", "lord", "godhead", "supreme", "personality", "one", "kṛṣṇa", "said", "arjuna", 
                                                "suta", "suka", "sri", "mahārāja", "parīkṣit", "yudhiṣṭhira", "sūta", "śrī", "gosvami",
                                                "king", "said", "indeed", "supreme", "although", "like", "become", "because", "kunti", "may",
                                                "sukadeva", "śukadeva", "gosvāmī", "unto", "son", "kuntī", "vyāsadeva", "caitanya", "mahāprabhu",
                                                "gītā", "bhagavad"}
sans_sw = {"na","ca","eva", "kim", "te", "tvam", "tvaṁ", "tat", "mam", "aham", "ahaṁ", "tv", "hi", "tad", "ity", "ye", "yasya", "hy", "tan","iha", "api","apy",
           "sa", "yad", "etad", "etat", "atha", "tha", "ya", "mat","mama","ha","tu", "iti", "pi", "me", "ucyate", "idam", "smi", "yo", "yat", "imam",
           "asti", "asmi", "asau", "mam", "māṁ", "ma", "sad", "mad", "su", "tatha", "ham", "sva", "tato", "yadi", "sti", "asya", "tasmad", "tasmat",
           "tasya", "iva", "capy", "casmi", "tam", "taṁ", "tām", "tāṁ", "si", "yac", "tava", "stho", "smin", "yata", "caiva", "va", "yatha", "saha", "uvāca", "uvaca",
           "tvāṁ", "tvām", "mām", "yayā","cāsmi", "vā", "cāpy", "tataḥ", "tata", "tadā", "tatah","tasmād", "mā", "tathā", "vad", "tac", "yah", "yaḥ", "saḥ",
            "sah", "py", "tān", "evam", "evaṁ", "yadā", "yathā", "sarva", "śrī", "mahārāja", "yam", "mām", "kiṁ", "idaṁ", "ham", "naḥ", "tatra",
            "vayaṁ", "yaṁ", "haṁ", "pārtha", "arjuna", "bhārata", "uvācaevam", "ete"}
bengali_sw = {"kare", "haya", "sei", "tāṅra", "kari", "ei", "nāhi", "kṛṣṇa", "krsna", "āra", "nā", "saba", "caitanya", "nityānanda", "kaila",
            "kṛṣṇera", "taṅre", "saṅge", "yaṅra", "kṛṣṇaṁ", "kṛṣṇaḥ", "haila", "hailā", "ta", "tāra", "kṛṣṇe", "kahe", "tabe", "haite", "kahi", "karena",
            "nahe", "se", "kichu", "mora", "teṅho", "tenho", "ami", "āmi", "yei", "āmara", "dekhi", "tomāra", "tāre", "āmāra", "yāṅra", "ki",
            "yaiche", "tānre", "kṛṣṇadāsa", "tāṅre", "kailā", "kaila", "yena", "lañā", "hañā", "asi", "āsi", "aila", "āilā", "āila", "ailā", "mahāprabhu",
            "yāya", "gelā", "tāhāṅ", "tāhān", "āge", "tāhā", "tumi", "kaha", "prabhura", "mahāprabhura", "prabhure", "aiche", "vai"}

def isNaN(string):
    return string != string

def getcsv(url):
    urlparts = url.split(".csv")
    booktype = urlparts[0][-2:]
    outputfilename = 'tmp-'+booktype+'.csv' 
    req = requests.get(url)
    url_content = req.content
    csv_file = open(outputfilename, 'wb')
    csv_file.write(url_content)
    csv_file.close()
    df = pd.read_csv(outputfilename)
    return df

def gather_text_from_selected_sources(sources, passage):
    result = ""
    for item in sources:
        if 'bg' in item:
            section_num = item.replace('bg','')
            for row in bgDf.itertuples(index=False):
                tmp = row.id.split('/')
                if (tmp[0] == section_num):
                    if (not isNaN(row.__getattribute__(passage))):
                        result += row.__getattribute__(passage) + " "
        if 'sb' in item:
            section_num = item.replace('sb','')
            for row in sbDf.itertuples(index=False):
                tmp = row.id.split('/')
                if (tmp[0] == section_num):
                    if (not isNaN(row.__getattribute__(passage))):
                        result += row.__getattribute__(passage) + " "
        if item in ['adi', 'madhya', 'antya']:
            for row in ccDf.itertuples(index=False):
                tmp = row.id.split('/')
                if (tmp[0] == item):
                    if (not isNaN(row.__getattribute__(passage))):
                        result += row.__getattribute__(passage) + " "

    tokenized_results = word_tokenize(result.lower())

    for w in tokenized_results:
        if ("-" in w):
            tokenized_results.extend(w.split("-"))
    
    sw = {}
    if passage == "english":
        sw = english_sw
    elif passage == "sanskrit":
        sw = sans_sw | bengali_sw
    else:
         sw = english_sw | sans_sw | bengali_sw

    final_result = [token.strip() for token in tokenized_results if token.strip() not in sw]
    
    joined = " ".join(final_result)
    joined = joined.replace("ṅ","n")
    joined = joined.replace("karila", "karilā")
    joined = joined.replace("ṁ","m")

    if ("bhagavad" in joined):
        joined = joined.replace("bhagavad", "")
    if ("gītā" in joined):
        joined = joined.replace("gītā", "")
    if ("śrīmad" in joined):
        joined = joined.replace("śrīmad", "")
    if ("bhāgavatam" in joined):
        joined = joined.replace("bhāgavatam", "")
    
    return joined

BG_URL = "https://raw.githubusercontent.com/kodymoodley/vedabase-scraper/main/output/output-bg.csv"
SB_URL = "https://raw.githubusercontent.com/kodymoodley/vedabase-scraper/main/output/output-sb.csv"
CC_URL = "https://raw.githubusercontent.com/kodymoodley/vedabase-scraper/main/output/output-cc.csv"

bgDf = getcsv(BG_URL)
sbDf = getcsv(SB_URL)
ccDf = getcsv(CC_URL)


