import iris 
import os 
import pandas as pd 
from sentence_transformers import SentenceTransformer
import fastparquet

df1 = pd.read_parquet('train-00000-of-00001.parquet', engine='fastparquet')
df2 = pd.read_parquet('validation-00000-of-00001.parquet', engine='fastparquet')

df = pd.concat([df1, df2], ignore_index=True)
df.drop(columns=['id', 'question', 'answers.text', 'answers.answer_start'], inplace=True)

df.fillna('', inplace=True)
df = df[~df['context'].duplicated()]

username = 'demo'
password = 'demo'
hostname = os.getenv('IRIS_HOSTNAME', 'localhost')
port = '1972' 
namespace = 'USER'
CONNECTION_STRING = f"{hostname}:{port}/{namespace}"

conn = iris.connect(CONNECTION_STRING, username, password)
cursor = conn.cursor()

tableName = "NewDataSet.TableName"
tableDefinition = "(title VARCHAR(69), context VARCHAR(4063))"

try:
    cursor.execute(f"DROP TABLE {tableName}")  
except:
    pass
cursor.execute(f"CREATE TABLE {tableName} {tableDefinition}")

sql = f"Insert into {tableName} (title, context) values (?,?)"
data = [(row['title'], row['context'])
    for index, row in df.iterrows()]
cursor.executemany(sql, data)

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
embeddings = model.encode(df['context'].tolist(), normalize_embeddings=True)

df['description_vector'] = embeddings.tolist()

try:
    cursor.execute(f"DROP TABLE {tableName}")  
except:
    pass

tableDefinition2 = "(title VARCHAR(59), context VARCHAR(4063), description_vector VECTOR(DOUBLE, 384))"
cursor.execute(f"CREATE TABLE {tableName} {tableDefinition2}")

sql = f"Insert into {tableName} (title, context, description_vector) values (?,?,TO_VECTOR (?))"

data = [(row['title'], row['context'], str(row['description_vector']))
    for index, row in df.iterrows()]

cursor.executemany(sql, data)