const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

// The directory where the webpack.config.js file is located:
const CONFIG_DIR = __dirname;
const SOURCE_JS_DIR = path.join(CONFIG_DIR, 'wwwroot', 'js'); 
const OUTPUT_DIR = path.join(CONFIG_DIR, 'wwwroot', 'dist');

const EXPLICIT_ENTRY_POINTS = {
  mainAuthentication: path.join(SOURCE_JS_DIR, 'mainAuthentication.js'),
  mainAvlTree: path.join(SOURCE_JS_DIR, 'mainAvlTree.js'),
  mainBinarySearchTree: path.join(SOURCE_JS_DIR, 'mainBinarySearchTree.js'),
  mainListDataStructures: path.join(SOURCE_JS_DIR, 'mainListDataStructures.js'),
  mainHistory: path.join(SOURCE_JS_DIR, 'mainHistory.js'),
  mainMaxHeap: path.join(SOURCE_JS_DIR, 'mainMaxHeap.js'),
  mainMinHeap: path.join(SOURCE_JS_DIR, 'mainMinHeap.js'),
  mainRedBlackTree: path.join(SOURCE_JS_DIR, 'mainRedBlackTree.js'),
};

module.exports = {
  mode: 'production', 
  entry: EXPLICIT_ENTRY_POINTS,

  output: {
    path: OUTPUT_DIR, 
    // Ensuring the bundles use the .bundle.js suffix for consistency
    filename: '[name].bundle.js', 
    clean: true, 
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },    
  resolve: {
    extensions: ['.js'],
  },
};