Vue.component("review-shipping", {
    template: '#shipping-template',
    props: {
        shipping: {
            type: String,
            required: true
        }
    },
})