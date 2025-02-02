import iris 
import os
from sentence_transformers import SentenceTransformer

def VectorSearch(query):
    #Connect to intersystems IRIS
    username = 'demo'
    password = 'demo'
    hostname = os.getenv('IRIS_HOSTNAME', 'localhost')
    port = '1972' 
    namespace = 'USER'
    CONNECTION_STRING = f"{hostname}:{port}/{namespace}"

    #Table and model
    tableName = "NewDataSet.TableName"
    model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

    #User query and vector search
    searchPhrase = query  #This can be changed to the input object prompt attirbute since it will already be a string 
    searchVector = model.encode(searchPhrase, normalize_embeddings=True).tolist() 

    #Pull response
    with iris.connect(CONNECTION_STRING, username, password) as conn:
        with conn.cursor() as cursor:
            cursor.execute(f""" SELECT TOP ? title, context, description_vector FROM {tableName} ORDER BY VECTOR_DOT_PRODUCT(description_vector, TO_VECTOR(?)) DESC""", [3, str(searchVector)])
            results = cursor.fetchall()
            columns = [column[0] for column in cursor.description]
            results_dicts = [{"title": row[columns.index('title')], "context": row[columns.index('context')]} for row in results]

            
    return results_dicts
    