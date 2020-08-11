var app = new Vue({
    el: '#app',
    data: {
        description: 'Longanizas de Chillan 100% artesanal',
        product: 'Longaniza de Brocolli',
        selectedVariant: {},
        // img: './assets/ejemplo.jpg',
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
    },
    methods: {
        updateProduct(variant) {
            this.selectedVariant = variant;
        },
        addtoCart() {
            this.cart += 1
            this.selectedVariant.stock -= 1
        },
        deleteFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
                this.selectedVariant.stock += 1
            }
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
        }
    },
    created() {
        this.selectedVariant = this.variants.find(item => item.default == true)
    }
})