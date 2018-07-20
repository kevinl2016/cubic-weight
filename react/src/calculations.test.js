import calculations from './calculations';

test('has 1 product', () => {
    let product = [
        {'name': 'p1', 'category':'Cellphone'},
        {'name': 'p2', 'category':'Air Conditioners'},
    ];
    expect(calculations.getProductsInCategory(product).size).toBe(1);
});

test('weight of 1 product', () => {
    let product = [
        {'name': 'p1', 'category':'Cellphone'},
        {'name': 'p2', 'category':'Air Conditioners', "size": {
                "width": 100.0, 
                "length": 50.0, 
                "height": 40.0
            },
            'weight': 1000
        },
    ];
    expect(calculations.getWeightByPage(product)).toEqual({
        'counts': 1,
        'weight': 51
    });
});