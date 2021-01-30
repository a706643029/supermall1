module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
             //默认配置src为@
             'assets': '@/assets',
             'common': '@/common',
             'components': '@/components',
             'network': '@/network',
             'views': '@/views',
            }
        }
    }
}