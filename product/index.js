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