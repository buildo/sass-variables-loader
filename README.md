# sass-variables loader for webpack

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
require("sass-variables!variables.scss");
// => Object containing camel-cased sass variables with their string value
```

`sass-variables-loader` works with raw sass files, if you're using other scss loaders in your webpack config (for example `sass-loader`), be sure to either:

* Exclude your variables files from other scss loaders config, e.g. `exclude: ["/path/to/variables.scss"]`
* Disable other configured loaders when requiring your variables files, e.g. `require("!!sass-variables!variables.scss")`

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
