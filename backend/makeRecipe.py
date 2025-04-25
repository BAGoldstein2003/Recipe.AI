import openai
import os
import json

api_key=os.environ.get("OPENAI_API_KEY")

client = openai.OpenAI(api_key=api_key)

def makeRecipe(data):
     message= f"Find/create a {data['adjective']} {data['mealType']} recipe without {', '.join(data['allergies'])}. the user's special request for the recipe is {data['specialRequest']}. If the special request does not pertain to the recipe, do not include it in the parameters. DO NOT CHANGE THE OBJECT REQUEST IN ANY FORM: return an EXACT copy of a json object with 'title': 'string', 'ingredients': 'array', and instructions: 'array'. *START WITH THE OPENING BRACKET OF THE OBJECT*.'"
     response = client.chat.completions.create(
          model="gpt-4o-mini",
          messages=[
               {"role": "user", "content": message}
          ]
    )
     recipe = response.choices[0].message.content

     print(recipe)
   #convert response to JSON format
     try:
          recipe_json = json.loads(recipe)
          return recipe_json
     except json.JSONDecodeError as e:
          print(f"Error decoding JSON: {str(e)}")
          return