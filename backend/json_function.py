from input import Data, Component
import json #Not sure if this is needed

def json_to_class(json_data):
    
    components_list = [] 

    for component in json_data['components']:
        components_list.append(Component(**component))

    input_data = Data(json_data.get('prompt'), json_data.get('screenshot'), components_list)

    return input_data
