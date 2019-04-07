export default {
    table: {
        tableClass: 'table table-striped thead-dark',
        ascendingIcon: 'glyphicon glyphicon-chevron-up',
        descendingIcon: 'glyphicon glyphicon-chevron-down',
        handleIcon: 'glyphicon glyphicon-menu-hamburger',
        renderIcon: function(classes, options) {
            return `<span class="${classes.join(' ')}"></span>`
        }
    },
    pagination: {
        wrapperClass: "pagination justify-content-center",
        activeClass: "btn btn-primary active",
        disabledClass: "disabled",
        pageClass: "page-link",
        linkClass: "page-link",
        icons: {
            first: "",
            prev: "",
            next: "",
            last: ""
        }
    }
}
