Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
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
            cart: 0
        }
    },
    methods: {
        updateProduct(variant) {
            this.selectedVariant = variant;
        },
        addToCart() {
            this.$emit("add-to-cart", 1);
            this.selectedVariant.stock -= 1
        },
        deleteFromCart() {
            this.$emit("remove-from-cart", 1)
            this.selectedVariant.stock += 1
        }
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
    template: '#product-template',
})

var app = new Vue({
    el: '#app',
    data: {
        cart: 0,
        premium: false
    },
    methods: {
        addToCart(cant) {
            this.cart += cant;
        },
        removeFromCart(cant) {
            if (this.cart > 0) {
                this.cart -= cant;
            }
        }
    }
})