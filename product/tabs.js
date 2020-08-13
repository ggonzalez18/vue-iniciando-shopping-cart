Vue.component("product-tabs", {
    props: {
        reviews: {
            type: Array,
            required: true
        },
        shipping: {
            type: String,
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: "#tabs-template",
    data() {
        return {
            tabs: ['Agregar Review', 'Ver Review', 'Envio', 'Detalles'],
            selectedTab: 'Agregar Review'
        }
    }
})