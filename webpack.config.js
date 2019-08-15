module.exports = {

    //入口文件

    entry: './main.js',

    //出口文件

    output: {

        filename: './bulid.js' //此文件名可以随便起

    },

    module: {

        loaders: [{

                test: /\.css$/,

                loader: 'style-loader!css-loader'

            },

            {

                test: /\.less$/,

                loader: 'style-loader!css-loader!less-loader'

            }, {

                test: /\.scss$/,

                loader: 'style-loader!css-loader!sass-loader'

            },

            {

                test: /\.styl$/,

                loader: 'style-loader!css-loader!stylus-loader'

            },

            //图片的相关配置

            {

                test: /\.(png|jpe?g|gif|psd|svg|icon)$/,

                loader: 'url-loader'

            }



        ]

    }

}