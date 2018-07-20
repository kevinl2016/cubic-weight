import json
import requests

base_url = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com'

#get products of Air conditioner categore
def get_air_conditioners(products):
    air_conditioners = [ product for product in products if product.get('category', None) =='Air Conditioners']
    return air_conditioners

#get weight of each parcel
def get_product_weight(product):
    size = product.get('size', None)
    weight = product.get('weight', 0)/1000
    volumn = 0
    if size:
        volumn = size.get('width', 0) * size.get('length', 0) * size.get('height', 0) /1000000

    weight = weight + volumn * 250
    return weight

#calculate product counts and weight of each page
def get_weight_by_page(page):
    url = '{}{}'.format(base_url, page)
    req = requests.get(url)
    products = req.json().get('objects', None)
    next_page = req.json().get('next', None)
    counts = 0
    weight_page = 0
    if products:
        product_list = get_air_conditioners(products)
        if len(product_list) > 0:
            for product in product_list:
                counts = counts + 1
                weight_page = weight_page + get_product_weight(product)
    
    return {
        'next': next_page,
        'counts': counts,
        'weight': weight_page
    }


#start calculation
next_page = '/api/products/1'
parcle = {
    'counts': 0,
    'weight': 0
}
while next_page:
    parcle_page = get_weight_by_page(next_page)
    parcle['counts'] = parcle['counts'] + parcle_page['counts']
    parcle['weight'] = parcle['weight'] + parcle_page['weight']
    next_page = parcle_page['next']

average_weight = 0
if parcle['counts'] > 0:
    average_weight = parcle['weight']/parcle['counts']

print ('Parcel average weight is {} kg'.format(round(average_weight, 2)))

