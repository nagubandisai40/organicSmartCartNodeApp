# import sys
# import pandas as pd
# import numpy as np
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.utils import shuffle
print(sys.argv)
print("hello")
# class UserRecommender():
# 	def _init_(self):
# 		pass

		

# 	def  getSimilarProducts(self,allProducts,arr):
    
# 		df = []
# 		features = ['categoryId','seller','tags']
# 		def combine_features(row):
# 			return row['categoryId'] +" "+row['seller']+" "+row['tags']
# 		for feature in features:
# 			df[feature] = df[feature].fillna('')
# 		df["combined_features"] = df.apply(combine_features,axis=1)
# 		cv = CountVectorizer()
# 		count_matrix = cv.fit_transform(df["combined_features"])
# 		cosine_sim = cosine_similarity(count_matrix)
# 		def get_product_name_from_index(index):
# 			return df[df.index == index]["product_name"].values[0]
# 		def get_index_from_product_name(product_name):
# 			return df[df.product_name == product_name]["index"].values[0]

# 		new_df=pd.DataFrame(columns=df.columns)
# 		for x in arr:
# 			product_name=x["product_name"]
# 			product_index=get_index_from_product_name(product_name)
# 			similar_products=list(enumerate(cosine_sim[product_index]))
# 			sorted_similar_products=sorted(similar_products,key=lambda x:x[1],reverse=True)[1:]
# 			# print(sorted_similar_movies)
# 			i=0
# 			# print("The similar movies to ",movie_user_likes)
# 			for element in sorted_similar_products:
# 				# print(element)
# 				tt=get_product_name_from_index(element[0])
# 				# print(df[df["title"]==tt])
# 				new_df=new_df.append(df[df["product_name"]==tt],ignore_index=True)
# 				i=i+1
# 				if(i>=5):
# 					break
# 		new_df=new_df.sample(frac=1)
# 		return new_df.to_json(orient='records')

# print(sys.argv)
# print("hello")