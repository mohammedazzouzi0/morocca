// functions/products.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Resolve the data path relative to this function file
    const filePath = path.join(__dirname, '..', 'data', 'products.json');

    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    // Your data file is an array at the top level. Fallback to .products if needed.
    const products = Array.isArray(json) ? json : json.products;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(products ?? []),
    };
  } catch (error) {
    console.error('Failed to read products:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to read products' }),
    };
  }
};
