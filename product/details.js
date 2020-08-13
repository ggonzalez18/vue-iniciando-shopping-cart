Vue.component("review-detail", {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: "#detail-template",
})