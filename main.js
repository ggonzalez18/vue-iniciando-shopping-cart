Vue.component("product", {
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
    template: `<div class="row">
    <div class="col col-lg-7">
        <img v-bind:src="img" class="card" width="90%" />
        <!--atributo-->
    </div>
    <div class="col col-lg-5">
        <h1><b>{{ product }}</b></h1>
        <!--contenido-->
        <h2>{{ description }}</h2>
        <div>
            <b><span> {{ stock }} </span>
            <span v-if='stock > 10'>En stock</span>
            <span style="color: #dc3545;" v-else-if='stock <= 10 && stock > 0'>¡Pocas unidades!</span>
            <span style="color: #797878;" v-else>Agotadas</span>
            </b>
        </div>
        <hr>
        <h4>Características:</h4>
        <ul>
            <li v-for='(detail,index) in details' :key="index">{{detail}}</li>
        </ul>
        <a :href="lnk">Ver Detalle</a>
        <div class="d-flex mt-2"><b>Tipo de Longaniza:</b>
            <div class="mr-3 ml-3" v-for='variant in variants' :key="variant.id">
                <p v-on:mouseover='updateProduct(variant)'>{{ variant.type }}</p>
            </div>
        </div>
        <button class="btn btn-danger" @click='addToCart' :disabled='!inStock'>Agregar al carro</button>
        <button class="btn btn-secondary" @click='deleteFromCart'>Sacar del carro</button>
    </div>
</div>`,
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
        }
    },
    created() {
        this.selectedVariant = this.variants.find(item => item.default == true)
    }
})

var app = new Vue({
    el: '#app',
    data: {
        cart: 0
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