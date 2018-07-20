import axios from 'axios';
import { fromJS } from 'immutable';

class ProductsWeight {
    constructor() {
        this.axiosInstance = axios.create({baseURL: 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com'});
    }

    getProductsInCategory(product_list) {
        let objects = fromJS(product_list);
        let products = objects.filter(p => p.get('category') === 'Air Conditioners');
        return products;
    }

    getWeightByPage(product_list) {
        let products = this.getProductsInCategory(product_list);
        let weight = 0;
        let counts = 0;
        products.forEach((item, key) => {
            let size = item.get('size');
            let volumn = size.get('width', 0) * size.get('length', 0) * size.get('height', 0) / 1000000;
            let itemWeight = item.get('weight', 0)/1000 + volumn * 250
            weight = weight + itemWeight;
            counts = counts + 1;
        });
        let pageWeight = {
            'counts': counts,
            'weight': weight
        };
        return pageWeight;
    }

    async weightCalculate() {
        let page = '/api/products/1';
        let parcle = {
            'counts': 0,
            'weight': 0
        };
        let averageWeight = 0;
        while (page && page !== 'none') {
            let response = await this.axiosInstance.get(page);
            page = response.data['next'];
            let pageWeight = this.getWeightByPage(response.data['objects']);
            parcle['counts'] = parcle['counts'] + pageWeight['counts'];
            parcle['weight'] = parcle['weight'] + pageWeight['weight'];
        }

        if (parcle['counts'] > 0) {
            averageWeight = Math.round(parcle['weight'] / parcle['counts'] * 100) / 100;
        }
        return averageWeight;
    }

    getAvgWeight()  {
        let avgWeight = this.weightCalculate();
        return avgWeight;
    }
}

const calculations = new ProductsWeight();
export default calculations;