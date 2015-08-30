angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('en_US', {"HOME":"HOME","Login":"Login"});
    gettextCatalog.setStrings('vi_VN', {"HOME":"TRANG CHỦ","Login":"Đăng nhập"});
/* jshint +W100 */
}]);