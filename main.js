Vue.component("review-shipping", {
    template: '#shipping-template',
    props: {
        shipping: {
            type: String,
            required: true
        }
    },
})

Vue.component("review-list", {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: "#list-template",
})

Vue.component("product-tabs", {
    props: {
        reviews: {
            type: Array,
            required: true
        },
        shipping: {
            type: String,
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

Vue.component("reviews-form", {
    template: '#form-template',
    data() {
        return {
            email: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        saveReview() {
            if (this.review && this.rating && this.email) {
                let productReview = {
                    email: this.email,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit("review-added", productReview)
                this.email = null
                this.review = null
                this.rating = null
            } else { this.errors.push("ha ocurrido un error") }
        }

    }
})

Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            description: 'Longanizas de Chillan 100% artesanal',
            product: 'Longaniza de Brocolli',
            selectedVariant: {},
            lnk: './longaniza.html',
            details: ["500gr", "orgánica", "Baja en grasas"],
            variants: [{
                    id: 5,
                    type: 'Red',
                    img: './assets/ejemplo.jpg',
                    stock: 12,
                    default: true,
                },
                {
                    id: 4,
                    type: 'White',
                    img: './assets/blanca.png',
                    stock: 0,
                }
            ],
            reviews: []
        }
    },
    methods: {
        updateProduct(variant) {
            this.selectedVariant = variant;
        },
        addToCart() {
            this.$emit("add-to-cart", this.selectedVariant)
            this.selectedVariant.stock -= 1
        },
        deleteFromCart() {
            var variantInCart = this.cart.find(product => product = this.selectedVariant)
            this.$emit("remove-from-cart", this.selectedVariant)
            if (variantInCart) {
                this.selectedVariant.stock += 1
            }
        },
    },
    computed: {
        inStock() {
            return this.stock > 0 ? true : false
        },
        img() {
            return this.selectedVariant.img
        },
        stock() {
            return this.selectedVariant.stock
        },
        shipping() {
            return this.premium == true ? "gratis" : "2.000"
        }
    },
    created() {
        this.selectedVariant = this.variants.find(item => item.default == true)
    },
    mounted() {
        eventBus.$on("review-added", review => this.reviews.push(review))
    },
    template: '#product-template',
})

var eventBus = new Vue()

var app = new Vue({
    el: '#app',
    data: {
        cart: [],
        premium: false,
        showStyle: {
            display: "block",
            "padding-right": "16px",
            "padding-top": "20px"
        },
        displayCart: false
    },
    methods: {
        addToCart(variant) {
            this.cart.push(variant)
        },
        removeFromCart(variant) {
            var index = this.cart.indexOf(variant)
            if (index > -1) {
                this.cart.splice(index, 1)
            }
        }
    },
    computed: {
        modalStyle() {
            if (this.displayCart) {
                return this.showStyle
            } else {
                return {}
            }
        }
    }
})